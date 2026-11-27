"use strict";

const topic = document.documentElement.dataset.topic;
const source = new URLSearchParams(location.search).get("from");
const topicStories = chronologicalStories.filter(
  (story) => story.topics.includes(topic) && story.slug !== source,
);

document.querySelector("#topic-list").innerHTML = topicStories.map((story) => {
  const titleId = "topic-story-" + story.slug;
  return `
    <li><article>
      <a class="topic-link" href="${html(materialUrl(story))}" aria-labelledby="${html(titleId)}">
        <p class="story-meta">${timestamp(story, dateWithYear)}</p>
        <h2 id="${html(titleId)}"><span data-external-label>${html(story.displayTitle ?? story.title)}</span></h2>
        ${story.lead ? `<p class="story-lead">${html(story.lead)}</p>` : ""}
      </a>
    </article></li>`;
}).join("");
document.querySelector("#topic-empty").hidden = Boolean(topicStories.length);

markExternalLinks();
