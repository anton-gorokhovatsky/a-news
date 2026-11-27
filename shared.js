"use strict";

const stories = [
  {
    "slug": "glazami-arhitektora-muzej-guggenhajma-v-bilbao",
    "title": "Глазами архитектора: музей Гуггенхайма в Бильбао",
    "displayTitle": "Музей Гуггенхайма в Бильбао",
    "series": "Глазами архитектора",
    "date": "2026-11-27",
    "topics": [
      "architecture",
      "culture"
    ],
    "lead": "Сооснователи бюро .ket Тигран Даниелян и Карен Билян — о форме, свете и пространстве здания Фрэнка Гери.",
    "image": {
      "key": "bilbao",
      "sizes": [
        640,
        1400
      ],
      "height": 700,
      "alt": "Титановые объёмы музея Гуггенхайма в Бильбао",
      "credit": "Фото из личного архива бюро .ket"
    }
  },
  {
    "slug": "proekt-archetype-stal-finalistom-mezhdunarodnogo-konkursa-v-argentine",
    "title": "Проект Arch(e)type стал финалистом конкурса в Аргентине",
    "date": "2026-11-26",
    "topics": [
      "architecture"
    ],
    "keywords": "Revealing Quilmes Ruinas de Quilmes Кильмес Тукуман",
    "image": {
      "key": "archetype",
      "sizes": [
        400,
        900
      ],
      "height": 502,
      "alt": "Визуализация комплекса Revealing Quilmes в горном ландшафте"
    },
    "lead": "Архитекторы предложили визит-центр, рынок и прогулочные маршруты для археологического комплекса Кильмес."
  },
  {
    "slug": "konstruktor-sveta-modulnaya-linejka-i-avtorskij-dizajn-lyumarh",
    "title": "Конструктор света: модульная линейка и авторский дизайн «Люмарх»",
    "date": "2026-11-25",
    "topics": [
      "design"
    ],
    "keywords": "светильники освещение",
    "image": {
      "key": "lyumarkh",
      "sizes": [
        400,
        900
      ],
      "height": 450,
      "alt": "Три модели светильников «Люмарх» с металлическими основаниями"
    },
    "lead": "Бренд запустил модульную систему светильников, разработанную вместе с архитекторами и дизайнерами."
  },
  {
    "slug": "liaigre-predstavil-tri-predmeta-interera-obrativshis-k-svoemu-naslediyu",
    "title": "Liaigre представил три предмета интерьера, обратившись к своему наследию",
    "date": "2026-11-24",
    "topics": [
      "design"
    ],
    "keywords": "интерьер диван Constantin лампа Frank Soliste",
    "image": {
      "key": "liaigre",
      "sizes": [
        400,
        900
      ],
      "height": 477,
      "alt": "Диван, торшеры и большая картина в интерьере Liaigre"
    },
    "lead": "Парижский дом представил диван Constantin и два светильника — Frank и Soliste."
  },
  {
    "slug": "natyurmort-portret-pejzazh-arhitektura-novoj-vystavki-v-ges-2",
    "title": "«Натюрморт, портрет, пейзаж»: архитектура новой выставки в «ГЭС-2»",
    "date": "2026-10-19",
    "topics": [
      "culture",
      "architecture"
    ],
    "keywords": "Саша Ким экспозиция Дом культуры"
  },
  {
    "slug": "aeroport-v-orenburge-ot-byuro-kosmos",
    "title": "Аэропорт в Оренбурге от бюро КОСМОС",
    "date": "2026-10-07",
    "topics": [
      "architecture"
    ],
    "keywords": "Kosmos терминал оренбургский платок"
  },
  {
    "slug": "a-interview-aleksej-molchanov",
    "title": "A-Interview: Алексей Молчанов",
    "displayTitle": "Алексей Молчанов",
    "series": "Из газеты A–Sport № 4",
    "date": "2026-09-09",
    "topics": [
      "sport"
    ],
    "lead": "Чемпион мира по фридайвингу — о первых погружениях, занятиях скрипкой и внимании под водой.",
    "image": {
      "key": "molchanov",
      "sizes": [
        640,
        1280
      ],
      "height": 854,
      "alt": "Алексей Молчанов во время погружения",
      "credit": "Фото из личного архива Алексея Молчанова"
    }
  },
  {
    "slug": "a-talks-alena-kulikova-vanya-brovchuk-studiya-a-v",
    "title": "A-Talks: Интервью с основателями студии A + V",
    "date": "2025-06-25",
    "topics": [
      "design"
    ],
    "keywords": "Алёна Куликова Ваня Бровчук предметный дизайн"
  },
  {
    "slug": "pavilon-permanently-temporary-ot-byuro-kosmos-i-parabase",
    "title": "Павильон «Permanently Temporary» от бюро КОСМОС и PARABASE",
    "date": "2025-02-14",
    "topics": [
      "architecture"
    ],
    "keywords": "Kosmos Барселона повторное использование"
  }
];

const journalOrigin = "https://news.ahouseproject.com/";
const topicNames = {
  all: "Все",
  architecture: "Архитектура",
  design: "Дизайн",
  culture: "Культура",
  sport: "Спорт",
};
const dateWithMonth = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});
const dateWithYear = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});
const escapeCharacters = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function html(text) {
  return text.replace(/[&<>"']/g, (character) => escapeCharacters[character]);
}

function articleUrl(story) {
  return new URL(story.slug + "/", journalOrigin).href;
}

function timestamp(story, formatter) {
  const formatted = formatter.format(new Date(story.date)).replaceAll(" ", "\u00A0");
  return `<time datetime="${story.date}">${formatted}</time>`;
}

const photoDirectory = new URL("./assets/", document.currentScript.src);

function imageMarkup(image, sizes, priority = false) {
  const [small, large] = image.sizes;
  const asset = (width) => new URL(image.key + "-" + width + ".jpg", photoDirectory).href;
  return `<img src="${asset(small)}" srcset="${asset(small)} ${small}w, ${asset(large)} ${large}w"
    sizes="${sizes}" width="${large}" height="${image.height}"
    alt="${html(image.alt)}" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

const [coverStory, ...otherStories] = stories;
const latestStories = otherStories.slice(0, 3);
const printStory = stories.find((story) => story.image?.key === "molchanov");

const archive = document.querySelector("#archive-form");
const query = document.querySelector("#archive-search");
const clearQuery = document.querySelector("#clear-query");
const topics = document.querySelector("#archive-topics");
const results = document.querySelector("#archive-list");
const empty = document.querySelector("#empty-results");
const status = document.querySelector("#results-status");

topics.insertAdjacentHTML("beforeend", Object.entries(topicNames).map(([key, label]) => {
  const id = "topic-" + key;
  return `
    <input class="sr-only" type="radio" name="topic" id="${id}" value="${key}">
    <label for="${id}">${html(label)}</label>`;
}).join(""));

function normalize(text) {
  return text.normalize("NFKC")
    .toLocaleLowerCase("ru")
    .replaceAll("ё", "е")
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
  const matches = stories.filter((story) => {
    if (topic && !story.topics.includes(topic)) return false;
    if (!terms.length) return true;

    const content = normalize([
      story.title, story.lead, story.keywords, story.series,
      ...story.topics.map((key) => topicNames[key]),
    ].filter(Boolean).join(" "));
    return terms.every((word) => content.includes(word));
  });

  results.innerHTML = matches.map((story) => `
    <li>
      <a class="story-link archive-entry" href="${articleUrl(story)}">
        <span class="archive-entry__title">${html(story.title)}</span>
        <span class="archive-entry__date">${timestamp(story, dateWithYear)}</span>
      </a>
    </li>`).join("");
  empty.hidden = Boolean(matches.length);
  clearQuery.hidden = query.value === "";
  status.textContent = matches.length ? "Материалов в выдаче — " + matches.length : empty.textContent;
  if (updateAddress) writeArchiveAddress(search, topic);
}

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
