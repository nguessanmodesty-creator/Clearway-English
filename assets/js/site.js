/* AETERNA — shared behaviour: menu, scroll physics, cart, reveal. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.Aeterna = { $: $, $$: $$, reduce: reduce, money: money, toast: toast };

  function money(value) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
      .format(value)
      .replace(/\u00a0/g, ' ');
  }

  /* ---------- Cart (localStorage) ---------- */

  var CART_KEY = 'aeterna.cart';

  function readCart() {
    try {
      var raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(raw) ? raw.filter(function (l) { return l && l.id && l.qty > 0; }) : [];
    } catch (e) { return []; }
  }

  function writeCart(lines) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(lines)); } catch (e) {}
    paintCount();
    document.dispatchEvent(new CustomEvent('cart:change'));
  }

  function paintCount() {
    var n = readCart().reduce(function (s, l) { return s + l.qty; }, 0);
    $$('[data-cart-count]').forEach(function (el) { el.textContent = n; });
  }

  var cart = {
    lines: readCart,
    count: function () { return readCart().reduce(function (s, l) { return s + l.qty; }, 0); },
    add: function (id, qty) {
      var lines = readCart();
      var line = lines.find(function (l) { return l.id === id; });
      if (line) { line.qty += (qty || 1); } else { lines.push({ id: id, qty: qty || 1 }); }
      writeCart(lines);
    },
    setQty: function (id, qty) {
      var lines = readCart().map(function (l) { return l.id === id ? { id: id, qty: qty } : l; })
        .filter(function (l) { return l.qty > 0; });
      writeCart(lines);
    },
    remove: function (id) {
      writeCart(readCart().filter(function (l) { return l.id !== id; }));
    },
    clear: function () { writeCart([]); }
  };
  window.Aeterna.cart = cart;

  /* ---------- Toast ---------- */

  var toastEl, toastTimer;
  function toast(html) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = html;
    requestAnimationFrame(function () { toastEl.classList.add('is-on'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 4200);
  }

  /* ---------- Glass menu ---------- */

  var menu = $('[data-menu]');
  var lastFocus = null;

  function openMenu() {
    if (!menu) return;
    lastFocus = document.activeElement;
    menu.classList.add('is-open');
    menu.removeAttribute('hidden');
    document.body.classList.add('is-locked');
    $$('[data-menu-open]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    var first = $('a, button', menu);
    if (first) first.focus({ preventScroll: true });
  }

  function closeMenu() {
    if (!menu || !menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    $$('[data-menu-open]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  $$('[data-menu-open]').forEach(function (b) { b.addEventListener('click', openMenu); });
  $$('[data-menu-close]').forEach(function (b) { b.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
  if (menu) {
    $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
  }

  /* ---------- Top bar on scroll ---------- */

  var bar = $('.topbar');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (bar) bar.classList.toggle('is-stuck', y > 60);

    /* Typography expands as the page scrolls: atmospheric pressure. */
    if (!reduce) {
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var p = Math.min(1, y / max);
      $$('[data-track]').forEach(function (el) { el.style.setProperty('--t', p.toFixed(3)); });
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  paintCount();

  /* ---------- Reveal on enter ---------- */

  var revealables = $$('[data-reveal]');
  if (revealables.length) {
    if (!('IntersectionObserver' in window) || reduce) {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Hero: the gemstone follows the cursor ---------- */

  var hero = $('[data-hero]');
  if (hero && !reduce && window.matchMedia('(hover:hover)').matches) {
    var art = $('.hero__art', hero);
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      art.style.setProperty('--rot', (x * 5).toFixed(2) + 'deg');
      art.style.setProperty('--tx', (x * -26).toFixed(1) + 'px');
      art.style.setProperty('--ty', (y * -20).toFixed(1) + 'px');
    });
    hero.addEventListener('pointerleave', function () {
      art.style.setProperty('--rot', '0deg');
      art.style.setProperty('--tx', '0px');
      art.style.setProperty('--ty', '0px');
    });
  }
})();
