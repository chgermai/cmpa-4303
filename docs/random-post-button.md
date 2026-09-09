# Random post button notes

Context for the "Take me to a random post" button added to `index.html`,
`js/random-post.js`, and `css/style.css`. Not linked from the published site as
documentation — kept as repo-local notes for how the feature works.

## Request

Add a button to `index.html` that randomly selects a post from `posts/` and
navigates to it.

## Approach

- Button markup lives in `index.html` (`#random-post`, class `.button`).
- Behavior lives in `js/random-post.js`, loaded from `index.html` with
  `<script src="js/random-post.js" defer>`. It's wrapped in an IIFE and
  no-ops when `#random-post` is absent, so it's safe to load on any page.
- On click, the script `fetch()`es `posts/index.html`, parses it with
  `DOMParser`, and collects the `href`s of `.post-list a.post-card-link` —
  the same post cards humans see on the Posts page. This keeps the feature in
  sync as new posts are added; there is no second list to maintain.
- One entry is chosen at random and the browser navigates to
  `posts/<file>`.
- On failure (list won't load, no posts) the button re-enables and shows a
  retry message; the error is logged to the console.

## Styling

- New `.button` / `.button:hover` / `.button:disabled` classes in
  `css/style.css` reuse the existing `--color-accent` / `--color-accent-contrast`
  tokens and spacing scale rather than introducing new values.

## Caveat

`fetch()` needs the page served over HTTP (local dev server or GitHub
Pages). Opening `index.html` directly via `file://` blocks the request, and
the button falls back to its retry message. If a `file://` workflow is ever
needed, swap the fetch for a hardcoded array of post paths.
