# Post tag filter notes

Context for the tag/category filter chips added to `posts/index.html`,
`js/post-filters.js`, `js/post-tags.js`, `js/post-search.js` (refactored),
and `css/style.css`. Not linked from the published site — kept as repo-local
documentation.

## Request

Add tag/category filtering to `posts/index.html`, reusing the tag data that
already exists on each individual post page, and following the same live-
filtering pattern as the existing search box (no page reload, a notice when
nothing matches, a clear option, same visual design).

## Data: where the tags come from

Each post page already states its tags in its `post-meta` paragraph, e.g.:

```html
<p class="post-meta">April 2017 - tags: bgp, redundancy</p>
```

`posts/index.html` had no tag data at all, so each post's tags were copied
onto its card as `data-tags="bgp,redundancy"` (lowercase, comma-separated,
no spaces) plus a visible `<p class="post-card-tags">bgp, redundancy</p>`
line. This is a one-time copy of data that already exists on the post page —
not a new taxonomy — done so filtering can run entirely off the DOM already
on the page, with no per-post-page fetching at runtime.

**Maintenance note:** a post's tags now live in two places. Adding a new
post means adding its tags to its own `post-meta` line *and* to its card's
`data-tags` attribute and `.post-card-tags` paragraph in `posts/index.html`.

## Approach

- **Shared filtering engine (`js/post-filters.js`, new):** search and tags
  both narrow the same list and must combine with AND, so neither one can
  independently flip `card.hidden` without clobbering the other. This
  script reads every `.post-card` once (title+excerpt text, and a `Set` of
  tags from `data-tags`), and exposes `window.postFilters.registerFilter(fn)`
  / `window.postFilters.applyFilters()`. A card stays visible only if every
  registered predicate returns true. It also owns the shared
  `#post-search-empty` notice (shown when zero cards pass). No-ops if there's
  no `.post-list` on the page.
- **`js/post-search.js` (refactored, not rewritten):** registers one
  predicate (`title/excerpt text includes the query`) instead of looping
  over cards and setting `hidden` itself. Still an IIFE, still no-ops
  without `#post-search-input` (or without `post-filters.js`).
- **`js/post-tags.js` (new):** one toggle button (`.tag-chip`,
  `data-tag="…"`, `aria-pressed`) per unique tag (36 total, alphabetical).
  Clicking toggles membership in a `Set` of selected tags and re-applies
  filters. Registers a predicate that passes when no tags are selected, or
  when a card's tags intersect the selected set — **OR** across tags, since
  most posts only carry two tags and requiring all selected tags would
  often return nothing. A "Clear tags" button (shown only once a tag is
  selected) deselects everything.
- Script load order matters: all three use `defer`, so document order
  controls execution order — `post-filters.js` first, then `post-search.js`
  and `post-tags.js`, both of which depend on `window.postFilters` existing.
- `random-post.js` only reads `.post-list a.post-card-link`, so the new
  `data-tags` attributes and `.post-card-tags` paragraphs don't affect it.

## Styling

- `.tag-filter` reuses the same flex-wrap row pattern as `.post-search`.
- `.tag-chip` is a pill button (`border-radius: 999px`) using
  `--color-border`/`--color-text` at rest and the `--color-accent` /
  `--color-accent-contrast` tokens when `aria-pressed="true"`, mirroring how
  `.button` already uses the accent color for an active/primary action.
- `.post-card-tags` reuses `.post-card-date`'s small, muted styling.
- `.tag-filter-clear[hidden]` was added to the existing `[hidden]` guard
  list (alongside `.post-search-clear[hidden]`) for the same reason: `.button`
  sets `display: inline-block`, which would otherwise override `hidden`.
- No new breakpoint: the chip row wraps on narrow screens like the search
  row does, and the existing two-column `.post-list` grid reflows filtered
  results.

## Caveat

36 tags means a fairly long chip row, especially on narrow screens — there's
no "show more" collapsing or tag search, just wrapping.
