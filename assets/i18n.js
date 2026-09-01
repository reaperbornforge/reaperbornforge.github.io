/* ──────────────────────────────────────────────────────────────
   Reaperborn Forge · site-wide language switch (EN / PT-BR)
   Load this BLOCKING in <head> so data-lang is set before paint.

   Markup contract
   ---------------
   Content is authored twice, in place:
       <p class="i18n-en">English copy</p>
       <p class="i18n-pt">Copia em portugues</p>
   CSS hides whichever does not match html[data-lang].

   Any element with data-set-lang="en|pt" acts as a switch button.
   Pages with no PT copy yet simply have no .i18n-pt blocks and
   keep showing their single-language content. That is the
   intended fallback while the rest of the site is translated.
   ────────────────────────────────────────────────────────────── */
(function () {
  var KEY = 'rf-lang';
  var HTML_LANG = { en: 'en', pt: 'pt-BR' };

  function normalize(value) {
    if (!value) return null;
    value = String(value).toLowerCase();
    if (value.indexOf('pt') === 0) return 'pt';
    if (value.indexOf('en') === 0) return 'en';
    return null;
  }

  function read() {
    try { return localStorage.getItem(KEY); } catch (err) { return null; }
  }

  function write(lang) {
    try { localStorage.setItem(KEY, lang); } catch (err) { /* private mode */ }
  }

  var params = new URLSearchParams(window.location.search);
  var fromUrl = normalize(params.get('lang'));
  var lang = fromUrl || normalize(read()) || normalize(navigator.language) || 'en';

  function syncButtons(lang) {
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute('data-set-lang') === lang;
      if (on) { buttons[i].classList.add('active'); }
      else { buttons[i].classList.remove('active'); }
      buttons[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function apply(lang) {
    var root = document.documentElement;
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', HTML_LANG[lang]);
    syncButtons(lang);
    try {
      window.dispatchEvent(new CustomEvent('rf:langchange', { detail: { lang: lang } }));
    } catch (err) { /* no CustomEvent constructor */ }
  }

  // Runs while <head> is parsing, so the page never paints the wrong language.
  apply(lang);
  if (fromUrl) write(lang);

  window.RFLang = {
    get: function () { return document.documentElement.getAttribute('data-lang'); },
    set: function (next) {
      next = normalize(next) || 'en';
      write(next);
      apply(next);
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Buttons did not exist during the head-time pass.
    syncButtons(window.RFLang.get());

    document.addEventListener('click', function (event) {
      var target = event.target;
      var button = null;
      while (target && target !== document) {
        if (target.getAttribute && target.getAttribute('data-set-lang')) { button = target; break; }
        target = target.parentNode;
      }
      if (!button) return;
      event.preventDefault();
      window.RFLang.set(button.getAttribute('data-set-lang'));
    });
  });
})();
