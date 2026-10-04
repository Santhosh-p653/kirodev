# UG CloudWeld — Design

## Architecture

Single-page static frontend. No server, no build step, no dependencies.

```
kirodev/
├── index.html   — semantic structure and content
├── style.css    — all styling, theming, responsive layout
└── script.js    — all interactions and DOM behaviour
```

## Visual Design

- **Theme:** Dark, cloud-native (`#0d1117` background)
- **Accent:** AWS-inspired amber (`#f89820`)
- **Area colours:** Build = green, Learn = blue, Connect = purple
- **Typography:** System font stack, strong hierarchy, restrained sizing
- **Components:** Rounded cards, subtle borders, no decorative illustrations

## CSS Architecture

All colours are CSS custom properties on `:root`. Components reference variables only.
Responsive via two `@media` breakpoints: `max-width: 900px` and `max-width: 640px`.

## JavaScript Architecture

- No global state object — simple module-level `const`/`let` variables
- All interactions wired with `addEventListener`
- Mobile nav: class toggle on `#main-nav`, `aria-expanded` on toggle button
- Scroll tracking: `window.scroll` listener reads `section[id]` offsets
- Status cycling: `setInterval` at 5 000 ms, skips when a card is expanded

## Sections → Files mapping

| Section          | HTML id        | CSS classes               | JS behaviour                    |
|-----------------|----------------|---------------------------|---------------------------------|
| Header          | —              | `.site-header`            | nav toggle, active link scroll  |
| Hero            | —              | `.hero`                   | CTA message cycle + scroll      |
| Workspace       | `#workspace`   | `.workspace-card`         | status update on click          |
| Projects        | `#projects`    | `.project-card`           | expand/collapse, keyboard       |
| Activity        | `#activity`    | `.activity-feed`          | status cycle, newest highlight  |
| Footer          | `#footer`      | `.site-footer`            | —                               |
