---
layout: archive
title: "Portfolio（日本語）"
permalink: /ja/portfolio/
author_profile: false
show_title: false
---

{% include base_path %}

{% assign portfolio_sorted = site.portfolio | sort: "order" %}

<h2 class="archive__subtitle">翻訳</h2>
{% for post in portfolio_sorted %}
  {% if post.medium == "translation" %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}

<h2 class="archive__subtitle">プレプリント</h2>
{% for post in portfolio_sorted %}
  {% if post.medium == "preprint" %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}

<h2 class="archive__subtitle">学術誌記事</h2>
{% for post in portfolio_sorted %}
  {% if post.medium == "journal" %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
