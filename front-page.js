"use strict";

const edition = {
  cover: "glazami-arhitektora-muzej-guggenhajma-v-bilbao",
  photoStory: "natyurmort-portret-pejzazh-arhitektura-novoj-vystavki-v-ges-2",
};

const coverCandidates = chronologicalStories.filter((story) => story.image || story.photoStory);
const coverStory = coverCandidates.find((story) => story.slug === edition.cover) ?? coverCandidates[0];
const coverImage = coverStory.image ?? coverStory.photoStory.frames[0].image;
const coverCredit = coverImage.credit ?? coverStory.photoStory?.credit;
const latestStories = chronologicalStories.filter((story) => story !== coverStory).slice(0, 3);

document.querySelector("#cover").innerHTML = `
  <article>
    <a class="cover-link" href="${articleUrl(coverStory)}" aria-labelledby="cover-title">
      <figure>
        <div class="image-frame cover-photo">
          ${imageMarkup(coverImage, "(min-width: 68em) min(47vw, 44rem), 90vw", true)}
        </div>
        ${coverCredit ? `<figcaption class="photo-credit">${html(coverCredit)}</figcaption>` : ""}
      </figure>
      <p class="story-meta"><strong>Выбор редакции</strong> · ${html(coverStory.series ?? topicNames[coverStory.topics[0]])} · ${timestamp(coverStory, dateWithMonth)}</p>
      <h2 id="cover-title"><span class="story-title" data-external-label>${html(coverStory.displayTitle ?? coverStory.title)}</span></h2>
    </a>
    ${coverStory.lead ? `<p class="cover-lead">${html(coverStory.lead)}</p>` : ""}
  </article>`;

document.querySelector("#latest-list").innerHTML = latestStories.map((story) => `
  <li><article>
    <p class="story-meta">${timestamp(story, dateWithMonth)} · ${html(topicNames[story.topics[0]])}</p>
    <h3><a href="${articleUrl(story)}"><span data-external-label>${html(story.title)}</span></a></h3>
    ${story.lead ? `<p class="story-lead">${html(story.lead)}</p>` : ""}
  </article></li>`).join("");

document.querySelector("#print-story").innerHTML = `
  <article class="print-story">
    <figure>
      <div class="image-frame print-photo">
        ${imageMarkup(printStory.image, "(min-width: 50em) min(53vw, 50rem), calc(100vw - 40px)")}
      </div>
      <figcaption class="photo-credit">${html(printStory.image.credit)}</figcaption>
    </figure>
    <div class="print-story__copy">
      <p class="story-meta">${html(printStory.series)}</p>
      <h3><a href="${articleUrl(printStory)}"><span data-external-label>${html(printStory.displayTitle)}</span></a></h3>
      <p class="print-lead">${html(printStory.lead)}</p>
    </div>
  </article>`;

const photoFeature = stories.find((story) => story.slug === edition.photoStory && story.photoStory);
if (photoFeature) {
  const feature = document.querySelector("#photo-feature");
  const [firstFrame] = photoFeature.photoStory.frames;
  feature.innerHTML = `
    <a class="photo-teaser" href="${photoStoryUrl(photoFeature).href}">
      <div class="photo-teaser__image">
        ${imageMarkup({ ...firstFrame.image, alt: "" }, "min(7rem, 25vw)")}
      </div>
      <div>
        <p class="story-meta">Фотоистория</p>
        <h3>${html(photoFeature.displayTitle)}</h3>
      </div>
    </a>`;
  feature.hidden = false;
}

markExternalLinks();
