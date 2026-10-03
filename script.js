/* =============================================
   UG CloudWeld — script.js
   ============================================= */

/* --- DOM References --- */
const navToggle    = document.getElementById('nav-toggle');
const mainNav      = document.getElementById('main-nav');
const heroCta      = document.getElementById('hero-cta');
const projectCards = document.querySelectorAll('.project-card');
const navLinks     = document.querySelectorAll('.main-nav a');
const statusMsg    = document.getElementById('status-message');
const activityFeed = document.getElementById('activity-feed');

/* =============================================
   MOBILE NAVIGATION
   ============================================= */
function openNav() {
  mainNav.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
}

function closeNav() {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', function () {
  const isOpen = mainNav.classList.contains('open');
  if (isOpen) {
    closeNav();
  } else {
    openNav();
  }
});

// Close nav when a link is clicked
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    closeNav();
  });
});

// Close nav when clicking outside
document.addEventListener('click', function (e) {
  if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
    closeNav();
  }
});

// Close nav on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeNav();
  }
});

/* =============================================
   ACTIVE NAV LINK ON SCROLL
   ============================================= */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  let current = '';
  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* =============================================
   HERO CTA
   ============================================= */
const ctaMessages = [
  'Welcome to CloudWeld.',
  'Let\'s build something.',
  'The workspace is ready.',
  'Ship it. ☁️',
];
let ctaIndex = 0;

heroCta.addEventListener('click', function () {
  ctaIndex = (ctaIndex + 1) % ctaMessages.length;
  heroCta.textContent = ctaMessages[ctaIndex];

  // Scroll to workspace after first click
  if (ctaIndex === 1) {
    const workspace = document.getElementById('workspace');
    if (workspace) {
      workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

/* =============================================
   PROJECT CARD INTERACTION
   ============================================= */
projectCards.forEach(function (card) {
  // Click to expand/highlight
  card.addEventListener('click', function () {
    const isExpanded = card.classList.contains('expanded');

    // Collapse all first
    projectCards.forEach(function (c) {
      c.classList.remove('expanded');
    });

    if (!isExpanded) {
      card.classList.add('expanded');
      updateStatus('Viewing: ' + card.querySelector('.project-card-title').textContent);
    } else {
      updateStatus('Workspace active');
    }
  });

  // Keyboard: Enter or Space triggers click
  card.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

/* =============================================
   DYNAMIC STATUS MESSAGE
   ============================================= */
const statusMessages = [
  'Workspace active',
  '3 builders online',
  'New project shared',
  'Workshop starting soon',
  'Workspace active',
];
let statusIndex = 0;

function updateStatus(msg) {
  if (statusMsg) {
    statusMsg.textContent = msg;
  }
}

function cycleStatus() {
  // Only auto-cycle if no card is expanded
  const anyExpanded = document.querySelector('.project-card.expanded');
  if (!anyExpanded) {
    statusIndex = (statusIndex + 1) % statusMessages.length;
    updateStatus(statusMessages[statusIndex]);
  }
}

// Rotate status every 5 seconds
setInterval(cycleStatus, 5000);

/* =============================================
   WORKSPACE CARD INTERACTION
   ============================================= */
const workspaceCards = document.querySelectorAll('.workspace-card');

workspaceCards.forEach(function (card) {
  card.addEventListener('click', function () {
    const area = card.getAttribute('data-area');
    const label = card.querySelector('.workspace-card-title').textContent;
    updateStatus('Exploring: ' + label);

    // Collapse any expanded project cards
    projectCards.forEach(function (c) {
      c.classList.remove('expanded');
    });
  });
});

/* =============================================
   ACTIVITY FEED — HIGHLIGHT NEWEST ITEM
   ============================================= */
function highlightNewest() {
  const items = activityFeed.querySelectorAll('.activity-item');
  if (items.length > 0) {
    items[0].style.backgroundColor = 'var(--color-surface-2)';
    setTimeout(function () {
      items[0].style.backgroundColor = '';
    }, 2000);
  }
}

// Highlight newest item shortly after page load
setTimeout(highlightNewest, 800);

/* =============================================
   INIT
   ============================================= */
updateActiveNav();
