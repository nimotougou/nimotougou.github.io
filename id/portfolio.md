---
layout: archive
title: "Portfolio (ID)"
permalink: /id/portfolio/
author_profile: false
show_title: false
---

{% include base_path %}

{% assign portfolio_sorted = site.portfolio | sort: "order" %}

<h2 class="archive__subtitle">Terjemahan</h2>
{% for post in portfolio_sorted %}
  {% if post.medium == "translation" %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}

<h2 class="archive__subtitle">Preprint</h2>
{% for post in portfolio_sorted %}
  {% if post.medium == "preprint" %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}

<h2 class="archive__subtitle">Artikel Jurnal</h2>
{% for post in portfolio_sorted %}
  {% if post.medium == "journal" %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
