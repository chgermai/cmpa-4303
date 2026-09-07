# Post Template

`post-template.html` is the template for every new entry on Views From the On-Call Chair. To write a new post:

1. Copy `docs/post-template.html` into `posts/`, named
   `YYYY-MM-DD-short-title.html` (e.g. `2026-09-06-the-great-dns-caper.html`).
2. Fill in the `{{ placeholders }}`.
3. Add a link to the new post in `posts/index.html`.
4. Commit and push — GitHub Pages picks it up automatically.

Sections are a guide, not a hard rule. Keep the tone light; this is a
tongue-in-cheek blog, not an incident postmortem for work.

# Feature Docs

`feature-doc-template.md` is the template for documenting a feature added to
the site. To document a new feature:

1. Copy `docs/feature-doc-template.md` to `docs/<feature-name>.md`.
2. Fill in the `{{ placeholders }}` and delete any sections that don't apply.

Existing examples: `responsive-scaffolding.md`, `post-scaffolding.md`,
`random-post-button.md`.
