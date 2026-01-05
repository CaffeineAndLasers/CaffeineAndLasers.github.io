const fs = require('fs');
const path = require('path');
const slugify = s => s.toString().toLowerCase().trim()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

const booksPath = path.join(__dirname, '..', 'books.json');
const outDir = path.join(__dirname, '..', 'books');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const raw = fs.readFileSync(booksPath, 'utf8');
const books = JSON.parse(raw);

books.forEach(book => {
  const filename = slugify(book.name) + '.md';
  const filePath = path.join(outDir, filename);

  // Create YAML front matter with all fields verbatim. Use literal block for thoughts.
  const frontMatterLines = [];
  frontMatterLines.push('---');
  // keep name as provided and also set title for Eleventy
  frontMatterLines.push(`name: "${book.name.replace(/"/g, '\\"')}"`);
  frontMatterLines.push(`title: "${book.name.replace(/"/g, '\\"')}"`);
  if (book.author) frontMatterLines.push(`author: "${book.author.replace(/"/g, '\\"')}"`);
  if (book.rating) frontMatterLines.push(`rating: "${book.rating.replace(/"/g, '\\"')}"`);
  if (book.date) frontMatterLines.push(`date: "${book.date}"`);
  if (typeof book.fiction !== 'undefined') frontMatterLines.push(`fiction: ${book.fiction}`);
  if (book.coverImg) frontMatterLines.push(`coverImg: "${book.coverImg}"`);
  // add a placeholder layout so pages render with the book layout
  frontMatterLines.push('layout: book.liquid');
  // include thoughts as a YAML literal to preserve punctuation and newlines
  if (book.thoughts) {
    frontMatterLines.push('thoughts: |');
    // indent each line by two spaces
    const thoughtLines = book.thoughts.split(/\r?\n/).map(l => '  ' + l);
    frontMatterLines.push(...thoughtLines);
  }
  frontMatterLines.push('---');

  // Also include the thoughts again as the markdown body for readability
  const body = (book.thoughts || '');

  const content = frontMatterLines.join('\n') + '\n\n' + body + '\n';

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Wrote', filePath);
});

console.log('Generated', books.length, 'book markdown files.');
