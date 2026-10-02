# RSS feed notes

Context for `feed.xml`, `scripts/build-feed.js`, and the `<footer>` added to
every page (`index.html`, `posts/index.html`, all 27 post pages, and
`docs/post-template.html`). Not linked from the published site — kept as
repo-local documentation.

## Request

Generate a static `feed.xml` at the site root, following the RSS 2.0 spec:
channel title/link/description, then one `<item>` per post, capped at the
50 most recent once the list grows past that. Build it with a reusable
script that can be re-run as posts are added. Add an RSS autodiscovery
`<link>` to the footer of every page.

## Data: reusing what already exists

`posts/index.html` is already the single source of truth for the post list
— `js/random-post.js` and `js/post-filters.js` both read it instead of
keeping a second list anywhere. `scripts/build-feed.js` follows the same
rule: it scrapes `posts/index.html`'s `.post-card` markup (title, link,
date, excerpt) for the items, and `index.html`'s `<h1>` / `.subtitle` for
the channel's title and description, rather than hardcoding any of that a
second time. The one thing that *can't* come from either page is the
site's own base URL (`https://chgermai.github.io/cmpa-4303/`, from
README.md's "Website URL" line — a GitHub Pages *project* page, not a
custom domain at root) — that's a constant at the top of the script.

Cards in `posts/index.html` are already kept in newest-first order (see
`docs/post-filters-sidebar.md`), so the script doesn't re-sort by date — it
just takes the list in that order and caps it at the 50 most recent.

## `scripts/build-feed.js`

- No npm dependencies — a small regex scrape of `posts/index.html`'s
  consistent, single-source markup is simpler than pulling in an HTML
  parser for a script this size, and matches the site's own "no framework,
  no build tooling" approach (see `README.md`).
- Each post's date (e.g. "Aug 2026") is parsed to an RFC 822 `pubDate`,
  pinned to the 1st of that month at 00:00 UTC. **This is accurate to the
  month only, not the day** — no post anywhere in this site records a
  publish day, only a month and year (see the `post-meta` line on any post
  page), so there's nothing finer to parse.
- Escapes `&`, `<`, `>`, `"`, and `'` in every title/description via a
  small `escapeXml()` helper (verified against a post whose excerpt
  contains an apostrophe).
- Re-run it after adding, removing, or reordering a post in
  `posts/index.html`:

  ```
  node scripts/build-feed.js
  ```

- Tested by temporarily inflating `posts/index.html` to 57 cards — the
  script correctly capped the feed at 50 items and logged that it did so —
  then restoring the real file and regenerating `feed.xml` from it.

## Footer `<link>` on every page

- Added `<footer class="container">` (previously unused, though
  `css/style.css` already had generic `header, main, footer` spacing rules
  sitting ready for one) containing exactly:
  ```html
  <link rel="alternate" type="application/rss+xml" title="Views From the On-Call Chair" href="../feed.xml" />
  ```
  (`./feed.xml` from `index.html`, `../feed.xml` everywhere else, since
  every other page lives one directory below the root — same convention
  already used for `../css/style.css` etc.)
- **Deviated from the literal `href="/feed.xml"` given in the request**: a
  root-relative path resolves against the domain root, which on a GitHub
  Pages *project* page (`https://chgermai.github.io/cmpa-4303/`, not a
  custom domain at `/`) would point at
  `https://chgermai.github.io/feed.xml` — one directory too high, a 404.
  Used the same page-relative convention as the rest of the site instead.
- A `<link>` element renders nothing visible — this satisfies feed
  *autodiscovery* (what browsers/feed readers look for), not a clickable
  "RSS" link a reader could see and click. A visible one was added
  separately afterward (below).
- Also added to `docs/post-template.html` so new posts get the footer
  without anyone having to remember to add it by hand.

## Visible "Subscribe via RSS" link

Added on request, homepage only (not every page, unlike the autodiscovery
`<link>` above): a plain `<p class="footer-feed-link"><a href="./feed.xml">
Subscribe via RSS</a></p>` inside `index.html`'s existing `<footer>`. New
`.footer-feed-link` / `.footer-feed-link a` rules in `css/style.css` give
it the same muted-label-plus-accent-link look used elsewhere (e.g.
`.post-search-label`) — there's no sitewide default link color to inherit
from outside `main`, so this needed its own rule rather than reusing
`main p a`.

## Caveat

If a post's title or excerpt in `posts/index.html` is ever edited without
re-running the script, `feed.xml` goes stale until the next run — there's
no watch/build step, consistent with this being a plain static site.
