---
title: RSS
date: 2024-08-09
description: A short explainer on how to set-up your very own RSS feed
layout: blogpost.liquid
---
# 1 What Is RSS and why might your readers want it?

The acronym for RSS is \"Really Simple Syndication\". Essentially, it is
a way better method of alerting your readers to your new blog posts,
without requiring an email address.

## 1.1 How it works

Your users will have an RSS Reader. This program keeps a list of
webpages to check every refresh period, and presents all the new
articles to the user.

## 1.2 Why not use email?

-   \"I wish I had more emails in my inbox \"
-   \"I love signing up for things and giving my email to strangers\"
-   \"I\'ve never had my email address leaked in a data breach\"

RSS beats email because it makes more sense. The user lets YOU know when
they want to read, not the other way around. You don\'t need a long list
of email addresses, and quit frankly you don\'t want one.

# 2 How to set it up:

All you need to setup an RSS feed is:

1.  Create a feed page for your website
2.  Provide a link to it
3.  Update the feed every time you add a new blogpost

The users RSS reader handles the rest

## 2.1 Creating the Feed Page:

First create your file. The name doesn\'t matter too much, but should
end in `.xml` since that is the file-type. Mine is simply called
`feed.xml`.

The structure of you feed should look like this, with your own info
replacing the bits I have in {brackets}

------------------------------------------------------------------------

``` {.sourceCode .xml}
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>{The Name of your Blog}</title>
  <description>{A short description of your blog}</description>
  <link>{Link to your homepage}</link>
  <lastBuildDate>
    {Date and time in RFC 2822 format}
  </lastBuildDate>
  <ttl>{Number of minutes between refreshes}</ttl>




</channel>
</rss>
```

------------------------------------------------------------------------

RFC 2822 Timestamps look like this: `Thu, 08 Aug 2024 23:52:25 +0000`
And can easily be generated from this website:
https://timestampgenerator.com/

The `ttl` field instructs how often an RSS reader should wait between
refreshing the page. E.g. if you set it to 60, each RSS reader will
refresh your page once per hour. I rarely update my blog. So I have it
set to 1440 so it updates once a day, so that my web page doesn\'t get
hammered with too much traffic.

## 2.2 Adding Articles to the feed

The block above is for an empty feed. We will want to add articles to
it!

The template for each item:

------------------------------------------------------------------------

``` {.sourceCode .xml}
  <item>
    <title>{Article Title}</title>
    <description>
      {A short description or preview of the article}
    </description>
    <link>{Link to the the web page of the article}</link>
    <pubDate>
      {Time and date in RFC 2822 format}
    </pubDate>
  </item>
```

------------------------------------------------------------------------

Each item goes in between the `ttl` tag and the `<\channel>` tag. Every
time you add an article, don\'t forget to update the `<lastBuildDate>`
tag.

## 2.3 Putting it all together:

In the end your RSS feed should look like this:

------------------------------------------------------------------------

``` {.sourceCode .xml}
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>{The Name of your Blog}</title>
  <description>{A short description of your blog}</description>
  <link>{Link to your homepage}</link>
  <lastBuildDate>
    {Date and time in RFC 2822 format}
  </lastBuildDate>
  <ttl>{Number of minutes between refreshes}</ttl>

  <!-- Above this is the header, below are each article -->

 <item>
    <title>{Article One}</title>
    <description>
      {A short description or preview of the article}
    </description>
    <link>{Link to the the web page of article 1}</link>
    <pubDate>
      {Time and date in RFC 2822 format}
    </pubDate>
  </item>

 <item>
    <title>{Article 2}</title>
    <description>
      {A short description or preview of the article}
    </description>
    <link>{Link to the the web page of article 2}</link>
    <pubDate>
      {Time and date in RFC 2822 format}
    </pubDate>
  </item>


<!-- End of the article list -->

</channel>
</rss>
```

------------------------------------------------------------------------

Check out my RSS for a full example. of what the text looks like.

## 2.4 Linking the to the RSS Feed

Now that you have created the feed, you need a way to drive users to
subscribe. All the user needs is the URL of the page you created.

It is customary to use the RSS logo you can see at the bottom of my page
to link it it. If you go ahead and click on it, you will see it brings
you to an empty looking page. Thats because the page isn\'t for you. It
is for the programs. So you can go ahead and copy and paste that logo
into your RSS Reader to subscribe to me 😉.

# 3 Wrapping Up

Thats all you need! Don\'t forget to add a new item to your feed when
you update your blog! No other maintenance needed. If anyone out there
makes an old school 88x32 button to link to their RSS feed let me know!
I really want one, but not enough to make it myself 😜


![RSS Feed](/Assets/RSS_Logo.png)
