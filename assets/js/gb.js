/* Get By · módulo compartido por todas las páginas.
   Qué hace:
   1) GB.progress  -> guarda el progreso en el celular (localStorage), sin cuentas.
   2) GB.review    -> muestra el "repaso de errores" al final de un juego.
   3) Barra superior con el botón para volver al inicio (si la página no pone data-bar="off").
   4) Registra el service worker (la app funciona sin internet) y el botón "Instalar app".
   Uso en una página:  <script src="assets/js/gb.js" data-title="Nombre del juego"></script>  */
(function () {
  "use strict";
  var GB = (window.GB = window.GB || {});
  var KEY = "getby:v1";
  var script = document.currentScript || document.querySelector('script[src*="gb.js"]');
  var cfg = (script && script.dataset) || {};

  /* ---------- 1) PROGRESO ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { games: {} }; }
    catch (e) { return { games: {} }; }
  }
  function save(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); return true; }
    catch (e) { return false; } // modo privado o almacenamiento lleno: el juego sigue funcionando igual
  }
  GB.progress = {
    // score = preguntas acertadas al primer intento, total = preguntas de la partida, errors = cantidad de errores cometidos
    record: function (id, r) {
      var d = load();
      var g = d.games[id] || { plays: 0, bestPct: 0, errorsTotal: 0 };
      var total = r.total || 0, score = r.score || 0;
      var pct = total ? Math.round((score / total) * 100) : 100;
      g.plays += 1;
      g.errorsTotal += r.errors || 0;
      g.last = { score: score, total: total, pct: pct, errors: r.errors || 0, date: Date.now() };
      if (pct >= g.bestPct) { g.bestPct = pct; g.best = { score: score, total: total }; }
      d.games[id] = g;
      return save(d);
    },
    get: function (id) { return load().games[id] || null; },
    all: function () { return load().games; },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };

  /* ---------- 2) REPASO DE ERRORES ----------
     errores = [{ prompt, elegido, correcta, explicacion }]  */
  function esc(t) {
    return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  GB.esc = esc;
  GB.review = {
    render: function (contenedor, errores) {
      if (!contenedor) return;
      if (!errores || !errores.length) {
        contenedor.innerHTML = '<div class="gb-review"><h3 class="gb-review-ok">🎯 ¡Sin errores!</h3></div>';
        return;
      }
      contenedor.innerHTML = '<div class="gb-review"><h3>📋 Repaso de errores (' + errores.length + ')</h3>' +
        errores.map(function (e) {
          return '<div class="gb-review-card">' +
            (e.prompt ? '<div class="gb-review-prompt">' + esc(e.prompt) + '</div>' : '') +
            '<div class="gb-review-mal">✗ Elegiste: ' + esc(e.elegido) + '</div>' +
            '<div class="gb-review-bien">✓ Correcta: ' + esc(e.correcta) + '</div>' +
            (e.explicacion ? '<div class="gb-review-expl">💡 ' + esc(e.explicacion) + '</div>' : '') +
            '</div>';
        }).join('') + '</div>';
    }
  };

  /* ---------- 3) BARRA SUPERIOR ---------- */
  function crearBarra() {
    if (cfg.bar === "off" || document.querySelector(".gb-bar")) return;
    var bar = document.createElement("nav");
    bar.className = "gb-bar";
    bar.setAttribute("aria-label", "Navegación Get By");
    // Si la página es un juego de algún módulo (según assets/js/curso.js), la barra ofrece volver a ese módulo
    var juego = location.pathname.split("/").pop().replace(/\.html.*$/, "");
    var mod = window.CURSO && CURSO.modulos.filter(function (m) { return m.juegos.indexOf(juego) >= 0; })[0];
    bar.innerHTML = '<a class="gb-bar-home" href="index.html">🏠 <b>Get By</b></a>' +
      (mod ? '<a class="gb-bar-mod" href="index.html#modulo-' + mod.id + '" aria-label="Volver al módulo ' + esc(mod.titulo) + '">↩ Volver al módulo</a>'
           : (cfg.title ? '<span class="gb-bar-title">' + esc(cfg.title) + '</span>' : ''));
    // La barra es fija arriba: no participa del layout de cada juego (algunos usan flex en el body)
    document.body.insertBefore(bar, document.body.firstChild);
    var alto = bar.offsetHeight;
    var padActual = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
    var arriba = alto + Math.min(padActual, 12);
    document.body.style.paddingTop = arriba + "px";
    document.documentElement.style.setProperty("--gb-top", arriba + "px"); // espacio que ocupa la barra, para que los juegos ajusten su alto
  }

  /* ---------- Progreso visible en el inicio ---------- */
  function pintarProgresoEnInicio() {
    var cards = document.querySelectorAll(".games-grid .game-card");
    if (!cards.length) return;
    var hechos = 0;
    cards.forEach(function (card) {
      var a = card.querySelector(".btn-play");
      if (!a) return;
      var id = (a.getAttribute("href") || "").replace(/\.html.*$/, "");
      var g = GB.progress.get(id);
      if (!g) return;
      hechos++;
      var b = document.createElement("div");
      b.className = "gb-badge";
      b.textContent = "✅ Jugado " + g.plays + (g.plays === 1 ? " vez" : " veces") + " · mejor: " + g.bestPct + "%";
      a.parentNode.insertBefore(b, a);
    });
    var r = document.getElementById("gb-resumen");
    if (r) {
      r.textContent = hechos ? "🔥 Llevás " + hechos + " de " + cards.length + " juegos practicados." : "Tu progreso se guarda automáticamente en este dispositivo.";
    }
  }

  /* ---------- 4) PWA: service worker + botón instalar ---------- */
  function registrarSW() {
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").catch(function () {});
      });
    }
  }
  var eventoInstalar = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    eventoInstalar = e;
    var btn = document.getElementById("gb-instalar");
    if (btn) btn.hidden = false;
  });
  window.addEventListener("appinstalled", function () {
    var btn = document.getElementById("gb-instalar");
    if (btn) btn.hidden = true;
  });
  GB.instalar = function () {
    if (!eventoInstalar) return;
    eventoInstalar.prompt();
    eventoInstalar.userChoice.finally(function () { eventoInstalar = null; var b = document.getElementById("gb-instalar"); if (b) b.hidden = true; });
  };

  function iniciar() {
    crearBarra();
    pintarProgresoEnInicio();
    var btn = document.getElementById("gb-instalar");
    if (btn) { btn.addEventListener("click", GB.instalar); if (eventoInstalar) btn.hidden = false; }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
  registrarSW();
})();
