# UG CloudWeld — Project Structure

## File Layout

```
kirodev/
├── index.html   # All markup and page structure
├── style.css    # All styles, variables, and responsive rules
└── script.js    # All interactivity and DOM logic
```

The file count is fixed at exactly three. Do not create additional files.

## Responsibilities by File

### `index.html`
- Semantic HTML5 structure (`header`, `section`, `article`, `footer`, `nav`)
- All `aria-*` attributes and accessibility annotations live here
- No inline styles, no inline event handlers
- Script loaded at the bottom of `<body>` with `<script src="script.js">`

### `style.css`
- `:root` block at the top defines all CSS custom properties (colours, spacing, radii, transitions, fonts)
- Sections are ordered: Reset → Utility → Buttons → Header → Hero → Workspace → Projects → Activity → Footer → Responsive
- Responsive rules at the bottom in two `@media` blocks: `≤900px` (tablet), `≤640px` (mobile)
- No hardcoded hex values outside of `:root`

### `script.js`
- DOM references grouped at the top
- Sections separated by banner comments matching the HTML section names
- Behaviour grouped by feature: Mobile Nav → Scroll/Active Nav → Hero CTA → Project Cards → Status → Workspace Cards → Activity Feed → Init
- `updateActiveNav()` called once on init, then on scroll

## Naming Conventions

| Context | Pattern | Example |
|---|---|---|
| CSS classes | kebab-case | `.project-card-title` |
| CSS variables | `--category-name` | `--color-accent`, `--space-lg` |
| JS variables | camelCase | `navToggle`, `projectCards` |
| HTML IDs | kebab-case | `#main-nav`, `#activity-feed` |
| `data-*` attributes | kebab-case | `data-area="build"` |

## Accessibility Patterns

- Interactive non-`<button>` elements get `tabindex="0"` and keyboard handlers for `Enter`/`Space`
- Toggle buttons maintain `aria-expanded` state
- Decorative icons use `aria-hidden="true"`
- Focus styles use `focus-visible` with `--color-accent` outline
