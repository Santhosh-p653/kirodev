# UG CloudWeld — Agent Steering

## Project

UG CloudWeld is a minimal three-file static frontend (`index.html`, `style.css`, `script.js`).
It runs by opening `index.html` directly in a browser. No build tools, no frameworks, no npm.

## Stack

- HTML5 (semantic)
- CSS3 (custom properties, no frameworks)
- Vanilla JavaScript (ES6+, no libraries)

## Conventions

- All colours reference CSS variables defined in `style.css` — never hardcode hex values in HTML or JS.
- JavaScript uses `const`/`let`, named functions, and `addEventListener`. No jQuery, no TypeScript.
- Keep the file count at exactly three. Do not create additional files.
- Responsive breakpoints: 900px (tablet), 640px (mobile).
- Accessibility: semantic HTML, `aria-*` attributes on interactive elements, `focus-visible` styles.

## What Kiro should NOT do

- Do not add `package.json`, `README.md`, `.gitignore`, or any config files.
- Do not introduce frameworks, build tools, or npm dependencies.
- Do not add backend, API, or server files.
- Do not create additional HTML, CSS, or JS files.

## Content tone

Community-driven, builder-focused, cloud-native. Not a recreation of the AWS console.
Avoid fake metrics, fake partnerships, or official AWS affiliation claims.
