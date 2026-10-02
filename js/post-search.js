// Live search for the Posts page.
//
// Registers a title/excerpt (case-insensitive) predicate with the shared
// filtering engine in post-filters.js, so it combines (AND) with any other
// active filter, such as the tag chips in post-tags.js. Safe to load on
// pages without the search box, or without post-filters.js; it no-ops in
// either case.
//
// Also picks up a `?q=` on load — the homepage's search box (see
// docs/home-search.md) is a plain GET form that lands here with the query
// in the URL, no JS required on the homepage itself.
(function () {
  const input = document.getElementById("post-search-input");
  if (!input) return;
  if (!window.postFilters) return;

  const clearButton = document.getElementById("post-search-clear");
  let query = "";

  const incomingQuery = new URLSearchParams(window.location.search).get("q");
  if (incomingQuery) {
    input.value = incomingQuery;
    // Arriving with a search already applied should be visible, not just
    // its effect — open the mobile filters panel if it's present and
    // currently collapsed. No-op on desktop, where CSS keeps it open
    // regardless of this attribute.
    const panel = document.getElementById("filters-panel");
    const toggle = document.getElementById("filters-toggle");
    if (panel && panel.hidden) {
      panel.hidden = false;
      if (toggle) toggle.setAttribute("aria-expanded", "true");
    }
  }

  window.postFilters.registerFilter(function (entry) {
    return entry.text.includes(query);
  });

  function filter() {
    query = input.value.trim().toLowerCase();
    clearButton.hidden = input.value === "";
    window.postFilters.applyFilters();
  }

  function clear() {
    input.value = "";
    filter();
    input.focus();
  }

  input.addEventListener("input", filter);
  input.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && input.value !== "") {
      event.preventDefault();
      clear();
    }
  });
  clearButton.addEventListener("click", clear);

  filter();
})();
