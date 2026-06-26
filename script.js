/* ============================================================
   DESBLOQUEA TUS IDEAS — script.js
   ============================================================
   Funcionalidades:
   1. Navbar sticky con sombra al hacer scroll
   2. Menú hamburguesa para mobile
   3. FAQ acordeón
   4. Fade-in on scroll (Intersection Observer)
   5. Scroll suave para anclas del nav
   ============================================================ */

/* ── 1. NAVBAR STICKY SHADOW ─────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


/* ── 2. HAMBURGER / MOBILE DRAWER ───────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const navDrawer  = document.getElementById('nav-drawer');
const drawerClose = document.getElementById('drawer-close');

function openDrawer() {
  navDrawer.style.display = 'flex';
  // allow the transition to play
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      navDrawer.classList.add('open');
    });
  });
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  navDrawer.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    navDrawer.style.display = 'none';
  }, 300);
}

hamburger.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
});


/* ── 3. FAQ ACORDEÓN ────────────────────────────────────────── */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer   = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Cierra todos los items abiertos
    faqItems.forEach(other => {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
      }
    });

    // Toggle el item actual
    if (isOpen) {
      item.classList.remove('open');
      question.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = null;
    } else {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});


/* ── 4. FADE-IN ON SCROLL ───────────────────────────────────── */
const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  fadeEls.forEach(el => fadeObserver.observe(el));
} else {
  // Fallback: show everything immediately if IntersectionObserver not supported
  fadeEls.forEach(el => el.classList.add('visible'));
}


/* ── 5. SMOOTH SCROLL FOR NAV ANCHORS ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navbarHeight = navbar.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 12;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});
