---
layout: default
title: Zongjian's blog
---

Welcome to my blog! I write about technology, life in New Zealand, and my son's growth.

**Total posts: {{ site.posts | size }}**

## Latest Posts

{% for post in site.posts limit:10 %}
  <div style="border-bottom:1px solid #eee;padding:1rem 0;">
    <a href="{{ post.url }}"><h3>{{ post.title }}</h3></a>
    <p style="color:#666;">{{ post.date | date: "%B %-d, %Y" }} {% if post.category %}<span style="margin-left:1rem;">in {{ post.category }}</span>{% endif %}</p>
  </div>
{% endfor %}

[View all posts in the archive →](/archive/)

You can edit this page to customize your homepage.
