"use strict";

const material = stories.find((story) => story.slug === document.documentElement.dataset.material);
const materialCover = document.querySelector("#material-cover");
const contextLink = document.querySelector("#material-context-link");
const ending = new URLSearchParams(location.search).get("ending");
const topicAddress = new URL("topics/architecture/", siteRoot);
topicAddress.searchParams.set("from", material.slug);
const topicEndLink = document.querySelector("#material-topic-end");
topicEndLink.href = topicAddress.href;
const nextStory = ending === "photo" && stories.find(
  (story) => story.slug === material.continuation?.slug && story.photoStory?.frames.length,
);

document.querySelector("#material-heading").innerHTML = `
  <p class="story-meta material-meta">
    <span>${html(material.series)} · ${timestamp(material, dateWithMonth)}</span>
    <a class="section-link material-topic-link" href="${html(topicAddress.href)}">${html(topicNames.architecture)}</a>
  </p>
  <h1 id="material-title">${html(material.displayTitle ?? material.title)}</h1>
  <p class="reader-lead">${html(material.lead)}</p>`;

materialCover.innerHTML = `
  ${imageMarkup(material.image, "(min-width: 74em) 66rem, 90vw", true)}
  <figcaption class="photo-credit">${html(material.image.credit)}</figcaption>`;
materialCover.hidden = false;

const contextAddress = new URL(contextLink.href);
contextAddress.searchParams.set("article", material.slug);
if (nextStory) {
  contextAddress.searchParams.set("ending", ending);

  const nextAddress = photoStoryUrl(nextStory);
  nextAddress.searchParams.set("article", material.slug);
  nextAddress.searchParams.set("from", "continuation");
  nextAddress.searchParams.set("ending", ending);

  const { frames } = nextStory.photoStory;
  const frameLabel = { one: "кадр", few: "кадра", many: "кадров" };
  const frameCount = frames.length + " " + frameLabel[new Intl.PluralRules("ru").select(frames.length)];
  const continuation = document.querySelector("#material-next");
  continuation.innerHTML = `
    <a class="material-continuation__link" href="${nextAddress.href}"
      aria-labelledby="material-next-title" aria-describedby="material-next-format material-next-lead">
      <div>
        <p class="story-meta" id="material-next-format">Фотоистория · ${frameCount}</p>
        <h2 id="material-next-title"><span class="headline-wrap">${html(nextStory.displayTitle ?? nextStory.title)}</span></h2>
        <p id="material-next-lead">${html(material.continuation.lead)}</p>
      </div>
      <div class="image-frame material-continuation__image">
        ${imageMarkup({ ...frames[0].image, alt: "" }, "(min-width: 50em) min(35vw, 18rem), 90vw")}
      </div>
    </a>`;

  const related = document.querySelector("#material-related");
  const endLinks = document.querySelector("#material-end-links");
  endLinks.append(topicEndLink);
  endLinks.querySelector(".material-source a").classList.add("section-link");
  related.hidden = true;
  continuation.hidden = false;
}
contextLink.href = contextAddress.href;

markExternalLinks();
