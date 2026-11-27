"use strict";

const arrow = '<span class="story-arrow" aria-hidden="true">↗</span>';

document.querySelector("#cover").innerHTML = `
  <article>
    <a class="cover-link" href="${articleUrl(coverStory)}" aria-labelledby="cover-title">
      <figure>
        <div class="image-frame cover-photo">
          ${imageMarkup(coverStory.image, "(min-width: 50em) 47vw, calc(100vw - 40px)", true)}
        </div>
        <figcaption class="photo-credit">${html(coverStory.image.credit)}</figcaption>
      </figure>
      <p class="story-meta">${html(coverStory.series)} · ${timestamp(coverStory, dateWithMonth)}</p>
      <h2 id="cover-title"><span class="story-title">${html(coverStory.displayTitle)}</span>&nbsp;${arrow}</h2>
    </a>
    <p class="cover-lead">${html(coverStory.lead)}</p>
  </article>`;

document.querySelector("#latest-list").innerHTML = latestStories.map((story) => `
  <li><article>
    <p class="story-meta">${timestamp(story, dateWithMonth)} · ${html(topicNames[story.topics[0]])}</p>
    <h3><a href="${articleUrl(story)}"><span>${html(story.title)}</span>&nbsp;${arrow}</a></h3>
    <p class="story-lead">${html(story.lead)}</p>
  </article></li>`).join("");

document.querySelector("#print-story").innerHTML = `
  <article class="print-story">
    <figure>
      <div class="image-frame print-photo">
        ${imageMarkup(printStory.image, "(min-width: 50em) 47vw, calc(100vw - 40px)")}
      </div>
      <figcaption class="photo-credit">${html(printStory.image.credit)}</figcaption>
    </figure>
    <div class="print-story__copy">
      <p class="story-meta">${html(printStory.series)}</p>
      <h3><a href="${articleUrl(printStory)}"><span>${html(printStory.displayTitle)}</span>&nbsp;${arrow}</a></h3>
      <p class="print-lead">${html(printStory.lead)}</p>
    </div>
  </article>`;
