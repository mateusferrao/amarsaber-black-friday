// Página de upsell da Kiwify (/upsell/ e /upsell-teste/), aberta depois da compra do Black ou do Downsell.
// A cobrança e o redirecionamento são do script da Kiwify; aqui só os eventos do PostHog.
// A URL traz token, code_senha e amount da Kiwify: nada disso vai para o PostHog.
(function () {
  'use strict';

  var T = window.asTracking;
  if (!T || T.interno) return;

  var params = new URLSearchParams(location.search);
  var base = {
    etapa: 'upsell',
    checkout: 'kiwify',
    pagamento: (params.get('payment_type') || '').slice(0, 20),
    teste: location.pathname.indexOf('upsell-teste') !== -1
  };
  var props = function (extra) { var o = {}; for (var k in base) o[k] = base[k]; for (var e in extra || {}) o[e] = extra[e]; return o; };

  T.capture('lp_upsell_vista', props({ tem_token: !!params.get('token') }));
  T.reachStage('comprou');
  if (window.clarity) clarity('upgrade', 'viu_upsell');

  // O script da Kiwify pode redesenhar os botões: a escuta fica no documento.
  var enviado = {};
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[id^="kiwify-upsell-"]') : null;
    if (!el) return;
    var nome = /cancel-trigger/.test(el.id) ? 'lp_upsell_recusou' : (/-trigger-/.test(el.id) ? 'lp_upsell_aceitou_clique' : '');
    if (!nome || enviado[nome]) return;
    enviado[nome] = true;
    T.capture(nome, props(), { send_instantly: true });
  }, true);
})();
