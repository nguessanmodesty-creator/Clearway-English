/* AETERNA — transit: cart, single-column form, confirmation. */
(function () {
  'use strict';
  var A = window.Aeterna;
  var data = window.AETERNA;
  if (!A || !data) return;

  var linesEl = A.$('[data-cart-lines]');
  var totalsEl = A.$('[data-totals]');
  var form = A.$('[data-form]');
  var mainEl = A.$('[data-checkout-main]');
  var asideEl = A.$('.summary');
  var submit = A.$('[data-submit]');

  var find = function (id) { return data.pieces.find(function (p) { return p.id === id; }); };

  function cartLines() {
    return A.cart.lines().map(function (l) {
      var piece = find(l.id);
      return piece ? { piece: piece, qty: l.qty } : null;
    }).filter(Boolean);
  }

  function render() {
    var rows = cartLines();
    var subtotal = rows.reduce(function (s, r) { return s + r.piece.price * r.qty; }, 0);

    linesEl.innerHTML = '';

    if (!rows.length) {
      var empty = document.createElement('p');
      empty.className = 'cart-empty';
      empty.innerHTML = 'Votre sélection est vide. <a class="link-line" href="archive.html" style="margin-top:10px">Parcourir l’archive</a>';
      linesEl.appendChild(empty);
    }

    rows.forEach(function (row) {
      var el = document.createElement('div');
      el.className = 'cart-line';
      el.innerHTML =
        '<div class="cart-line__art"><div class="gem" style="--g1:' + row.piece.palette[0] +
          ';--g2:' + row.piece.palette[1] + ';--g3:' + row.piece.palette[2] + ';--g4:' + row.piece.palette[3] + '"></div></div>' +
        '<div>' +
          '<a class="cart-line__name" href="piece.html?id=' + encodeURIComponent(row.piece.id) + '"></a>' +
          '<div class="cart-line__qty">' +
            '<button type="button" data-dec aria-label="Retirer un exemplaire">−</button>' +
            '<span class="num">' + row.qty + '</span>' +
            '<button type="button" data-inc aria-label="Ajouter un exemplaire">+</button>' +
          '</div>' +
        '</div>' +
        '<p class="cart-line__price num">' + A.money(row.piece.price * row.qty) + '</p>' +
        '<button type="button" class="cart-line__remove" data-remove>Retirer</button>';
      el.querySelector('.cart-line__name').textContent = row.piece.name;

      el.querySelector('[data-dec]').addEventListener('click', function () {
        A.cart.setQty(row.piece.id, row.qty - 1);
      });
      el.querySelector('[data-inc]').addEventListener('click', function () {
        A.cart.setQty(row.piece.id, row.qty + 1);
      });
      el.querySelector('[data-remove]').addEventListener('click', function () {
        A.cart.remove(row.piece.id);
      });
      linesEl.appendChild(el);
    });

    totalsEl.innerHTML =
      '<div><span>Sous-total</span><span class="num">' + A.money(subtotal) + '</span></div>' +
      '<div><span>Livraison assurée</span><span>Offerte</span></div>' +
      '<div class="is-total"><span>Total</span><span class="num">' + A.money(subtotal) + '</span></div>';

    if (submit) {
      submit.disabled = !rows.length;
      submit.textContent = rows.length ? 'Confirmer la demande' : 'Sélection vide';
    }
  }

  document.addEventListener('cart:change', render);
  render();

  /* ---------- Validation ---------- */

  var rules = {
    first: function (v) { return v.trim().length >= 2 || 'Indiquez votre prénom.'; },
    last: function (v) { return v.trim().length >= 2 || 'Indiquez votre nom.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Adresse électronique invalide.'; },
    address: function (v) { return v.trim().length >= 4 || 'Indiquez votre adresse.'; },
    zip: function (v) { return v.trim().length >= 3 || 'Code postal incomplet.'; },
    city: function (v) { return v.trim().length >= 2 || 'Indiquez votre ville.'; },
    country: function (v) { return !!v || 'Choisissez un pays.'; }
  };

  function setError(name, message) {
    var input = form.querySelector('[name="' + name + '"]');
    var err = form.querySelector('[data-err="' + name + '"]');
    var field = input ? input.closest('.field') : null;
    if (field) field.classList.toggle('field--error', !!message);
    if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (err) err.textContent = message || '';
  }

  function validate() {
    var firstBad = null;
    Object.keys(rules).forEach(function (name) {
      var input = form.querySelector('[name="' + name + '"]');
      var result = rules[name](input ? input.value : '');
      var message = result === true ? '' : result;
      setError(name, message);
      if (message && !firstBad) firstBad = input;
    });
    return firstBad;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!cartLines().length) return;

      var bad = validate();
      if (bad) { bad.focus(); return; }

      var rows = cartLines();
      var name = form.querySelector('[name="first"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var ref = 'AET-' + String(Math.floor(1000 + Math.random() * 9000));

      mainEl.innerHTML =
        '<div class="confirm" role="status">' +
          '<p class="eyebrow">Demande enregistrée</p>' +
          '<h2>Merci, ' + name.replace(/[<>&]/g, '') + '.</h2>' +
          '<p>Votre demande porte la référence <b class="num">' + ref + '</b>. L’atelier vous écrit à ' +
            email.replace(/[<>&]/g, '') + ' sous 24 heures ouvrées pour organiser le règlement, l’assurance et la remise de l’écrin.</p>' +
          '<p class="small">' + rows.length + ' pièce' + (rows.length > 1 ? 's' : '') +
            ' réservée' + (rows.length > 1 ? 's' : '') + ' à votre nom. Aucun montant n’a été prélevé.</p>' +
          '<p><a class="link-line" href="archive.html">Retour à l’archive</a></p>' +
        '</div>';

      if (asideEl) asideEl.style.display = 'none';
      var grid = A.$('.checkout__grid');
      if (grid) grid.style.gridTemplateColumns = '1fr';

      A.cart.clear();
      window.scrollTo({ top: 0, behavior: A.reduce ? 'auto' : 'smooth' });
      var heading = mainEl.querySelector('h2');
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
    });

    /* Clear an error as soon as the field is corrected */
    function revalidate(e) {
      var name = e.target.name;
      if (name && rules[name]) {
        var result = rules[name](e.target.value);
        setError(name, result === true ? '' : result);
      }
    }
    form.addEventListener('input', revalidate);
    form.addEventListener('change', revalidate);
  }
})();
