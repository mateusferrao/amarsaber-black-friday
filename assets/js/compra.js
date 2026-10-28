// Página de obrigado da compra (/compra-confirmada/), para onde a Yampi redireciona após o pedido.
// O Purchase da Meta continua vindo da Yampi (navegador + API de Conversões): aqui não se repete.
(function () {
  'use strict';

  var T = window.asTracking;
  if (!T || T.interno) return;

  // Parâmetros que a Yampi mandar na URL vão junto no evento, menos dados pessoais.
  var PERSONAL = /mail|nome|name|fone|phone|tel|cpf|cnpj|doc|endereco|address|cep|zip/i;
  var props = { etapa: 'compra' };
  new URLSearchParams(location.search).forEach(function (value, key) {
    if (!PERSONAL.test(key) && !/^utm_|^fbclid$/.test(key)) props['yampi_' + key] = value.slice(0, 100);
  });

  T.capture('lp_compra_confirmada', props, { send_instantly: true });
  T.reachStage('comprou');
  if (window.clarity) clarity('upgrade', 'comprou');

  // Indicação: o link do WhatsApp tem "whatsapp" na URL, e o tracking.js contaria como Contact (falar com
  // a Amar). stopPropagation segura o clique aqui, e ele vira só lp_indicacao_clique.
  var indica = document.querySelector('[data-indicacao]');
  if (indica) indica.addEventListener('click', function (e) {
    e.stopPropagation();
    T.capture('lp_indicacao_clique', { etapa: 'indicacao' }, { send_instantly: true });
  });
})();
