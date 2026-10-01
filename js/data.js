/**
 * El Trono — Shared data (products, services, contact)
 * PRECIOS: edita solo aquí la propiedad `price` de cada producto.
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
    facebook: 'https://facebook.com/',
    twitter: 'https://twitter.com/',
    instagram: 'https://instagram.com/'
  },
  services: [
    {
      id: 'corte',
      icon: 'fa-cut',
      items: {
        es: ['A máquina', 'Tradicional', 'De diseño', 'Estilo personalizado'],
        en: ['Machine cut', 'Traditional cut', 'Designer cut', 'Custom style']
      }
    },
    {
      id: 'peinados',
      icon: 'fa-spa',
      items: {
        es: ['Peinados sencillos', 'Estilos modernos', 'Acabado profesional', 'Productos premium'],
        en: ['Simple hairstyles', 'Modern styles', 'Professional finish', 'Premium products']
      }
    },
    {
      id: 'afeitado',
      icon: 'razor',
      featured: true,
      items: {
        es: ['Tradicional con navaja', 'Rasurado completo', 'Diseño de barbas', 'Toalla caliente'],
        en: ['Traditional straight-razor shave', 'Full shave', 'Beard design', 'Hot towel']
      }
    },
    {
      id: 'fibra',
      icon: 'fa-flask',
      items: {
        es: ['Reconstrucción capilar', 'Pigmentación', 'Decoloración', 'Tratamientos densos'],
        en: ['Hair reconstruction', 'Pigmentation', 'Bleaching', 'Thickening treatments']
      }
    },
    {
      id: 'masaje',
      icon: 'fa-hand-holding-heart',
      items: {
        es: ['Masaje relajante', 'Estimulación capilar', 'Alivio de tensión', 'Aromaterapia'],
        en: ['Relaxing massage', 'Scalp stimulation', 'Tension relief', 'Aromatherapy']
      }
    },
    {
      id: 'cejas',
      icon: 'fa-leaf',
      items: {
        es: ['Exfoliación facial', 'Diseño de cejas', 'Perfilado profesional', 'Limpieza profunda'],
        en: ['Facial exfoliation', 'Eyebrow design', 'Professional shaping', 'Deep cleansing']
      }
    }
  ],
  /**
   * TIENDA — Edita price aquí únicamente.
   * id debe coincidir con las claves product_* en i18n.js
   */
  products: [
    {
      id: 'aceite',
      price: '$15 USD – 11.250 CUP',
      tag: 'best',
      img: 'https://images.unsplash.com/photo-1620916569884-4f2e7f7c5c5e?w=500&q=80'
    },
    {
      id: 'cera',
      price: '$12 USD – 15.000 CUP',
      img: 'https://images.unsplash.com/photo-1608248547993-df86be8b91f3?w=500&q=80'
    },
    {
      id: 'aftershave',
      price: '$10 USD– 7.500 CUP',
      img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80'
    },
    {
      id: 'shampoo',
      price: '$14 USD – 10.500 CUP',
      img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80'
    },
    {
      id: 'maquina',
      price: '$35 – 26.250 CUP',
      tag: 'pro',
      img: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&q=80'
    },
    {
      id: 'tijeras',
      price: '$6 USD – 4.500 CUP',
      img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&q=80'
    },
    {
      id: 'crema_afeitar',
      price: '$2 USD – 1.500 CUP',
      img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80'
    },
    {
      id: 'colonia',
      price: '$3 USD – 2.250‬ CUP',
      tag: 'new',
      img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80'
    },
    {
      id: 'masaje_crema',
      price: '$10 USD – 7.500 CUP',
      img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&q=80'
    },
    {
      id: 'tinte',
      price: '$5 USD – 3.750 CUP',
      img: 'https://images.unsplash.com/photo-1631730486572-226da1b718bb?w=500&q=80'
    }
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
