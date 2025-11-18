# Copilot instructions for this repo

Purpose: enable AI coding agents to be productive immediately in this Eleventy + Webpack static site.

## Architecture
- Static site built with Eleventy (11ty). Input in `content/`, output to `public/` (see `.eleventy.js`).
- Templating is Liquid with shared includes in `content/_includes/`. Common layouts:
  - `default.liquid` for most HTML pages
  - `blogpost.liquid` for blog posts
  - `note.liquid` for notes
- Collections defined in `.eleventy.js`:
  - `blogPosts`: `content/blogs/*.{html,md}` sorted by date desc
  - `notes`: `content/notes/*.{html,md}` sorted by date desc
  - `updates`: union of blogs + notes
- Global permalink set to `{{ page.filePathStem }}.html` to avoid directory index URLs.
- Global data:
  - `site.url` used for canonical links and sitemap
  - `books` from `content/books.json`
  - `starterPacks` from `content/RSSStarterFeeds.json`
  - `nocache` from `content/_data/nocache.js` appends `?nocache=TIMESTAMP` to assets
- Client JS and optional SCSS bundled by Webpack from `content/scripts.js` to `public/main.js`/`main.css`. CSS for the site theme is also directly copied as `content/styles.css` -> `/styles.css`.

## Developer workflows
- Dev server (rebuild and serve):
  - Terminal 1: `npm run eleventy` (serves `public/`)
  - Terminal 2: `npm run webpack` (watches/bundles JS/CSS)
- Production build (local): `npm run build` (spawns Eleventy and Webpack in parallel). If you want deterministic parallel execution, run the two scripts in separate terminals as above.
- Deploy: GitHub Actions deploys the contents of `public/` as-is (see `.github/workflows/static.yml`). There is no CI build step. You must build locally and commit `public/` before pushing to `main`.
- Images: optional optimization pipeline with Sharp
  - Optimize: `npm run optimize-images`
  - Restore originals: `npm run restore-images`
  - Remove backups: `npm run clean-backups`

## Content authoring conventions
- Pages in `content/` with front matter select layout and metadata. Examples:
  - HTML page: `content/about.md` or `.html` with front matter:
    ---
    title: About
    layout: default.liquid
    ---
  - Blog post (Markdown): place in `content/blogs/` with front matter:
    ---
    title: My Post
    date: 2025-11-18
    description: Short summary for feeds
    layout: blogpost.liquid
    ---
  - Note (Markdown): place in `content/notes/` with `layout: note.liquid`.
- Images/Assets:
  - Put under `content/Assets/` (capital A). In Markdown/HTML, prefer absolute `/Assets/your-image.png` (relative `../Assets/...` also works inside `content/blogs/` and `content/notes/`).
  - The Eleventy config passthrough copies `*.png` and `*.svg` anywhere and tries to copy `content/assets` (lowercase). On case-sensitive systems, prefer `content/Assets/` and use PNG/SVG for guaranteed passthrough, or add a passthrough for JPGs if needed.
- Feeds and sitemap:
  - RSS feeds live in `content/feeds/*.xml.liquid` and render from the `blogPosts`/`notes` collections.
  - `content/sitemap.xml.liquid` enumerates `collections.all` using `site.url`.

## External integrations
- Markdown rendering: `markdown-it` with MathJax v3 (`markdown-it-mathjax3`) enabled for LaTeX math in Markdown.
- Mastodon embed: `content/scripts.js` fetches latest post via `allorigins.win` (CORS) and injects an embed script from `https://staticcdn.aus.social`.
- Sitemap: `@quasibit/eleventy-plugin-sitemap` configured with `site.url`.
- Books: `content/Library.html` renders from `content/books.json`. Script `isbn-search.js` can append books from Open Library (ESM import; either run with Node ESM or convert to CJS before use).
- Obsidian import: `obsidian-import.js` converts Obsidian Markdown and copies images to `content/Assets/`.
  - Usage: `node obsidian-import.js --blog /path/to/export` or `--note` (defaults to `--blog` and a repo-local path).

## Gotchas and tips
- Keep `site.url` in `.eleventy.js` and `rootURL` in feed templates consistent with the current domain.
- URLs end with `.html` by design (global permalink). Link to `/page.html`, not `/page/`.
- Use forward slashes (`/`) in URLs; avoid backslashes (`\`) in HTML `src`/`href`.
- Because the Pages workflow uploads only `public/`, commits that change only `content/` won’t be visible until you rebuild and commit `public/`.
