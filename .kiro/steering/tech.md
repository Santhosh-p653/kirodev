# UG CloudWeld — Tech Stack

## Stack

- **HTML5** — semantic markup, no templating engine
- **CSS3** — custom properties (variables), no frameworks
- **Vanilla JavaScript** — ES6+, no libraries or bundlers

## Constraints

- No build tools, no npm, no package managers
- No frameworks (React, Vue, etc.)
- No TypeScript
- Runs by opening `index.html` directly in a browser

## Running the Project

Open `index.html` in any modern browser. No server or build step required.

For local development with live reload, any static file server works:

```
# Python
python -m http.server 8080

# VS Code
Live Server extension → Open with Live Server
```

## CSS Variables

All design tokens live in `:root` in `style.css`. Always reference these — never hardcode hex values.

Key variable groups: `--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--transition`

## JavaScript Conventions

- `const`/`let` only — no `var`
- Named functions, not anonymous callbacks where possible
- `addEventListener` for all event binding — no inline handlers
- DOM references declared once at the top of `script.js`
- No jQuery, no external scripts
