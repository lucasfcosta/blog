---
layout: reveries
title: Reveries
permalink: /reveries/
---

<div class="reveries">
  <ul class="post-list">
    {% assign sortedReveries = site.reveries | sort: 'date' | reverse %}
    {% for reverie in sortedReveries %}
      <li class="post-item">

        <span class="post-date">
            {% assign d = reverie.date | date: "%-d" %}
            {% case d %}{% when "1" or "21" or "31" %}{{ d }}st{% when "2" or "22" %}{{ d }}nd{% when "3" or "23" %}{{ d }}rd{% else %}{{ d }}th{% endcase %}
            of
            {{ reverie.date | date: "%B" }},
            {{ reverie.date | date: "%Y" }}
        </span>

        <h2 class="post-title">
          <a class="post-link" href="{{ reverie.url | prepend: site.baseurl }}">{{ reverie.title }}</a>
        </h2>

        <span class="post-author">
            {{ reverie.author }} at {{ reverie.place }}
        </span>
        <span class="post-flag">{{ reverie.flag }}</span>
      </li>
    {% endfor %}
  </ul>
</div>
