/* =========================================================
   CONTENIDO EDITABLE DE LOYTRAVEL
   Para el sitio final esto se carga desde una planilla de Google
   que Loytravel edita sin tocar código.
   ========================================================= */

// Número de WhatsApp (formato internacional, sin + ni espacios)
// DEMO: va al número de Mirko Sistemas. Final: 5493512265069 (Loytravel).
window.LOY_WA = "5493875461860";

// Etiquetas: playa · familia · pareja · ciudad · all
window.LOY_DESTINOS = [
  { nombre: "Río de Janeiro", zona: "Sudeste", img: "img/rio.jpg", tags: ["ciudad", "playa", "pareja"],
    txt: "Cristo Redentor, Pan de Azúcar y las playas de Copacabana e Ipanema.", destacado: true },
  { nombre: "Florianópolis", zona: "Sur", img: "img/floripa.jpg", tags: ["playa", "familia"],
    txt: "La isla favorita de los cordobeses: 40 playas para todos los gustos." },
  { nombre: "Búzios", zona: "Sudeste", img: "img/buzios.jpg", tags: ["playa", "pareja"],
    txt: "Calas de agua turquesa, la Rua das Pedras y atardeceres únicos." },
  { nombre: "Porto de Galinhas", zona: "Nordeste", img: "img/porto.jpg", tags: ["playa", "familia", "pareja"],
    txt: "Piscinas naturales de agua cálida, ideales para chicos." },
  { nombre: "Maceió", zona: "Nordeste", img: "img/maceio.jpg", tags: ["playa", "familia"],
    txt: "Mar verde esmeralda, playas tranquilas y excursiones en jangada." },
  { nombre: "Salvador de Bahía", zona: "Nordeste", img: "img/salvador.jpg", tags: ["ciudad", "playa"],
    txt: "El Pelourinho, la música y la cultura bahiana más auténtica." },
  { nombre: "Costa do Sauípe", zona: "Nordeste", img: "img/resort.jpg", tags: ["all", "familia", "pareja"],
    txt: "Resorts all inclusive frente al mar: solo te ocupás de descansar." },
  { nombre: "Cruceros por Brasil", zona: "Costa brasileña", img: "img/crucero.jpg", tags: ["all", "familia", "pareja"],
    txt: "Varias ciudades en un solo viaje, con todo incluido a bordo." }
];

// Promociones del mes (EJEMPLO: reemplazar por las reales)
window.LOY_PROMOS = [
  { titulo: "Florianópolis en familia", detalle: "Aéreo desde Córdoba + 7 noches + traslados", etiqueta: "Enero", img: "img/floripa.jpg" },
  { titulo: "Búzios para dos", detalle: "Aéreo + 7 noches con desayuno + traslados", etiqueta: "Luna de miel", img: "img/buzios.jpg" },
  { titulo: "Costa do Sauípe all inclusive", detalle: "Aéreo + 7 noches todo incluido", etiqueta: "Últimos cupos", img: "img/resort.jpg" }
];

// Blog (EJEMPLO: notas de muestra)
window.LOY_BLOG = [
  { titulo: "¿Qué playa de Brasil elegir si viajás con chicos?", fecha: "Noviembre 2026", img: "img/blog-1.jpg",
    txt: "Aguas tranquilas, piscinas naturales y hoteles con club de niños: te contamos cuáles son nuestras favoritas." },
  { titulo: "Río de Janeiro en 5 días: el recorrido ideal", fecha: "Noviembre 2026", img: "img/blog-2.jpg",
    txt: "Cristo Redentor, Pan de Azúcar, Santa Teresa y las playas. Cómo organizar los días para aprovecharlos." },
  { titulo: "Documentación para viajar a Brasil desde Argentina", fecha: "Noviembre 2026", img: "img/blog-3.jpg",
    txt: "DNI o pasaporte, viajes con menores y asistencia al viajero: lo que tenés que tener listo antes de salir." }
];
