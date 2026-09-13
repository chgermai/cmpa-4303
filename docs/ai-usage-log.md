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

## Maintaining this log

New AI-assisted work gets a new dated entry above, in the same format: what
was asked, what was done, which commit(s) it landed in. Existing entries
don't get edited to look different after the fact — if something needs
correcting, add a note rather than rewriting history.
