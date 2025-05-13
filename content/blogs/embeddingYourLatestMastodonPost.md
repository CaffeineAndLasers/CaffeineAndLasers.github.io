---
title: Embedding your latest Mastodon Post into your webpage
date: 2025-03-21
description: Quick tutorial on how to dynamically embed your latest mastodon post into your static webpage
layout: blogpost.liquid
tags:
  - Technology
  - Webmastery
---


**I dont care about how it works, what do I need to do?** Scroll to the bottom, and grab the code and instructions there.

# Embedding Mastodon Posts into your Static Web Page

There are a few tools for embedding Mastodon toots into a webpage. The most straightforward is to get the embedding code straight from mastodon itself.

![Screenshot highlighting the menu showing embed post](/Assets/20250321EmbedToot.png)

The problem with this, is you want to grab the latest post, regardless of when you last updated the site?

Well you could use [Mastofeed](https://mastofeed.com/). But this embeds your ENTIRE Mastodon feed. 

*Sigh* I guess I'll figure it out myself.

# The Work around:

As far as I can tell, the Mastodon protocall doesn't have any key for grabbing the latest post directly by URL. The good news is, with a bit of jank-script, we can figure it out. 

## Step 1: Grab the RSS Feed

I realise it is becoming a theme on this website to espouse how much I love RSS. I can't help it. All we are doing here, is using javascript to grab your fediverse rss feed at `yourMastodonInstance/@YourUserName.rss`, and finding the latest item on it. 

## Step 2: Parse it

From here, you could just extract the details from the RSS feed and insert it into the html. You could do that, or ou could extract the URL for that specific post, and use that to generate the embedded iFrame. (I think that looks cooler)


# TL;DR Where do I get the code?

You can find the code in the Github Repo for this website with the source code [here](https://github.com/CaffeineAndLasers/CaffeineAndLasers.github.io/blob/main/content/scripts.js). 

Just copy and paste the both the `embedLatestPost` and `fetchLatestMastodonPost` functions into your `scripts.js` file (or create it if you don't have one), and make sure you call it at the end of your code with  `<script src="/scripts.js"></script>`

Now to use the widget, use this snippet, substituting your fediverse instance and username.

```
<script>
    // Explicitly call the function to fetch and display the latest RSS post
    document.addEventListener("DOMContentLoaded", function() {
        fetchLatestMastodonPost({{INSTANCE}}, "{{USERNAME}}");
    });
</script>
```

If you would like to see what that looks like, go to my home page and hit `Ctrl+U` to see the source code (on firefox, idk what the key combo for chrome is).