const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

module.exports = function (eleventyConfig) {
  // This makes the eleventy command quieter (with less detail)
  eleventyConfig.setQuietMode(true);

  // Add global data for site URL
  eleventyConfig.addGlobalData("site", {
    url: "https://caffeineandlasers.com"
  });

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

  // An all updates (blog posts and notes) collection
  eleventyConfig.addCollection("updates", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/blogs/*.{html,md}").sort((a, b) => {
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

};
