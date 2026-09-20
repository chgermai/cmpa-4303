// Live search for the Posts page.
//
// Filters the static .post-card elements in posts/index.html by title and
// excerpt (case-insensitive) as the user types, so the page's own markup stays
// the single source of truth. Safe to load on pages without the search box; it
// no-ops when #post-search-input is absent.
(function () {
  const input = document.getElementById("post-search-input");
  if (!input) return;

  const clearButton = document.getElementById("post-search-clear");
  const emptyNotice = document.getElementById("post-search-empty");

  const cards = Array.from(document.querySelectorAll(".post-list .post-card")).map(
    (card) => {
      const title = card.querySelector(".post-card-title");
      const desc = card.querySelector(".post-card-desc");
      return {
        card,
        text: (
          (title ? title.textContent : "") +
          " " +
          (desc ? desc.textContent : "")
        ).toLowerCase(),
      };
    },
  );

  function filter() {
    const raw = input.value.trim();
    const query = raw.toLowerCase();
    let visible = 0;

    cards.forEach(function (entry) {
      const match = entry.text.includes(query);
      entry.card.hidden = !match;
      if (match) visible++;
    });

    clearButton.hidden = input.value === "";
    emptyNotice.hidden = visible !== 0;
    if (visible === 0) {
      emptyNotice.textContent = 'No posts match "' + raw + '".';
    }
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
