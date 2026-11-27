"use strict";

const archive = document.querySelector("#archive-form");
const query = document.querySelector("#archive-search");
const clearQuery = document.querySelector("#clear-query");
const topics = document.querySelector("#archive-topics");
const results = document.querySelector("#archive-list");
const empty = document.querySelector("#empty-results");
const status = document.querySelector("#results-status");
const clearTopic = document.querySelector("#clear-topic");
const emptyMessage = empty.querySelector("p") || empty;
const emptyDefault = emptyMessage.textContent;

topics.insertAdjacentHTML("beforeend", Object.entries(topicNames).map(([key, name]) => `
<input class="sr-only" type="radio" name="topic" id="topic-${key}" value="${key}">
<label for="topic-${key}">${html(name)}</label>`).join(""));

function normalize(text) {
  return text.normalize("NFKC")
    .toLocaleLowerCase("ru")
    .replaceAll("ё", "е")
    .replaceAll("\u00ad", "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function readArchiveAddress() {
  const params = new URLSearchParams(location.search);
  query.value = (params.get("q") || "").slice(0, query.maxLength);
  const selected = params.get("topic");
  archive.elements.topic.value = Object.hasOwn(topicNames, selected) ? selected : "all";
}

function writeArchiveAddress(search, topic) {
  if (location.protocol === "file:") return;

  const address = new URL(location.href);
  for (const [name, value] of [["q", search], ["topic", topic]]) {
    if (value) address.searchParams.set(name, value);
    else address.searchParams.delete(name);
  }
  history.replaceState(null, "", address);
}

function showResults(updateAddress = false) {
  const search = query.value.trim();
  const terms = normalize(search).split(" ").filter(Boolean);
  const selected = archive.elements.topic.value;
  const topic = selected === "all" ? "" : selected;
  const textMatches = chronologicalStories.filter((story) => {
    if (!terms.length) return true;

    const content = normalize([
      story.title, story.displayTitle, story.lead, story.keywords, story.series,
      ...story.topics.map((key) => topicNames[key]),
    ].filter(Boolean).join(" "));
    return terms.every((word) => content.includes(word));
  });

  const matches = topic ? textMatches.filter((story) => story.topics.includes(topic)) : textMatches;
  results.innerHTML = matches.map((story) => {
    let formatLink = "";
    if (story.photoStory && results.hasAttribute("data-photo-stories")) {
      const format = photoStoryUrl(story);
      format.searchParams.set("from", "archive");
      if (search) format.searchParams.set("q", search);
      if (topic) format.searchParams.set("topic", topic);
      formatLink = `<a class="archive-format-link" href="${html(format.href)}">Фотоистория<span class="sr-only"> «${html(story.displayTitle)}»</span></a>`;
    }
    return `
      <li>
        <a class="story-link archive-entry" href="${articleUrl(story)}">
          <span class="archive-entry__title">${html(story.title)}</span>
          <span class="archive-entry__date">${timestamp(story, dateWithYear)}</span>
        </a>
        ${formatLink}
      </li>`;
  }).join("");

  const hasMatchesOutsideTopic = Boolean(topic && textMatches.length && !matches.length);
  emptyMessage.textContent = clearTopic && hasMatchesOutsideTopic
    ? "По этому запросу есть материалы в других рубриках."
    : emptyDefault;
  if (clearTopic) clearTopic.hidden = !hasMatchesOutsideTopic;
  empty.hidden = Boolean(matches.length);
  clearQuery.hidden = query.value === "";
  status.textContent = matches.length ? "Материалов в выдаче — " + matches.length : emptyMessage.textContent;
  if (updateAddress) writeArchiveAddress(search, topic);
}

clearTopic?.addEventListener("click", () => {
  archive.elements.topic.value = "all";
  archive.querySelector("#topic-all").focus({ preventScroll: true });
  showResults(true);
});
query.addEventListener("input", () => showResults(true));
topics.addEventListener("change", () => showResults(true));
clearQuery.addEventListener("click", () => {
  query.value = "";
  query.focus({ preventScroll: true });
  showResults(true);
});
archive.addEventListener("submit", (event) => {
  event.preventDefault();
  showResults(true);
});
document.querySelector(".search-jump").addEventListener("click", () => {
  query.focus({ preventScroll: true });
});
window.addEventListener("popstate", () => {
  readArchiveAddress();
  showResults();
});

readArchiveAddress();
showResults();
