// Shared filtering engine for the Posts page.
//
// Text search (post-search.js) and tag chips (post-tags.js) both need to
// narrow the same .post-card list, and their results must combine with AND
// ("bgp" posts whose content also matches the search text). Rather than
// have each script fight over the same `hidden` attribute, each one
// registers a predicate here; applyFilters() re-evaluates every card against
// every registered predicate and shows only the cards that pass them all.
//
// Each card's searchable `text` starts as its title + excerpt (so search
// works immediately), then fetchFullText() below fetches that post's own
// page in the background and folds its full text in, so search ends up
// covering everything on the post, not just what's shown on the card. If a
// fetch fails (e.g. opened via file://, see docs/random-post-button.md's
// caveat), that post's search just stays limited to title + excerpt.
//
// Exposes window.postFilters. Safe to load on pages without a post list —
// registerFilter/applyFilters become no-ops so scripts that depend on this
// one don't have to each re-check for the list themselves.
window.postFilters = (function () {
  const list = document.querySelector(".post-list");
  if (!list) {
    return {
      registerFilter: function () {},
      applyFilters: function () {},
    };
  }

  const emptyNotice = document.getElementById("post-search-empty");

  const cards = Array.from(list.querySelectorAll(".post-card")).map(function (card) {
    const title = card.querySelector(".post-card-title");
    const desc = card.querySelector(".post-card-desc");
    const tagsAttr = card.getAttribute("data-tags") || "";
    return {
      card: card,
      text: (
        (title ? title.textContent : "") +
        " " +
        (desc ? desc.textContent : "")
      ).toLowerCase(),
      tags: new Set(
        tagsAttr
          .split(",")
          .map(function (tag) { return tag.trim(); })
          .filter(Boolean),
      ),
    };
  });

  const predicates = [];

  function registerFilter(matchFn) {
    predicates.push(matchFn);
  }

  function applyFilters() {
    let visible = 0;

    cards.forEach(function (entry) {
      const match = predicates.every(function (fn) { return fn(entry); });
      entry.card.hidden = !match;
      if (match) visible++;
    });

    if (emptyNotice) {
      emptyNotice.hidden = visible !== 0;
    }
  }

  function fetchFullText() {
    cards.forEach(function (entry) {
      const link = entry.card.querySelector(".post-card-link");
      const href = link ? link.getAttribute("href") : null;
      if (!href) return;

      fetch(href)
        .then(function (res) {
          if (!res.ok) throw new Error("Could not load " + href);
          return res.text();
        })
        .then(function (html) {
          const doc = new DOMParser().parseFromString(html, "text/html");
          const main = doc.querySelector("main");
          const fullText = (main ? main.textContent : doc.body.textContent) || "";
          entry.text += " " + fullText.toLowerCase();
          applyFilters();
        })
        .catch(function (err) {
          console.error(err);
        });
    });
  }

  fetchFullText();

  return { registerFilter: registerFilter, applyFilters: applyFilters };
})();
