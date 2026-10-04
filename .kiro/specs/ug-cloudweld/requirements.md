# UG CloudWeld — Requirements

## Overview

UG CloudWeld is a community-driven cloud engineering workspace interface. It is a minimal static
frontend communicating the idea of bringing together cloud, AI, builders, projects and community.

## Requirements

### 1. Header
- MUST display UG CloudWeld branding with logo mark and name
- MUST include navigation links to Workspace, Projects, Activity, and Community sections
- MUST include a primary CTA button ("Start Building")
- MUST be sticky and remain visible while scrolling
- MUST include a mobile hamburger menu that toggles navigation on small screens

### 2. Hero Section
- MUST display the project title "UG CloudWeld"
- MUST display a tagline about building, learning and shipping with cloud technology
- MUST display a short supporting description
- MUST include a primary CTA button and a secondary outline button
- MUST NOT claim official AWS affiliation

### 3. CloudWeld Workspace Section
- MUST display three cards: BUILD, LEARN, CONNECT
- BUILD card MUST list: Cloud projects, AI experiments, Developer tools
- LEARN card MUST list: Workshops, Cloud concepts, Hands-on learning
- CONNECT card MUST list: Builders, Community, Events
- Each card MUST be visually distinct with a colour associated to its area

### 4. Featured Projects Section
- MUST display at least four static project cards
- Each card MUST show: tag, status (Live / In Progress), title, description, author, stack
- Cards MUST be interactive (click/keyboard to expand/highlight)

### 5. Activity Section
- MUST display a static activity feed with at least five items
- Each item MUST have a colour-coded dot, text, and timestamp
- MUST show a live status indicator that cycles messages automatically

### 6. Footer
- MUST display UG CloudWeld branding
- MUST include a short community-oriented statement
- MUST note it is not affiliated with AWS

### 7. Interactions
- MUST implement mobile navigation toggle
- MUST implement active nav link highlighting on scroll
- MUST implement hero CTA message cycling
- MUST implement project card expand interaction with keyboard support
- MUST implement dynamic status message rotation

### 8. Technical Constraints
- MUST be exactly three files: index.html, style.css, script.js
- MUST run by opening index.html directly in a browser
- MUST NOT use any frameworks, build tools, or npm packages
- MUST support responsive layout at 900px and 640px breakpoints
- MUST use CSS custom properties for all colour values
