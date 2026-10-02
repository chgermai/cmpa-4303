// Shared filtering engine for the Posts page.
//
// Text search (post-search.js) and tag chips (post-tags.js) both need to
// narrow the same .post-card list, and their results must combine with AND
// ("bgp" posts whose title/excerpt also matches the search text). Rather
// than have each script fight over the same `hidden` attribute, each one
// registers a predicate here; applyFilters() re-evaluates every card against
// every registered predicate and shows only the cards that pass them all.
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

  return { registerFilter: registerFilter, applyFilters: applyFilters };
})();
