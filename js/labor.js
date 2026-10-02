/**
 * El Trono — Labor Estudiantil
 * Formulario de matrícula: se envía por WhatsApp y por email, en el idioma elegido.
 * Depende de i18n.js (Lang) y data.js (EL_TRONO).
 */
(function () {
  'use strict';

  const form = document.getElementById('labor-form');
  if (!form) return;

  const status = document.getElementById('labor-status');
  const t = (key) => Lang.t(key);
  const show = (key) => { status.textContent = key ? t(key) : ''; };

  /** Mensaje con los datos del formulario (formato WhatsApp: *negrita*). */
  function buildMessage() {
    const M = EL_TRONO.waMsg[Lang.current] || EL_TRONO.waMsg.es;
    const data = new FormData(form);
    const field = (label, value) => `*${t(label)}:* ${String(value).trim()}`;
    return [
      M.greet, '', t('labor_wa_intro'), '',
      field('labor_name', data.get('name')),
      field('labor_phone', data.get('phone')),
      field('labor_email', data.get('email')),
      field('labor_course', t(`labor_${data.get('course')}_title`)),
      '', M.close
    ].join('\n');
  }

  const isValid = () => form.reportValidity();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!isValid()) return;
    const url = `https://wa.me/${EL_TRONO.contact.whatsapp}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, '_blank', 'noopener');
    show('labor_ok_wa');
  });

  document.getElementById('labor-email').addEventListener('click', () => {
    if (!isValid()) return;
    const subject = encodeURIComponent(t('labor_mail_subject'));
    const body = encodeURIComponent(buildMessage().replace(/\*/g, ''));
    window.location.href = `mailto:${EL_TRONO.contact.email}?subject=${subject}&body=${body}`;
    show('labor_ok_mail');
  });

  document.addEventListener('langchange', () => show(''));

  /** Si el servicio de imágenes falla, se usa un segundo servicio de placeholders. */
  document.querySelectorAll('img[data-seed]').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.failed) return;
      img.dataset.failed = '1';
      img.src = `https://picsum.photos/seed/${img.dataset.seed}/${img.getAttribute('width')}/${img.getAttribute('height')}`;
    });
  });
})();
