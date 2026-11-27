/* AETERNA — the curated vault: asymmetric mosaic + refraction filter. */
(function () {
  'use strict';
  var A = window.Aeterna;
  var data = window.AETERNA;
  var mosaic = A.$('[data-mosaic]');
  var countEl = A.$('[data-archive-count]');
  if (!mosaic || !data) return;

  var palette = function (p) {
    return '--g1:' + p[0] + ';--g2:' + p[1] + ';--g3:' + p[2] + ';--g4:' + p[3];
  };

  function card(piece, i) {
    var a = document.createElement('a');
    a.className = 'piece';
    a.href = 'piece.html?id=' + encodeURIComponent(piece.id);
    a.setAttribute('data-mood', piece.mood);
    a.setAttribute('data-reveal', '');
    a.innerHTML =
      '<span class="piece__index">' + String(i + 1).padStart(2, '0') + '</span>' +
      '<div class="piece__art"><div class="gem" style="' + palette(piece.palette) + '"></div></div>' +
      '<div class="piece__meta">' +
        '<div>' +
          '<p class="piece__title"></p>' +
          '<p class="piece__sub"></p>' +
        '</div>' +
        '<p class="piece__price"></p>' +
      '</div>';
    a.querySelector('.piece__title').textContent = piece.name;
    a.querySelector('.piece__sub').textContent = piece.material + ' · ' + piece.stone;
    a.querySelector('.piece__price').textContent = A.money(piece.price);
    return a;
  }

  data.pieces.forEach(function (p, i) { mosaic.appendChild(card(p, i)); });

  /* Reveal the newly inserted cards */
  if ('IntersectionObserver' in window && !A.reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    A.$$('[data-reveal]', mosaic).forEach(function (el) { io.observe(el); });
  } else {
    A.$$('[data-reveal]', mosaic).forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Refraction filter */
  var chips = A.$$('[data-mood]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var mood = chip.getAttribute('data-mood');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      var shown = 0;
      A.$$('.piece', mosaic).forEach(function (el) {
        var match = mood === 'all' || el.getAttribute('data-mood') === mood;
        el.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      if (countEl) countEl.textContent = shown + (shown > 1 ? ' pièces' : ' pièce');
    });
  });
})();
