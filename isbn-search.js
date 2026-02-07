// Usage: npm run add-book <ISBN>
// Example: npm run add-book 9780140328721

import fs from "fs";
import fetch from "node-fetch";

const BOOKS_DIR = "./content/books/";
const COVER_DIR = "./content/Assets/book-covers/";

// helper: slugify title for filename
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")           // Replace spaces with -
    .replace(/[^\w\-]+/g, "")       // Remove all non-word chars
    .replace(/\-\-+/g, "-")         // Replace multiple - with single -
    .replace(/^-+/, "")             // Trim - from start of text
    .replace(/-+$/, "");            // Trim - from end of text
}

// helper: download a file
async function download(url, path) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(path, Buffer.from(buffer));
}

// main function
async function addBook(isbn) {
  // fetch metadata from Open Library
  const metaUrl = `https://openlibrary.org/isbn/${isbn}.json`;
  const res = await fetch(metaUrl);
  if (!res.ok) {
    console.error("Book not found");
    return;
  }
  const meta = await res.json();

  // get title + author(s)
  const title = meta.title || "Unknown";
  let author = "Unknown";
  if (meta.authors && meta.authors[0]?.key) {
    const aRes = await fetch(
      `https://openlibrary.org${meta.authors[0].key}.json`
    );
    if (aRes.ok) {
      const aData = await aRes.json();
      author = aData.name;
    }
  }

  // generate filename from title
  const slug = slugify(title);
  const bookPath = `${BOOKS_DIR}${slug}.md`;

  // check if book already exists
  if (fs.existsSync(bookPath)) {
    console.error(`Book file already exists: ${bookPath}`);
    return;
  }

  // cover url and path
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  const coverFilename = `${isbn}.jpg`;
  const coverPath = `${COVER_DIR}${coverFilename}`;
  const coverImgPath = `/Assets/book-covers/${coverFilename}`;

  // ensure directories exist
  if (!fs.existsSync(COVER_DIR)) {
    fs.mkdirSync(COVER_DIR, { recursive: true });
  }
  if (!fs.existsSync(BOOKS_DIR)) {
    fs.mkdirSync(BOOKS_DIR, { recursive: true });
  }

  // download cover
  let coverFound = true;
  try {
    await download(coverUrl, coverPath);
  } catch {
    console.warn("No cover found, will use placeholder path");
    coverFound = false;
  }

  // construct markdown file content
  const thoughts = "";
  const markdownContent = `---
name: "${title}"
title: "${title}"
author: "${author}"
rating: ""
date: ""
fiction: null
coverImg: "${coverFound ? coverImgPath : ""}"
layout: book.liquid
thoughts: |
  ${thoughts}
---

${thoughts}
`;

  // write markdown file
  fs.writeFileSync(bookPath, markdownContent);

  console.log(`\nBook added successfully!`);
  console.log(`File: ${bookPath}`);
  console.log(`Title: ${title}`);
  console.log(`Author: ${author}`);
  console.log(`Cover: ${coverFound ? coverPath : "Not found"}`);
  console.log(`\nPlease edit ${bookPath} to add rating, date, fiction status, and thoughts.`);
}

// run: `npm run add-book <ISBN>`
const isbn = process.argv[2];
if (!isbn) {
  console.error("Usage: npm run add-book <ISBN>");
  process.exit(1);
}
addBook(isbn);
