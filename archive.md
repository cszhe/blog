---
layout: page
title: Archive
permalink: /archive/
---

{% for post in site.posts %}
  <div style="border-bottom:1px solid #eee;padding:1rem 0;">
    <a href="{{ post.url }}"><h3>{{ post.title }}</h3></a>
    <p style="color:#666;">{{ post.date | date: "%B %-d, %Y" }} {% if post.category %}<span style="margin-left:1rem;">in {{ post.category }}</span>{% endif %}</p>
  </div>
{% endfor %}
