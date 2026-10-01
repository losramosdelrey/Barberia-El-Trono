/**
 * El Trono — Datos compartidos (servicios, tienda, contacto, redes)
 *
 * ┌─ CÓMO CAMBIAR LOS PRECIOS ──────────────────────────────────────────────┐
 * │ SERVICIOS  → busca  services:  y cambia el número  price  de cada línea │
 * │              (ej.  price: 150  se mostrará como  150.00 CUP).           │
 * │ TIENDA     → busca  products:  y cambia  usd  y/o  cup  de cada artículo│
 * │              (ej.  usd: 15, cup: 11250  →  $15 USD – 11.250 CUP).       │
 * │              Si un artículo solo tiene un precio, borra la otra línea.  │
 * │ Guarda el archivo y recarga la página. No hay que tocar ningún HTML.    │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
const EL_TRONO = {
  contact: {
    phone: '+5354293791',
    phoneDisplay: '+53 54293791',
    email: 'info@eltrono.cu',
    whatsapp: '5354293791',
    lat: 22.421887,
    lng: -83.701554,
    mapsUrl: 'https://www.google.com/maps?q=22.421887,-83.701554',
    mapsEmbed: 'https://maps.google.com/maps?q=22.421887,-83.701554&z=15&output=embed',
    hours: {
      es: 'Lunes a Sábado: 9:00 am – 5:00 pm · Domingo: consultar',
      en: 'Monday to Saturday: 9:00 AM – 5:00 PM · Sunday: please inquire'
    }
  },
  social: {
    facebook: '',   // ← pega aquí la dirección de Facebook
    twitter: '',    // ← pega aquí la dirección de Twitter
    instagram: ''   // ← pega aquí la dirección de Instagram
  },
  /**
   * SERVICIOS — cada servicio tiene su lista de derivados con su precio (CUP).
   *   price: número  → se muestra con 2 decimales, ej. 0 → "0.00 CUP"
   *   price: 'texto' → se muestra tal cual, ej. 'Desde 500 CUP' o 'Consultar'
   * `es` / `en` son los nombres que ve el cliente en cada idioma.
   */
  services: [
    {
      id: 'corte',
      icon: 'fa-cut',
      items: [
        { es: 'A máquina',            en: 'Machine cut',     price: 0 },
        { es: 'Tradicional',          en: 'Traditional cut', price: 0 },
        { es: 'De diseño',            en: 'Designer cut',    price: 0 },
        { es: 'Estilo personalizado', en: 'Custom style',    price: 0 }
      ]
    },
    {
      id: 'peinados',
      icon: 'comb',
      items: [
        { es: 'Peinados sencillos',   en: 'Simple hairstyles',     price: 0 },
        { es: 'Estilos modernos',     en: 'Modern styles',         price: 0 },
        { es: 'Acabado profesional',  en: 'Professional finish',   price: 0 },
        { es: 'Productos premium',    en: 'Premium products',      price: 0 }
      ]
    },
    {
      id: 'afeitado',
      icon: 'razor',
      featured: true,
      items: [
        { es: 'Tradicional con navaja', en: 'Traditional straight-razor shave', price: 0 },
        { es: 'Rasurado completo',      en: 'Full shave',                       price: 0 },
        { es: 'Diseño de barbas',       en: 'Beard design',                     price: 0 },
        { es: 'Toalla caliente',        en: 'Hot towel',                        price: 0 }
      ]
    },
    {
      id: 'fibra',
      icon: 'fa-flask',
      cta: 'consult',
      items: [
        { es: 'Reconstrucción capilar', en: 'Hair reconstruction',   price: 0 },
        { es: 'Pigmentación',           en: 'Pigmentation',          price: 0 },
        { es: 'Decoloración',           en: 'Bleaching',             price: 0 },
        { es: 'Tratamientos densos',    en: 'Thickening treatments', price: 0 }
      ]
    },
    {
      id: 'masaje',
      icon: 'fa-hand-holding-heart',
      items: [
        { es: 'Masaje relajante',     en: 'Relaxing massage',   price: 0 },
        { es: 'Estimulación capilar', en: 'Scalp stimulation',  price: 0 },
        { es: 'Alivio de tensión',    en: 'Tension relief',     price: 0 },
        { es: 'Aromaterapia',         en: 'Aromatherapy',       price: 0 }
      ]
    },
    {
      id: 'cejas',
      icon: 'fa-leaf',
      items: [
        { es: 'Exfoliación facial',    en: 'Facial exfoliation',    price: 0 },
        { es: 'Diseño de cejas',       en: 'Eyebrow design',        price: 0 },
        { es: 'Perfilado profesional', en: 'Professional shaping',  price: 0 },
        { es: 'Limpieza profunda',     en: 'Deep cleansing',        price: 0 }
      ]
    }
  ],
  /**
   * TIENDA — edita aquí `usd` y/o `cup` de cada artículo.
   * El texto se arma solo:  $15 USD – 11.250 CUP
   * id debe coincidir con las claves product_* en i18n.js
   */
  products: [
    { id: 'aceite',        usd: 15, cup: 11250, tag: 'best', img: 'https://images.unsplash.com/photo-1620916569884-4f2e7f7c5c5e?w=500&q=80' },
    { id: 'cera',          usd: 12, cup: 15000,              img: 'https://images.unsplash.com/photo-1608248547993-df86be8b91f3?w=500&q=80' },
    { id: 'aftershave',    usd: 10, cup: 7500,               img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80' },
    { id: 'shampoo',       usd: 14, cup: 10500,              img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80' },
    { id: 'maquina',       usd: 35, cup: 26250, tag: 'pro',  img: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&q=80' },
    { id: 'tijeras',       usd: 6,  cup: 4500,               img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&q=80' },
    { id: 'crema_afeitar', usd: 2,  cup: 1500,               img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80' },
    { id: 'colonia',       usd: 3,  cup: 2250,  tag: 'new',  img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80' },
    { id: 'masaje_crema',  usd: 10, cup: 7500,               img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&q=80' },
    { id: 'tinte',         usd: 5,  cup: 3750,               img: 'https://images.unsplash.com/photo-1631730486572-226da1b718bb?w=500&q=80' }
  ],
  gallery: [
    { img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80', large: true, key: 'fade' },
    { img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80', key: 'beard' },
    { img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80', key: 'ambiance' },
    { img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80', key: 'classic' },
    { img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80', key: 'tools' },
    { img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80', large: true, key: 'detail' }
  ]
};

/**
 * MENSAJES DE WHATSAPP (autodirigidos a la barbería)
 * El cliente llega a WhatsApp con el mensaje ya escrito, en su idioma.
 * Claves: general, book, corte, peinados, afeitado, fibra, masaje, cejas, products, product
 */
EL_TRONO.waMsg = {
  "es": {
    "greet": "Hola, buen día 👋 Les escribo desde la página web de *Barbería El Trono*.",
    "general": "Quisiera hacerles una consulta, por favor.",
    "book": "Quisiera reservar una cita. ¿Qué horarios tienen disponibles?",
    "corte": "Quisiera reservar una cita para un *Corte de Cabello*. ¿Qué horarios tienen disponibles?",
    "peinados": "Quisiera reservar una cita para un *Peinado*. ¿Qué horarios tienen disponibles?",
    "afeitado": "Quisiera reservar una cita para un *Afeitado*. ¿Qué horarios tienen disponibles?",
    "fibra": "Quisiera información sobre el servicio de *Fibra Capilar*: ¿en qué consiste y cuál es el precio?",
    "masaje": "Quisiera reservar un *Masaje Facial y Capilar*. ¿Qué horarios tienen disponibles?",
    "cejas": "Quisiera reservar *Exfoliación y Cejas*. ¿Qué horarios tienen disponibles?",
    "products": "Quisiera consultar los productos de la tienda y sus precios.",
    "product": "Quisiera comprar el producto *{product}*. ¿Está disponible y cuál es su precio?",
    "barber": "Quisiera reservar una cita con *{barber}*. ¿Qué horarios tiene disponibles?",
    "close": "Quedo atento a su respuesta. ¡Gracias!"
  },
  "en": {
    "greet": "Hello, good day 👋 I'm writing from the *Barbería El Trono* website.",
    "general": "I'd like to ask you a question, please.",
    "book": "I'd like to book an appointment. What times do you have available?",
    "corte": "I'd like to book an appointment for a *Haircut*. What times do you have available?",
    "peinados": "I'd like to book an appointment for a *Hairstyle*. What times do you have available?",
    "afeitado": "I'd like to book an appointment for a *Shave*. What times do you have available?",
    "fibra": "I'd like information about the *Hair Fiber* service: what does it involve and how much does it cost?",
    "masaje": "I'd like to book a *Facial & Scalp Massage*. What times do you have available?",
    "cejas": "I'd like to book *Exfoliation & Brows*. What times do you have available?",
    "products": "I'd like to ask about the products in your shop and their prices.",
    "product": "I'd like to buy the product *{product}*. Is it available and what is the price?",
    "barber": "I'd like to book an appointment with *{barber}*. What times do you have available?",
    "close": "I look forward to your reply. Thank you!"
  }
};

EL_TRONO.waUrl = function (key, vars, lang) {
  lang = lang || (function () { try { return localStorage.getItem('eltrono_lang') || 'es'; } catch (e) { return 'es'; } })();
  const m = EL_TRONO.waMsg[lang] || EL_TRONO.waMsg.es;
  let body = m[key] || m.general;
  Object.keys(vars || {}).forEach(k => { body = body.split('{' + k + '}').join(vars[k]); });
  const text = m.greet + ' ' + body + ' ' + m.close;
  return 'https://wa.me/' + EL_TRONO.contact.whatsapp + '?text=' + encodeURIComponent(text);
};

/**
 * FORMATO DE PRECIOS (no necesitas editar esto)
 */
EL_TRONO.fmtGroup = function (n) {            // 11250 -> "11.250"
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
EL_TRONO.priceService = function (price) {    // 0 -> "0.00 CUP" | 'texto' -> 'texto'
  if (typeof price === 'number') return price.toFixed(2) + ' CUP';
  return String(price == null ? '' : price);
};
EL_TRONO.priceProduct = function (p) {        // {usd:15,cup:11250} -> "$15 USD – 11.250 CUP"
  const parts = [];
  if (typeof p.usd === 'number') parts.push('$' + p.usd + ' USD');
  if (typeof p.cup === 'number') parts.push(EL_TRONO.fmtGroup(p.cup) + ' CUP');
  return parts.join(' – ');
};
