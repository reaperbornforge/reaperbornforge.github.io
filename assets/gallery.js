/* ──────────────────────────────────────────────────────────────
   Reaperborn Forge · screenshot gallery
   Self-discovering: drop images into the folder, nothing to edit.

   Usage
   -----
   <div class="gallery" data-gallery="/assets/one/,/assets/two/"></div>

   data-gallery takes one folder or a comma-separated list of folders.

   Discovery order
   ---------------
   1. <folder>/images.json  (optional manifest, wins if present)
        ["01.png", "02.png"]                       - simple form
        [{"src": "01.png", "caption": {"en": "...", "pt": "..."}}]
   2. Sequential probe: 01, 02, 03 ... trying .png .jpg .jpeg .webp
      for each index, stopping at the first index with no match.

   So naming files 01.png, 02.png, ... just works, from one image up.
   Caps at 24 so a gap in numbering can never spin forever.
   ────────────────────────────────────────────────────────────── */
(function () {
  var EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp'];
  var MAX_IMAGES = 24;

  var COPY = {
    empty: {
      en: 'No screenshots yet. Drop images into this project folder and they appear here automatically.',
      pt: 'Nenhuma captura ainda. Coloque imagens na pasta do projeto e elas aparecem aqui automaticamente.'
    },
    prev: { en: 'Previous image', pt: 'Imagem anterior' },
    next: { en: 'Next image', pt: 'Proxima imagem' },
    shot: { en: 'Screenshot', pt: 'Captura' }
  };

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function probe(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve(img.naturalWidth > 0 ? src : null); };
      img.onerror = function () { resolve(null); };
      img.src = src;
    });
  }

  function probeIndex(dir, index) {
    var i = 0;
    function attempt() {
      if (i >= EXTENSIONS.length) return Promise.resolve(null);
      var src = dir + pad(index) + '.' + EXTENSIONS[i];
      i += 1;
      return probe(src).then(function (found) { return found || attempt(); });
    }
    return attempt();
  }

  function discoverByProbe(dir) {
    var found = [];
    function step(index) {
      if (index > MAX_IMAGES) return Promise.resolve(found);
      return probeIndex(dir, index).then(function (src) {
        if (!src) return found;
        found.push({ src: src, caption: null });
        return step(index + 1);
      });
    }
    return step(1);
  }

  function discoverByManifest(dir) {
    return fetch(dir + 'images.json', { cache: 'no-cache' })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (list) {
        if (!list || !list.length) return null;
        return list.slice(0, MAX_IMAGES).map(function (entry) {
          if (typeof entry === 'string') return { src: dir + entry, caption: null };
          return { src: dir + entry.src, caption: entry.caption || null };
        });
      })
      .catch(function () { return null; });
  }

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function bilingual(map) {
    return '<span class="i18n-en">' + map.en + '</span>' +
           '<span class="i18n-pt">' + map.pt + '</span>';
  }

  function renderEmpty(root) {
    root.appendChild(el('div', 'gallery-empty', bilingual(COPY.empty)));
  }

  function render(root, images) {
    var index = 0;
    var single = images.length < 2;

    var stage = el('div', 'gallery-stage');
    var img = document.createElement('img');
    img.className = 'gallery-img';
    img.decoding = 'async';
    stage.appendChild(img);

    var prev = el('button', 'gallery-arrow gallery-prev', '&#8592;');
    var next = el('button', 'gallery-arrow gallery-next', '&#8594;');
    prev.type = 'button';
    next.type = 'button';
    prev.setAttribute('aria-label', COPY.prev.en);
    next.setAttribute('aria-label', COPY.next.en);
    if (!single) {
      stage.appendChild(prev);
      stage.appendChild(next);
    }

    var caption = el('div', 'gallery-caption');
    var counter = el('div', 'gallery-count');
    var dots = el('div', 'gallery-dots');

    var dotNodes = [];
    if (!single) {
      images.forEach(function (item, i) {
        var dot = el('button', 'gallery-dot');
        dot.type = 'button';
        dot.setAttribute('aria-label', COPY.shot.en + ' ' + (i + 1));
        dot.addEventListener('click', function () { show(i); });
        dots.appendChild(dot);
        dotNodes.push(dot);
      });
    }

    function show(i) {
      index = (i + images.length) % images.length;
      var item = images[index];
      img.src = item.src;
      img.alt = COPY.shot.en + ' ' + (index + 1) + ' of ' + images.length;
      caption.innerHTML = item.caption ? bilingual(item.caption) : '';
      caption.style.display = item.caption ? '' : 'none';
      counter.textContent = pad(index + 1) + ' / ' + pad(images.length);
      dotNodes.forEach(function (dot, di) {
        if (di === index) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    }

    prev.addEventListener('click', function () { show(index - 1); });
    next.addEventListener('click', function () { show(index + 1); });

    root.appendChild(stage);
    var bar = el('div', 'gallery-bar');
    if (!single) bar.appendChild(dots);
    bar.appendChild(counter);
    root.appendChild(bar);
    root.appendChild(caption);

    if (!single) {
      root.setAttribute('tabindex', '0');
      root.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
      });
    }

    root.classList.add(single ? 'gallery-single' : 'gallery-multi');
    show(0);
  }

  /* One folder: manifest entries first, then any conventionally named files
     (01, 02, ...) the manifest did not already list. Both routes work at once,
     so adding 05.png needs no manifest edit and a manifest can still pin order
     and captions for files with arbitrary names. */
  function discoverFolder(dir) {
    return Promise.all([discoverByManifest(dir), discoverByProbe(dir)])
      .then(function (results) {
        var manifest = results[0] || [];
        var probed = results[1] || [];
        var seen = {};
        var out = [];
        manifest.concat(probed).forEach(function (item) {
          if (seen[item.src]) return;
          seen[item.src] = true;
          out.push(item);
        });
        return out;
      });
  }

  function init(root) {
    var raw = root.getAttribute('data-gallery');
    if (!raw) return;

    // data-gallery accepts a comma-separated list of folders; results merge
    // in the order given.
    var dirs = raw.split(',').map(function (dir) {
      dir = dir.trim();
      if (!dir) return null;
      return dir.charAt(dir.length - 1) === '/' ? dir : dir + '/';
    }).filter(Boolean);

    Promise.all(dirs.map(discoverFolder))
      .then(function (perDir) {
        var images = [];
        perDir.forEach(function (list) { images = images.concat(list); });
        root.innerHTML = '';
        if (!images.length) { renderEmpty(root); return; }
        render(root, images.slice(0, MAX_IMAGES));
      });
  }

  function boot() {
    var nodes = document.querySelectorAll('[data-gallery]');
    for (var i = 0; i < nodes.length; i++) init(nodes[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
