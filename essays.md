---
layout: default
title: "Essays"
permalink: /essays/
---

<div class="essays">
  <div class="essays-warning">
    <p>This is the <strong>non-technical</strong> area of this website.</p>
    <p>There are no essays yet. If you'd like to see non-technical texts in this website, please send me an email at essays@lucasfcosta.com.</p>
    <p>At the moment, I just want to gauge how interested in this kind of content my readers are.</p>
  </div>

  <ul class="post-list">
    {% assign sortedEssays = site.essays | sort: 'date' | reverse %}
    {% for essay in sortedEssays %}
      <li class="post-item">

        <span class="post-date">
            {% assign d = essay.date | date: "%-d" %}
            {% case d %}{% when "1" or "21" or "31" %}{{ d }}st{% when "2" or "22" %}{{ d }}nd{% when "3" or "23" %}{{ d }}rd{% else %}{{ d }}th{% endcase %}
            of
            {{ essay.date | date: "%B" }},
            {{ essay.date | date: "%Y" }}
        </span>

        <h2 class="post-title">
          <a class="post-link" href="{{ essay.url | prepend: site.baseurl }}">{{ essay.title }}</a>
        </h2>

        <span class="post-author">
            {{ essay.author }} at {{ essay.place }}
        </span>
        <span class="post-flag">{{ essay.flag }}</span>
      </li>
    {% endfor %}
  </ul>
</div>
