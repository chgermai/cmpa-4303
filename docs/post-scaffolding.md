# Blog post scaffolding notes

Context for the post template and first entry added under `docs/` and
`posts/`. Not linked from `index.html` beyond the Posts nav link — kept as
repo-local documentation for how future posts get added.

## Authorship

The prose in `posts/NN-short-title.html` was written by an AI assistant, not
by the site owner. The source material was a set of real, first-hand network
and DNS incidents the owner lived through and described; the AI genericized
each one (removing company names, hostnames, IP addresses, ticket numbers,
vendor names, and people) and wrote it up in the blog's voice. The owner
provided the facts and reviewed the results but did not write the copy, and
does not claim it as their own writing.

## Approach

- `docs/post-template.html` is the reusable scaffold: title, date, tags,
  and four fixed sections (What Happened, The Fix, Jargon Decoded, Lessons
  (Not) Learned) with `{{ placeholder }}` fields to fill in.
- `posts/NN-short-title.html` are the published entries, built from that
  template. The `NN-` prefix numbers them from the oldest incident to the
  newest.
- `posts/index.html` lists published posts as cards (`.post-card`), one per
  post, showing the title, date, and the post's lede as a short description.
  Each card is a single link. `js/random-post.js` reads these cards
  (`.post-list a.post-card-link`) so the random-post button stays in sync;
  new entries just get another `<li class="post-card">` added here.
- `docs/README.md` documents the steps for adding a new post (copy
  template, fill in placeholders, link from the index).

## Files added for multi-page navigation

- Added a `<header><nav>` block to `index.html` linking Home and Posts.
- Post pages reuse the same nav, pointing back to `../index.html`.
- New CSS classes (`nav a`, `.post-meta`, `.post-lede`, `.post-list`,
  `.post-card*`) extend the existing design tokens in `css/style.css`
  rather than introducing new colors/spacing values.

## Site background

- `body` in `css/style.css` has a default background: `img/hero-fiber-lights.jpg`
  under a dark translucent gradient (built from `--color-bg`) so body text
  stays readable, `background-size: cover`, fixed attachment. It falls back to
  the solid `--color-bg` color if the image fails to load.
- On `posts/index.html` the cards sit on their own opaque `--color-surface`
  fill with a shadow, so the card text never has to compete with the photo.
