// Collapsible filters panel for the Posts page.
//
// On mobile the search box and tag chips start collapsed behind a
// "Filters" toggle button, so a reader isn't forced to scroll past 36 tag
// chips before reaching the post list. At desktop widths CSS forcibly
// keeps the panel open (see the .filters-panel[hidden] override in
// style.css) and hides the toggle button entirely, so this script only
// ever has a visible effect on narrow screens — toggling the attribute is
// harmless either way.
//
// Collapsing/expanding never resets search text or selected tags; it only
// shows or hides the controls that hold them.
//
// Safe to load on pages without the toggle button; it no-ops when
// #filters-toggle is absent.
(function () {
  const toggle = document.getElementById("filters-toggle");
  const panel = document.getElementById("filters-panel");
  if (!toggle || !panel) return;

  toggle.addEventListener("click", function () {
    const wasOpen = !panel.hidden;
    panel.hidden = wasOpen;
    toggle.setAttribute("aria-expanded", String(!wasOpen));
  });
})();
