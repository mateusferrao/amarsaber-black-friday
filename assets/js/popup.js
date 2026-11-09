// Popup de objeção (09/11): cartão pequeno no canto inferior direito, com uma quebra de objeção (valor + garantia) e o
// botão do WhatsApp de atendimento. Sem cupom: o preço é igual para todos até 30/11. Não bloqueia a página.
// Gatilhos: (a) mouse saindo pelo topo (computador); (b) oferta 15 s na tela sem clique em comprar;
// (c) rolagem rápida para cima depois de ver a oferta (celular). O voltar continua indo ao downsell (voltar.js).
// No máximo 1x por aba; fechado sem clicar no WhatsApp, não volta por 24 h no mesmo aparelho.
// <body data-popup="manual">: só arma depois de window.asPopup.arm() (o quiz chama no resultado).
// Teste da equipe: ?popup=1 abre na hora (junto com ?interno=1 para não contar).
// Por página, no <body>: data-popup-texto (o texto da objeção), data-popup-mensagem (mensagem pronta do WhatsApp),
// data-popup-oferta (seletor da oferta, padrão #secao-oferta) e data-popup-chave (separa a frequência: o downsell usa
// "downsell", então quem viu o popup na LP também vê no downsell).
// Eventos e regras: RASTREAMENTO.md, seção "Popup de objeção".
(function () {
  'use strict';

  var CONFIG = {
    ofertaSegundos: 15,         // (b) tempo com a oferta na tela sem clicar
    saidaDepoisDe: 8,           // (a) segundos na página antes de valer o mouse saindo pelo topo
    subidaPx: 500,              // (c) quanto sobe…
    subidaMs: 600,              // …em quanto tempo
    pausaHoras: 24,             // fechado sem clicar: quanto tempo sem mostrar de novo
    checkoutHost: 'seguro.amarsaberstore.com.br',
    whats: '5531953495052',
    mensagem: 'Oi! Estou na página da Black do Guia de Protocolos e tenho uma dúvida antes de comprar.'
  };
  var B = document.body.dataset;
  var CHAVE = B.popupChave ? '_' + B.popupChave : '';
  var VISTO = 'as_popup' + CHAVE;               // sessionStorage: já abriu nesta aba
  var FECHADO = 'as_popup_fechado' + CHAVE;     // localStorage: quando foi fechado sem clicar no WhatsApp
  var TEXTO = B.popupTexto || 'São 12x de R$ 50,57, menos de R$ 1,69 por dia. E se o Guia não servir para você, ' +
    'tem 7 dias de garantia depois de receber.';
  if (B.popupMensagem) CONFIG.mensagem = B.popupMensagem;

  function get(store, key) { try { return window[store].getItem(key); } catch (e) { return null; } }
  function set(store, key, value) { try { window[store].setItem(key, value); } catch (e) {} }
  function track(name, props) { if (window.asTracking) window.asTracking.capture(name, props); }

  var forcar = new URLSearchParams(location.search).get('popup') === '1';
  var fechadoEm = Number(get('localStorage', FECHADO));
  if (!forcar && (get('sessionStorage', VISTO) ||
    (fechadoEm && Date.now() - fechadoEm < CONFIG.pausaHoras * 3600000))) return;

  var armado = document.body.dataset.popup !== 'manual';
  var aberto = false, gatilho = '', clicou = false, foiCheckout = false;
  var inicio = Date.now();

  // ---------- Montagem ----------
  var card = document.createElement('div');
  card.className = 'vd-popup';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-labelledby', 'vd-popup-titulo');
  card.hidden = true;
  card.innerHTML =
    '<button class="vd-popup__fechar" type="button" aria-label="Fechar">&times;</button>' +
    '<p class="vd-popup__titulo" id="vd-popup-titulo">Ficou com alguma dúvida?</p>' +
    '<p class="vd-popup__texto"></p>' +
    '<a class="vd-popup__whats" data-cta="popup_whats" target="_blank" rel="noopener" href="https://api.whatsapp.com/send?phone=' +
      CONFIG.whats + '&text=' + encodeURIComponent(CONFIG.mensagem) + '">' +
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.7c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7zm5.9-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.6-.4z"/></svg>' +
      'Tirar dúvida no WhatsApp</a>';
  card.querySelector('.vd-popup__texto').textContent = TEXTO;
  if (document.querySelector('.vd-barra')) card.classList.add('vd-popup--barra'); // celular: acima da barra fixa
  document.body.appendChild(card);

  // ---------- Abrir e fechar ----------
  function abrir(qual) {
    if (!forcar && (!armado || aberto || foiCheckout || get('sessionStorage', VISTO) ||
      document.documentElement.classList.contains('as-saindo') || document.querySelector('.lightbox.is-open'))) return;
    aberto = true; gatilho = qual;
    set('sessionStorage', VISTO, qual);
    card.hidden = false;
    track('lp_popup_vista', { gatilho: qual, etapa: 'engajamento' });
    if (window.clarity) clarity('set', 'popup', qual);
    pararGatilhos();
  }
  function fechar() {
    if (card.hidden) return;
    card.hidden = true;
    if (!clicou) set('localStorage', FECHADO, String(Date.now()));
    track('lp_popup_fechado', { gatilho: gatilho, clicou_whats: clicou, etapa: 'engajamento' });
  }
  card.querySelector('.vd-popup__fechar').addEventListener('click', fechar);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
  // O clique no WhatsApp vira whatsapp_clique (posicao = popup_whats) no tracking.js.
  card.querySelector('.vd-popup__whats').addEventListener('click', function () { clicou = true; });

  // ---------- Gatilhos ----------
  var timerOferta = null, ofertaVista = false, ignorarRolagemAte = 0;
  var finos = window.matchMedia && matchMedia('(pointer: fine)').matches;
  var toque = window.matchMedia && matchMedia('(pointer: coarse)').matches;

  // Clique em comprar (em qualquer lugar da página) cancela tudo nesta visita.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf(CONFIG.checkoutHost) !== -1) { foiCheckout = true; pararGatilhos(); }
    else if (href.charAt(0) === '#') ignorarRolagemAte = Date.now() + 1500; // rolagem dos CTAs âncora não conta
  }, true);

  // (a) Mouse saindo pelo topo da janela (computador)
  function saidaMouse(e) {
    if (e.relatedTarget || e.clientY > 0) return;
    if (Date.now() - inicio < CONFIG.saidaDepoisDe * 1000) return;
    abrir('saida_mouse');
  }
  if (finos) document.addEventListener('mouseout', saidaMouse);

  // (b) Oferta parada na tela sem clique
  var oferta = document.querySelector(B.popupOferta || '#secao-oferta');
  var obsOferta = null;
  if (oferta && 'IntersectionObserver' in window) {
    obsOferta = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        ofertaVista = true;
        if (!timerOferta) timerOferta = setTimeout(function () { timerOferta = null; abrir('oferta_parada'); }, CONFIG.ofertaSegundos * 1000);
      } else {
        clearTimeout(timerOferta); timerOferta = null;
      }
    }, { threshold: 0.3 });
    obsOferta.observe(oferta);
  }

  // (c) Rolagem rápida para cima depois de ver a oferta (celular)
  var amostras = [];
  function rolagem() {
    if (!ofertaVista || Date.now() < ignorarRolagemAte) { amostras = []; return; }
    var agora = Date.now(), y = window.scrollY;
    amostras.push({ t: agora, y: y });
    while (amostras.length && agora - amostras[0].t > CONFIG.subidaMs) amostras.shift();
    var maior = amostras.reduce(function (m, s) { return Math.max(m, s.y); }, y);
    if (maior - y >= CONFIG.subidaPx) abrir('rolagem_subida');
  }
  if (toque) window.addEventListener('scroll', rolagem, { passive: true });

  function pararGatilhos() {
    clearTimeout(timerOferta); timerOferta = null;
    if (obsOferta) obsOferta.disconnect();
    document.removeEventListener('mouseout', saidaMouse);
    window.removeEventListener('scroll', rolagem);
  }

  window.asPopup = { arm: function () { armado = true; inicio = Date.now(); } };

  if (forcar) abrir('teste');
})();
