// Página de downsell (/oferta-especial/): eventos de visualização e de recusa.
// O clique no checkout é medido pelo tracking.js (DownsellCheckout / lp_downsell_checkout, via <body>).
(function () {
  'use strict';

  var T = window.asTracking;
  if (!T || T.interno) return;

  var from = new URLSearchParams(location.search).get('de') || 'direto';

  T.metaTrack('DownsellView', T.productParams, true);
  T.capture('lp_downsell_vista', { de: from, valor: T.product.value, etapa: 'intencao' });
  T.reachStage('viu_downsell');
  if (window.clarity) clarity('upgrade', 'viu_downsell');

  var refuse = document.querySelector('[data-recusa]');
  if (refuse) refuse.addEventListener('click', function () {
    T.capture('lp_downsell_recusa', { de: from, etapa: 'intencao' }, { send_instantly: true });
  });
})();
