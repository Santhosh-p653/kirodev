# Bugfix Requirements Document

## Introduction

The UG CloudWeld static frontend (`index.html`, `style.css`, `script.js`) contains several
defects across three severity levels. The most impactful gap is that three modal dialogs
and an AI agent widget are fully marked up in HTML but have no CSS rules and no JavaScript
behaviour — they are invisible and non-functional. Secondary issues include hero stat values
that display as placeholder em-dashes instead of real numbers, an inline style in the
activity-feed highlight function that bypasses the design-token system, and two missing
foundational declarations (a `<meta name="description">` tag and a `.font-mono` utility
class). Together these defects leave roughly 40 % of the page's interactive surface area
completely broken.

---

## Bug Analysis

### Current Behavior (Defect)

**Modals — no styles**

1.1 WHEN any modal backdrop or modal element is rendered by the browser THEN the system
    displays an unstyled, visually broken overlay because `.modal-backdrop`, `.modal`,
    `.modal-close`, `.modal-header`, `.modal-title`, `.modal-subtitle`, `.modal-body`,
    `.modal-form`, `.modal-wide`, `.form-group`, `.form-label`, `.form-input`,
    `.form-error`, `.interest-grid`, `.interest-chip`, `.btn-full`, `.btn-spinner`,
    `.link-btn`, `.modal-footer-note`, `.project-modal-meta`, `.project-modal-desc`,
    `.project-modal-stack`, `.stack-label`, `.stack-value`, `.project-modal-actions`,
    `.area-modal-icon`, `.area-modal-list`, `.toast-container`, and `.toast` CSS rules
    are entirely absent from `style.css`

1.2 WHEN any modal backdrop is visible THEN the system does not dim or cover the
    underlying page because no backdrop overlay style exists

**Modals — no open/close logic**

1.3 WHEN the user clicks "Join the Build" (hero CTA, `#hero-cta`) or "Start Building"
    (`#header-join-btn`) THEN the system does not open the join modal because no
    JavaScript event listener wires those buttons to `#join-modal-backdrop`

1.4 WHEN the user clicks a project card THEN the system does not open the project detail
    modal because `script.js` only toggles an `.expanded` CSS class; it never removes the
    `hidden` attribute from `#project-modal-backdrop` or populates the modal with the
    card's `data-*` attribute values

1.5 WHEN the user clicks an "Explore …" button on a workspace card THEN the system does
    not open the workspace area detail modal because no JavaScript handler targets
    `#area-modal-backdrop`

1.6 WHEN a modal is open and the user clicks the backdrop or presses Escape THEN the
    system does not close the modal because no close logic exists

**Modals — no focus trap**

1.7 WHEN a modal is open THEN the system allows keyboard focus to move freely behind the
    modal overlay because no focus-trap logic confines Tab/Shift-Tab to the modal's
    focusable children

**Hero stats render as em-dashes**

1.8 WHEN the page loads THEN the system displays "—" in all three hero stat value spans
    (`#stat-members`, `#stat-projects`, `#stat-workshops`) because `script.js` never
    assigns values to those elements

**Agent widget completely unwired**

1.9 WHEN the user clicks the floating agent button (`#agent-fab`) THEN the system does
    not open the agent panel because no JavaScript handles the `#agent-fab` click event

1.10 WHEN the agent panel is open and the user clicks `#agent-close` THEN the system does
     not close the panel because no close handler exists

1.11 WHEN the user clicks a suggestion chip (`.agent-chip`) THEN the system does not
     populate the input or send a message because no handler is wired to those buttons

1.12 WHEN the user submits the agent form (`#agent-form`) THEN the system does not add a
     user message or a bot reply to `#agent-messages` because no submit handler exists

1.13 WHEN the agent widget is rendered THEN the system displays it without any visual
     styling because `.agent-widget`, `.agent-fab`, `.agent-fab-icon`, `.agent-fab-badge`,
     `.agent-panel`, `.agent-header`, `.agent-header-info`, `.agent-logo-mark`,
     `.agent-name`, `.agent-status-text`, `.agent-online-dot`, `.agent-close`,
     `.agent-messages`, `.agent-msg`, `.agent-msg-bot`, `.agent-suggestions`,
     `.agent-chip`, `.agent-input-row`, `.agent-input`, and `.agent-send` CSS rules are
     entirely absent from `style.css`

**Inline style in `highlightNewest`**

1.14 WHEN `highlightNewest()` runs THEN the system sets `items[0].style.backgroundColor`
     directly on the element, bypassing the CSS variable system and making the highlight
     colour inconsistent with theming changes

**Missing meta description**

1.15 WHEN a search engine or link-preview tool reads the page `<head>` THEN the system
     returns no page description because the `<meta name="description">` tag is absent
     from `index.html`

**Missing `.font-mono` utility class**

1.16 WHEN an element carries the class `font-mono` (e.g. `.stack-value.font-mono` in the
     project detail modal) THEN the system applies no monospace font because the
     `.font-mono` utility rule is absent from `style.css`

---

### Expected Behavior (Correct)

**Modals — styles**

2.1 WHEN any modal backdrop or modal element is rendered THEN the system SHALL display a
    fully styled, visually coherent overlay using only CSS custom properties from `:root`,
    with all modal component classes defined in `style.css`

2.2 WHEN any modal backdrop is visible THEN the system SHALL cover the full viewport with
    a semi-transparent dark overlay that dims the underlying page content

**Modals — open/close logic**

2.3 WHEN the user clicks `#hero-cta` or `#header-join-btn` THEN the system SHALL remove
    the `hidden` attribute from `#join-modal-backdrop`, move focus to the first focusable
    element inside `#join-modal`, and set `aria-expanded="true"` on the trigger

2.4 WHEN the user clicks a project card THEN the system SHALL remove the `hidden`
    attribute from `#project-modal-backdrop`, populate modal fields (`#project-modal-title`,
    `#pm-tag`, `#pm-status`, `#pm-author`, `#pm-desc`, `#pm-stack`, `#pm-demo-btn`,
    `#pm-github-btn`) from the card's `data-*` attributes, and move focus to
    `#project-modal-close`

2.5 WHEN the user clicks an "Explore …" workspace card button THEN the system SHALL remove
    the `hidden` attribute from `#area-modal-backdrop`, populate `#area-modal-title`,
    `#am-subtitle`, `#am-icon`, and `#am-list` with area-specific content, and move focus
    to `#area-modal-close`

2.6 WHEN a modal is open and the user clicks the backdrop outside the modal panel OR
    presses Escape THEN the system SHALL add the `hidden` attribute back to the modal
    backdrop, restore focus to the element that triggered the modal, and update
    `aria-expanded` on the trigger to `"false"`

**Modals — focus trap**

2.7 WHEN a modal is open THEN the system SHALL confine Tab and Shift-Tab keyboard
    navigation to the focusable elements within the active modal, preventing focus from
    reaching elements behind the overlay

**Hero stats**

2.8 WHEN the page loads THEN the system SHALL populate `#stat-members`, `#stat-projects`,
    and `#stat-workshops` with real display values (e.g. "120+", "18", "9") so that the
    hero stats section shows meaningful community figures instead of em-dashes

**Agent widget**

2.9 WHEN the user clicks `#agent-fab` THEN the system SHALL remove the `hidden` attribute
    from `#agent-panel`, set `aria-expanded="true"` on `#agent-fab`, and move focus to
    `#agent-input`

2.10 WHEN the agent panel is open and the user clicks `#agent-close` or presses Escape
     THEN the system SHALL add `hidden` back to `#agent-panel`, set
     `aria-expanded="false"` on `#agent-fab`, and return focus to `#agent-fab`

2.11 WHEN the user clicks a `.agent-chip` suggestion button THEN the system SHALL copy
     the chip's `data-q` value into `#agent-input` and submit the form automatically

2.12 WHEN the user submits `#agent-form` with non-empty input THEN the system SHALL
     append a user message bubble and a canned bot reply to `#agent-messages`, clear the
     input field, and scroll the messages container to the bottom

2.13 WHEN the agent widget is rendered THEN the system SHALL display a correctly styled
     floating action button, badge, and expandable chat panel using only CSS custom
     properties, with all agent component classes defined in `style.css`

**Inline style in `highlightNewest`**

2.14 WHEN `highlightNewest()` runs THEN the system SHALL apply and remove a CSS class
     (e.g. `.activity-item--highlight`) instead of setting `style.backgroundColor`
     directly, keeping the highlight colour defined as a CSS custom property in
     `style.css`

**Meta description**

2.15 WHEN a search engine or link-preview tool reads the page `<head>` THEN the system
     SHALL return a concise description of UG CloudWeld via a `<meta name="description">`
     tag in `index.html`

**`.font-mono` utility class**

2.16 WHEN an element carries the class `font-mono` THEN the system SHALL render its text
     in `var(--font-mono)` because the `.font-mono` utility rule is present in `style.css`

---

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the user clicks the mobile nav toggle (`#nav-toggle`) THEN the system SHALL
    CONTINUE TO open and close the mobile navigation menu and update `aria-expanded`
    correctly

3.2 WHEN the user scrolls the page THEN the system SHALL CONTINUE TO update the active
    state on the matching nav link via `updateActiveNav()`

3.3 WHEN the user clicks `#hero-cta` after it has already been clicked (cycle through
    `ctaMessages`) THEN the system SHALL CONTINUE TO cycle the button text through the
    four canned messages and scroll to `#workspace` on the second click

3.4 WHEN the user clicks a project card THEN the system SHALL CONTINUE TO toggle the
    `.expanded` CSS class and update the status message via `updateStatus()`

3.5 WHEN the user presses Enter or Space on a focused project card THEN the system SHALL
    CONTINUE TO trigger the card's click handler

3.6 WHEN the user clicks a workspace card (the card element itself, not the "Explore"
    button) THEN the system SHALL CONTINUE TO update the status message and collapse any
    expanded project cards

3.7 WHEN the status cycle interval fires every 5 seconds with no card expanded THEN the
    system SHALL CONTINUE TO rotate through `statusMessages` and call `updateStatus()`

3.8 WHEN the page loads and 800 ms elapse THEN the system SHALL CONTINUE TO call
    `highlightNewest()` and briefly highlight the first activity item

3.9 WHEN the user resizes the viewport to 900 px or below THEN the system SHALL CONTINUE
    TO collapse the workspace grid to a single column and the projects grid to a single
    column

3.10 WHEN the user resizes the viewport to 640 px or below THEN the system SHALL CONTINUE
     TO hide the header CTA, show the nav toggle, and stack the hero action buttons
     vertically

3.11 WHEN any button or interactive element receives focus via keyboard THEN the system
     SHALL CONTINUE TO display a 2 px `var(--color-accent)` `focus-visible` outline
