---
layout: page
title: Categories
permalink: /categories/
---

{% assign categories = "" | split: "" %}
{% for post in site.posts %}
  {% for category in post.categories %}
    {% assign categories = categories | push: category %}
  {% endfor %}
{% endfor %}
{% assign categories = categories | uniq | sort %}

{% for category in categories %}
  <h2>{{ category }}</h2>
  <ul>
  {% for post in site.posts %}
    {% if post.categories contains category %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
  </ul>
{% endfor %}
