//node addBook.js 9780140328721


// save as addBook.js
import fs from "fs";
import fetch from "node-fetch";

const BOOKS_FILE = "./content/books.json";
const COVER_DIR  = "./content/Assets/book-covers/";

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
    const aRes = await fetch(`https://openlibrary.org${meta.authors[0].key}.json`);
    if (aRes.ok) {
      const aData = await aRes.json();
      author = aData.name;
    }
  }

  // cover url
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  const coverPath = `${COVER_DIR}${isbn}.jpg`;

  // download cover
  try {
    await download(coverUrl, coverPath);
  } catch {
    console.warn("No cover found");
  }

  // construct new book object
  const newBook = {
    name: title,
    author: author,
    rating: "",
    thoughts: "",
    date: "",
    fiction: null, // OpenLibrary doesn't mark this directly
    coverImg: coverPath
  };

  // append to books.json
  const books = JSON.parse(fs.readFileSync(BOOKS_FILE, "utf8"));
  books.push(newBook);
  fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2));

  console.log("Added:", newBook);
}

// run: `node addBook.js ISBN`
const isbn = process.argv[2];
if (!isbn) {
  console.error("Usage: node addBook.js <ISBN>");
  process.exit(1);
}
addBook(isbn);
