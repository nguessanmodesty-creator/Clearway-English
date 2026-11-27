/* AETERNA — atelier detail: three frames, horizontal scroll, floating archive bar. */
(function () {
  'use strict';
  var A = window.Aeterna;
  var data = window.AETERNA;
  if (!data) return;

  var id = new URLSearchParams(location.search).get('id');
  var piece = data.pieces.find(function (p) { return p.id === id; }) || data.pieces[0];
  var palette = '--g1:' + piece.palette[0] + ';--g2:' + piece.palette[1] +
                ';--g3:' + piece.palette[2] + ';--g4:' + piece.palette[3];

  document.title = piece.name + ' — AETERNA';

  /* ---------- Head ---------- */
  var set = function (sel, value) {
    var el = A.$(sel);
    if (el) el.textContent = value;
  };
  set('[data-piece-collection]', piece.collection);
  set('[data-piece-name]', piece.name);
  set('[data-piece-price]', A.money(piece.price));
  set('[data-bar-name]', piece.name);
  set('[data-bar-sub]', piece.material + ' · ' + piece.carat);
  set('[data-piece-description]', piece.description);

  /* ---------- Frames ---------- */

  function sketch() {
    return '' +
      '<div class="sketch" aria-hidden="true">' +
        '<svg viewBox="0 0 620 460">' +
          '<ellipse class="ln" cx="310" cy="268" rx="118" ry="126"></ellipse>' +
          '<ellipse class="ln--soft" cx="310" cy="268" rx="104" ry="112"></ellipse>' +
          '<path class="ln" d="M310 118 l52 46 -52 46 -52 -46 Z"></path>' +
          '<path class="ln--soft" d="M310 118 L310 210 M258 164 L362 164 M310 164 L362 210 M310 164 L258 210"></path>' +
          '<line class="ln--soft" x1="150" y1="268" x2="470" y2="268"></line>' +
          '<line class="ln--soft" x1="310" y1="88" x2="310" y2="404"></line>' +
          '<line class="ln--soft" x1="128" y1="164" x2="128" y2="372"></line>' +
          '<line class="ln--soft" x1="120" y1="164" x2="136" y2="164"></line>' +
          '<line class="ln--soft" x1="120" y1="372" x2="136" y2="372"></line>' +
          '<text x="140" y="276">Ø 17,3 MM</text>' +
          '<text x="336" y="112">TAILLE PRISME</text>' +
          '<text x="336" y="126">6 GRIFFES</text>' +
        '</svg>' +
      '</div>';
  }

  function map() {
    var place = piece.origin.place.toUpperCase();
    return '' +
      '<div class="sketch" aria-hidden="true">' +
        '<svg viewBox="0 0 620 460">' +
          '<circle class="ln--soft" cx="310" cy="230" r="190" fill="none"></circle>' +
          '<circle class="ln--soft" cx="310" cy="230" r="130" fill="none"></circle>' +
          '<circle class="ln--soft" cx="310" cy="230" r="70" fill="none"></circle>' +
          '<line class="ln--soft" x1="80" y1="230" x2="540" y2="230"></line>' +
          '<line class="ln--soft" x1="310" y1="20" x2="310" y2="440"></line>' +
          '<circle cx="382" cy="186" r="7" fill="#B89E7E"></circle>' +
          '<circle cx="382" cy="186" r="16" fill="none" stroke="#B89E7E" stroke-width=".8"></circle>' +
          '<circle cx="382" cy="186" r="28" fill="none" stroke="rgba(184,158,126,.45)" stroke-width=".8"></circle>' +
          '<text x="400" y="176">' + place + '</text>' +
          '<text x="400" y="190">' + piece.origin.coords + '</text>' +
          '<text x="100" y="222">ORIGINE VÉRIFIÉE</text>' +
        '</svg>' +
      '</div>';
  }

  var frames = '' +
    '<article class="frame frame--dark">' +
      '<div class="frame__art frame__art--blur"><div class="gem" style="' + palette + '"></div></div>' +
      '<div class="frame__scrim"></div>' +
      '<div class="frame__body">' +
        '<p class="frame__n">01 — La matière</p>' +
        '<h2 class="frame__title">' + piece.name + '</h2>' +
        '<p class="frame__text">' + piece.stone + ' · ' + piece.carat + '<br>' + piece.material + '</p>' +
      '</div>' +
    '</article>' +

    '<article class="frame frame--silicate frame--split">' +
      '<div class="frame__body">' +
        '<p class="frame__n">02 — L’échelle humaine</p>' +
        '<h2 class="frame__title">Un dessin de bijoutier,<br>avant la matière</h2>' +
        '<p class="frame__text">Chaque pièce commence par un tracé à la main : la pierre est dessinée en premier, la monture doit s’effacer devant elle. Le bijou fini ne pèse jamais plus que ce que la main peut oublier.</p>' +
      '</div>' +
      sketch() +
    '</article>' +

    '<article class="frame frame--split frame--split--rev">' +
      '<div class="frame__body">' +
        '<p class="frame__n">03 — L’origine</p>' +
        '<h2 class="frame__title">' + piece.origin.place + '</h2>' +
        '<p class="frame__text">' + piece.origin.coords + '<br>Pierre extraite par une coopérative certifiée, taillée en Europe, montée à Genève. Le certificat d’origine accompagne chaque écrin.</p>' +
      '</div>' +
      map() +
    '</article>';

  var track = A.$('[data-track-scroll]');
  track.innerHTML = frames;

  /* ---------- Specs & details ---------- */

  var specs = [
    ['Matière', piece.material],
    ['Pierre', piece.stone],
    ['Poids / carat', piece.carat],
    ['Origine', piece.origin.place]
  ];
  var specsEl = A.$('[data-specs]');
  specsEl.innerHTML = specs.map(function (s) {
    return '<div class="spec"><p>' + s[0] + '</p><p>' + s[1] + '</p></div>';
  }).join('');

  var detailsEl = A.$('[data-piece-details]');
  piece.details.forEach(function (d) {
    var li = document.createElement('li');
    li.innerHTML = '<span>' + d + '</span>';
    detailsEl.appendChild(li);
  });

  /* ---------- Horizontal navigation ---------- */

  var prev = A.$('[data-prev]');
  var next = A.$('[data-next]');
  var bar = A.$('[data-progress-bar]');
  var num = A.$('[data-progress-num]');

  function go(dir) {
    track.scrollBy({ left: dir * track.clientWidth, behavior: A.reduce ? 'auto' : 'smooth' });
  }

  prev.addEventListener('click', function () { go(-1); });
  next.addEventListener('click', function () { go(1); });

  track.addEventListener('scroll', function () {
    var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    i = Math.max(0, Math.min(2, i));
    if (bar) bar.style.width = ((i + 1) / 3 * 100) + '%';
    if (num) num.textContent = String(i + 1).padStart(2, '0');
  }, { passive: true });

  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });

  /* ---------- Add to the archive ---------- */

  A.$('[data-add]').addEventListener('click', function () {
    A.cart.add(piece.id, 1);
    A.toast('Ajouté à l’archive — <a href="checkout.html">Voir le panier</a>');
  });
})();
