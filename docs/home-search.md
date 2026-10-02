# Homepage search notes

Context for the search box added to `index.html`, the small `?q=` handling
added to `js/post-search.js`, and `css/style.css`. Not linked from the
published site — kept as repo-local documentation.

## Request

Add a search box to the homepage. Below it, add a link to the Posts page
describing that it can also be used to filter by category.

## Approach

- The homepage has no post-filtering engine of its own (`js/post-filters.js`
  only runs where there's a `.post-list`), so rather than duplicate that
  logic, the homepage search box is a plain HTML form —
  `<form action="./posts/index.html" method="get">` with
  `<input type="search" name="q">` — that lands on the Posts page with the
  query in the URL. This needs no JavaScript on the homepage at all; a
  browser submits a GET form as a query string on its own.
- `js/post-search.js` reads `?q=` off `window.location.search` on load. If
  present, it pre-fills `#post-search-input` before running the normal
  filter, so arriving from the homepage search immediately shows filtered
  results — the existing live search, tag chips, and full-text matching
  (see `docs/post-search.md`) all still apply from there on.
- If the Posts page's mobile filters panel (`docs/post-filters-sidebar.md`)
  is present and currently collapsed, an incoming `?q=` opens it too, so
  the active search is visible, not just its effect. This has no effect on
  desktop, where CSS already keeps the panel open regardless.
- Below the form, a plain link to `./posts/index.html` describes that the
  Posts page can also filter by category tag, pointing at the tag-chip
  feature (`docs/post-tag-filter.md`) for anyone who'd rather browse by
  topic than type a query.
- `random-post.js` is unaffected — it only reads `.post-list` link hrefs
  from `posts/index.html` and ignores everything else on either page.

## Styling

- Reuses the existing `.post-search` / `.post-search-label` /
  `.post-search-input` classes from the Posts page for the form itself, and
  `.button` for the submit button, so the box looks and behaves consistently
  across both pages. `.home-search` / `.home-search-browse` only add the
  section's spacing.

## Caveat

The homepage box doesn't filter anything in place (e.g. the "Recent Posts"
list below it) — it only forwards the query to the Posts page's full
search. Submitting it empty is harmless: it just lands on the Posts page
with every post showing.
