// Downsell: na primeira tentativa de sair da LP (botão voltar) ou na volta do checkout da Yampi,
// leva para /oferta-especial/. Acontece uma vez por aba (sessionStorage). Detalhes: RASTREAMENTO.md.
(function () {
  'use strict';

  var CONFIG = {
    destino: 'oferta-especial/',
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
    // replace: o voltar a partir do downsell sai do site em vez de cair na LP de novo.
    location.replace(new URL(CONFIG.destino + '?' + query.toString(), location.href).href);
  }

  // ---------- Botão voltar na LP ----------
  // O Chrome ignora entradas de histórico criadas sem gesto do usuário, por isso a entrada extra
  // só é criada no primeiro toque, clique ou tecla.
  var armed = false;
  function arm() {
    if (armed || get(SHOWN)) return;
    armed = true;
    history.pushState({ asVoltar: 1 }, '', location.href);
  }
  ['pointerdown', 'touchstart', 'keydown'].forEach(function (type) {
    window.addEventListener(type, arm, { once: true, passive: true, capture: true });
  });
  window.addEventListener('popstate', function () {
    if (armed) goToDownsell('voltar');
  });

  // ---------- Volta do checkout ----------
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="' + CONFIG.checkoutHost + '"]');
    if (!link || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === '_blank') return;
    set(CHECKOUT, String(Date.now()));
  });
  // pageshow cobre as duas voltas: página restaurada da memória (bfcache) e página recarregada.
  window.addEventListener('pageshow', function () {
    var clickedAt = Number(get(CHECKOUT));
    if (clickedAt && Date.now() - clickedAt < CONFIG.checkoutMinutos * 60000) goToDownsell('checkout');
  });
})();
