---
title: BlogPost   Digitizing Paper notes in the 21st Century
date: 2025-06-23
description: Shoutout to Heals for sharing their own workflow in a Mastodon post for inspiring me.
layout: note.liquid
---

Shoutout to [Heals](https://heals-draws.art/) for sharing their own workflow in a Mastodon post for inspiring me. 

# Problem Statement

Here are two axioms, which were until recently, incompatible.

1. I want all my notes to be digitized in plain text
2. I enjoy writing in pen and paper

Keeping everything in plain text preserves my writing well into the future and hopefully as long as I am alive. But writing on pen and paper *feels nice*. It is more ergonomic, more tactile, and I genuinely believe it helps me recall what I have written better.

# What Do?

It turns out LLM Optical Character Recognition (OCR) is getting **really good**. (I hate the acronym OCR, there is nothing optical about it, but that is a topic for another blogpost). 

So with Heals advice I settled on [Mistral's OCR](https://mistral.ai/news/mistral-ocr). They have a generous enough free tier, and seems to perform really well. 

So, since the folks at Mistral have already done all the hard work, I wrote a wrapper for my workflow.

# How does it work?

I have a bash script which watches a directory on my computer. Now when I finish writing a page a take a photo of my notes, and drop it in the this directory. 

When a new photo is detected, the script sends it to Mistral to extract all the text, and any doodles I might've done on the page. It then compiles a markdown version of my notes, and saves it into my Obsidian vault. 

# Does it Work?

Here is a sample of my text and the output.

<div style="display: flex; gap: 1em; align-items: flex-start;">
    <img src="/Assets/634b047a1182d9c022be4c46facf6145.png" style="height: 300px; object-fit: contain;" alt="Sample 1"/>
    <img src="/Assets/cb6e6a037c8feeb39a27d940a9be80fd.png" style="height: 300px; object-fit: contain;" alt="Sample 2"/>
</div>

My handwriting is normally pretty messy, most "handwriting recognition" software normally fails on my writting but it succeeds most of the time here. The most common failure mode I encounter is in complicated mathematics expressions, or the characters I know that that I write weirdly sometimes. (e.g. `\varepsilon`)

I've been used it on realy samples of my handwriting a few times over the coarse of 2 weeks now before I posted this, so I am confident that the tool actually works on things other than just the sample pages above. 