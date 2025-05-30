---
title: Two Click Obsidian To the Web Automation
date: 2025-05-30
description: Here is a quick write up for method I threw together for getting my writing out of Obsidian and into my website.
layout: note.liquid
---

Here is a quick write up for method I threw together for getting my writing out of Obsidian and into my website.

The problem statement:

While Eleventy is capable of turning markdown into html, there are a handful of slight differences between my web environment and my obsidian environment that made things tedious. 

- **I have to manually drag across images**: All of my images are thrown in an `Assets` folder in Obsidian, and embeded into my docs from there. When I want to get an article into my web directory, I had to manually find and copy and paste the files linked in the markdown one-by-one. Which is annoying
- **Wikilinks vs Vanilla Md links**. In Obsidian I embed image with the follwing syntax `![[Image.jpg]]`, however in my Web directory, I need to link to my Assets folder with a regular markdown link like this: `![alt text](/Assets/Image.jpg)`, and eleventy can't figure out what to do with these wiki links
- **My Obisidian Front Matter and my Web Front matter are different**. I need to strip out all the metadata from my vault. (Tags, parent notes etc), and add the metadata relevant to my web page.

Thankfully thanks to the power of modern computing, this was a task easy to automate. 

## Step 1 - Obsidian "Markdown Export" Plugin

[This plugin](obsidian://show-plugin?id=obsidian-markdown-export-plugin) is simple. It copies the current note to a new export directory, along with everything else embedded in it. (Including Images).

## Step 2 - Obsidian-Import.js

Then I "wrote"\* a quick bit of Javascript for use in my Node environment. It

1. Grabs the markdown file from the export file
2. Removes the Obsidian Front Matter
3. Generates and adds the website front matter
4. Does a bit of regex to fix the wikilinks and re-link them to the correct location in my website directory
5. Saves everything where it needs to go.

# 1 Putting it all together.

Now all I need to do to get a post out of obsidian and into my website is
- 1. Hit the markdown export plugin in Obsidian
- 2. Run `node obisian-import --blog` within my websites directory 
  -  2.5 Verify it looks right
- 3. Commit and push my changes

This very post was generated with this method. 

The code is kind of specific to my website, with a bunch of hard-coded paths. (e.g. I differentiate between notes like this and blogposts), but feel free to take a look at the [code](https://github.com/CaffeineAndLasers/CaffeineAndLasers.github.io/blob/main/obsidian-import.js) and make it work for you. 

\* NOTE: By "I wrote", I mean I gave a list of requirements to Claude and iterated until it passed my requirements. I am not good at JavaScript