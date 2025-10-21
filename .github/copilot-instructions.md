# Copilot instructions for this repo

This site is built with Eleventy (11ty) using Liquid templates and a small Webpack pipeline. Input lives in `content/`, output is written to `public/`.

## Architecture
- Static generator: Eleventy configured in `.eleventy.js` (input `content/`, output `public/`). Liquid layouts live in `content/_includes/`.
- Pages: HTML/Markdown under `content/` (e.g., `content/index.html`, `content/blogs/*.md`, `content/notes/*.md`). Files render to flat `*.html` (no `foo/index.html`) via `permalink: "{{ page.filePathStem }}.html"` (also enforced in `.eleventy.js`).
- Data: Global data registered in `.eleventy.js`:
  - `site.url` used for canonical links and sitemap.
  - `books` from `content/books.json`.
  - `starterPacks` from `content/RSSStarterFeeds.json`.
- Collections: `blogPosts`, `notes`, and `updates` (combined, newest first). See `.eleventy.js` for filters and sort.
- Assets: Place images under `content/Assets/`. Eleventy passthrough copies `content/**/*.svg` and `content/**/*.png` explicitly; other types (e.g., `.jpg`) rely on broader content handling—prefer `content/Assets/` and run the optimizer.
- Client JS/CSS:
  - Hand-authored: `content/scripts.js` and `content/styles.css`, referenced by `content/_includes/default.liquid` as `/scripts.js` and `/styles.css` with a `{{ nocache }}` query.
  - Bundled (optional): Webpack builds from `content/scripts.js` to `public/main.js` and `public/main.css` (see `webpack.config.js`). These are not wired into the default layout; only use them if you intentionally switch templates to `/main.*`.
- Markdown: `markdown-it` with `markdown-it-mathjax3` enabled; math is allowed in content.

## Dev & build
- Dev server: `npm run eleventy` (serves Eleventy with live reload). For JS/CSS bundling during dev, run `npm run webpack` in parallel.
- One-off build: `npm run build` (runs Eleventy and Webpack concurrently). Output is `public/`.
- Images: `npm run optimize-images` to compress/resize in-place under `content/Assets/` (backs up as `*.backup`). Recovery: `npm run restore-images`. Cleanup: `npm run clean-backups`.
- Obsidian import: `npm run import-obsidian` then pass flags directly to the script if needed (see `obsidian-import.js`):
  - `--blog` or `--note` (default `--blog`).
  - Optional export path (defaults to `DEFAULT_EXPORT_PATH`).

## Templates & conventions
- Base layout: `content/_includes/default.liquid` injects header/footer, sets CSP, canonical URL, theme meta, and adds a global theme toggle. If adding external scripts, update the CSP `script-src` accordingly.
- Cache busting: `content/_data/nocache.js` appends `?nocache=<timestamp>`; keep it on CSS/JS links.
- Common layouts: `content/_includes/blogpost.liquid` and `note.liquid`. Place posts in `content/blogs/` and notes in `content/notes/`.
- Front matter example (blog post):
  ```
  ---
  title: My Post Title
  date: 2025-10-22
  description: One-sentence summary
  layout: blogpost.liquid
  permalink: "{{ page.filePathStem }}.html"
  ---
  ```

## Integration points
- Mastodon embed logic lives in `content/scripts.js`, uses AllOrigins CORS proxy and `https://staticcdn.aus.social/embed.js`. Ensure CSP allows this origin if modified.
- Sitemap via `@quasibit/eleventy-plugin-sitemap` uses `site.url`. Keep `site.url` accurate for canonical links and the sitemap.

## Gotchas
- Path casing: repo uses `content/Assets/` (uppercase) but passthrough rules reference lowercase `assets` in places. The PNG/SVG globs cover most use cases; if adding other types, consider updating `.eleventy.js` passthrough.
- Flat URLs: The project intentionally keeps `*.html` URLs; don’t switch to directory-style unless you update routing and sitemap.
- Live JS/CSS: Default layout serves `/scripts.js` and `/styles.css`. Don’t swap to Webpack’s `/main.*` without updating templates and verifying in `public/`.
