/**
 * El Trono — Spectacular Animations Engine
 * Page transitions · Scroll reveals · Hero effects · Magnetic buttons · Particles · Tilt
 * Respects prefers-reduced-motion
 */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ============================================================
     1. PRELOADER
     ============================================================ */
  function initPreloader() {
    if (reduceMotion) return;
    // Only show on first visit of the session or hard reload
    if (sessionStorage.getItem('eltrono_preloader')) return;

    const pre = document.createElement('div');
    pre.className = 'preloader';
    pre.innerHTML = `
      <div class="preloader-crown" aria-hidden="true">
        <i class="fas fa-crown" style="font-size:3.2rem"></i>
      </div>
      <div class="preloader-text">El Trono</div>
      <div class="preloader-bar"><span></span></div>
    `;
    document.body.appendChild(pre);
    document.body.style.overflow = 'hidden';

    const minTime = 1400;
    const start = performance.now();

    function finish() {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minTime - elapsed);
      setTimeout(() => {
        pre.classList.add('done');
        document.body.style.overflow = '';
        sessionStorage.setItem('eltrono_preloader', '1');
        setTimeout(() => pre.remove(), 800);
        // Trigger hero load after preloader
        document.querySelectorAll('.hero, .page-hero').forEach(el => el.classList.add('loaded'));
      }, wait);
    }

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish);
  }

  /* ============================================================
     2. PAGE TRANSITIONS (View Transitions API + fallback)
     ============================================================ */
  function initPageTransitions() {
    if (reduceMotion) return;

    // Create overlay for fallback
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = '<div class="pt-crown"><i class="fas fa-crown"></i></div>';
    document.body.appendChild(overlay);

    const supportsVT = 'startViewTransition' in document;

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') ||
          href.startsWith('tel:') || href.startsWith('https://wa.me') || link.target === '_blank' ||
          link.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey) return;

      // Same page or external → ignore
      try {
        const url = new URL(href, location.href);
        if (url.origin !== location.origin) return;
        if (url.pathname === location.pathname && !url.hash) return;
      } catch (_) { return; }

      e.preventDefault();

      if (supportsVT) {
        document.startViewTransition(() => {
          location.href = href;
        });
      } else {
        // Fallback elegant overlay
        overlay.classList.add('active');
        setTimeout(() => { location.href = href; }, 480);
      }
    });
  }

  /* ============================================================
     3. HERO & PAGE-HERO ENTRANCE
     ============================================================ */
  function initHero() {
    const heroes = document.querySelectorAll('.hero, .page-hero');
    if (!heroes.length) return;

    // If no preloader, trigger immediately
    if (reduceMotion || sessionStorage.getItem('eltrono_preloader')) {
      heroes.forEach(h => h.classList.add('loaded'));
    } else {
      // Preloader will trigger it
      setTimeout(() => heroes.forEach(h => h.classList.add('loaded')), 1800);
    }

    // Gold particles on main hero
    const mainHero = document.querySelector('.hero');
    if (mainHero && !reduceMotion && !isTouch) {
      createParticles(mainHero);
    }
  }

  function createParticles(container) {
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let w, h, particles = [], raf;

    function resize() {
      w = canvas.width = container.offsetWidth;
      h = canvas.height = container.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(45, Math.floor(w / 30));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.25 - 0.15,
        alpha: Math.random() * 0.45 + 0.15
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 39, ${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    // Pause when not visible
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
    io.observe(container);
  }

  /* ============================================================
     4. ADVANCED SCROLL REVEAL
     ============================================================ */
  function initScrollReveal() {
    // Auto-apply data-reveal to common elements if not already present
    const autoSelectors = [
      { sel: '.section-header', type: 'up' },
      { sel: '.service-card', type: 'up' },
      { sel: '.product-card', type: 'scale' },
      { sel: '.barber-card', type: 'scale' },
      { sel: '.gallery-item', type: 'scale' },
      { sel: '.contact-card', type: 'left' },
      { sel: '.testi-header', type: 'up' },
      { sel: '.promo-strip', type: 'fade' },
      { sel: '.footer .container > div', type: 'up' },
      { sel: '.benefit, .beneficio, .feature-item, .labor-card', type: 'up' },
      { sel: '.about-content, .about-images', type: 'up' }
    ];

    autoSelectors.forEach(({ sel, type }) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        if (!el.hasAttribute('data-reveal')) {
          el.setAttribute('data-reveal', type);
          // Stagger within groups
          const parent = el.parentElement;
          if (parent) {
            const siblings = parent.querySelectorAll(sel);
            const idx = Array.from(siblings).indexOf(el);
            if (idx >= 0 && idx < 8) {
              el.setAttribute('data-reveal-delay', String(idx + 1));
            }
          }
        }
      });
    });

    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    if (reduceMotion) {
      els.forEach(el => el.classList.add('revealed'));
      return;
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    window.__revealObs = obs;
    els.forEach(el => obs.observe(el));
  }

  /* ============================================================
     5. 3D TILT ON CARDS
     ============================================================ */
  function initTilt() {
    if (reduceMotion || isTouch) return;

    const cards = document.querySelectorAll('.service-card, .product-card, .barber-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;
        const rotateX = ((y - midY) / midY) * -7;
        const rotateY = ((x - midX) / midX) * 7;

        card.classList.add('tilt-active');
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('tilt-active');
        card.style.transform = '';
      });
    });
  }

  /* ============================================================
     6. MAGNETIC BUTTONS
     ============================================================ */
  function initMagnetic() {
    if (reduceMotion || isTouch) return;

    const magnets = document.querySelectorAll('.btn-gold, .btn-outline, .nav-cta, .float-wa');
    magnets.forEach(btn => {
      btn.classList.add('magnetic');
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ============================================================
     7. LAZY IMAGE FADE-IN
     ============================================================ */
  function initLazyImages() {
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    imgs.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
      }
    });
  }

  /* ============================================================
     8. DYNAMIC CARDS (services/products rendered by main.js)
     Apply data-reveal + tilt after DOM injection
     ============================================================ */
  function applyRevealTo(el, type, delayIdx) {
    if (el.hasAttribute('data-reveal')) return;
    el.setAttribute('data-reveal', type);
    if (delayIdx != null && delayIdx < 8) {
      el.setAttribute('data-reveal-delay', String(delayIdx + 1));
    }
    // Observe immediately
    if (!window.__revealObs) return;
    window.__revealObs.observe(el);
  }

  function observeDynamicCards() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          if (node.classList && node.classList.contains('service-card')) {
            applyRevealTo(node, 'up', Array.from(node.parentElement.children).indexOf(node));
          }
          if (node.classList && node.classList.contains('product-card')) {
            applyRevealTo(node, 'scale', Array.from(node.parentElement.children).indexOf(node));
          }
          // also check children
          node.querySelectorAll && node.querySelectorAll('.service-card').forEach((el, i) => applyRevealTo(el, 'up', i));
          node.querySelectorAll && node.querySelectorAll('.product-card').forEach((el, i) => applyRevealTo(el, 'scale', i));
        });
      });
      initTilt();
    });

    const targets = [
      document.getElementById('services-grid'),
      document.getElementById('shop-grid')
    ].filter(Boolean);

    targets.forEach(t => observer.observe(t, { childList: true, subtree: true }));
  }

  /* ============================================================
     9. SMOOTH ANCHOR SCROLL WITH OFFSET
     ============================================================ */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const headerH = document.getElementById('header')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
        window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function boot() {
    initPreloader();
    initPageTransitions();
    initHero();
    initScrollReveal();
    initTilt();
    initMagnetic();
    initLazyImages();
    observeDynamicCards();
    initSmoothAnchors();

    // Mark body as ready for any CSS that depends on it
    document.documentElement.classList.add('js-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
