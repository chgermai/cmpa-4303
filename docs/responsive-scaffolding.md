# Responsive CSS scaffolding notes

Context for the mobile/desktop scaffolding added to `style.css`. Not linked from
`index.html` — kept as repo-local documentation, not part of the published site.

## Approach

Mobile-first, fluid layout:

- Base styles target small screens; a single `@media (min-width: 768px)` block
  progressively enhances for tablet/desktop.
- Relative units (`rem`, `%`, `clamp()`) do most of the scaling work so the
  breakpoint isn't load-bearing.
- Design tokens live in `:root` as CSS custom properties (color, spacing,
  fluid type scale, `--content-max-width`) so future pages can reuse them
  instead of re-deriving values.

## Layout primitives for future pages

- `.container` — fluid width, centered, padded, capped at
  `--content-max-width`. Apply it to whatever wraps a page's main content
  instead of putting width/margin on `body`.
- Base `header` / `nav` / `main` / `footer` element styles give sane spacing
  defaults so a new page with real nav/footer markup doesn't start from zero.

## Why the viewport meta tag mattered

`index.html` had no `<meta name="viewport">`. Without it, mobile browsers
render the page at a desktop-width virtual viewport and scale it down, so
none of the responsive CSS below would actually take effect on a real phone.
Added `<meta name="viewport" content="width=device-width, initial-scale=1" />`
to `index.html`; any future page needs the same tag.
