// Página de obrigado da compra (/compra-confirmada/), para onde a Yampi e a Kiwify redirecionam após o pedido.
// O Purchase da Meta vem do checkout (Yampi ou Kiwify, navegador + API de Conversões): aqui não se repete.
(function () {
  'use strict';

  // Upsell da Kiwify (11/11): o script da Kiwify manda para upsell=aceitou também quando o banco recusa a cobrança.
  // Aprovado chega com o token da cobrança na URL; recusado chega sem. Nesse caso mostra o aviso e o link para tentar
  // de novo (o aviso aparece mesmo com o rastreamento desligado).
  var q = new URLSearchParams(location.search);
  var upsellRecusado = q.get('upsell') === 'aceitou' && !q.get('token');
  var aviso = document.querySelector('[data-upsell-recusado]');
  if (upsellRecusado && aviso) aviso.hidden = false;
  // Teste (/upsell-teste/ manda teste=1): o link de tentar de novo vai para o TESTE UPSELL de R$ 5
  var tentar = document.querySelector('[data-upsell-link]');
  if (upsellRecusado && tentar && q.get('teste') === '1') tentar.href = 'https://pay.kiwify.com.br/5Venypp?utm_source=upsell&utm_medium=recusado&utm_campaign=teste';

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

  if (upsellRecusado) {
    props.upsell_recusado = true;
    var link = document.querySelector('[data-upsell-link]');
    if (link) link.addEventListener('click', function () { T.capture('lp_upsell_tentar_de_novo', { etapa: 'upsell' }, { send_instantly: true }); });
  }
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
