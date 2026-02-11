---
layout: page
title: Tags
permalink: /tags/
---

{% assign tags = "" | split: "" %}
{% for post in site.posts %}
  {% for tag in post.tags %}
    {% assign tags = tags | push: tag %}
  {% endfor %}
{% endfor %}
{% assign tags = tags | uniq | sort %}

{% for tag in tags %}
  <h2>{{ tag }}</h2>
  <ul>
  {% for post in site.posts %}
    {% if post.tags contains tag %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
  </ul>
{% endfor %}
