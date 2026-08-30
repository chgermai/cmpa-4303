# Blog post scaffolding notes

Context for the post template and first entry added under `docs/` and
`posts/`. Not linked from `index.html` beyond the Posts nav link — kept as
repo-local documentation for how future posts get added.

## Approach

- `docs/post-template.html` is the reusable scaffold: title, date, tags,
  and four fixed sections (What Happened, The Fix, Jargon Decoded, Lessons
  (Not) Learned) with `{{ placeholder }}` fields to fill in.
- `posts/2026-08-30-hello-oncall.html` is the first real entry, built from
  that template. Content is marked `[DRAFT]` where it's a stand-in for
  Chris's own writing rather than final copy.
- `posts/index.html` lists published posts; new entries get added here as
  they're written.
- `docs/README.md` documents the steps for adding a new post (copy
  template, fill in placeholders, link from the index).

## Files added for multi-page navigation

- Added a `<header><nav>` block to `index.html` linking Home and Posts.
- Post pages reuse the same nav, pointing back to `../index.html`.
- New CSS classes (`nav a`, `.post-meta`, `.post-lede`, `.post-list`,
  `.post-list-date`) extend the existing design tokens in `style.css`
  rather than introducing new colors/spacing values.
