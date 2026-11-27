"use strict";

const material = stories.find((story) => story.slug === document.documentElement.dataset.material);
const materialCover = document.querySelector("#material-cover");
const contextLink = document.querySelector("#material-context-link");

document.querySelector("#material-heading").innerHTML = `
  <p class="story-meta">${html(material.series)} · ${timestamp(material, dateWithMonth)}</p>
  <h1 id="material-title">${html(material.displayTitle ?? material.title)}</h1>
  <p class="reader-lead">${html(material.lead)}</p>`;

materialCover.innerHTML = `
  ${imageMarkup(material.image, "(min-width: 74em) 66rem, 90vw", true)}
  <figcaption class="photo-credit">${html(material.image.credit)}</figcaption>`;
materialCover.hidden = false;

const contextAddress = new URL(contextLink.href);
contextAddress.searchParams.set("article", material.slug);
contextLink.href = contextAddress.href;

markExternalLinks();
