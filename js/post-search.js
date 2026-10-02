// Live search for the Posts page.
//
// Registers a title/excerpt (case-insensitive) predicate with the shared
// filtering engine in post-filters.js, so it combines (AND) with any other
// active filter, such as the tag chips in post-tags.js. Safe to load on
// pages without the search box, or without post-filters.js; it no-ops in
// either case.
(function () {
  const input = document.getElementById("post-search-input");
  if (!input) return;
  if (!window.postFilters) return;

  const clearButton = document.getElementById("post-search-clear");
  let query = "";

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
