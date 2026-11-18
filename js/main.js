(function () {
  "use strict";
  /* ---------- Cambios hechos desde el panel (demo: guardados en este navegador) ---------- */
  try {
    var saved = JSON.parse(localStorage.getItem("loy_content") || "null");
    if (saved) {
      if (saved.textos) Object.assign(window.LOY_TEXTOS, saved.textos);
      ["DESTINOS", "PROMOS", "BLOG", "OPINIONES"].forEach(function (k) { if (Array.isArray(saved[k])) window["LOY_" + k] = saved[k]; });
      if (saved.WA) window.LOY_WA = saved.WA;
    }
  } catch (e) {}
  var T = window.LOY_TEXTOS;
  document.querySelectorAll("[data-k]").forEach(function (el) { var v = T[el.dataset.k]; if (v != null) el.textContent = v; });
  document.querySelectorAll("[data-k-src]").forEach(function (el) { var v = T[el.dataset.kSrc]; if (v) el.src = v; });
  document.querySelectorAll("[data-k-bg]").forEach(function (el) { var v = T[el.dataset.kBg]; if (v) el.style.backgroundImage = "url(" + JSON.stringify(v) + ")"; });
  if (T["nos.foto"] && T["nos.foto"] !== "img/nosotros.jpg") document.getElementById("nosCap").hidden = true;

  var WA = window.LOY_WA;
  var waLink = function (msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  function bindWa(root) {
    (root || document).querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = waLink(a.getAttribute("data-wa"));
      a.target = "_blank"; a.rel = "noopener";
    });
  }

  /* ---------- Destinos + buscador ---------- */
  var grid = document.getElementById("gridDest");
  var list = document.getElementById("listDest");
  var D = window.LOY_DESTINOS;
  grid.innerHTML = D.map(function (d, i) {
    return '<a href="#" class="dest reveal' + (d.destacado ? " dest--big" : "") + '" data-i="' + i + '" data-wa="Hola Loytravel, quiero consultar por un viaje a ' + esc(d.nombre) + '">' +
      '<img src="' + d.img + '" alt="' + esc(d.nombre) + '" loading="lazy"><span class="dest__zona">' + esc(d.zona) + "</span>" +
      '<div class="dest__body"><h3>' + esc(d.nombre) + "</h3><p>" + esc(d.txt) + "</p>" +
      '<span class="dest__cta">Consultar por WhatsApp <span>→</span></span></div></a>';
  }).join("");
  list.innerHTML = D.map(function (d) { return '<option value="' + esc(d.nombre) + '">'; }).join("");

  var q = document.getElementById("q"), chips = document.getElementById("chips"), empty = document.getElementById("empty");
  var filtro = "todos";
  var norm = function (s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  function filtrar() {
    var t = norm(q.value.trim()), visibles = 0;
    grid.querySelectorAll(".dest").forEach(function (el) {
      var d = D[el.dataset.i];
      var okT = !t || norm(d.nombre + " " + d.zona + " " + d.txt).indexOf(t) > -1;
      var okF = filtro === "todos" || d.tags.indexOf(filtro) > -1;
      el.hidden = !(okT && okF);
      if (!el.hidden) { visibles++; el.classList.add("is-in"); }
    });
    empty.hidden = visibles > 0;
  }
  q.addEventListener("input", filtrar);
  chips.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    chips.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("is-on", c === b); });
    filtro = b.dataset.f; filtrar();
  });

  /* ---------- Promos y blog ---------- */
  document.getElementById("gridPromo").innerHTML = window.LOY_PROMOS.map(function (p) {
    return '<article class="promo reveal"><img src="' + p.img + '" alt="" loading="lazy"><div class="promo__body">' +
      '<span class="promo__tag">' + esc(p.etiqueta) + "</span><h3>" + esc(p.titulo) + "</h3><p>" + esc(p.detalle) + "</p>" +
      '<a href="#" class="btn btn--primary btn--sm" data-wa="Hola Loytravel, quiero el precio de la promo: ' + esc(p.titulo) + '">Consultar precio</a></div></article>';
  }).join("");

  document.getElementById("gridBlog").innerHTML = window.LOY_BLOG.map(function (b, i) {
    return '<article class="post reveal"><div class="post__img"><img src="' + b.img + '" alt="" loading="lazy"></div>' +
      '<div class="post__body"><span class="post__date">' + esc(b.fecha) + "</span><h3>" + esc(b.titulo) + "</h3><p>" + esc(b.txt) + "</p>" +
      '<button type="button" class="post__more" data-post="' + i + '">Leer nota <span>→</span></button></div></article>';
  }).join("");

  var modal = document.getElementById("postModal");
  document.getElementById("gridBlog").addEventListener("click", function (e) {
    var bt = e.target.closest("[data-post]"); if (!bt) return;
    var b = window.LOY_BLOG[bt.dataset.post];
    modal.querySelector(".modal__body").innerHTML =
      '<img src="' + b.img + '" alt=""><div class="modal__txt"><span class="post__date">' + esc(b.fecha) + "</span><h3>" + esc(b.titulo) + "</h3>" +
      b.cuerpo.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
      '<a href="#" class="btn btn--primary" data-wa="Hola Loytravel, leí la nota &quot;' + esc(b.titulo) + '&quot; y quiero consultar">Quiero viajar</a></div>';
    bindWa(modal); modal.showModal(); document.body.style.overflow = "hidden";
  });
  modal.addEventListener("close", function () { document.body.style.overflow = ""; });
  modal.addEventListener("click", function (e) { if (e.target === modal || e.target.closest(".modal__close")) modal.close(); });

  /* ---------- Opiniones reales (si las cargaron en el panel) ---------- */
  if (window.LOY_OPINIONES.length) {
    document.getElementById("gridOp").innerHTML = window.LOY_OPINIONES.map(function (o) {
      return '<blockquote class="op op--real reveal"><p>"' + esc(o.texto) + '"</p><footer>' + esc(o.nombre) + (o.destino ? " · " + esc(o.destino) : "") + "</footer></blockquote>";
    }).join("");
  }

  /* ---------- Test: ¿Qué Brasil es para vos? ---------- */
  var QZ = [
    { q: "¿Con quién viajás?", ops: [["En pareja", "pareja", "💑"], ["En familia, con chicos", "familia", "👨‍👩‍👧"], ["Con amigos", "amigos", "🎉"], ["Solo/a", "solo", "🎒"]] },
    { q: "¿Qué no puede faltar?", ops: [["Playa y descanso total", "playa", "🏖️"], ["Ciudad, cultura y paseos", "ciudad", "🏛️"], ["Todo incluido, sin pensar en nada", "all", "🍹"], ["Naturaleza y aguas cristalinas", "natural", "🐠"]] },
    { q: "¿Cuántos días tenés?", ops: [["Un finde largo (3-5)", "corto", "⏱️"], ["Una semana", "semana", "📅"], ["10 días o más", "largo", "🗓️"]] },
    { q: "¿Cuándo querés viajar?", ops: [["Verano (dic-mar)", "verano", "☀️"], ["Otoño o invierno", "invierno", "🍂"], ["Primavera", "primavera", "🌸"], ["Todavía no sé", "nose", "🤔"]] }
  ];
  var REC = {
    "Río de Janeiro": { ciudad: 3, amigos: 2, solo: 2, pareja: 1, corto: 1, semana: 1 },
    "Florianópolis": { playa: 2, familia: 2, amigos: 2, verano: 2, corto: 2, semana: 1 },
    "Búzios": { pareja: 3, playa: 2, natural: 1, semana: 1 },
    "Porto de Galinhas": { familia: 3, natural: 3, playa: 1, largo: 1 },
    "Maceió": { familia: 2, playa: 2, natural: 2, invierno: 1, largo: 1 },
    "Salvador de Bahía": { ciudad: 3, solo: 1, amigos: 1, invierno: 1, semana: 1 },
    "Costa do Sauípe": { all: 4, familia: 1, pareja: 1, semana: 1 }
  };
  var quiz = document.getElementById("quiz"), qi = 0, ans = [];
  function drawQ() {
    var d = QZ[qi];
    quiz.innerHTML = '<div class="quiz__top"><span>Pregunta ' + (qi + 1) + " de " + QZ.length + '</span><div class="quiz__bar"><i style="width:' + (qi / QZ.length * 100) + '%"></i></div></div>' +
      '<h3 class="quiz__q">' + d.q + '</h3><div class="quiz__ops">' +
      d.ops.map(function (o, i) { return '<button type="button" class="quiz__op" data-i="' + i + '"><span class="quiz__ico">' + o[2] + "</span>" + o[0] + "</button>"; }).join("") + "</div>" +
      (qi ? '<button type="button" class="quiz__back">← Volver</button>' : "");
    quiz.classList.remove("is-anim"); void quiz.offsetWidth; quiz.classList.add("is-anim");
  }
  function drawResult() {
    var tags = ans.map(function (a) { return a[1]; }), best = null, bestScore = -1;
    Object.keys(REC).forEach(function (k) {
      var sc = tags.reduce(function (t, g) { return t + (REC[k][g] || 0); }, 0);
      if (sc > bestScore) { bestScore = sc; best = k; }
    });
    var d = window.LOY_DESTINOS.filter(function (x) { return x.nombre === best; })[0] || window.LOY_DESTINOS[0];
    var msg = "Hola Loytravel! Hice el test de la web y me salió " + d.nombre + ".\n" +
      ans.map(function (a, i) { return "• " + QZ[i].q + " " + a[0]; }).join("\n") + "\n¿Me pasan opciones?";
    quiz.innerHTML = '<div class="quiz__res"><div class="quiz__resimg"><img src="' + d.img + '" alt=""></div><div class="quiz__restxt">' +
      '<span class="kicker">Tu destino ideal es</span><h3>' + esc(d.nombre) + "</h3><p>" + esc(d.txt) + "</p>" +
      '<div class="quiz__tags">' + ans.map(function (a) { return "<span>" + a[2] + " " + esc(a[0]) + "</span>"; }).join("") + "</div>" +
      '<div class="hero__btns"><a class="btn btn--primary" target="_blank" rel="noopener" href="' + waLink(msg) + '">Quiero mi propuesta para ' + esc(d.nombre) + '</a>' +
      '<button type="button" class="btn btn--ghost quiz__again">Hacer el test de nuevo</button></div></div></div>';
    quiz.classList.remove("is-anim"); void quiz.offsetWidth; quiz.classList.add("is-anim");
  }
  quiz.addEventListener("click", function (e) {
    var op = e.target.closest(".quiz__op");
    if (op) { op.classList.add("is-on"); ans[qi] = QZ[qi].ops[op.dataset.i]; setTimeout(function () { qi++; qi < QZ.length ? drawQ() : drawResult(); }, 260); return; }
    if (e.target.closest(".quiz__back")) { qi--; drawQ(); return; }
    if (e.target.closest(".quiz__again")) { qi = 0; ans = []; drawQ(); }
  });
  drawQ();

  bindWa();

  /* ---------- Formulario Armá tu viaje -> WhatsApp ---------- */
  var form = document.getElementById("formViaje");
  function armarMsg() {
    var f = form.elements;
    return "Hola Loytravel! Soy " + (f.nombre.value.trim() || "…") + " y quiero cotizar un viaje:\n" +
      "• Destino: " + (f.destino.value.trim() || "…") + "\n" +
      "• Fecha: " + (f.fecha.value.trim() || "a definir") + "\n" +
      "• Salida desde: " + (f.desde.value.trim() || "Córdoba") + "\n" +
      "• Pasajeros: " + f.adultos.value + " adultos, " + f.menores.value + " menores\n" +
      "• Tipo de viaje: " + form.querySelector("[name=tipo]:checked").value + "\n" +
      "• Pago preferido: " + f.pago.value;
  }
  var prev = document.getElementById("waPrev");
  function pintarPrev() {
    var h = new Date(), hh = ("0" + h.getHours()).slice(-2) + ":" + ("0" + h.getMinutes()).slice(-2);
    prev.innerHTML = esc(armarMsg()).replace(/\n/g, "<br>") + '<span class="waprev__time">' + hh + " ✓✓</span>";
  }
  form.addEventListener("input", pintarPrev); form.addEventListener("change", pintarPrev); pintarPrev();
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements, ok = true;
    ["destino", "nombre"].forEach(function (n) {
      var bad = !f[n].value.trim(); f[n].classList.toggle("is-bad", bad); if (bad) ok = false;
    });
    if (!ok) { form.querySelector(".is-bad").focus(); return; }
    window.open(waLink(armarMsg()), "_blank", "noopener");
  });

  /* ---------- Dólar BNA del día ---------- */
  var fmt = function (n) { return "$" + Number(n).toLocaleString("es-AR", { maximumFractionDigits: 2 }); };
  fetch("https://dolarapi.com/v1/dolares/oficial")
    .then(function (r) { if (!r.ok) throw 0; return r.json(); })
    .then(function (d) {
      document.getElementById("dolarCompra").textContent = fmt(d.compra);
      document.getElementById("dolarVenta").textContent = fmt(d.venta);
      document.getElementById("dolarVenta2").textContent = fmt(d.venta) + " (venta)";
      document.getElementById("dolar").classList.add("is-ok");
    })
    .catch(function () {
      document.getElementById("dolar").innerHTML = 'Consultá la cotización del dólar del día <a href="#" data-wa="Hola Loytravel, ¿a cuánto toman el dólar hoy?">por WhatsApp</a>';
      document.getElementById("dolarVenta2").textContent = "consultala por WhatsApp";
      bindWa(document.getElementById("dolar"));
    });

  /* ---------- Hero: fotos con movimiento ---------- */
  var slides = document.querySelectorAll(".hero__slide"), si = 0;
  var dots = document.querySelectorAll("#heroDots button"), place = document.getElementById("heroPlace");
  var places = [T["hero.p1"], T["hero.p2"], T["hero.p3"]]; place.textContent = places[0];
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, timer;
  function go(n) {
    slides[si].classList.remove("is-on"); dots[si].classList.remove("is-on");
    si = n; slides[si].classList.add("is-on"); dots[si].classList.add("is-on");
    place.classList.remove("is-in"); void place.offsetWidth; place.textContent = places[si]; place.classList.add("is-in");
  }
  function auto() { clearInterval(timer); if (!reduce) timer = setInterval(function () { go((si + 1) % slides.length); }, 6500); }
  dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); auto(); }); });
  auto();
  requestAnimationFrame(function () { document.body.classList.add("is-loaded"); });

  /* ---------- Parallax y barra de progreso ---------- */
  var heroMedia = document.querySelector(".hero__media"), heroIn = document.querySelector(".hero__in");
  var bannerBg = document.querySelector(".banner__bg"), banner = document.querySelector(".banner");
  var bar = document.getElementById("progress"), ticking = false;
  function frame() {
    var y = scrollY, h = innerHeight;
    bar.style.transform = "scaleX(" + (y / (document.documentElement.scrollHeight - h)) + ")";
    if (!reduce) {
      if (y < h) { heroMedia.style.transform = "translate3d(0," + y * 0.35 + "px,0)"; heroIn.style.transform = "translate3d(0," + y * 0.15 + "px,0)"; heroIn.style.opacity = 1 - y / (h * 0.9); }
      var r = banner.getBoundingClientRect();
      if (r.bottom > 0 && r.top < h) {
        var prog = (r.top + r.height / 2 - h / 2) / (h / 2 + r.height / 2); // -1 a 1
        bannerBg.style.transform = "translate3d(0," + (-prog * r.height * 0.18) + "px,0)";
      }
    }
    ticking = false;
  }
  addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  frame();

  /* ---------- Tarjetas con inclinación suave (solo mouse) ---------- */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce) {
    document.querySelectorAll(".dest, .promo").forEach(function (c) {
      c.addEventListener("mousemove", function (e) {
        var b = c.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, yy = (e.clientY - b.top) / b.height - 0.5;
        c.style.transform = "perspective(900px) rotateY(" + x * 6 + "deg) rotateX(" + -yy * 6 + "deg) translateY(-6px)";
      });
      c.addEventListener("mouseleave", function () { c.style.transform = ""; });
    });
  }

  /* ---------- Header, menú y animaciones ---------- */
  var header = document.getElementById("header");
  var onScroll = function () { header.classList.toggle("is-solid", scrollY > 40); };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var burger = document.getElementById("burger"), nav = document.getElementById("nav");
  burger.addEventListener("click", function () {
    var open = document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { document.body.classList.remove("menu-open"); burger.setAttribute("aria-expanded", false); }
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }
})();
