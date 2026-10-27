// Downsell: na primeira tentativa de sair da LP ou do teste (botão voltar) ou na volta do checkout da Yampi,
// leva para /oferta-especial/. Acontece uma vez por aba (sessionStorage). Detalhes: RASTREAMENTO.md.
// <body data-voltar="manual">: o voltar só é interceptado depois de window.asVoltar.arm() (o teste chama no
// resultado, para quem ainda não viu a oferta não cair no downsell). <body data-origem="teste">: vai na URL
// do downsell, para a recusa voltar à oferta de onde a pessoa veio.
(function () {
  'use strict';

  var CONFIG = {
    destino: '/oferta-especial/',
    checkoutHost: 'seguro.amarsaberstore.com.br',
    checkoutMinutos: 60   // volta do checkout depois disso não conta
  };
  var SHOWN = 'as_downsell';
  var CHECKOUT = 'as_foi_checkout';

  // Sem sessionStorage (aba anônima com bloqueio) não dá para garantir "uma vez": não intercepta.
  function get(key) { try { return sessionStorage.getItem(key); } catch (e) { return 'sem_storage'; } }
  function set(key, value) { try { sessionStorage.setItem(key, value); } catch (e) {} }
  if (get(SHOWN)) return;

  function goToDownsell(from) {
    if (get(SHOWN)) return;
    set(SHOWN, from);
    // Esconde a LP para não piscar antes da troca de página.
    document.documentElement.classList.add('as-saindo');
    var query = new URLSearchParams(location.search); // utm_* seguem junto
    query.set('de', from);
    if (document.body.dataset.origem) query.set('origem', document.body.dataset.origem);
    // replace: o voltar a partir do downsell sai do site em vez de cair na LP de novo.
    location.replace(new URL(CONFIG.destino + '?' + query.toString(), location.href).href);
  }

  // ---------- Botão voltar ----------
  // O Chrome ignora entradas de histórico criadas sem gesto do usuário, por isso a entrada extra
  // só é criada depois do primeiro toque, clique ou tecla.
  var GESTURES = ['pointerdown', 'touchstart', 'keydown'];
  var allowed = document.body.dataset.voltar !== 'manual';
  var armed = false;
  function arm() {
    if (armed || !allowed || get(SHOWN)) return;
    armed = true;
    GESTURES.forEach(function (type) { window.removeEventListener(type, arm, true); });
    history.pushState({ asVoltar: 1 }, '', location.href);
  }
  GESTURES.forEach(function (type) {
    window.addEventListener(type, arm, { passive: true, capture: true });
  });
  window.asVoltar = {
    arm: function () {
      allowed = true;
      var activation = navigator.userActivation;
      if (!activation || activation.hasBeenActive) arm(); // sem gesto ainda: arma no primeiro toque
    }
  };
  window.addEventListener('popstate', function () {
    if (armed) goToDownsell('voltar');
  });

  // ---------- Volta do checkout ----------
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="' + CONFIG.checkoutHost + '"]');
    if (!link || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === '_blank') return;
    set(CHECKOUT, String(Date.now()));
  });
  function checkoutReturn() {
    var clickedAt = Number(get(CHECKOUT));
    if (clickedAt && Date.now() - clickedAt < CONFIG.checkoutMinutos * 60000) goToDownsell('checkout');
  }
  // Página recarregada na volta: decide já, antes do tracking.js (carregado depois), que não envia nada
  // se a LP está saindo. Página restaurada da memória (bfcache): pageshow, sem reenviar eventos.
  checkoutReturn();
  window.addEventListener('pageshow', function (e) { if (e.persisted) checkoutReturn(); });
})();
