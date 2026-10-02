/**
 * El Trono — Main UI logic
 * Tienda se renderiza desde EL_TRONO.products (data.js)
 */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  const path = location.pathname.split('/').pop() || 'inicio.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes(path) || (path === '' && href.includes('inicio'))) {
      link.classList.add('active');
    }
  });

  // Render services + shop from data.js
  renderServices();
  renderShop();

  // Contact form → WhatsApp (message addressed to the barbershop, in the visitor's language)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const t = (k) => (typeof Lang !== 'undefined' ? Lang.t(k) : k);
      const lang = (typeof Lang !== 'undefined' && Lang.current) || 'es';
      const name = form.name?.value?.trim() || '';
      const phone = form.phone?.value?.trim() || '';
      const svcKey = form.service?.value || '';
      const service = svcKey ? t('form_svc_' + svcKey) : '';
      const message = form.message?.value?.trim() || '';
      const M = EL_TRONO.waMsg[lang] || EL_TRONO.waMsg.es;
      const intro = lang === 'en'
        ? `My name is ${name}. I'd like to book an appointment or ask about the following:`
        : `Mi nombre es ${name}. Quisiera reservar una cita o consultar lo siguiente:`;
      let text = `${M.greet}\n\n${intro}\n\n*${t('wa_form_service')}:* ${service}\n*${t('wa_form_phone')}:* ${phone}`;
      if (message) text += `\n*${t('wa_form_msg')}:* ${message}`;
      text += `\n\n${M.close}`;
      window.open(`https://wa.me/${EL_TRONO.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });
  }

  if (typeof Lang !== 'undefined') {
    Lang.init();
    document.addEventListener('langchange', () => { renderServices(); renderShop(); applyWaLinks(); });
  }
  applyWaLinks();
  applySocialLinks();

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.service-card, .product-card, .gallery-item, .contact-card, .about-content, .about-images, .barber-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    obs.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = '.visible{opacity:1!important;transform:translateY(0)!important}';
  document.head.appendChild(style);
});

/** Every <a data-wa="key"> gets a ready-written WhatsApp message in the current language. */
function applyWaLinks(root) {
  if (typeof EL_TRONO === 'undefined' || !EL_TRONO.waUrl) return;
  const lang = (typeof Lang !== 'undefined' && Lang.current) || 'es';
  (root || document).querySelectorAll('[data-wa]').forEach(a => {
    const vars = {};
    if (a.dataset.waProduct) vars.product = a.dataset.waProduct;
    if (a.dataset.waBarber) vars.barber = a.dataset.waBarber;
    a.href = EL_TRONO.waUrl(a.dataset.wa, vars, lang);
  });
}

/** Servicios: se dibujan desde EL_TRONO.services (js/data.js) — nombres y precios en un solo lugar. */
const SERVICE_ICONS = {
  razor: '<svg class="icon-razor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><g transform="rotate(-18 12 12)"><path d="M1.6 8.4h12.6a1.6 1.6 0 0 1 1.6 1.6v.4a1.6 1.6 0 0 1-1.6 1.6H5.6C3.3 12 2 10.6 1.6 8.4z" fill="currentColor"/><g transform="rotate(38 14.6 10.2)"><rect x="12.9" y="8.5" width="10.2" height="3.4" rx="1.7" fill="currentColor" opacity=".8"/></g><circle cx="14.6" cy="10.2" r="1.1" fill="#1a1608" stroke="currentColor" stroke-width=".7"/></g></svg>',
  comb: '<svg class="icon-comb" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2" y="5" width="20" height="6" rx="2" fill="currentColor"/><g fill="currentColor" opacity=".85"><rect x="3.2" y="11" width="1.7" height="8" rx=".85"/><rect x="6.4" y="11" width="1.7" height="8" rx=".85"/><rect x="9.6" y="11" width="1.7" height="8" rx=".85"/><rect x="12.8" y="11" width="1.7" height="8" rx=".85"/><rect x="16" y="11" width="1.7" height="8" rx=".85"/><rect x="19.2" y="11" width="1.7" height="8" rx=".85"/></g></svg>'
};

function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid || typeof EL_TRONO === 'undefined') return;
  const lang = (typeof Lang !== 'undefined' && Lang.current) || 'es';
  const t = (key) => (typeof Lang !== 'undefined' ? Lang.t(key) : key);
  const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  grid.innerHTML = EL_TRONO.services.map(sv => {
    const icon = SERVICE_ICONS[sv.icon] || `<i class="fas ${sv.icon}"></i>`;
    const items = sv.items.map(it =>
      `<li><span>${esc(it[lang] || it.es)}</span><span class="svc-price">${esc(EL_TRONO.priceService(it.price))}</span></li>`
    ).join('');
    const badge = sv.featured ? `<div class="service-badge">${esc(t('service_popular'))}</div>` : '';
    const cta = sv.cta === 'consult' ? 'service_consult' : 'service_book';
    return `
        <article class="service-card${sv.featured ? ' featured' : ''}">
          ${badge}
          <div class="service-icon">${icon}</div>
          <h3>${esc(t('service_' + sv.id))}</h3>
          <ul>${items}</ul>
          <a href="#" data-wa="${sv.id}" class="service-link" target="_blank" rel="noopener">${esc(t(cta))}</a>
        </article>`;
  }).join('');

  applyWaLinks(grid);

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  grid.querySelectorAll('.service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    obs.observe(el);
  });
}

function renderShop() {
  const grid = document.getElementById('shop-grid');
  if (!grid || typeof EL_TRONO === 'undefined') return;

  const lang = (typeof Lang !== 'undefined' && Lang.current) || 'es';
  const t = (key) => (typeof Lang !== 'undefined' ? Lang.t(key) : key);

  const tagMap = { best: 'tag_best', pro: 'tag_pro', new: 'tag_new' };
  const waNum = EL_TRONO.contact.whatsapp;

  grid.innerHTML = EL_TRONO.products.map(p => {
    const title = t('product_' + p.id);
    const desc = t('product_' + p.id + '_d');
    const tagHtml = p.tag
      ? `<span class="product-tag">${t(tagMap[p.tag] || p.tag)}</span>`
      : '';
    return `
      <article class="product-card">
        <div class="product-img">
          <img src="${p.img}" alt="${title}" loading="lazy">
          ${tagHtml}
        </div>
        <div class="product-info">
          <h3>${title}</h3>
          <p>${desc}</p>
          <div class="product-price">
            <span class="price">${EL_TRONO.priceProduct(p)}</span>
            <a href="#" data-wa="product" data-wa-product="${title}" class="btn-buy" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </article>`;
  }).join('');

  applyWaLinks(grid);

  // re-observe new cards
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  grid.querySelectorAll('.product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    obs.observe(el);
  });
}

/* Testimonials carousel: swipe / arrows / dots / gentle autoplay */
(function () {
  function init() {
    const track = document.getElementById('testi-track');
    if (!track) return;
    const slides = Array.from(track.querySelectorAll('.testi-slide'));
    const dotsWrap = document.getElementById('testi-dots');
    const t = (k) => (typeof Lang !== 'undefined' ? Lang.t(k) : k);
    let idx = 0, timer = null, paused = false;

    slides.forEach((s, n) => {
      const d = document.createElement('button');
      d.type = 'button'; d.className = 'testi-dot' + (n === 0 ? ' active' : '');
      d.setAttribute('role', 'tab'); d.setAttribute('aria-label', t('testi_go') + ' ' + (n + 1));
      d.addEventListener('click', () => { go(n); restart(); });
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.children);

    function mark(n) { idx = n; dots.forEach((d, k) => d.classList.toggle('active', k === n)); }
    function go(n) {
      n = (n + slides.length) % slides.length;
      track.scrollTo({ left: slides[n].offsetLeft - track.offsetLeft, behavior: 'smooth' });
      mark(n);
    }
    let raf;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const n = Math.round(track.scrollLeft / track.clientWidth);
        if (n !== idx && n >= 0 && n < slides.length) mark(n);
      });
    }, { passive: true });

    document.getElementById('testi-prev')?.addEventListener('click', () => { go(idx - 1); restart(); });
    document.getElementById('testi-next')?.addEventListener('click', () => { go(idx + 1); restart(); });

    function start() { stop(); timer = setInterval(() => { if (!paused && !document.hidden) go(idx + 1); }, 6500); }
    function stop() { if (timer) clearInterval(timer); }
    function restart() { start(); }
    ['touchstart', 'mouseenter', 'focusin'].forEach(e => track.addEventListener(e, () => { paused = true; }, { passive: true }));
    ['touchend', 'mouseleave', 'focusout'].forEach(e => track.addEventListener(e, () => { setTimeout(() => { paused = false; }, 3000); }, { passive: true }));
    window.addEventListener('resize', () => { track.style.scrollBehavior = 'auto'; track.scrollLeft = slides[idx].offsetLeft - track.offsetLeft; track.style.scrollBehavior = ''; });
    document.addEventListener('langchange', () => dots.forEach((d, n) => d.setAttribute('aria-label', t('testi_go') + ' ' + (n + 1))));
    start();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/** Redes sociales: las direcciones se configuran solo en js/data.js (EL_TRONO.social). */
function applySocialLinks() {
  if (typeof EL_TRONO === 'undefined' || !EL_TRONO.social) return;
  document.querySelectorAll('[data-social]').forEach(a => {
    const url = EL_TRONO.social[a.dataset.social];
    if (url) {
      a.href = url;
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    } else {
      a.setAttribute('href', '#');
      a.setAttribute('aria-hidden', 'true');
      a.setAttribute('tabindex', '-1');
      a.style.display = 'none';
      a.addEventListener('click', e => e.preventDefault());
    }
  });
}
