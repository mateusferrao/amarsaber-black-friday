// Página de obrigado da compra (/compra-confirmada/), para onde a Yampi e a Kiwify redirecionam após o pedido.
// O Purchase da Meta vem do checkout (Yampi ou Kiwify, navegador + API de Conversões): aqui não se repete.
(function () {
  'use strict';

  var T = window.asTracking;
  if (!T || T.interno) return;

  // Parâmetros que o checkout mandar na URL vão junto no evento (prefixo checkout_), menos dados pessoais e
  // os da Kiwify que dão acesso à conta do cliente (token, code_senha) ou repetem o valor (amount).
  // 11/11: a página recebe a Yampi e a Kiwify (direto ou depois do /upsell/, com upsell=aceitou|recusou).
  var PERSONAL = /mail|nome|name|fone|phone|tel|cpf|cnpj|doc|endereco|address|cep|zip/i;
  var SECRET = /^(token|code_senha|amount|kw-|payment_version$)/i;
  var params = new URLSearchParams(location.search);
  var kiwify = ['token', 'code_senha', 'payment_type', 'payment_version', 'upsell'].some(function (k) { return params.has(k); });
  var props = { etapa: 'compra', checkout: kiwify ? 'kiwify' : 'yampi' };
  params.forEach(function (value, key) {
    if (!PERSONAL.test(key) && !SECRET.test(key) && !/^utm_|^fbclid$/.test(key)) props['checkout_' + key] = value.slice(0, 100);
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
