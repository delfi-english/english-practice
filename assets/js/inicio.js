/* Get By · Dibuja la ruta de aprendizaje del inicio a partir de assets/js/curso.js */
(function () {
  var cont = document.getElementById("ruta");
  if (!cont || !window.CURSO) return;
  var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); };
  var progreso = (window.GB && GB.progress) ? GB.progress : { get: function () { return null; } };
  var html = "";
  CURSO.modulos.forEach(function (m, idx) {
    var practicados = m.juegos.filter(function (id) { return progreso.get(id); }).length;
    html += '<section class="modulo" id="modulo-' + m.id + '">' +
      '<div class="modulo-cab"><span class="modulo-emoji">' + m.emoji + '</span>' +
      '<div class="modulo-info"><h2 class="modulo-titulo"><span class="modulo-num">Módulo ' + (idx + 1) + '</span> ' + esc(m.titulo) + '</h2>' +
      '<p class="modulo-desc">' + esc(m.desc) + '</p></div>' +
      '<span class="nivel nivel-' + esc(m.nivel) + '">' + esc(m.nivel) + '</span></div>';
    if (m.teoria.length) {
      html += '<div class="modulo-teoria">' + m.teoria.map(function (t) { return '<a href="' + t.href + '">📘 ' + esc(t.label) + '</a>'; }).join("") + '</div>';
    }
    if (m.juegos.length) {
      html += '<div class="modulo-prog">' + practicados + ' de ' + m.juegos.length + (m.juegos.length === 1 ? ' juego practicado' : ' juegos practicados') + '</div><div class="games-grid">';
      m.juegos.forEach(function (id) {
        var g = CURSO.juegos[id];
        html += '<div class="game-card"><div class="card-header ' + g.bg + '"><span class="emoji-hero">' + g.emoji + '</span></div>' +
          '<div class="card-body"><h3 class="game-title">' + esc(g.titulo) + '</h3><p class="game-desc">' + esc(g.desc) + '</p>' +
          '<div class="tags">' + g.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("") + '</div>' +
          '<a href="' + id + '.html" class="btn-play">▶ Jugar Misión</a></div></div>';
      });
      html += '</div>';
    }
    if (m.proximamente.length) {
      html += '<div class="modulo-pronto"><span>🔜 Próximamente:</span>' + m.proximamente.map(function (p) {
        return '<span class="chip-pronto" title="' + esc(p.idea) + '">' + esc(p.titulo) + '</span>';
      }).join("") + '</div>';
    }
    html += '</section>';
  });
  cont.innerHTML = html;
})();
