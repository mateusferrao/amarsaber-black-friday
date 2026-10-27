// Página de downsell (/oferta-especial/): eventos de visualização e de recusa, e destino da recusa.
// O clique no checkout é medido pelo tracking.js (DownsellCheckout / lp_downsell_checkout, via <body>).
(function () {
  'use strict';

  var params = new URLSearchParams(location.search);
  var from = params.get('de') || 'direto';
  var origin = params.get('origem') || 'lp';

  // Recusa volta à oferta de onde a pessoa veio: LP (padrão do HTML) ou resultado do teste.
  // replace: o downsell sai do histórico, e o voltar depois da recusa não mostra a oferta de novo.
  var refuse = document.querySelector('[data-recusa]');
  if (refuse && origin === 'teste') refuse.setAttribute('href', '../teste/#secao-oferta');
  var T = window.asTracking;
  if (refuse) refuse.addEventListener('click', function (e) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (T && !T.interno) T.capture('lp_downsell_recusa', { de: from, origem: origin, etapa: 'intencao' }, { send_instantly: true });
    setTimeout(function () { location.replace(refuse.href); }, 150); // dá tempo do evento sair
  });

  if (!T || T.interno) return;

  T.metaTrack('DownsellView', T.productParams, true);
  T.capture('lp_downsell_vista', { de: from, origem: origin, valor: T.product.value, etapa: 'intencao' });
  T.reachStage('viu_downsell');
  if (window.clarity) clarity('upgrade', 'viu_downsell');
})();
