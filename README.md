# Barbería El Trono — Sitio Web Multipágina + PWA

Diseño profesional dark + gold para barbería masculina en Cuba.

## Estructura

```
el-trono/
├── index.html              → redirige a inicio.html
├── inicio.html
├── servicios.html
├── tienda.html
├── galeria.html
├── nosotros.html
├── contacto.html
├── labor-estudiantil.html  → cursos y matrícula (WhatsApp + email)
├── css/
│   ├── styles.css
│   ├── labor.css           → estilos de Labor Estudiantil
│   ├── page-hero.css       → fondo con foto en el hero de las páginas interiores
│   ├── promo.css           → promoción 50%: franja en inicio/nosotros, tarjetas en servicios
│   └── install.css
├── js/
│   ├── precios.js          → ★ PRECIOS de servicios y tienda (editar aquí)
│   ├── data.js             → datos compartidos (textos, imágenes, contacto)
│   ├── i18n.js             → ES / EN
│   ├── main.js
│   ├── install.js          → PWA install
│   ├── labor.js            → formulario de matrícula
├── images/
│   ├── backgrounds/
│   ├── servicios/
│   ├── logos/
│   ├── galeria/
│   ├── screenshots/
│   ├── flags/              → es.svg, en.svg
│   └── banners/
├── icons/                  → PWA icons
├── sw.js                   → service worker (raíz para que cubra todo el sitio)
├── manifest.json
├── sitemap.xml
├── robots.txt
└── schema-localbusiness.html
```

## Características

- **Idiomas:** ES (bandera España) / EN (bandera EE.UU.) — botón en header
- **Responsive** desktop + móvil
- **Desktop floats:** WhatsApp + Email
- **Móvil floats:** Llamar + Instalar App + WhatsApp (una fila abajo). El botón «Instalar App» se oculta solo cuando la app ya está instalada
- **Pie de página:** logo + título centrados y navegación en cuadrícula 3 × 3
- **WhatsApp:** todos los enlaces abren un mensaje ya redactado para la barbería, en el idioma elegido (ver `EL_TRONO.waMsg` en `js/data.js`)
- **PWA:** manifest (abre en `inicio.html`) + service worker + banner y guía de instalación (iOS / Android)
- **SEO:** sitemap, robots, Schema.org LocalBusiness (JSON-LD), Open Graph + Twitter Cards, canonical URLs (dominio: https://eltrono.cu)
- **Formulario** → WhatsApp pre-rellenado
- **Mapa** coords 22.421887, -83.701554 (Pinar del Río, Cuba)
- **Tel:** +53 54293791
- **Horario unificado:** Lunes a Sábado 9:00–19:00 · Domingo consultar
- **Animaciones:** lógica unificada en `js/animations.js` (sin conflictos con `main.js`)

## Uso

Abre `inicio.html` o `index.html` en el navegador.  
Para PWA completa sirve por HTTPS (Netlify, Vercel, etc.).

## Personalización

- Textos: `js/i18n.js`
- Productos/servicios: `js/data.js`
- Colores: variables en `css/styles.css`
