---
title: RSS For Reddit
date: 2024-01-15
description: Learn how to use RSS to improve your Reddit experience by subscribing to subreddits anonymously and avoiding the Infinite Sludge Algorithm.
layout: blogpost.liquid
---

# 1 How and Why to Use RSS to Improve Your Reddit UX

Did you know you can subscribe to subreddits via RSS? Maybe you did, but did you know it’s the best way to use Reddit without getting sucked into the Enshittified Torment Nexus™️?

It seems like it's only a matter of time before reddit plugs that gap to force you further into the enshittified platform. One last dance on Aaron Swartz's grave. So lets make the most of it while the feeds still exist. 

If you don't know the Good News about RSS. Go and check out Cory Doctorow's [blogpost](https://pluralistic.net/2024/10/16/keep-it-really-simple-stupid/#read-receipts-are-you-kidding-me-seriously-fuck-that-noise), and then come back. 

## 1.1 Why You Might Want to Use RSS to Browse Reddit

Reddit has fallen deeply down the enshittification black hole. It's been sliding that way for a while, but the API changes and public acquisition clearly made everything much worse. 

### 1.1.1 The Infinite Sludge Algorithm

Reddit has adopted the same mindset as its other social media competitors: the Infinite Sludge Algorithm. It wants to present you with an endless flow of sludge content, regardless of whether you actually subscribed to see it, just to keep your eyes on their platform for as long as possible. 

*Who cares what subreddits you subscribed to? Here's some other content we think you'll like.* 

This is what makes reddit so aweful these days. I want social communities, but I don't want the website which facilitates that community to purposely make itself addictive. 

### 1.1.2 Tracking

They're obviously tracking you. How else are they going to personalize your sludge?

## 1.2 How Can RSS Save Your Reddit Experience?

Using RSS, you can subscribe to *only* the communities you want to hear from and browse them anonymously until you choose to open them in your browser to interact.

No more endless algorithm of slop. Just the content you previously decided you wanted to see.

# 2 How Do I do it?

## 2.1 Get Everything With No Sorting

You can simply add `.rss` to the end of any subreddit URL to get an RSS feed of that subreddit's most recent posts. For example:

`https://www.reddit.com/r/LocalLLaMA.rss`

## 2.2 Okay, but Sorting by New Sucks

Yes, it does. Unfortunately, RSS doesn't have any concept of "Upvote," so there isn’t an RSS option to sort by "hot." You can make use of Reddit’s URLs though, because you can add `.rss` to *any* URL. Here’s how I use it:

**Sort by top, limit to 5 (or however many) posts:**
Example: `https://reddit.com/r/3Dprinting/top/.rss?limit=5` This will create an RSS feed of the top 5 most upvoted posts in `/r/3DPrinting` today, returned in reverse chronological order.

I did this for the 5 or so Reddit communities I actually want to keep track of, and now have my own Reddit feed with a hard cap on the top 30 posts from the past 24 hours. 

**Why Use the limit argument:** Even when you sort by `/top` your RSS reader will still list the top 25 (or however many) results in chronological order, leaving you back at square one. That's why I prefer to use `/top` and `?limit` to get *just* the top 5 in my feed. 


**Other Filters:**  You can also filter by their other sorting algorithms, e.g. rising `https://reddit.com/r/technology/rising/.rss` or if you are insane, by controversial `https://reddit.com/r/politics/controversial/.rss`


**Private RSS Feeds**: You can even subscribe to an RSS feed for your entire accounts front page! The Old Reddit website still has options for your private feeds [Reddit Private RSS Feeds](https://www.reddit.com/prefs/feeds/) from here you can get an RSS feed of your front page as well as your inbox, or moderator options.  

*Considering these options only seem to appear on Old Reddit, I am not sure how much longer they will be supported. Lets See*

# 3 Wrapping Up

Using RSS to browse reddit is the best of both worlds – I don't need to quit Reddit and leave those communities but I can still avoid getting sucked into the Enshittified Torment Nexus™️. 

Give it a shot. Your sanity might just thank you for it.

## 3.1 Example RSS links 

- `https://reddit.com/r/technology/.rss`
- `https://reddit.com/r/politics/controversial/.rss`
- `https://reddit.com/r/3Dprinting/top/.rss?limit=5`
