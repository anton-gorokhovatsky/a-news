"use strict";

const [coverStory, ...otherStories] = stories;
const latestStories = otherStories.slice(0, 3);

document.querySelector("#cover").innerHTML = `
  <article>
    <a class="story-link feature" href="${articleUrl(coverStory)}" aria-labelledby="cover-title">
      <p class="feature__eyebrow">Выбор редакции</p>
      <figure class="feature__visual">
        <div class="image-frame feature__frame">
          ${imageMarkup(coverStory.image, "(min-width: 46em) 56vw, 92vw", true)}
        </div>
        <figcaption class="photo-credit">${html(coverStory.image.credit)}</figcaption>
      </figure>
      <div class="feature__copy">
        <h2 id="cover-title"><span>${html(coverStory.series)}</span>${html(coverStory.displayTitle)}</h2>
        <p class="feature__lead">${html(coverStory.lead)}</p>
        <span class="read-link" aria-hidden="true"><span class="read-link__label">Читать материал</span> <span>↗</span></span>
      </div>
    </a>
  </article>`;

document.querySelector("#latest-list").innerHTML = latestStories.map((story) => `
  <li><article>
    <a class="story-link latest-card" href="${articleUrl(story)}">
      <div class="image-frame latest-card__frame">
        ${imageMarkup(story.image, "(min-width: 46em) 30vw, (min-width: 21em) 30vw, 90vw")}
      </div>
      <div class="latest-card__meta">
        <span class="topic">${html(topicNames[story.topics[0]])}</span>
        ${timestamp(story, dateWithMonth)}
      </div>
      <h3>${html(story.title)}</h3>
    </a>
  </article></li>`).join("");

document.querySelector("#print-story").innerHTML = `
  <article>
    <a class="story-link print-story" href="${articleUrl(printStory)}" aria-labelledby="print-story-title">
      <figure>
        <div class="image-frame print-story__frame">
          ${imageMarkup(printStory.image, "(min-width: 46em) 49vw, 92vw")}
        </div>
        <figcaption class="photo-credit">${html(printStory.image.credit)}</figcaption>
      </figure>
      <div>
        <p class="print-story__kicker">${html(printStory.series)}</p>
        <h3 id="print-story-title">${html(printStory.displayTitle)}</h3>
        <p class="print-story__lead">${html(printStory.lead)}</p>
        <span class="read-link" aria-hidden="true"><span class="read-link__label">Читать интервью</span> <span>↗</span></span>
      </div>
    </a>
  </article>`;
