---
layout: default
title: Talks
permalink: /talks/
---

<div class="blog">
  <ul class="post-list">
    {% assign sortedTalks = site.talks | sort: 'date' | reverse %}
    {% for talk in sortedTalks %}
      <li class="post-item">

        <span class="post-date">
            {% assign d = talk.date | date: "%-d" %}
            {% case d %}{% when "1" or "21" or "31" %}{{ d }}st{% when "2" or "22" %}{{ d }}nd{% when "3" or "23" %}{{ d }}rd{% else %}{{ d }}th{% endcase %}
            of
            {{ talk.date | date: "%B" }},
            {{ talk.date | date: "%Y" }}
        </span>

        <h2 class="post-title">
          <a class="post-link" href="{{ talk.url | prepend: site.baseurl }}">{{ talk.title }}</a>
        </h2>

        <span class="post-author">
            {{ talk.author }} at {{ talk.event }}
        </span>
        <span class="post-flag">{{ talk.flag }}</span>
      </li>
    {% endfor %}
  </ul>
</div>
