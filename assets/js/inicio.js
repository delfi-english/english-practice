/* Get By · Inicio: ruta de módulos y vista de cada módulo (assets/js/curso.js) */
(function () {
  var cont = document.getElementById("ruta"), cab = document.getElementById("cabecera-inicio");
  if (!cont || !window.CURSO) return;
  var C = CURSO;
  var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); };
  var prog = function (id) { return (window.GB && GB.progress) ? GB.progress.get(id) : null; };
  var plural = function (n, uno, varios) { return n + " " + (n === 1 ? uno : varios); };

  function practicados(m) { return m.juegos.filter(function (id) { return prog(id); }).length; }

  function vistaRuta() {
    var total = 0, hechos = 0;
    C.modulos.forEach(function (m) { total += m.juegos.length; hechos += practicados(m); });
    var r = document.getElementById("gb-resumen");
    if (r) r.textContent = hechos ? "🔥 Llevás " + hechos + " de " + total + " juegos practicados." : "Tu progreso se guarda automáticamente en este dispositivo.";
    var h = '<ol class="ruta">';
    C.modulos.forEach(function (m, i) {
      var p = practicados(m), n = m.juegos.length, completo = n > 0 && p === n;
      var detalle = [m.nivel === "Todos" ? "Transversal" : "Nivel " + m.nivel, n ? plural(n, "juego", "juegos") : "Juegos próximamente"].join(" · ");
      h += '<li><a class="tile' + (completo ? " tile-ok" : "") + '" href="#modulo-' + m.id + '">' +
        '<span class="tile-num">' + (completo ? "✓" : i + 1) + '</span>' +
        '<span class="tile-emoji">' + m.emoji + '</span>' +
        '<span class="tile-info"><strong>' + esc(m.titulo) + '</strong><small>' + detalle + '</small></span>' +
        '<span class="tile-prog">' + (n ? p + "/" + n : "") + '</span></a></li>';
    });
    cont.innerHTML = h + '</ol>';
    if (cab) cab.hidden = false;
  }

  function vistaModulo(i) {
    var m = C.modulos[i], ant = C.modulos[i - 1], sig = C.modulos[i + 1];
    var h = '<a class="volver" href="#">← Todos los módulos</a>' +
      '<header class="mod-cab"><span class="mod-emoji">' + m.emoji + '</span><div><span class="mod-num">Módulo ' + (i + 1) + ' de ' + C.modulos.length + '</span>' +
      '<h2>' + esc(m.titulo) + '</h2></div><span class="nivel nivel-' + esc(m.nivel) + '">' + esc(m.nivel) + '</span></header>' +
      '<p class="mod-desc">' + esc(m.desc) + '</p>';
    if (m.teoria.length) {
      h += '<h3 class="paso"><span>1</span> Aprendé</h3><div class="mod-teoria">' +
        m.teoria.map(function (t) { return '<a href="teoria-nivel1.html#' + t.id + '"><span>' + t.emoji + '</span>' + esc(t.label) + '<em>Leer teoría ›</em></a>'; }).join("") + '</div>';
    }
    h += '<h3 class="paso"><span>' + (m.teoria.length ? 2 : 1) + '</span> Practicá</h3>';
    if (m.juegos.length) {
      h += '<div class="juegos">' + m.juegos.map(function (id) {
        var g = C.juegos[id], p = prog(id);
        return '<a class="juego-fila" href="' + id + '.html"><span class="juego-ico ' + g.bg + '">' + g.emoji + '</span>' +
          '<span class="juego-info"><strong>' + esc(g.titulo) + '</strong><small>' + esc(g.desc) + '</small>' +
          (p ? '<em class="juego-prog">✅ ' + (g.practica ? 'Practicado ' + plural(p.plays, "vez", "veces") : 'Jugado ' + plural(p.plays, "vez", "veces") + ' · mejor: ' + p.bestPct + '%') + '</em>' : '') +
          '</span><span class="juego-go">▶</span></a>';
      }).join("") + '</div>';
    } else {
      h += '<p class="vacio">Los juegos de este módulo llegan pronto.</p>';
    }
    if (m.proximamente.length) {
      h += '<h3 class="paso paso-pronto">🔜 Próximamente</h3><ul class="pronto">' +
        m.proximamente.map(function (p) { return '<li><strong>' + esc(p.titulo) + '</strong><span>' + esc(p.idea) + '</span></li>'; }).join("") + '</ul>';
    }
    h += '<nav class="mod-nav">' +
      (ant ? '<a href="#modulo-' + ant.id + '">← ' + esc(ant.titulo) + '</a>' : '<span></span>') +
      (sig ? '<a href="#modulo-' + sig.id + '">' + esc(sig.titulo) + ' →</a>' : '<span></span>') + '</nav>';
    cont.innerHTML = h;
    if (cab) cab.hidden = true;
  }

  function mostrar() {
    var id = location.hash.replace(/^#modulo-/, ""), i = location.hash.indexOf("#modulo-") === 0
      ? C.modulos.findIndex(function (m) { return m.id === id; }) : -1;
    if (i >= 0) vistaModulo(i); else vistaRuta();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", mostrar);
  mostrar();
})();
