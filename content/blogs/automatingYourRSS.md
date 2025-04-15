---
title: Automating Your RSS Feed with 11ty
date: 2025-03-17
description: Here is a quick write-up on how to automate a little more of your personal website. 
layout: blogpost.liquid
---


# 1 Background
A while back, I wrote a quick explainer on how to set up your own RSS feed for your site. It was pretty straightforward, and expalined how to hard-code it. 

Then I got lazy, updating the `feed.xml`  file every time I wrote a blog post was becoming a pain. 

To resolve this, I opted to use 11ty to auto-update the RSS feed every time I added a new blog-post. This very post will get auto-updated to the RSS feed. I already used 11ty for automating other parts of my site, so this was just a natural extension. 


# 2 Setting Up Your Environment
## 2.1 Setting Up Eleventy
Go follow [PetraPixels Tutorial](https://petrapixel.neocities.org/coding/eleventy-tutorial) she explains it better than me. From here I will assume you have it set-up somewhat like hers? Deal? Deal!

## 2.2 Your Folder Structure
I am assuming that all your blogposts are in their own sub-directory. So if your folder structure looks like this

------------------------------------------------------------------------

```
>Project/
    > Content/
        > Blogs/
         	> Blogpost1.html 
		> Everything Else
	> Public
		> All the files that 11ty generates
```

------------------------------------------------------------------------

# 3 Creating Your RSS Template

Okay, you did everything and followed Petra's advice? Okay good. Now lets add the required properties to all our blogposts. For every post lets upate the yaml:

------------------------------------------------------------------------

```yaml
---
title: BLOG_TITLE
date: DATE_IN_THE_FORM_YYYY-MM-DD
description: DESCRIPTION
layout: YOUR_TEMPLATE_HERE
---

<Put the actual blog here>

```

------------------------------------------------------------------------

For example, my last blogpost has this in the front-matter.

------------------------------------------------------------------------

```yaml
---
title: How I do my Research (As a PhD Student)
date: 2025-03-16
description: Yet another PhD student explains their personal knowledge management system.
layout: blogpost.liquid
---
```

------------------------------------------------------------------------

# 4 Update your .eleventy.js File

We are adding two more functions to the `.eleventy.js` file. The first one `addCollection` just looks for the folder of blog posts, and grabs all the `html`  file (or `md` files). This is used by the template later. The second just formats the dates nicely. 


------------------------------------------------------------------------

```js
module.exports = function (eleventyConfig) {
  // ... existing code ...
  
  // Add a collection for blog posts
  eleventyConfig.addCollection("blogPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("path/to/your/blog/posts/*.{html,md}").sort((a, b) => {
      return b.date - a.date; // Sort in reverse chronological order (newest first)
    });
  });
  
  // Add date filter for RSS
  eleventyConfig.addFilter("dateToRfc822", function(date) {
    return new Date(date).toUTCString();
  });
  
  // ... existing code ...
};
```

------------------------------------------------------------------------

# 5 Update the Feed File

Final step! Lets fix up your feed. Create or edit your rss feed file. Mine is `feed.xml`

------------------------------------------------------------------------

{% raw %}
```html
---
permalink: /feed.xml
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Your Feed Title</title>
  <description>DescriptionOfYourBlog</description>
  <link>https://YOURSITEGOESHERE.neocities.org</link>
  <lastBuildDate>{{ collections.blogPosts[0].date | date: "%a, %d %b %Y %H:%M:%S %z" }}</lastBuildDate>
  <ttl>1440</ttl>

  {% for post in collections.blogPosts %}
  <item>
    <title>{{ post.data.title }}</title>
    <description>{{ post.data.description }}</description>
    <link>https://YOURSITEGOESHERE.neocities.org{{ post.url }}</link>
    <pubDate>{{ post.date | date: "%a, %d %b %Y %H:%M:%S %z" }}</pubDate>
  </item>
  {% endfor %}
</channel>
</rss>
```
{% endraw %}

------------------------------------------------------------------------

What is going on here? The important bit is in-between  `{% for post in collections.blogPosts %}` and `{% endfor %}`. This section tells 11ty to go though all the files in the  blogs directory, and generates an RSS entry from all those properties  we went through and added earlier. 

# 6 Extension: Automating other parts of your page!

There is no reason to limit ourselves to automating the RSS page. 

## 6.1 Every Blogpost in bullet points

Here is a html snipped which will tell 11ty to put every blog post in the folder in dot-points. Use your CSS skills to snazzy it up using the `blog-posts-container` class. 

------------------------------------------------------------------------

{% raw %}
```html
<h2>All My Posts</h2>
<div class="blog-posts-container">
	<ul>
	{% for post in collections.blogPosts %}
		<li>
			<a href="{{ post.url }}">
				{{ post.date | date: "%Y-%m-%d" }}: {{ post.data.title }}
			</a>
		</li>
	{% endfor %}
	</ul>
</div>
```
{% endraw %}

------------------------------------------------------------------------


## 6.2 Most Recent Blogpost

Okay, what if we want to put only the most recent blogpost on our home page. Try out this one

------------------------------------------------------------------------

{% raw %}
```html
<h2>Latest Blog Post</h2>
<div class="blog-posts-container">
	<ul>
	{% assign latest_post = collections.blogPosts | first %}
	{% if latest_post %}
		<li>
			<a href="{{ latest_post.url }}">
			{{ latest_post.date | date: "%Y-%m-%d" }}: {{ latest_post.data.title }}
			</a>
		</li>
		{% else %}
		<li>No blog posts yet!</li>
	{% endif %}
	</ul>
</div>
```
{% endraw %}

------------------------------------------------------------------------