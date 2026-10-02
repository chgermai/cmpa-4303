# Post search notes

Context for the search box added to `posts/index.html`, `js/post-search.js`,
`js/post-filters.js`, and `css/style.css`. Not linked from the published
site — kept as repo-local documentation.

## Request

Add a text input above the post list on `posts/index.html` that filters posts
live by title and excerpt (case-insensitive), shows a notice when nothing
matches, and can be cleared to restore the full list. It must follow the
site's existing design and responsive approach. Later widened on request to
search each post's full content, not just its card, and the input's
placeholder was shortened to "Search" after it was found cut off at the
sidebar's ~220px width (see `docs/post-filters-sidebar.md`).

## Approach

- Markup lives in `posts/index.html` (inside the filters sidebar): `.post-search`
  wrapper with `#post-search-input` (`type="search"`, `placeholder="Search"`),
  `#post-search-clear`, and a `#post-search-empty` notice (`role="status"`)
  after the list.
- Behavior lives in `js/post-search.js`, loaded with `defer`. It's wrapped in
  an IIFE and no-ops when `#post-search-input` is absent.
- The searchable text per card comes from `js/post-filters.js`, not from
  `post-search.js` itself: each card starts with its title + excerpt
  (lowercased), then `post-filters.js` fetches that post's own page in the
  background and folds its full text in (see "Full-text search" below) —
  `post-search.js` just reads whatever text is currently on the shared entry.
- On load, a substring-match predicate (`entry.text.includes(query)`) is
  registered once with the shared filtering engine in `js/post-filters.js`
  (see `docs/post-tag-filter.md`). On `input`, `post-search.js` just updates
  the query and calls `window.postFilters.applyFilters()`. This is what lets
  search and the tag filter chips combine (AND) instead of each one fighting
  over `hidden`. Whitespace-only counts as empty.
- If no cards match any active filter, `post-filters.js` shows the shared
  `#post-search-empty` notice.
- The Clear button (shown only when the input has text) and the Escape key
  empty the input, re-run the filter, and refocus the input.
- `random-post.js` parses `posts/index.html` as static text, so filtering
  (a runtime-only change) does not affect it.

## Full-text search

Search originally only matched each card's title and excerpt — the only
post data that existed on `posts/index.html` itself. To search each post's
full content instead, `js/post-filters.js` fetches every post's own page
(via its card's existing link, so there's no separate list of post files to
maintain) and appends that page's `<main>` text — heading, lede, body, and
the "- tags: …" line — to the card's searchable text, lowercased. This
happens in the background after the page loads and re-runs the current
filters as each post's text arrives, so:

- A search typed before a post's fetch resolves still works against its
  title + excerpt in the meantime; it just doesn't yet see that post's full
  body text. In practice, on a normal connection, this window is brief.
- Date headings aren't specially excluded anymore — since the whole page's
  text is searched, the post-meta line (date + tags) is now searchable too.
- `js/random-post.js` already established that `fetch()` needs the page
  served over HTTP; opening `posts/index.html` via `file://` blocks these
  fetches and search silently falls back to title + excerpt only for every
  post (no error shown to the reader).

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
