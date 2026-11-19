(function () {
  "use strict";
  var KEY = "loy_content";
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var DEF = {
    textos: clone(window.LOY_TEXTOS), DESTINOS: clone(window.LOY_DESTINOS), PROMOS: clone(window.LOY_PROMOS),
    PORTAL: clone(window.LOY_PORTAL), OPINIONES: clone(window.LOY_OPINIONES), EQUIPO: clone(window.LOY_EQUIPO), WA: window.LOY_WA
  };
  var C = clone(DEF), dirty = false;
  try {
    var s = JSON.parse(localStorage.getItem(KEY) || "null");
    if (s) { Object.assign(C.textos, s.textos || {}); ["DESTINOS", "PROMOS", "PORTAL", "OPINIONES", "EQUIPO", "WA"].forEach(function (k) { if (s[k] != null) C[k] = s[k]; }); }
  } catch (e) {}

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (v) { return String(v == null ? "" : v).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var content = $("content"), toast = $("toast"), fileIn = $("file"), tab = "inicio";

  function say(msg) { toast.textContent = msg; toast.classList.add("is-on"); clearTimeout(say.t); say.t = setTimeout(function () { toast.classList.remove("is-on"); }, 2600); }
  function mark() { dirty = true; $("save").classList.add("is-dirty"); $("save").textContent = "Guardar cambios •"; }

  /* ---------- Login ---------- */
  $("enter").addEventListener("click", function () { $("login").hidden = true; $("app").hidden = false; draw(); });

  /* ---------- Campos ---------- */
  function fText(path, label, val, opts) {
    opts = opts || {};
    var tag = opts.area ? '<textarea rows="' + (opts.rows || 3) + '"' : '<input type="text"';
    return '<label class="field"><span>' + label + "</span>" + tag + ' data-path="' + path + '"' + (opts.ph ? ' placeholder="' + esc(opts.ph) + '"' : "") +
      (opts.area ? ">" + esc(val) + "</textarea>" : ' value="' + esc(val) + '">') + (opts.help ? "<small>" + opts.help + "</small>" : "") + "</label>";
  }
  function fImg(path, label, val) {
    return '<div class="field field--img"><span>' + label + '</span><div class="imgbox"><img src="' + esc(val) + '" alt=""><button type="button" class="btn btn--sm btn--dark" data-img="' + path + '">📷 Cambiar foto</button></div></div>';
  }
  function get(path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, C); }
  function set(path, v) {
    var ks = path.split("."), last = ks.pop(), o = ks.reduce(function (o, k) { return o[k]; }, C);
    o[last] = v; mark();
  }
  // las claves de textos llevan punto ("hero.t1"): se guardan con "|"
  var tp = function (k) { return "textos|" + k; };
  function getP(p) { if (p.indexOf("textos|") === 0) return C.textos[p.slice(7)]; return get(p); }
  function setP(p, v) { if (p.indexOf("textos|") === 0) { C.textos[p.slice(7)] = v; mark(); } else set(p, v); }

  /* ---------- Pantallas ---------- */
  var TITLES = { inicio: "Resumen", portada: "Portada", destinos: "Destinos", promos: "Promociones del mes", portal: "Portal digital", opiniones: "Opiniones de viajeros", equipo: "Equipo de ventas", nosotros: "Quiénes somos", contacto: "Contacto y WhatsApp" };
  var VIEWS = {
    inicio: function () {
      var n = function (a) { return a.length; };
      return '<div class="hello"><h3>¡Hola! 👋</h3><p>Elegí qué querés cambiar en el menú. Después tocá <b>Guardar cambios</b> y <b>Ver la web</b> para verlo publicado.</p></div>' +
        '<div class="stats">' +
        stat("📍", n(C.DESTINOS), "destinos", "destinos") + stat("🔥", n(C.PROMOS), "promociones", "promos") +
        stat("📸", n(C.PORTAL), "destinos en el portal", "portal") + stat("⭐", n(C.OPINIONES), "opiniones", "opiniones") + stat("🧑‍💼", n(C.EQUIPO), "asesores", "equipo") + "</div>" +
        '<div class="tips"><h4>Cosas que podés hacer</h4><ul>' +
        "<li>Cambiar las fotos y el título de la portada para cada temporada.</li>" +
        "<li>Cargar la promo del mes con foto y etiqueta (por ejemplo, “Últimos cupos”).</li>" +
        "<li>Agregar un destino nuevo y elegir en qué filtros aparece.</li>" +
        "<li>Subir fotos y videos de YouTube de cada destino al portal digital.</li>" +
        "<li>Sumar opiniones reales de tus viajeros.</li></ul></div>";
    },
    portada: function () {
      var t = C.textos;
      return card("Textos de la portada",
          fText(tp("hero.kicker"), "Frase chica de arriba", t["hero.kicker"]) +
          '<div class="row2">' + fText(tp("hero.t1"), "Título (línea blanca)", t["hero.t1"]) + fText(tp("hero.t2"), "Título (línea naranja)", t["hero.t2"]) + "</div>" +
          fText(tp("hero.lead"), "Texto de presentación", t["hero.lead"], { area: true })) +
        card("Fotos de la portada", '<p class="muted">Pasan una tras otra con movimiento. Usá fotos horizontales y de buena calidad.</p><div class="row3">' +
          [1, 2, 3].map(function (i) { return '<div>' + fImg(tp("hero.f" + i), "Foto " + i, t["hero.f" + i]) + fText(tp("hero.p" + i), "Lugar de la foto", t["hero.p" + i]) + "</div>"; }).join("") + "</div>") +
        card("Banner “Brasil te está esperando”", fText(tp("banner.titulo"), "Frase", t["banner.titulo"], { area: true, rows: 2 }) + fImg(tp("banner.foto"), "Foto de fondo", t["banner.foto"])) +
        card("Títulos de secciones", fText(tp("dest.titulo"), "Título de Destinos", t["dest.titulo"]) + fText(tp("dest.sub"), "Bajada de Destinos", t["dest.sub"], { area: true, rows: 2 }) +
          fText(tp("promos.titulo"), "Título de Promociones", t["promos.titulo"]) + fText(tp("promos.sub"), "Bajada de Promociones", t["promos.sub"]));
    },
    destinos: function () {
      return list("DESTINOS", "destino", function (d, i) {
        var p = "DESTINOS." + i + ".";
        return '<div class="item__grid"><div>' + fImg(p + "img", "Foto", d.img) + "</div><div>" +
          '<div class="row2">' + fText(p + "nombre", "Nombre", d.nombre) + fText(p + "zona", "Zona", d.zona) + "</div>" +
          fText(p + "txt", "Descripción corta", d.txt, { area: true, rows: 2 }) +
          '<div class="field"><span>Aparece en los filtros</span><div class="checks">' +
          [["playa", "Playa"], ["familia", "En familia"], ["pareja", "Luna de miel"], ["ciudad", "Ciudad y cultura"], ["all", "All inclusive"]].map(function (t) {
            return '<label><input type="checkbox" data-tag="' + i + '" value="' + t[0] + '"' + (d.tags.indexOf(t[0]) > -1 ? " checked" : "") + ">" + t[1] + "</label>";
          }).join("") + '</div></div><label class="switch"><input type="checkbox" data-big="' + i + '"' + (d.destacado ? " checked" : "") + '><span></span>Destino destacado (tarjeta grande)</label></div></div>';
      }, { nombre: "Nuevo destino", zona: "Brasil", img: "img/maceio.jpg", tags: ["playa"], txt: "Contá en una línea por qué conviene este destino." });
    },
    promos: function () {
      return list("PROMOS", "promoción", function (d, i) {
        var p = "PROMOS." + i + ".";
        return '<div class="item__grid"><div>' + fImg(p + "img", "Foto", d.img) + "</div><div>" +
          fText(p + "titulo", "Título", d.titulo) + fText(p + "detalle", "Qué incluye", d.detalle, { ph: "Aéreo + 7 noches + traslados" }) +
          fText(p + "etiqueta", "Etiqueta", d.etiqueta, { ph: "Últimos cupos, Enero, Luna de miel…", help: "Sin precio: el botón “Consultar precio” lleva a WhatsApp con la promo escrita." }) + "</div></div>";
      }, { titulo: "Nueva promoción", detalle: "Aéreo + 7 noches + traslados", etiqueta: "Nueva", img: "img/porto.jpg" });
    },
    portal: function () {
      var t = C.textos;
      return card("Textos de la sección", fText(tp("portal.titulo"), "Título", t["portal.titulo"]) + fText(tp("portal.sub"), "Bajada", t["portal.sub"], { area: true, rows: 2 })) +
        '<p class="muted note">Cada tarjeta abre una galería con sus fotos y videos. Los videos se suben a YouTube y acá se pega el link.</p>' +
        list("PORTAL", "destino", function (d, i) {
          var p = "PORTAL." + i + ".";
          return '<div class="item__grid"><div>' + fImg(p + "img", "Foto de la tarjeta", d.img) + "</div><div>" +
            '<div class="row2">' + fText(p + "titulo", "Destino", d.titulo) + fText(p + "sub", "Texto chico", d.sub, { ph: "Aéreo, Bus, Nordeste…" }) + "</div>" +
            '<div class="field"><span>Fotos de la galería (' + (d.fotos || []).length + ')</span><div class="thumbs">' +
            (d.fotos || []).map(function (f, j) { return '<div class="thumb"><img src="' + esc(f) + '" alt=""><button type="button" title="Quitar foto" data-delph="' + i + "," + j + '">×</button></div>'; }).join("") +
            '<button type="button" class="thumbs__add" data-addph="' + i + '">+ Agregar fotos</button></div><small>Podés elegir varias fotos a la vez.</small></div>' +
            '<label class="field"><span>Videos de YouTube</span><textarea rows="3" data-vids="' + i + '" placeholder="https://youtu.be/...">' +
            esc((d.videos || []).map(function (id) { return "https://youtu.be/" + id; }).join("\n")) +
            '</textarea><small>Un link por renglón.</small></label>' +
            '<label class="switch"><input type="checkbox" data-pej="' + i + '"' + (d.ejemplo ? " checked" : "") + '><span></span>Mostrar etiqueta “Ejemplo”</label></div></div>';
        }, { titulo: "Nuevo destino", sub: "", img: "img/porto.jpg", fotos: [], videos: [], ejemplo: false });
    },
    opiniones: function () {
      return '<p class="muted note">Cargá solo opiniones reales, con permiso del viajero. Mientras no haya ninguna, la web muestra los espacios de ejemplo.</p>' +
        list("OPINIONES", "opinión", function (d, i) {
          var p = "OPINIONES." + i + ".";
          return fText(p + "texto", "Opinión", d.texto, { area: true, rows: 3 }) + '<div class="row2">' + fText(p + "nombre", "Nombre", d.nombre) + fText(p + "destino", "Destino", d.destino) + "</div>";
        }, { texto: "", nombre: "", destino: "" });
    },
    equipo: function () {
      return '<p class="muted note">Cada asesor aparece con su foto (o el ícono de usuario si no cargás una), su especialidad, opiniones de sus clientes y un botón para hablar con él por WhatsApp.</p>' +
        list("EQUIPO", "asesor", function (d, i) {
          var p = "EQUIPO." + i + ".";
          return '<div class="item__grid"><div>' + fImg(p + "foto", "Foto (opcional)", d.foto || "img/favicon.png") + "</div><div>" +
            '<div class="row2">' + fText(p + "nombre", "Nombre", d.nombre) + fText(p + "rol", "Puesto", d.rol) + "</div>" +
            fText(p + "esp", "Especialidad", d.esp, { ph: "Brasil y playas del Nordeste" }) +
            '<label class="field"><span>Opiniones de sus clientes</span><textarea rows="4" data-ops="' + i + '">' +
            esc((d.opiniones || []).map(function (o) { return o.texto + " | " + o.autor; }).join("\n")) +
            '</textarea><small>Una por renglón: opinión | nombre del cliente. Cargá solo opiniones reales.</small></label>' +
            '<label class="switch"><input type="checkbox" data-ej="' + i + '"' + (d.ejemplo ? " checked" : "") + '><span></span>Mostrar etiqueta “Ejemplo”</label></div></div>';
        }, { nombre: "Nombre y apellido", rol: "Asesor/a de viajes", esp: "Especialidad", opiniones: [], ejemplo: false });
    },
    nosotros: function () {
      var t = C.textos;
      return card("Quiénes somos", '<div class="item__grid"><div>' + fImg(tp("nos.foto"), "Foto del equipo u oficina", t["nos.foto"]) + "</div><div>" +
        fText(tp("nos.titulo"), "Título", t["nos.titulo"]) + fText(tp("nos.texto"), "Texto", t["nos.texto"], { area: true, rows: 6 }) + "</div></div>");
    },
    contacto: function () {
      var t = C.textos;
      return card("Datos de contacto", fText(tp("contacto.dir"), "Dirección", t["contacto.dir"]) + fText(tp("contacto.horario"), "Horarios", t["contacto.horario"]) +
        fText(tp("contacto.ig"), "Instagram", t["contacto.ig"])) +
        card("Canal de difusión", fText(tp("contacto.canal"), "Link del canal de WhatsApp", t["contacto.canal"] || "", { ph: "https://whatsapp.com/channel/...", help: "Si lo dejás vacío, los botones del canal no se muestran." })) +
        card("WhatsApp", fText("WA", "Número de WhatsApp", C.WA, { help: "Con código de país, sin + ni espacios. Ej.: 5493512265069" }) +
          '<a class="btn btn--sm btn--dark" target="_blank" rel="noopener" href="https://wa.me/' + esc(C.WA) + '">Probar el número ↗</a>');
    }
  };
  function stat(ico, n, txt, t) { return '<button class="stat" data-go="' + t + '"><span>' + ico + "</span><b>" + n + "</b><small>" + txt + "</small></button>"; }
  function card(title, body) { return '<section class="card"><h3>' + title + "</h3>" + body + "</section>"; }
  function list(key, name, render, blank) {
    var arr = C[key];
    return '<div class="list">' + arr.map(function (d, i) {
      return '<article class="item card"><div class="item__head"><b>' + esc(d.nombre || d.titulo || d.nombre === "" && "Opinión " + (i + 1) || name + " " + (i + 1)) + "</b>" +
        '<div class="item__tools"><button title="Subir" data-move="' + key + "," + i + ',-1">↑</button><button title="Bajar" data-move="' + key + "," + i + ',1">↓</button>' +
        '<button class="danger" data-del="' + key + "," + i + '">Eliminar</button></div></div>' + render(d, i) + "</article>";
    }).join("") + '</div><button class="btn btn--add" data-add="' + key + '">+ Agregar ' + name + "</button>" +
      '<script type="application/json" id="blank_' + key + '">' + JSON.stringify(blank) + "<\/script>";
  }

  function draw() {
    $("tabTitle").textContent = TITLES[tab];
    content.innerHTML = VIEWS[tab]();
    content.classList.remove("is-anim"); void content.offsetWidth; content.classList.add("is-anim");
  }

  /* ---------- Eventos ---------- */
  $("tabs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-tab]"); if (!b) return;
    tab = b.dataset.tab;
    document.querySelectorAll("#tabs button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
    document.body.classList.remove("nav-open"); draw(); scrollTo(0, 0);
  });
  $("menu").addEventListener("click", function () { document.body.classList.toggle("nav-open"); });

  content.addEventListener("input", function (e) {
    var el = e.target;
    if (el.dataset.path) setP(el.dataset.path, el.value);
    else if (el.dataset.ops != null) {
      C.EQUIPO[el.dataset.ops].opiniones = el.value.split("\n").map(function (l) { var x = l.split("|"); return { texto: (x[0] || "").trim(), autor: (x[1] || "Cliente").trim() }; }).filter(function (o) { return o.texto; });
      mark();
    }
  });
  content.addEventListener("change", function (e) {
    var el = e.target;
    if (el.dataset.tag != null) {
      var d = C.DESTINOS[el.dataset.tag];
      d.tags = [].slice.call(content.querySelectorAll('[data-tag="' + el.dataset.tag + '"]:checked')).map(function (x) { return x.value; }); mark();
    }
    if (el.dataset.ej != null) { C.EQUIPO[el.dataset.ej].ejemplo = el.checked; mark(); }
    if (el.dataset.big != null) { C.DESTINOS[el.dataset.big].destacado = el.checked; mark(); }
  });

  var imgTarget = null;
  content.addEventListener("click", function (e) {
    var t = e.target;
    var go = t.closest("[data-go]"); if (go) { document.querySelector('#tabs [data-tab="' + go.dataset.go + '"]').click(); return; }
    var im = t.closest("[data-img]"); if (im) { imgTarget = im; fileIn.value = ""; fileIn.click(); return; }
    var add = t.closest("[data-add]");
    if (add) { var k = add.dataset.add; C[k].push(JSON.parse($("blank_" + k).textContent)); mark(); draw(); content.querySelector(".list .item:last-child").scrollIntoView({ behavior: "smooth", block: "center" }); say("Agregado. Completalo y guardá."); return; }
    var del = t.closest("[data-del]");
    if (del) { var a = del.dataset.del.split(","); if (confirm("¿Eliminar este elemento?")) { C[a[0]].splice(+a[1], 1); mark(); draw(); say("Eliminado."); } return; }
    var mv = t.closest("[data-move]");
    if (mv) { var m = mv.dataset.move.split(","), arr = C[m[0]], i = +m[1], j = i + +m[2]; if (j < 0 || j >= arr.length) return; arr.splice(j, 0, arr.splice(i, 1)[0]); mark(); draw(); }
  });

  // Fotos: se achican en el navegador antes de guardarlas
  fileIn.addEventListener("change", function () {
    var f = fileIn.files[0]; if (!f || !imgTarget) return;
    var rd = new FileReader();
    rd.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 1400, sc = Math.min(1, max / Math.max(img.width, img.height));
        var cv = document.createElement("canvas"); cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        var url = cv.toDataURL("image/jpeg", 0.72);
        setP(imgTarget.dataset.img, url);
        imgTarget.parentNode.querySelector("img").src = url;
        say("Foto cargada. Tocá Guardar cambios.");
      };
      img.src = rd.result;
    };
    rd.readAsDataURL(f);
  });


  /* ---------- Portal digital: fotos y videos ---------- */
  var filesIn = $("files"), phTarget = null;
  function ytId(l) {
    l = l.trim(); if (/^[\w-]{11}$/.test(l)) return l;
    var m = l.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  function resize(file, cb) {
    var rd = new FileReader();
    rd.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 1800, sc = Math.min(1, max / Math.max(img.width, img.height));
        var cv = document.createElement("canvas"); cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height); cb(cv);
      };
      img.onerror = function () { cb(null); };
      img.src = rd.result;
    };
    rd.readAsDataURL(file);
  }
  function storeCanvas(cv, cb) { cb(cv.toDataURL("image/jpeg", 0.72)); }
  content.addEventListener("click", function (e) {
    var a = e.target.closest("[data-addph]");
    if (a) { phTarget = +a.dataset.addph; filesIn.value = ""; filesIn.click(); return; }
    var d = e.target.closest("[data-delph]");
    if (d) { var x = d.dataset.delph.split(","); C.PORTAL[+x[0]].fotos.splice(+x[1], 1); mark(); draw(); }
  });
  content.addEventListener("input", function (e) {
    var el = e.target; if (el.dataset.vids == null) return;
    C.PORTAL[+el.dataset.vids].videos = el.value.split("\n").map(ytId).filter(Boolean); mark();
  });
  content.addEventListener("change", function (e) {
    var el = e.target; if (el.dataset.pej != null) { C.PORTAL[+el.dataset.pej].ejemplo = el.checked; mark(); }
  });
  filesIn.addEventListener("change", function () {
    var list = [].slice.call(filesIn.files), item = C.PORTAL[phTarget], done = 0, ok = 0;
    if (!list.length || !item) return;
    item.fotos = item.fotos || [];
    var slots = list.map(function () { return null; });
    say("Subiendo " + list.length + (list.length > 1 ? " fotos…" : " foto…"));
    list.forEach(function (f, k) {
      resize(f, function (cv) {
        var fin = function (url) {
          slots[k] = url; if (url) ok++;
          if (++done === list.length) {
            slots.forEach(function (u) { if (u) item.fotos.push(u); });
            mark(); draw();
            say(ok === list.length ? "Fotos agregadas. Tocá Guardar cambios." : "Algunas fotos no se pudieron cargar. Probá de nuevo con esas.");
          }
        };
        if (cv) storeCanvas(cv, fin); else fin(null);
      });
    });
  });

  $("save").addEventListener("click", function () {
    try {
      localStorage.setItem(KEY, JSON.stringify(C));
      dirty = false; $("save").classList.remove("is-dirty"); $("save").textContent = "Guardar cambios";
      say("✓ Guardado. Tocá “Ver la web” para verlo.");
    } catch (e) { say("No entró: son demasiadas fotos para la demo. Probá con menos o más chicas."); }
  });
  $("reset").addEventListener("click", function () {
    if (!confirm("¿Volver la demo al contenido original? Se pierden los cambios.")) return;
    try { localStorage.removeItem(KEY); } catch (e) {}
    C = clone(DEF); dirty = false; draw(); say("Demo restablecida.");
  });
  addEventListener("beforeunload", function (e) { if (dirty) { e.preventDefault(); e.returnValue = ""; } });
})();
