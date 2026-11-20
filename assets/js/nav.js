/* Get By · Menú de teoría y enlaces teoría -> juegos, generados desde assets/js/curso.js */
(function () {
  var C = window.CURSO; if (!C) return;
  var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); };

  // Menú lateral: un bloque por módulo, con sus temas de teoría
  function poblarMenu(cont, enTeoria) {
    if (!cont) return;
    var base = enTeoria ? "" : "teoria-nivel1.html";
    var h = "";
    C.modulos.forEach(function (m, i) {
      if (!m.teoria.length) return;
      h += '<div class="nav-category">' + (i + 1) + ' · ' + esc(m.titulo) + '</div>';
      m.teoria.forEach(function (t) {
        h += '<a href="' + base + '#' + t.id + '" class="nav-item"><span class="nav-icon">' + t.emoji + '</span> <span class="nav-text">' + esc(t.label) + '</span></a>';
      });
    });
    h += '<a href="index.html" class="nav-item btn-back"><span class="nav-icon">◀</span> <span class="nav-text">Volver al inicio</span></a>';
    cont.innerHTML = h;
  }

  // En la página de teoría: al final de cada tema, enlaces a los juegos del módulo
  function agregarPractica() {
    document.querySelectorAll(".theory-section").forEach(function (sec) {
      var m = C.modulos.filter(function (x) { return x.teoria.some(function (t) { return t.id === sec.id; }); })[0];
      if (!m) return;
      var h = '<div class="practica-box"><strong>🎮 Practicá este tema</strong>';
      if (m.juegos.length) {
        h += m.juegos.map(function (id) { var g = C.juegos[id]; return '<a href="' + id + '.html">' + g.emoji + ' ' + esc(g.titulo) + '</a>'; }).join("");
      } else {
        h += '<span class="practica-pronto">Los juegos de este módulo llegan pronto.</span>';
      }
      h += '<a class="practica-mod" href="index.html#modulo-' + m.id + '">Ver el módulo completo →</a></div>';
      sec.insertAdjacentHTML("beforeend", h);
    });
  }

  function iniciar() {
    poblarMenu(document.getElementById("nav-teoria"), true);
    poblarMenu(document.getElementById("nav-teoria-inicio"), false);
    agregarPractica();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
