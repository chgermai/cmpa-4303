# AI Usage Log

This file exists to answer one question honestly and on the record: which
parts of this site were built with AI assistance (Claude Code), what was
asked for, and what the AI actually did. It's meant to be readable by an
instructor, or anyone else, who wants to understand how AI was used on this
assignment. It's a running log, not a summary — new work gets a new dated
entry, and existing entries don't get rewritten after the fact.

## How this log was assembled

- The 2026-09-08 entry is written directly by the AI that did the work, in
  the same conversation, not recalled or paraphrased from memory
  afterward. Partway through, the owner also pasted in the full raw
  session transcript so the entry's quotes could be checked against it
  and made exact — see item 12 in that entry for why that transcript
  itself isn't kept in the repo. The prompts quoted in quotation marks
  were verified word-for-word against that transcript at the time.
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

### 2026-09-08 through 2026-09-13 — blog posts and site styling

Commits: `dedb162`, `92d238d`, `f8781e8`, `11bda49`, `b6aa0ee`, plus
uncommitted work as of this entry.

Items 1–10 below are not a recreated summary — they were written in this
same conversation as the work happened, and every quoted prompt was later
checked word-for-word against a full raw transcript the owner pasted in
(see items 11–12). That transcript file is not kept in this repo; this log
entry is the durable record instead.

1. **Ignore the drafts folder.** Prompt: *"Add the drafts folder (and all
   contents) to the git ignore file"*. Added `drafts/` (27 markdown
   incident write-ups) to `.gitignore`. Landed in the next commit below.
2. **Generate posts from the drafts.** Prompt: *"Use the markdown drafts in
   the drafts folder to generate posts using the template in docs. Keep
   that naming convention used for the files. Once done let's delete the
   hello oncall post."* The AI read all 27 drafts — each a genericized,
   real network/DNS incident the site owner had lived through and supplied
   as source material — asked clarifying questions (via `AskUserQuestion`)
   about file naming, post dates, and tags, then wrote and ran a Python
   script (`gen_posts.py`) to generate all 27 `posts/NN-slug.html` files
   from `docs/post-template.html`, wrote a second script (`gen_index.py`)
   to rebuild `posts/index.html`, and ran `git rm` on
   `posts/2026-08-30-hello-oncall.html`. → commit `dedb162`.
3. **Stop referencing the drafts folder in docs.** Prompt: *"Dont reference
   the drafts folder in the docs"*. Edited `docs/README.md` and
   `docs/post-scaffolding.md` to drop the `drafts/incident-posts/`
   reference, since the folder is gitignored and not meant to be a
   repo-visible source. Verified with `grep -rn -i "draft" docs/`. Folded
   into the same commit.
4. **Color palette.** Prompt: *"Update the base style with these colors:"*
   followed by a `:root` block of seven CSS custom-property values (dark
   teal background, orange accent, etc.). The AI applied them as the
   site's `:root` tokens in `css/style.css` and wired the two new ones
   (`--color-surface`, `--color-border`) into existing rules so neither
   went unused. → commit `92d238d`.
5. **Authorship disclosure.** Prompt: *"We should update the docs for the
   site to note that the post were written by AI based on source data I
   provided. I don't want to take credit for something I did not actually
   write."* Added an "Authorship" section to `docs/README.md` and
   `docs/post-scaffolding.md`. Asked afterward whether a visible on-site
   disclosure was also wanted; owner replied *"No, I just want the repo to
   reflect this"*, so no site-facing change was made. → commit `f8781e8`.
6. **Cards instead of a list.** Prompt: *"I want to modify the
   posts/index.html page so each blog appears as a card with the title,
   date, and the short description of the incident display. Also, may
   need to update the JS function so it still chooses a random post."*
   The AI wrote `gen_index.py` to rebuild the page as `.post-card` items
   (title, date, and the post's lede as the description), added the card
   CSS, and narrowed the `random-post.js` selector to
   `.post-list a.post-card-link[href]` to match. → commit `11bda49`.
7. **Hero background image.** Prompt: *"lets add a default background image
   using the img/hero-fiber-lights.jpg file. For the posts/index.html page
   each card should have its own solid background so the text is easy to
   read."* Added the image with a dark gradient overlay on `body` in
   `css/style.css`, kept `.post-card` opaque with a shadow, and fixed a
   low-contrast link color the new background exposed. Verified by
   serving the site with `python3 -m http.server` and taking headless
   Chrome screenshots, sent to the owner via `SendUserFile`. → commit
   `b6aa0ee`.
8. **Recent posts on the homepage.** Prompt: *"Let's modify the homepage.
   After the badge class in the main section I want to add a listing of
   the 5 most recent posts using the existing card classes built for the
   posts page."* Added a "Recent Posts" section to `index.html` with the
   same `.post-list` / `.post-card` markup and a link to the full posts
   page; documented that this list is hand-maintained, not generated like
   `posts/index.html`. Verified with a headless-Chrome screenshot. →
   uncommitted as of this entry.
9. **This log.** Prompt: *"Can we document the conversation in the docs
   folder. We should document it as far back as we can and we will
   maintain that docs in case any questions arise of how I used AI for
   this assignment."* The AI pulled the full `git log` history (including
   full commit messages and ISO timestamps) and the existing per-feature
   docs to reconstruct entries for work before this session, then wrote
   this file. First version was self-labeled as a mix of firsthand account
   and reconstruction.
10. **Remove the "Under Construction" badge.** Prompt: *"Let remove the
    "Status: Under Contruction" button and clean up the configuration."*
    Removed the `<p class="badge">` line from `index.html` and deleted the
    now-unused `.badge` rule from `css/style.css`, after confirming with
    `grep` that nothing else referenced either. → uncommitted as of this
    entry.
11. **Attach the real transcript.** The owner exported and pasted the raw
    session transcript covering items 1–10 above, with the instruction:
    *"This is a transcript from the claude code sessions. This should be
    used to update the ai-usage data so it no longer reads as recreated."*
    The AI saved that transcript verbatim to
    `docs/transcripts/2026-09-08-blog-posts-and-site-styling.md` and
    rewrote this entry to cite it directly and quote prompts exactly,
    rather than describing the session from its own summary.
12. **Remove the transcript file.** Prompt: *"I am not going to maintain
    the transcript in the repo so we should remove that from the docs."*
    Deleted `docs/transcripts/2026-09-08-blog-posts-and-site-styling.md`
    (and the now-empty `docs/transcripts/` folder), and edited "How this
    log was assembled" and the intro above item 1 to stop pointing at a
    file that no longer exists. The quoted prompts and described actions
    in items 1–10 are unchanged — they were checked against that
    transcript before it was removed — this just stops treating the raw
    file as something the repo keeps up to date.

### 2026-09-20 — Post search

Not yet committed as of this entry.

1. **Plan the feature.** Prompt: *"I want to add a search feature to the
   ./posts/index.html page. Don't make any changes let's plan this out and
   review what is needed."* plus the requirements (text input above the
   list, case-insensitive title/excerpt filtering as the user types, a
   notice when nothing matches, a clear option, same responsive design).
   The AI read `posts/index.html`, `css/style.css`, `js/random-post.js`, and
   the existing `docs/`, then wrote a plan. No files in the repo were
   changed during planning; the plan was approved before any edits.
2. **Implement it.** Added the search markup to `posts/index.html`, a new
   `js/post-search.js` (live filter, empty-state notice, Clear button,
   Escape to clear), new `.post-search*` rules in `css/style.css` reusing
   existing tokens, and `docs/post-search.md`.

### 2026-10-01 — Tag/category filtering

Not yet committed as of this entry.

1. **Plan the feature.** Prompt: *"I want to add category/tag filtering to
   the Posts page (posts/index.html) Individual posts pages already
   include tags. Reuse the existing tag data. There's also a live search
   feature on posts/index.html, follow that same pattern for
   consistency."* The AI confirmed (via `grep` across all post pages) that
   every post already states its tags in its `post-meta` line, and that
   none of that tag data existed on `posts/index.html` itself. It asked the
   owner two clarifying questions before writing the plan: whether
   selecting multiple tags should require all of them or any of them, and
   whether each card should visibly show its own tags. The owner picked
   "match any selected tag (OR)" and "yes, show tags on each card." No
   files were changed during planning; the plan was approved before any
   edits.
2. **Implement it.** Copied each post's existing tags onto its card in
   `posts/index.html` as a `data-tags` attribute and a visible
   `.post-card-tags` line, and added 36 toggle buttons (one per unique tag)
   above the list. Because the tag filter and the existing text search both
   need to narrow the same list with AND logic, the AI introduced a small
   shared engine, `js/post-filters.js`, and refactored `js/post-search.js`
   to register a predicate with it instead of setting `hidden` directly;
   the new `js/post-tags.js` does the same for tag selection. Added
   `.tag-filter`/`.tag-chip*` rules to `css/style.css` reusing existing
   color/spacing tokens, wrote `docs/post-tag-filter.md`, and updated
   `docs/post-search.md`'s description of how search now hooks into the
   shared engine.

### 2026-10-01 — Filters sidebar

Not yet committed as of this entry.

1. **Clarify mobile behavior.** Prompt: *"Can we create a side bar that
   provides the general search and tag search. How will it work on a
   mobile device?"* Before building anything, the AI asked the owner to
   pick between three mobile options (always-stacked, a collapsible
   toggle panel, or an off-canvas drawer) and whether the sidebar should
   be sticky on desktop. The owner chose the collapsible toggle panel
   (closed by default) and a sticky desktop sidebar.
2. **Implement it.** Wrapped the existing search box and tag chips in
   `<aside class="post-filters-sidebar">` next to the post list, inside a
   new `.posts-layout` grid in `posts/index.html`. Added a "Filters"
   toggle button and `js/filters-panel.js` for the mobile collapse (CSS
   alone keeps the panel always open at desktop widths and hides the
   toggle there), a sticky `position: sticky` sidebar at
   `@media (min-width: 768px)`, and widened just this page's container
   (`.container.posts-page`) so the new sidebar column doesn't crowd the
   existing two-column card grid. Wrote `docs/post-filters-sidebar.md`.

### 2026-10-01 — Full-text search, placeholder fix

Not yet committed as of this entry.

1. **Request, with a screenshot.** Prompt: *"The text in the search box is
   cutoff. Let's shorten it to say just search. In addition let's modify
   the search to search all the text in each post."* The screenshot showed
   the `placeholder` text ("Search titles and excerpts…") overflowing the
   narrow sidebar input.
2. **Implement it.** Shortened the placeholder to "Search" in
   `posts/index.html`. For full-text search, extended `js/post-filters.js`
   to fetch each post's own page (via its card's existing link) in the
   background after load and fold that page's full `<main>` text into the
   card's searchable text, re-running the active filters as each post's
   text arrives; `js/post-search.js` itself didn't need to change, since it
   already just reads whatever text is on the shared entry. Updated
   `docs/post-search.md` to describe this (it previously only covered
   title + excerpt). Verified over a local HTTP server (`fetch()` needs
   one, same constraint `js/random-post.js` already had) that search now
   matches body text and a heading common to every post, not just card
   text, and that an unmatched query still shows the empty-state notice.

### 2026-10-02 — Fix: sidebar unreachable on short screens

Not yet committed as of this entry.

1. **Report the bug.** Prompt: *"I am seeing one issue on the sidebar. On
   a short screen i need to scroll through all the posts to allow the
   sidebar to scroll."* The cause: `position: sticky` only releases an
   element once its containing grid row's edge scrolls into view, which
   here is set by the much taller post list — so on a short window, the
   sidebar (36 tag chips) could be taller than the screen with no way to
   reach its lower chips short of scrolling nearly the whole list.
2. **Fix it.** In `css/style.css`, capped `.post-filters-sidebar` to
   `max-height: calc(100vh - var(--space-3) * 2)` at `@media (min-width:
   768px)` and made it a column flexbox: the "Filters" heading stays fixed
   size, and `.filters-panel` (search + tags) becomes the flexible,
   independently-scrolling piece (`overflow-y: auto`). Verified in
   headless Chrome at a short (1200×500) and a tall (1200×1400) viewport:
   short window scrolls the panel internally while `window.scrollY` stays
   at 0; tall window shows no scrollbar at all (content already fits).
   Documented in `docs/post-filters-sidebar.md`.

### 2026-10-02 — Homepage search box

Not yet committed as of this entry.

1. **Request.** Prompt: *"Now I want to add a search option to the
   homepage. Just a search box but under the search box lets add a link
   to the Posts page with a description of search by category."*
2. **Implement it.** Added a search box to `index.html` as a plain GET
   form (`action="./posts/index.html"`, `name="q"`) — no JavaScript needed
   on the homepage, since submitting a GET form is a native browser
   behavior. Added a `?q=` reader to `js/post-search.js` so the Posts page
   pre-fills and runs the search on arrival (and opens the mobile filters
   panel if it would otherwise hide the active query). Below the form,
   added a link to the Posts page describing its category/tag filter.
   Reused the existing `.post-search`/`.button` classes rather than
   introducing new form styling. Verified over a local HTTP server that
   `posts/index.html?q=vpn` pre-fills the input, filters to the matching
   post, and opens the panel on mobile but not desktop; verified a plain
   visit with no query leaves the panel collapsed as before. Wrote
   `docs/home-search.md`.

### 2026-10-02 — Empty-state message

Not yet committed as of this entry.

1. **Request.** Prompt: *"Let update the message on now searches being
   found from 'No post match your filters' to 'Either it never happened,
   or we never wrote it down.'"*
2. **Implement it.** Changed the one-line static `#post-search-empty`
   notice in `posts/index.html` from "No posts match your filters." to
   "No matches. Either it never happened, or we never wrote it down."
   Confirmed by `grep` that this text isn't duplicated or set dynamically
   from JavaScript anywhere, so it only needed changing in that one place.

### 2026-10-02 — Homepage section order

Not yet committed as of this entry. (Logged one turn later than the work
itself, from this same conversation — the quote below is exact, not
reconstructed.)

1. **Request.** Prompt: *"Lets update the homepage order. It should be
   intro, recents posts, take me to a random post, and search in that
   orer."*
2. **Implement it.** Reordered the sections in `index.html` to match (the
   intro paragraphs didn't move); swapped which of `.recent-posts` /
   `.home-search` in `css/style.css` carries the larger top margin, since
   `.home-search` is now the last section on the page instead of
   `.recent-posts`.

### 2026-10-02 — RSS feed

Not yet committed as of this entry.

1. **Request.** Prompt: *"I want to add an RSS feed to my site, via a
   static XML file. Use existing data to build the XML. Generate a
   feed.xml at the site root following the RSS 2.0 spec. Use the site's
   title (...), link, and description, followed by one title per existing
   post. Include all post until the list grows over 50 and then only
   include last 50. Build it using a reusable script that can be run when
   new posts are added. Add a link to the rss feed on the footer on every
   page."* — including the exact `<link rel="alternate" ...>` tag to use.
2. **Implement it.** Wrote `scripts/build-feed.js` (no dependencies),
   which scrapes `posts/index.html`'s existing `.post-card` markup for
   per-post data and `index.html`'s `<h1>`/`.subtitle` for the channel
   title/description, same as the site's existing scripts already treat
   `posts/index.html` as the single source of truth. Capped output at the
   50 most recent posts; verified the cap by temporarily inflating
   `posts/index.html` to 57 synthetic cards, confirming the script wrote
   exactly 50 items, then restoring the real file. Validated the
   generated `feed.xml` as well-formed XML and checked that a
   title/excerpt containing an apostrophe escapes correctly.

   Added a `<footer class="container">` with the requested
   `<link rel="alternate" type="application/rss+xml" ...>` to every page
   (`index.html`, `posts/index.html`, all 27 post pages, and
   `docs/post-template.html` so future posts get it too) via a one-off
   script, since no footer existed anywhere on the site before this.
   **Deviated from the literal `href="/feed.xml"` given in the request**:
   that root-relative path would 404 on this GitHub Pages *project* page
   (served from a `/cmpa-4303/` subpath, not a custom domain at root) —
   used `../feed.xml` / `./feed.xml` instead, matching the relative-path
   convention the rest of the site already uses. Wrote `docs/rss-feed.md`.

## Maintaining this log

New AI-assisted work gets a new dated entry above, in the same format: what
was asked, what was done, which commit(s) it landed in. Existing entries
don't get edited to look different after the fact — if something needs
correcting, add a note rather than rewriting history.
