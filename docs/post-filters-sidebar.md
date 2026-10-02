# Filters sidebar notes

Context for moving the search box ([docs/post-search.md](./post-search.md))
and tag chips ([docs/post-tag-filter.md](./post-tag-filter.md)) into a
sidebar on `posts/index.html`, and the new `js/filters-panel.js` and layout
rules in `css/style.css`. Not linked from the published site — kept as
repo-local documentation.

## Request

Move the existing search + tag filtering into a sidebar, and decide how it
behaves on mobile. Two choices were confirmed with the owner before
building: on mobile the sidebar collapses behind a "Filters" toggle,
closed by default; on desktop/tablet it's a sticky column that stays in
view while the post list scrolls.

## Layout

- `posts/index.html`: the search box and tag-chip markup (unchanged
  internally) now live inside `<aside class="post-filters-sidebar">`, next
  to a new `<div class="post-list-wrap">` that holds the existing
  `<ul class="post-list">` and the shared `#post-search-empty` notice. Both
  sit inside a `<div class="posts-layout">` wrapper, below the page's
  `<h1>`.
- Mobile (base styles, no media query): `.posts-layout` is a single-column
  grid, so the sidebar simply stacks above the list — same as before this
  change, just now inside one more wrapper.
- Desktop (`@media (min-width: 768px)`): `.posts-layout` becomes a
  `220px 1fr` grid (sidebar column + list column), and
  `.post-filters-sidebar` gets `position: sticky; top: var(--space-3);`
  (`align-items: start` on the grid is what makes sticky work inside a
  grid item instead of stretching it to the row height).

### Why this page's container got wider

`--content-max-width` is capped at 720px site-wide at the existing
breakpoint, which is enough room for `.post-list`'s two-column card grid on
its own, but not enough once a 220px sidebar column is also competing for
that space (it would have squeezed the card grid noticeably). Rather than
loosen the cap for every page, `<main class="container posts-page">` adds a
`posts-page` class, and `.container.posts-page` overrides
`--content-max-width` to 960px inside the same `@media (min-width: 768px)`
block — only this page gets the wider container; Home and individual post
pages are unaffected. This keeps the two-column card grid close to its
previous card width (≈320px) instead of shrinking it to fit a sidebar in
the old 720px cap.

## Mobile collapse: `js/filters-panel.js` (new)

- A `#filters-toggle` button (`aria-expanded`, `aria-controls`) sits above
  `#filters-panel`, which wraps the search box and tag chips and starts
  with the `hidden` attribute (closed by default).
- Clicking the toggle flips `panel.hidden` and `aria-expanded`. That's the
  entire script — it only ever touches that one attribute and never
  touches search text or selected tags, so collapsing the panel is purely
  cosmetic and never resets filter state.
- No-ops if `#filters-toggle`/`#filters-panel` aren't present.

## Why desktop needs no JS for this

At `≥768px`, `.filters-toggle { display: none; }` removes the toggle
button from view and the tab order, and `.filters-panel[hidden] { display:
block; }` forcibly shows the panel even though the `hidden` attribute may
still be set on it (e.g. left over from a mobile session, or just the
default). CSS alone decides "always open on desktop" with no JS viewport
checks. A separate `.post-filters-heading` (`<h2>Filters</h2>`, hidden on
mobile, shown on desktop) replaces the toggle button's label once the
button itself is gone, so the section still has a visible heading at every
width.

## Styling

- `.filters-toggle` reuses the same surface/border/accent-on-hover look as
  `.post-search-input`, full width, with a chevron (`▾`) that rotates via
  `aria-expanded="true"` — no new colors.
- `.post-filters-heading` reuses the existing `h2` size/accent-color look
  already used for post card titles.
- Everything inside the sidebar (`.post-search`, `.tag-filter`) is
  unchanged; their existing `flex-wrap` rows already cope with a narrow
  220px column the same way they cope with a narrow phone screen, so no
  sidebar-specific overrides were needed for them.

## Caveat

Between roughly 768px and ~900px, the two-column card grid is noticeably
narrower per card than before this change (sidebar now takes some of that
width), though still two columns. It doesn't get a dedicated wider
breakpoint to fix that, consistent with the site's one-breakpoint
convention (see `docs/responsive-scaffolding.md`).
