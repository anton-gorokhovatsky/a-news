"use strict";

const externalLinkMark = `<svg class="external-link-mark" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
  <path class="external-link-outline" d="M2.5 9.5 9.5 2.5m-5 0h5v5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="external-link-serif" d="M2.11 9.95 1.91 9.73 8.03 3.51C6.85 3.53 5.41 3.66 4.05 3.89V3.17C6.16 3.03 8.55 2.65 10.1 1.9C9.34 3.6 8.97 5.92 8.87 8.01H8.16C8.39 6.7 8.51 5.24 8.53 4.04Z" fill="currentColor" display="none"/>
</svg>`;

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
      <h2 id="cover-title"><span class="story-title" data-external-label>${html(coverStory.displayTitle)}</span></h2>
    </a>
    <p class="cover-lead">${html(coverStory.lead)}</p>
  </article>`;

document.querySelector("#latest-list").innerHTML = latestStories.map((story) => `
  <li><article>
    <p class="story-meta">${timestamp(story, dateWithMonth)} · ${html(topicNames[story.topics[0]])}</p>
    <h3><a href="${articleUrl(story)}"><span data-external-label>${html(story.title)}</span></a></h3>
    <p class="story-lead">${html(story.lead)}</p>
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

// A–House keeps the marker with the last glyph, leaving the rest of the label free to wrap.
for (const label of document.querySelectorAll("[data-external-label]")) {
  const text = label.textContent.trimEnd();
  const lastGlyph = /[^\s\p{M}]\p{M}*$/u.exec(text);
  if (!lastGlyph) continue;

  const ending = document.createElement("span");
  ending.className = "external-link-ending";
  ending.textContent = lastGlyph[0];
  ending.insertAdjacentHTML("beforeend", externalLinkMark);
  label.replaceChildren(text.slice(0, lastGlyph.index), ending);
}
