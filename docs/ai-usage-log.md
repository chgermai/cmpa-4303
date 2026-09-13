# AI Usage Log

This file exists to answer one question honestly and on the record: which
parts of this site were built with AI assistance (Claude Code), what was
asked for, and what the AI actually did. It's meant to be readable by an
instructor, or anyone else, who wants to understand how AI was used on this
assignment. It's a running log, not a summary — new work gets a new dated
entry, and existing entries don't get rewritten after the fact.

## How this log was assembled

- Every entry from 2026-09-08 onward is a firsthand account written from the
  actual conversation transcript with Claude Code, by the same AI that did
  the work, in the same session (or a later session with that transcript
  still available). Requests are paraphrased faithfully; anything in
  quotation marks is the owner's own words.
- Entries before 2026-09-08 predate this log. No saved transcript exists for
  that earlier work, so those entries are reconstructed from two sources
  only: the git commit history, and the per-feature notes already checked
  into `docs/` (`responsive-scaffolding.md`, `post-scaffolding.md`,
  `random-post-button.md`). Those notes are written in the same
  "Request / Approach" voice as this log, which is evidence — not proof —
  that AI assistance was involved in producing them.
- The first two commits (`582e75a`, `3efa0c2`) have no accompanying notes of
  any kind. Nothing in the repo confirms or rules out AI involvement in that
  work, so they're listed below for completeness only, with no claim either
  way.

## Log

### 2026-08-23 — Initial commit; README and scaffolding

Commits: `582e75a`, `3efa0c2`

No documentation trail exists for this work: repo initialization,
`.gitignore`, a starter `README.md`, `index.html`, and `style.css`. Whether
or how AI was used here is not something this log can confirm one way or
the other.

### 2026-08-30 — Responsive layout, first post, post template

Commits: `03cf20b`, `c71d546`, `439adde`, `d0376f8`

Reconstructed from `docs/responsive-scaffolding.md` and
`docs/post-scaffolding.md` — see those files for the fuller notes written
at the time. Summary: mobile-first responsive CSS scaffolding (design
tokens, `.container`, fluid type scale, the missing viewport meta tag), then
`docs/post-template.html` as the reusable post scaffold and the first entry
built from it (`posts/2026-08-30-hello-oncall.html`), plus `posts/index.html`
to list posts.

### 2026-09-06 — Random post button

Commit: `810b7f8`

Reconstructed from `docs/random-post-button.md`. Summary: added a "Take me
to a random post" button to `index.html`, wired up in `js/random-post.js`,
which fetches `posts/index.html`, parses the post list, and navigates to a
random entry. Also moved `style.css` to `css/style.css` and added
`docs/feature-doc-template.md` as the template these per-feature notes
follow.

### 2026-09-08 through 2026-09-13 — this session

Commits: `dedb162`, `92d238d`, `f8781e8`, `11bda49`, `b6aa0ee`, plus
uncommitted work as of this entry.

This is a firsthand record: the conversation happened directly with the AI
writing this log.

1. **Ignore the drafts folder.** Asked to add `drafts/` (27 markdown
   incident write-ups) to `.gitignore` so it wouldn't be tracked. Done;
   landed in the next commit below.
2. **Generate posts from the drafts.** Asked to "use the markdown drafts in
   the drafts folder to generate posts using the template in docs," keeping
   the drafts' `NN-slug` naming convention, then delete the placeholder
   `hello-oncall` post. The AI read all 27 drafts — each a genericized,
   real network/DNS incident the site owner had lived through and supplied
   as source material — asked clarifying questions about file naming, post
   dates, and tags, then generated all 27 `posts/NN-slug.html` files from
   `docs/post-template.html`, rebuilt `posts/index.html`, and deleted
   `posts/2026-08-30-hello-oncall.html`. → commit `dedb162`.
3. **Stop referencing the drafts folder in docs.** Docs that pointed at
   `drafts/incident-posts/` were edited to drop that reference, since the
   folder is gitignored and not meant to be a repo-visible source. Folded
   into the same commit.
4. **Color palette.** Given a specific set of seven CSS custom-property
   values (dark teal background, orange accent, etc.) and asked to apply
   them as the site's base colors. The AI updated the `:root` tokens in
   `css/style.css` and wired the two new tokens (`--color-surface`,
   `--color-border`) into existing rules so neither went unused. → commit
   `92d238d`.
5. **Authorship disclosure.** Asked to document, in the repo, that the 27
   posts were AI-written from real source data the owner provided and
   reviewed — not the owner's own writing, and the owner didn't want credit
   for prose they didn't write. Added an "Authorship" section to
   `docs/README.md` and `docs/post-scaffolding.md` explaining this. →
   commit `f8781e8`.
6. **Cards instead of a list.** Asked to turn `posts/index.html` into a
   card layout — title, date, and a short description per post — and to
   update the random-post JS if needed. The AI rebuilt the page as
   `.post-card` items (title, date, and the post's lede as the
   description), added the card CSS, and narrowed the `random-post.js`
   selector to match. → commit `11bda49`.
7. **Hero background image.** Asked to use `img/hero-fiber-lights.jpg` as a
   site-wide default background, with each post card kept on its own solid,
   readable background. Added the image with a dark gradient overlay on
   `body` in `css/style.css`, kept `.post-card` opaque with a shadow, and
   fixed a low-contrast link color the new background exposed. → commit
   `b6aa0ee`.
8. **Recent posts on the homepage.** Asked to add a listing of the 5 most
   recent posts to `index.html`, right after the status badge, reusing the
   card classes built for the posts page. Added a "Recent Posts" section
   with the same `.post-list` / `.post-card` markup and a link to the full
   posts page; documented that this list is hand-maintained, not generated
   like `posts/index.html`. → uncommitted as of this entry.
9. **This log.** Asked to document this conversation in `docs/`, as far
   back as it could be reconstructed, and to maintain it going forward in
   case questions come up about how AI was used for this assignment. This
   file is the result.
10. **Remove the "Under Construction" badge.** Asked to "remove the
    'Status: Under Construction' button and clean up the configuration."
    Removed the `<p class="badge">` line from `index.html` and deleted the
    now-unused `.badge` rule from `css/style.css` (checked first that
    nothing else referenced it). → uncommitted as of this entry.

## Maintaining this log

New AI-assisted work gets a new dated entry above, in the same format: what
was asked, what was done, which commit(s) it landed in. Existing entries
don't get edited to look different after the fact — if something needs
correcting, add a note rather than rewriting history.
