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
├── css/
│   ├── styles.css
│   └── install.css
├── js/
│   ├── data.js             → datos compartidos
│   ├── i18n.js             → ES / EN
│   ├── main.js
│   ├── install.js          → PWA install
│   └── sw.js               → service worker
├── images/
│   ├── backgrounds/
│   ├── servicios/
│   ├── logos/
│   ├── galeria/
│   ├── screenshots/
│   ├── flags/              → es.svg, en.svg
│   └── banners/
├── icons/                  → PWA icons
├── manifest.json
├── sitemap.xml
├── robots.txt
└── schema-localbusiness.html
```

## Características

- **Idiomas:** ES (bandera España) / EN (bandera EE.UU.) — botón en header
- **Responsive** desktop + móvil
- **Desktop floats:** WhatsApp + Email
- **Móvil floats:** WhatsApp + Llamar + Descargar App
- **Redes al final de cada página:** Facebook, Twitter, Instagram
- **PWA:** manifest + service worker + banner de instalación
- **SEO:** sitemap, robots, schema LocalBusiness
- **Formulario** → WhatsApp pre-rellenado
- **Mapa** coords 22.421887, -83.701554
- **Tel:** +53 54293791

## Uso

Abre `inicio.html` o `index.html` en el navegador.  
Para PWA completa sirve por HTTPS (Netlify, Vercel, etc.).

## Personalización

- Textos: `js/i18n.js`
- Productos/servicios: `js/data.js`
- Colores: variables en `css/styles.css`
