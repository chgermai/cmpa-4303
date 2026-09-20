# Post search notes

Context for the search box added to `posts/index.html`, `js/post-search.js`,
and `css/style.css`. Not linked from the published site — kept as repo-local
documentation.

## Request

Add a text input above the post list on `posts/index.html` that filters posts
live by title and excerpt (case-insensitive), shows a notice when nothing
matches, and can be cleared to restore the full list. It must follow the
site's existing design and responsive approach.

## Approach

- Markup lives in `posts/index.html`: `.post-search` wrapper with
  `#post-search-input` (`type="search"`), `#post-search-clear`, and a
  `#post-search-empty` notice (`role="status"`) after the list.
- Behavior lives in `js/post-search.js`, loaded with `defer`. It's wrapped in
  an IIFE and no-ops when `#post-search-input` is absent.
- On load it reads each `.post-card`'s `.post-card-title` and
  `.post-card-desc` text (lowercased) — the cards themselves are the single
  source of truth, so new posts are searchable with no extra work.
- On `input`, the query is trimmed and lowercased; each card's `hidden`
  attribute is set by a substring match. Whitespace-only counts as empty.
  The date is intentionally not searched.
- If no cards match, the notice is shown (query inserted via `textContent`).
- The Clear button (shown only when the input has text) and the Escape key
  empty the input, restore all cards, and refocus the input.
- `random-post.js` parses `posts/index.html` as static text, so filtering
  (a runtime-only change) does not affect it.

## Styling

- New `.post-search*` classes in `css/style.css` reuse the existing
  `--color-*` and `--space-*` tokens and the `.button` class. No new
  breakpoint: the flex row wraps on narrow screens and the existing
  two-column `.post-list` grid reflows filtered results.
- `.post-search-clear[hidden]` / `.post-search-empty[hidden]` set
  `display: none` explicitly because `.button` and the notice's own
  styles would otherwise override the `hidden` attribute.

## Caveat

Matching is plain substring only (no fuzzy or word-order matching), and the
query isn't persisted in the URL.
