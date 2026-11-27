"use strict";

const photoArticle = stories.find((story) => story.slug === document.documentElement.dataset.photoStory);
const essay = photoArticle.photoStory;
const frames = document.querySelector("#photo-frames");
const controls = document.querySelector("#photo-controls");
const previous = document.querySelector("#photo-previous");
const next = document.querySelector("#photo-next");
const position = document.querySelector("#photo-position");
const readerBack = document.querySelector("#reader-back");

document.title = photoArticle.displayTitle + " — A–News";
document.querySelector("#reader-title").textContent = photoArticle.displayTitle;
document.querySelector("#reader-lead").textContent = photoArticle.lead;

const sourceParams = new URLSearchParams(location.search);
const entryMaterial = stories.find((story) => story.materialPath && story.slug === sourceParams.get("article"));
if (sourceParams.get("from") === "archive") {
  const archiveAddress = new URL(siteRoot);
  const search = (sourceParams.get("q") || "").slice(0, 120);
  const topic = sourceParams.get("topic");
  if (search) archiveAddress.searchParams.set("q", search);
  if (topic && topic !== "all" && Object.hasOwn(topicNames, topic)) archiveAddress.searchParams.set("topic", topic);
  archiveAddress.hash = "archive";
  readerBack.href = archiveAddress.href;
  readerBack.textContent = "К архиву";
} else if (entryMaterial) {
  const materialAddress = new URL(materialUrl(entryMaterial));
  materialAddress.hash = "material-context";
  readerBack.href = materialAddress.href;
  readerBack.textContent = "К статье";
}

frames.innerHTML = essay.frames.map((frame, index) => `
  <figure class="photo-frame"${index ? " hidden" : ""}>
    <div class="photo-frame__image">
      ${imageMarkup(frame.image, "(min-width: 60em) min(55vw, 54rem), 90vw", !index)}
    </div>
    <figcaption>
      <h2>${html(frame.title)}</h2>
      <p>${html(frame.text)}</p>
      <p class="photo-credit">${html(essay.credit)}</p>
    </figcaption>
  </figure>`).join("");

document.querySelector("#reader-tail").innerHTML = `
  <a class="section-link" href="${articleUrl(photoArticle)}"><span data-external-label>Читать интервью с Сашей Ким</span></a>`;
markExternalLinks();

let currentFrame = 0;
const items = [...frames.children];

function showFrame(index) {
  if (index < 0 || index >= items.length) return;

  items[currentFrame].hidden = true;
  currentFrame = index;
  items[currentFrame].hidden = false;
  position.textContent = "Кадр " + (currentFrame + 1) + " из " + items.length;
  previous.setAttribute("aria-disabled", String(currentFrame === 0));
  next.setAttribute("aria-disabled", String(currentFrame === items.length - 1));
}

previous.addEventListener("click", () => showFrame(currentFrame - 1));
next.addEventListener("click", () => showFrame(currentFrame + 1));
controls.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showFrame(currentFrame + (event.key === "ArrowLeft" ? -1 : 1));
  }
});
showFrame(0);
controls.hidden = false;
document.querySelector("#photo-story").hidden = false;
