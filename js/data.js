/* =========================================================
   CONTENIDO EDITABLE DE LOYTRAVEL
   Para el sitio final esto se carga desde una planilla de Google
   que Loytravel edita sin tocar código.
   ========================================================= */

// Número de WhatsApp (formato internacional, sin + ni espacios)
// WhatsApp de Loytravel: 351 226-5069
window.LOY_WA = "5493512265069";

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
    txt: "Aguas tranquilas, piscinas naturales y hoteles con club de niños: te contamos cuáles son nuestras favoritas.",
    cuerpo: ["Viajar con chicos cambia todo: importa que el mar sea tranquilo, que el traslado desde el aeropuerto sea corto y que el hotel tenga actividades para ellos.",
      "Porto de Galinhas y Maceió son de las opciones más elegidas por las familias: tienen piscinas naturales de agua cálida y poca profundidad cuando baja la marea.",
      "Florianópolis es ideal si buscan variedad y no quieren un vuelo tan largo. Playas como Jurerê o Canasvieiras tienen olas suaves y muchos servicios.",
      "Si prefieren no pensar en nada, un resort all inclusive en Costa do Sauípe resuelve comidas, actividades y club de niños en un solo lugar.",
      "¿Querés que te recomendemos según las edades de tus hijos y tus fechas? Escribinos y te armamos opciones."] },
  { titulo: "Río de Janeiro en 5 días: el recorrido ideal", fecha: "Noviembre 2026", img: "img/blog-2.jpg",
    txt: "Cristo Redentor, Pan de Azúcar, Santa Teresa y las playas. Cómo organizar los días para aprovecharlos.",
    cuerpo: ["Día 1: llegada, check-in y atardecer en Arpoador, entre Copacabana e Ipanema.",
      "Día 2: Cristo Redentor temprano para evitar filas y, a la tarde, el barrio de Santa Teresa y la escalera Selarón.",
      "Día 3: Pan de Azúcar en teleférico. Conviene subir a la tarde para ver la ciudad de día y de noche.",
      "Día 4: playa en Ipanema o Leblon, y paseo por la laguna Rodrigo de Freitas.",
      "Día 5: excursión a Petrópolis o un día de playa más tranquila antes de volver.",
      "Te armamos el paquete con aéreos, hotel bien ubicado, traslados y excursiones."] },
  { titulo: "Documentación para viajar a Brasil desde Argentina", fecha: "Noviembre 2026", img: "img/blog-3.jpg",
    txt: "DNI o pasaporte, viajes con menores y asistencia al viajero: lo que tenés que tener listo antes de salir.",
    cuerpo: ["Los argentinos pueden entrar a Brasil con el DNI tarjeta vigente o con pasaporte vigente.",
      "Si viajan menores de edad sin alguno de los padres, hace falta una autorización de viaje. Consultanos tu caso antes de comprar.",
      "Recomendamos viajar siempre con asistencia al viajero: la atención médica en el exterior puede ser muy costosa.",
      "Llevá tu reserva de hotel y pasajes a mano, en papel o en el celular.",
      "Antes de cada viaje te confirmamos los requisitos vigentes, porque pueden cambiar."] }
];
