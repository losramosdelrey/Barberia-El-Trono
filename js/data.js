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
      es: 'Lunes a Sábado: 9:00 – 19:00 · Domingo: consultar',
      en: 'Monday to Saturday: 9:00 – 19:00 · Sunday: inquire'
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
        en: ['Machine cut', 'Traditional', 'Design cut', 'Custom style']
      }
    },
    {
      id: 'peinados',
      icon: 'fa-spa',
      items: {
        es: ['Peinados sencillos', 'Estilos modernos', 'Acabado profesional', 'Productos premium'],
        en: ['Simple styles', 'Modern styles', 'Professional finish', 'Premium products']
      }
    },
    {
      id: 'afeitado',
      icon: 'fa-razor',
      featured: true,
      items: {
        es: ['Tradicional con navaja', 'Rasurado completo', 'Diseño de barbas', 'Toalla caliente'],
        en: ['Traditional straight razor', 'Full shave', 'Beard design', 'Hot towel']
      }
    },
    {
      id: 'fibra',
      icon: 'fa-flask',
      items: {
        es: ['Reconstrucción capilar', 'Pigmentación', 'Decoloración', 'Tratamientos densos'],
        en: ['Hair reconstruction', 'Pigmentation', 'Bleaching', 'Density treatments']
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
        en: ['Facial exfoliation', 'Brow design', 'Professional shaping', 'Deep cleanse']
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
      price: '$15 – 25 USD',
      tag: 'best',
      img: 'https://images.unsplash.com/photo-1620916569884-4f2e7f7c5c5e?w=500&q=80',
      wa: 'Aceite%20para%20Barba'
    },
    {
      id: 'cera',
      price: '$12 – 20 USD',
      img: 'https://images.unsplash.com/photo-1608248547993-df86be8b91f3?w=500&q=80',
      wa: 'Cera%20Capilar'
    },
    {
      id: 'aftershave',
      price: '$10 – 18 USD',
      img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80',
      wa: 'Aftershave'
    },
    {
      id: 'shampoo',
      price: '$14 – 22 USD',
      img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80',
      wa: 'Shampoo'
    },
    {
      id: 'maquina',
      price: '$45 – 90 USD',
      tag: 'pro',
      img: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&q=80',
      wa: 'Maquina%20de%20Pelar'
    },
    {
      id: 'tijeras',
      price: '$25 – 55 USD',
      img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&q=80',
      wa: 'Tijeras%20Profesionales'
    },
    {
      id: 'crema_afeitar',
      price: '$8 – 16 USD',
      img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
      wa: 'Crema%20de%20Afeitar'
    },
    {
      id: 'colonia',
      price: '$18 – 40 USD',
      tag: 'new',
      img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80',
      wa: 'Agua%20de%20Tocador'
    },
    {
      id: 'masaje_crema',
      price: '$12 – 28 USD',
      img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&q=80',
      wa: 'Crema%20de%20Masaje'
    },
    {
      id: 'tinte',
      price: '$10 – 22 USD',
      img: 'https://images.unsplash.com/photo-1631730486572-226da1b718bb?w=500&q=80',
      wa: 'Tinte%20para%20Hombres'
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
