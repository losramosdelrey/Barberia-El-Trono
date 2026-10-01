/**
 * El Trono — Cursor personalizado (punto dorado + aro que lo sigue con suavidad).
 * - El aro crece sobre enlaces, botones, campos de formulario y fotos.
 * - Solo se activa con ratón (no en pantallas táctiles) y respeta "reducir movimiento".
 * - Si algo falla, el cursor normal del navegador sigue funcionando.
 * Ajustes rápidos: variables --cur-* en css/styles.css y constante EASE aquí abajo.
 */
(function () {
  'use strict';
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var EASE = 0.18; // 0.05 = muy lento · 0.3 = rápido
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) EASE = 1;

  var HOVER_SEL = 'a, button, .btn, [role="button"], [role="tab"], label, select, summary, .gallery-item, .barber-card, .service-card, .product-card, .social-link, .lang-btn, .testi-arrow, .testi-dot';
  var TEXT_SEL = 'input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]), textarea';

  var dot = document.createElement('div');
  var ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  dot.setAttribute('aria-hidden', 'true');
  ring.setAttribute('aria-hidden', 'true');

  var mx = -100, my = -100, rx = -100, ry = -100, shown = false, raf = null;

  function mount() {
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.documentElement.classList.add('has-cursor');
  }

  function loop() {
    rx += (mx - rx) * EASE;
    ry += (my - ry) * EASE;
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
    raf = requestAnimationFrame(loop);
  }

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%)';
    if (!shown) {
      shown = true; rx = mx; ry = my;
      dot.classList.add('on'); ring.classList.add('on');
      if (!raf) raf = requestAnimationFrame(loop);
    }
    var t = e.target;
    var isText = t.closest && t.closest(TEXT_SEL);
    var isHover = !isText && t.closest && t.closest(HOVER_SEL);
    ring.classList.toggle('is-hover', !!isHover);
    dot.classList.toggle('is-hover', !!isHover);
    dot.classList.toggle('is-text', !!isText);
    ring.classList.toggle('is-text', !!isText);
  }, { passive: true });

  document.addEventListener('mousedown', function () { ring.classList.add('is-down'); });
  document.addEventListener('mouseup', function () { ring.classList.remove('is-down'); });
  document.documentElement.addEventListener('mouseleave', function () { dot.classList.remove('on'); ring.classList.remove('on'); shown = false; });
  document.addEventListener('visibilitychange', function () { if (document.hidden && raf) { cancelAnimationFrame(raf); raf = null; } });

  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
