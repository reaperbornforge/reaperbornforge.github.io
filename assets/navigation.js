/* Keep the visitor's audience and language when entering and leaving a case. */
(function () {
  function sync() {
    var context = new URLSearchParams(window.location.search).get('view') === 'studio' ? 'studio' : 'recruiter';
    document.querySelectorAll('a[href]').forEach(function (link) {
      var raw = link.getAttribute('href');
      if (!raw || raw[0] === '#' || /^(mailto:|https?:)/.test(raw)) return;
      var url = new URL(raw, window.location.href);
      if (url.pathname !== '/' && !url.pathname.startsWith('/projects/')) return;
      var view = link.closest('#studio-view') ? 'studio' : link.closest('#recruiter-view') ? 'recruiter' : context;
      if (link.id === 'btn-studio') view = 'studio';
      if (link.id === 'btn-recruiter') view = 'recruiter';
      url.searchParams.set('view', view);
      url.searchParams.set('lang', window.RFLang ? window.RFLang.get() : 'en');
      if (view === 'studio') {
        var anchors = {'#rec-projects':'#projects','#rec-skills':'#skills','#rec-hire':'#contact'};
        url.hash = anchors[url.hash] || url.hash;
        if (link.closest('.status-crumbs') && link.textContent.trim() === 'Recruiter') link.textContent = 'Studio';
      }
      link.setAttribute('href', url.pathname + url.search + url.hash);
    });
  }
  document.addEventListener('DOMContentLoaded', sync);
  window.addEventListener('rf:langchange', sync);
})();
