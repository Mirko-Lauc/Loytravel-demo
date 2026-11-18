(function () {
  "use strict";
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

  document.getElementById("gridBlog").innerHTML = window.LOY_BLOG.map(function (b) {
    return '<article class="post reveal"><div class="post__img"><img src="' + b.img + '" alt="" loading="lazy"></div>' +
      '<div class="post__body"><span class="post__date">' + esc(b.fecha) + "</span><h3>" + esc(b.titulo) + "</h3><p>" + esc(b.txt) + "</p>" +
      '<a href="#" class="dest__cta" data-wa="Hola Loytravel, leí la nota &quot;' + esc(b.titulo) + '&quot; y quiero consultar">Quiero viajar <span>→</span></a></div></article>';
  }).join("");

  bindWa();

  /* ---------- Formulario Armá tu viaje -> WhatsApp ---------- */
  var form = document.getElementById("formViaje");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements, ok = true;
    ["destino", "nombre"].forEach(function (n) {
      var bad = !f[n].value.trim(); f[n].classList.toggle("is-bad", bad); if (bad) ok = false;
    });
    if (!ok) { form.querySelector(".is-bad").focus(); return; }
    var msg = "Hola Loytravel! Soy " + f.nombre.value.trim() + " y quiero cotizar un viaje:\n" +
      "• Destino: " + f.destino.value.trim() + "\n" +
      "• Fecha: " + (f.fecha.value.trim() || "a definir") + "\n" +
      "• Salida desde: " + (f.desde.value.trim() || "Córdoba") + "\n" +
      "• Pasajeros: " + f.adultos.value + " adultos, " + f.menores.value + " menores\n" +
      "• Tipo de viaje: " + form.querySelector("[name=tipo]:checked").value + "\n" +
      "• Pago preferido: " + f.pago.value;
    window.open(waLink(msg), "_blank", "noopener");
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
  var places = ["Río de Janeiro · Pan de Azúcar", "Búzios · Costa do Sol", "Río de Janeiro · Cristo Redentor"];
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
