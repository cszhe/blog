---
layout: default
title: Zongjian's blog
---

Welcome to my blog! I write about technology, life in New Zealand, and my son's growth.

## Latest Posts

{% for post in site.posts limit:10 %}
  - [{{ post.title }}]({{ post.url }})
{% endfor %}

You can edit this page to customize your homepage.
