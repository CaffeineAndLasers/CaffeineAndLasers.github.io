---
title: Colophon
layout: default.liquid
---

# The Software Stack

- **Host**: [Github Pages](https://pages.github.com/)
- **Domain Name Registrar**: [PorkBun](https://porkbun.com/)
- **Build Tool**: [11ty](https://www.11ty.dev/)
- **Deployment Pipeline**: Github Actions
- **Text Editor (For longform writing, not code)**: [Obsidian](https://obsidian.md/)
- **Code Editor**: I bounce between VSCode, Cursor and Zed depending on my mood, and which computer I am working on. 

# How I Update My Site

All the hard work in updating my website is taken care of by 11ty. I have a section below how I manage my 11ty templates. 

My blogposts start written in Obsidian where all my knowledge lives. Whenever I have written something that I think is worth publishing, I simply drag and drop the `.md` file to `Content` folder in my websites repo. 

If the post is just text then this is all that is needed, I compile using 11ty, Push the updates to github and the new post is up! If I have pictures in the post, these get broken in the process, so I need to manually pull each one across and re-link them. This is something I still need to figure out how to automate. 

# My 11ty Config

My 11ty config was mostly inspired by [this blogpost](https://medium.com/@tarngerine/how-the-heck-do-i-use-eleventy-the-intro-guide-i-wish-i-had-84d9b2689031). All my templates are written in liquid, and *almost* all my pages are written in Markdown, (since that is what Obsidian supports).

The general idea is to push all the "web dev" and html into my templating, so my writting can be read in plain txt. If I absolutely need to do some advanced formatting, you can still slip a bit of inline css into markdown anyway. 

# Learning More

I have extra bits and pieces about webmastery in my [Resources](https://caffeineandlasers.com/Resources.html) Page

