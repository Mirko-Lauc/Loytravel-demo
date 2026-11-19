/* =========================================================
   CONTENIDO EDITABLE DE LOYTRAVEL
   Para el sitio final esto se carga desde una planilla de Google
   que Loytravel edita sin tocar código.
   ========================================================= */

// Número de WhatsApp (formato internacional, sin + ni espacios)
// WhatsApp de Loytravel: 351 226-5069
window.LOY_WA = "5493512265069";

// Textos y fotos generales (editables desde el panel)
window.LOY_TEXTOS = {
  "hero.kicker": "Temporada Brasil 2026/27",
  "hero.t1": "Tu viaje a Brasil,",
  "hero.t2": "armado a tu medida.",
  "hero.lead": "Somos una agencia de Córdoba con años de experiencia y destinos que conocemos en persona. Te asesoramos de principio a fin, y te acompañamos durante todo el viaje.",
  "hero.f1": "img/hero-1.jpg", "hero.p1": "Río de Janeiro · Pan de Azúcar",
  "hero.f2": "img/hero-2.jpg", "hero.p2": "Búzios · Costa do Sol",
  "hero.f3": "img/hero-3.jpg", "hero.p3": "Río de Janeiro · Cristo Redentor",
  "dest.titulo": "Brasil, como lo soñaste",
  "dest.sub": "Buscá tu destino y consultanos. Te armamos el paquete con aéreos, hotel y traslados según tus fechas.",
  "promos.titulo": "Salidas destacadas de noviembre",
  "promos.sub": "Cupos limitados. Consultá el precio actualizado por WhatsApp.",
  "nos.titulo": "Una agencia de Córdoba que te conoce por tu nombre",
  "nos.texto": "En Loytravel no vendemos paquetes de catálogo: escuchamos qué viaje querés y lo armamos con vos. Recorrimos en persona los destinos que recomendamos, así que te contamos lo que de verdad conviene.",
  "nos.foto": "img/nosotros.jpg",
  "banner.titulo": "Brasil te está esperando. Asegurá tu lugar antes de que se llenen los cupos.",
  "banner.foto": "img/hero-2.jpg",
  "contacto.dir": "Duarte Quirós 3419, Córdoba",
  "contacto.horario": "Lunes a viernes de 10 a 13 y de 14 a 18 h",
  "contacto.ig": "@loytravelgroup",
  "contacto.canal": "https://whatsapp.com/channel/0029VbBdvyT8KMqpcDkNhb3U",
  "portal.titulo": "Portal digital",
  "portal.sub": "Fotos y videos de nuestros destinos, para que veas cómo se vive cada viaje antes de elegir."
};

// Opiniones reales de viajeros (vacío = se muestran los espacios de ejemplo)
window.LOY_OPINIONES = [];

// Equipo de ventas (EJEMPLO: nombres y opiniones de muestra hasta tener los reales)
window.LOY_EQUIPO = [
  { nombre: "Lucía Fernández", rol: "Asesora de viajes", esp: "Brasil y playas del Nordeste", ejemplo: true,
    opiniones: [{ texto: "Nos armó el viaje a Maceió con los chicos y estuvo pendiente de todo.", autor: "Cliente de ejemplo" },
                { texto: "Respondía rápido por WhatsApp, incluso cuando estábamos allá.", autor: "Cliente de ejemplo" }] },
  { nombre: "Martín Gómez", rol: "Asesor de viajes", esp: "Río de Janeiro y viajes en pareja", ejemplo: true,
    opiniones: [{ texto: "Nos recomendó un hotel en Búzios que fue lo mejor del viaje.", autor: "Cliente de ejemplo" },
                { texto: "Explica todo con paciencia y sin vueltas.", autor: "Cliente de ejemplo" }] },
  { nombre: "Carla Ruiz", rol: "Asesora de viajes", esp: "All inclusive y cruceros", ejemplo: true,
    opiniones: [{ texto: "Primera vez en un crucero y nos sentimos acompañados de principio a fin.", autor: "Cliente de ejemplo" },
                { texto: "Nos consiguió buenas cuotas con tarjeta.", autor: "Cliente de ejemplo" }] }
];

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

// Portal digital (EJEMPLO: fotos de muestra hasta tener las de Loytravel)
// fotos: direcciones de imágenes · videos: códigos de YouTube (los 11 caracteres del link)
window.LOY_PORTAL = [
  { titulo: "Río de Janeiro", sub: "Sudeste", img: "img/rio.jpg", ejemplo: true,
    fotos: ["img/rio.jpg", "img/cristo.jpg", "img/hero-1.jpg", "img/hero-3.jpg", "img/blog-2.jpg"], videos: [] },
  { titulo: "Búzios", sub: "Costa do Sol", img: "img/buzios.jpg", ejemplo: true,
    fotos: ["img/buzios.jpg", "img/hero-2.jpg"], videos: [] },
  { titulo: "Nordeste", sub: "Maceió · Porto · Salvador", img: "img/maceio.jpg", ejemplo: true,
    fotos: ["img/maceio.jpg", "img/porto.jpg", "img/salvador.jpg", "img/resort.jpg"], videos: [] },
  { titulo: "Florianópolis", sub: "Sur de Brasil", img: "img/floripa.jpg", ejemplo: true,
    fotos: ["img/floripa.jpg", "img/blog-1.jpg"], videos: [] }
];
