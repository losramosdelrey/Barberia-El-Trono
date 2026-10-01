/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  EL TRONO — PRECIOS
 *  Este es el ÚNICO archivo que necesitas editar para cambiar precios.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  CÓMO USARLO
 *   1. Abre este archivo con el Bloc de notas (o cualquier editor).
 *   2. Cambia solo el NÚMERO que está después de los dos puntos ( : ).
 *   3. Guarda el archivo y recarga la página (Ctrl + F5).
 *
 *  SERVICIOS  (se muestran en servicios.html, siempre en CUP)
 *     corte_maquina: 150,        →  muestra  150.00 CUP
 *     corte_maquina: 'Consultar' →  también puedes poner texto entre comillas
 *
 *  TIENDA  (se muestra en tienda.html)
 *     aceite: { usd: 15, cup: 11250 },   →  $15 USD – 11.250 CUP
 *     Si un artículo solo tiene un precio, borra la parte que no uses:
 *     aceite: { cup: 11250 },            →  11.250 CUP
 *
 *  ⚠ No borres las comas ( , ) ni las llaves { }, ni cambies los nombres de
 *    la izquierda (corte_maquina, aceite…). Solo cambia los números.
 * ═══════════════════════════════════════════════════════════════════════════
 */
const PRECIOS = {

  /* ───────────────────────────── SERVICIOS (CUP) ───────────────────────────── */
  servicios: {

    // Corte de Cabello
    corte_maquina:          0,   // A máquina
    corte_tradicional:      0,   // Tradicional
    corte_diseno:           0,   // De diseño
    corte_personalizado:    0,   // Estilo personalizado

    // Peinados
    peinados_sencillos:     0,   // Peinados sencillos
    peinados_modernos:      0,   // Estilos modernos
    peinados_acabado:       0,   // Acabado profesional
    peinados_premium:       0,   // Productos premium

    // Afeitado
    afeitado_navaja:        0,   // Tradicional con navaja
    afeitado_completo:      0,   // Rasurado completo
    afeitado_barbas:        0,   // Diseño de barbas
    afeitado_toalla:        0,   // Toalla caliente

    // Fibra Capilar
    fibra_reconstruccion:   0,   // Reconstrucción capilar
    fibra_pigmentacion:     0,   // Pigmentación
    fibra_decoloracion:     0,   // Decoloración
    fibra_densos:           0,   // Tratamientos densos

    // Masaje Facial y Capilar
    masaje_relajante:       0,   // Masaje relajante
    masaje_estimulacion:    0,   // Estimulación capilar
    masaje_tension:         0,   // Alivio de tensión
    masaje_aromaterapia:    0,   // Aromaterapia

    // Exfoliación & Cejas
    cejas_exfoliacion:      0,   // Exfoliación facial
    cejas_diseno:           0,   // Diseño de cejas
    cejas_perfilado:        0,   // Perfilado profesional
    cejas_limpieza:         0,   // Limpieza profunda
  },

  /* ──────────────────────── TIENDA (USD y CUP por artículo) ─────────────────── */
  productos: {
    aceite:        { usd: 15, cup: 11250 },   // Aceite para Barba Premium
    cera:          { usd: 12, cup: 15000 },   // Cera / Pomada Capilar
    aftershave:    { usd: 10, cup: 7500 },   // Aftershave & Bálsamo
    shampoo:       { usd: 14, cup: 10500 },   // Shampoo & Acondicionador
    maquina:       { usd: 35, cup: 26250 },   // Máquina de Pelar
    tijeras:       { usd: 6, cup: 4500 },   // Tijeras Profesionales
    crema_afeitar: { usd: 2, cup: 1500 },   // Crema de Afeitar
    colonia:       { usd: 3, cup: 2250 },   // Agua de Tocador / Colonia
    masaje_crema:  { usd: 10, cup: 7500 },   // Cremas de Masaje
    tinte:         { usd: 5, cup: 3750 },   // Tintes para Hombres
  }
};
