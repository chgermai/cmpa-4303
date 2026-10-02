// Tag/category filter chips for the Posts page.
//
// Lets a reader narrow the list to posts carrying any of the selected tags
// (OR across tags — most posts only have two, so requiring all selected
// tags would usually return nothing). Registers that predicate with the
// shared engine in post-filters.js, so it combines (AND) with any other
// active filter, such as the text search in post-search.js.
//
// Safe to load on pages without tag chips or without post-filters.js; it
// no-ops in either case.
(function () {
  const chips = Array.from(document.querySelectorAll(".tag-chip"));
  if (chips.length === 0) return;
  if (!window.postFilters) return;

  const clearButton = document.getElementById("tag-filter-clear");
  const selected = new Set();

  window.postFilters.registerFilter(function (entry) {
    if (selected.size === 0) return true;
    for (const tag of selected) {
      if (entry.tags.has(tag)) return true;
    }
    return false;
  });

  function setPressed(chip, pressed) {
    chip.setAttribute("aria-pressed", pressed ? "true" : "false");
  }

  function refresh() {
    clearButton.hidden = selected.size === 0;
    window.postFilters.applyFilters();
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      const tag = chip.getAttribute("data-tag");
      if (selected.has(tag)) {
        selected.delete(tag);
        setPressed(chip, false);
      } else {
        selected.add(tag);
        setPressed(chip, true);
      }
      refresh();
    });
  });

  clearButton.addEventListener("click", function () {
    selected.clear();
    chips.forEach(function (chip) { setPressed(chip, false); });
    refresh();
  });

  refresh();
})();
