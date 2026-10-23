// Interações da página: vídeo, FAQ, carrosséis (mobile) e lightbox (galerias).
(function () {
  'use strict';

  // ---------- Vídeo: troca a capa pelo player do YouTube ao clicar ----------
  document.querySelectorAll('.video[data-youtube]').forEach(function (video) {
    var cover = video.querySelector('.video__cover');
    cover.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + video.dataset.youtube + '?autoplay=1&rel=0&controls=1';
      iframe.title = 'Vídeo do Guia de Protocolos';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      video.replaceChild(iframe, cover);
    });
  });

  // ---------- FAQ: só uma pergunta aberta por vez ----------
  var faqItems = document.querySelectorAll('.faq details');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

  // ---------- Carrossel (autoplay 5s, setas, bolinhas, swipe) ----------
  var CHEVRON_LEFT = '<svg viewBox="0 0 1000 1000" aria-hidden="true"><path d="M646 125C629 125 613 133 604 142L308 442C296 454 292 471 292 487 292 504 296 521 308 533L604 854C617 867 629 875 646 875 663 875 679 871 692 858 704 846 713 829 713 812 713 796 708 779 692 767L438 487 692 225C700 217 708 204 708 187 708 171 704 154 692 142 675 129 663 125 646 125Z"/></svg>';
  var CHEVRON_RIGHT = '<svg viewBox="0 0 1000 1000" aria-hidden="true"><path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z"/></svg>';

  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel__track');
    var slides = track.children;
    var total = slides.length;
    var index = 0;
    var timer = null;

    var viewport = document.createElement('div');
    viewport.className = 'carousel__viewport';
    carousel.insertBefore(viewport, track);
    viewport.appendChild(track);

    var prev = document.createElement('button');
    prev.className = 'carousel__btn carousel__btn--prev';
    prev.setAttribute('aria-label', 'Anterior');
    prev.innerHTML = CHEVRON_LEFT;
    var next = document.createElement('button');
    next.className = 'carousel__btn carousel__btn--next';
    next.setAttribute('aria-label', 'Próximo');
    next.innerHTML = CHEVRON_RIGHT;
    carousel.appendChild(prev);
    carousel.appendChild(next);

    var dots = document.createElement('div');
    dots.className = 'carousel__dots';
    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Ir para slide ' + (i + 1));
      dot.dataset.index = i;
      dots.appendChild(dot);
    }
    carousel.appendChild(dots);

    function go(to) {
      index = (to + total) % total;
      track.style.transform = 'translateX(' + (-100 * index) + '%)';
      Array.prototype.forEach.call(dots.children, function (d, n) {
        d.classList.toggle('is-active', n === index);
      });
    }
    function play() { stop(); timer = setInterval(function () { go(index + 1); }, 5000); }
    function stop() { if (timer) clearInterval(timer); timer = null; }

    prev.addEventListener('click', function () { go(index - 1); stop(); });
    next.addEventListener('click', function () { go(index + 1); stop(); });
    dots.addEventListener('click', function (e) {
      if (e.target.dataset.index) { go(+e.target.dataset.index); stop(); }
    });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', play);

    var startX = null;
    viewport.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; stop(); }, { passive: true });
    viewport.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    go(0);
    play();
  });

  // ---------- Lightbox das galerias ----------
  var galleries = document.querySelectorAll('.gallery');
  if (!galleries.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button class="lightbox__close" aria-label="Fechar">&times;</button>' +
    '<button class="lightbox__prev" aria-label="Anterior">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lightbox__next" aria-label="Próximo">&#8250;</button>';
  document.body.appendChild(box);
  var boxImg = box.querySelector('img');
  var current = [];
  var pos = 0;

  function show(n) { pos = (n + current.length) % current.length; boxImg.src = current[pos]; }
  function close() { box.classList.remove('is-open'); boxImg.src = ''; }

  galleries.forEach(function (gallery) {
    var links = Array.prototype.slice.call(gallery.querySelectorAll('a'));
    links.forEach(function (link, n) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        current = links.map(function (l) { return l.href; });
        show(n);
        box.classList.add('is-open');
      });
    });
  });
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__prev').addEventListener('click', function () { show(pos - 1); });
  box.querySelector('.lightbox__next').addEventListener('click', function () { show(pos + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(pos - 1);
    if (e.key === 'ArrowRight') show(pos + 1);
  });
})();
