const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

module.exports = function (eleventyConfig) {
  // This makes the eleventy command quieter (with less detail)
  eleventyConfig.setQuietMode(true);

  // Add a collection for blog posts
  eleventyConfig.addCollection("blogPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/blogs/*.{html,md}").sort((a, b) => {
      return b.date - a.date; // Sort in reverse chronological order (newest first)
    });
  });
  // And Notes
  eleventyConfig.addCollection("notes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/notes/*.{html,md}").sort((a, b) => {
      return b.date - a.date; // Sort in reverse chronological order (newest first)
    });
  });

  // Add date filter for RSS
  eleventyConfig.addFilter("dateToRfc822", function(date) {
    return new Date(date).toUTCString();
  });
  

  // This will stop the default behaviour of foo.html being turned into foo/index.html
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // This will make Eleventy not use your .gitignore file to ignore files
  eleventyConfig.setUseGitIgnore(false);

  // This will copy these folders and files to the output without modifying them
  eleventyConfig.addPassthroughCopy("content/assets");
  eleventyConfig.addPassthroughCopy("content/**/*.svg");
  eleventyConfig.addPassthroughCopy("content/**/*.png");

  // This defines which files will be copied
  eleventyConfig.setTemplateFormats([
    "html",
    "md",
    "liquid",
    "njk",
    "txt",
    "js",
    "css",
    "xml",
    "json",
  ]);

  // This defines the input and output directories
  return {
    dir: {
      input: "content",
      output: "public",
    },
  };

  eleventyConfig.addShortcode("qrCode", async function(url, altText = "QR Code to share this page") {
    if (!url) {
      console.warn("No URL provided to qrCode shortcode.");
      return "";
    }

    const qrCodeFilename = `qr-code-${Buffer.from(url).toString('base64').substring(0, 12)}.svg`; // Simple filename based on URL hash
    const qrCodePath = path.join(eleventyConfig.dir.output, 'Assets', 'qr_codes', qrCodeFilename);
    const qrCodePublicPath = `/img/qr-codes/${qrCodeFilename}`;

    // Ensure directories exist (if not, create them - you might need a more robust solution for complex needs)
    const dir = path.dirname(qrCodePath);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    try {
      await QRCode.toFile(qrCodePath, url, {
        errorCorrectionLevel: 'H', // High error correction
        type: 'svg',
      });

      return `<img src="${qrCodePublicPath}" alt="${altText}" width="128" height="128" loading="lazy">`;
    } catch (err) {
      console.error("Error generating QR code:", err);
      return `<p>Error generating QR code</p>`; // Fallback in case of error
    }
  });
};
