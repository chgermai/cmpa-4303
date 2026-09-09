# Post Template

`post-template.html` is the template for every new entry on Views From the On-Call Chair. To write a new post:

1. Copy `docs/post-template.html` into `posts/`, named
   `NN-short-title.html`, continuing the numbering already in `posts/`
   (e.g. `21-the-clock-that-needed-a-very-specific-path.html`).
2. Fill in the `{{ placeholders }}`.
3. Add a link to the new post in `posts/index.html`.
4. Commit and push — GitHub Pages picks it up automatically.

Sections are a guide, not a hard rule. Keep the tone light; this is a
tongue-in-cheek blog, not an incident postmortem for work.

## Authorship

The existing posts were written by an AI assistant from source data the site
owner provided (real incidents they experienced, then genericized). The owner
supplied and reviewed the facts but did not write the prose and does not claim
authorship of it. Note the same for any future post produced this way. See
`post-scaffolding.md` for the fuller note.

# Feature Docs

`feature-doc-template.md` is the template for documenting a feature added to
the site. To document a new feature:

1. Copy `docs/feature-doc-template.md` to `docs/<feature-name>.md`.
2. Fill in the `{{ placeholders }}` and delete any sections that don't apply.

Existing examples: `responsive-scaffolding.md`, `post-scaffolding.md`,
`random-post-button.md`.
