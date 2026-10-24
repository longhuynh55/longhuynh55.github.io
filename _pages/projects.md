---
layout: page
title: projects
permalink: /projects/
description: Selected work across forecasting research, analytics engineering and product building.
nav: true
nav_order: 2
display_categories: [research, data science, full-stack]
category_info:
  research:
    title: Research
    blurb: Probabilistic forecasting for financial time series — peer-reviewed work.
  data science:
    title: Data Science & Analytics Engineering
    blurb: Pipelines, KPI layers and quantitative models built end to end.
  full-stack:
    title: Full-Stack Products
    blurb: Data-heavy web applications, from backend logic to the interface.
horizontal: false
---

<!-- pages/projects.md -->
<style>
  .projects h2.category {
    color: var(--global-text-color);
    text-align: left;
    font-size: 1.6rem;
    font-weight: 500;
  }
</style>

<div class="projects">
{% for category in page.display_categories %}
  {% assign info = page.category_info[category] %}
  <a id="{{ category | slugify }}" href=".#{{ category | slugify }}">
    <h2 class="category">{{ info.title | default: category }}</h2>
  </a>
  {% if info.blurb %}<p class="text-muted mb-4">{{ info.blurb }}</p>{% endif %}
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <div class="row row-cols-1 row-cols-md-2 mb-4">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endfor %}
</div>
