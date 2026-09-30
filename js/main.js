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

  // Render shop from data.js
  renderShop();

  // Contact form → WhatsApp
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.name?.value?.trim() || '';
      const phone = form.phone?.value?.trim() || '';
      const service = form.service?.value || '';
      const message = form.message?.value?.trim() || '';
      const labels = {
        corte: 'Corte / Haircut',
        peinado: 'Peinado / Style',
        afeitado: 'Afeitado / Shave',
        fibra: 'Fibra capilar / Hair fiber',
        masaje: 'Masaje / Massage',
        cejas: 'Cejas / Brows',
        otro: 'Otro / Other'
      };
      let text = `Hola El Trono 👑%0A%0A*Nombre:* ${name}%0A*Teléfono:* ${phone}%0A*Servicio:* ${labels[service] || service}`;
      if (message) text += `%0A*Mensaje:* ${message}`;
      text += `%0A%0AQuiero reservar / Book appointment.`;
      const wa = (typeof EL_TRONO !== 'undefined' && EL_TRONO.contact?.whatsapp) || '5354293791';
      window.open(`https://wa.me/${wa}?text=${text}`, '_blank');
    });
  }

  if (typeof Lang !== 'undefined') {
    Lang.init();
    document.addEventListener('langchange', () => renderShop());
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.service-card, .product-card, .gallery-item, .contact-card, .about-content, .about-images').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    obs.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = '.visible{opacity:1!important;transform:translateY(0)!important}';
  document.head.appendChild(style);
});

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
            <span class="price">${p.price}</span>
            <a href="https://wa.me/${waNum}?text=Quiero%20comprar%20${p.wa || p.id}" class="btn-buy" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </article>`;
  }).join('');

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
