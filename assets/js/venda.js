// Página de vendas (raiz): reta final, contadores, barra fixa do celular (texto e, faltando 7 dias, contador) e pílula da live.
// Datas em CONFIG. Para testar outra data: ?previa=1&data=AAAA-MM-DD (sem previa=1, data é ignorado).
(function () {
  'use strict';

  var CONFIG = {
    retaFinal: '2026-11-27T00:00:00-03:00', // a partir daqui o selo "lote limitado" dá lugar ao contador
    fim: '2026-11-30T23:59:59-03:00',       // fim da condição de Black Friday
    // Barra fixa do celular (09/11): "Condição acaba em breve" até aqui; depois, contador até o fim (faltando 7 dias).
    // A Sala VIP saiu da LP e do teste em 09/11 (a regra dos 40 primeiros segue na planilha).
    barraContador: '2026-11-23T23:59:59-03:00',
    // Formação completa para os 10 primeiros pedidos pagos da live (10/11): a linha [data-formacao10] aparece só nesta janela.
    formacao10Inicio: '2026-11-10T20:00:00-03:00',
    formacao10Fim: '2026-11-11T00:00:00-03:00'
  };

  var params = new URLSearchParams(location.search);
  var simulada = params.get('previa') === '1' && /^\d{4}-\d{2}-\d{2}$/.test(params.get('data') || '')
    ? new Date(params.get('data') + 'T12:00:00-03:00').getTime() : 0;
  var inicio = Date.now();
  function agora() { return simulada ? simulada + (Date.now() - inicio) : Date.now(); }

  var fim = new Date(CONFIG.fim).getTime();
  var reta = agora() >= new Date(CONFIG.retaFinal).getTime();
  var barra = document.querySelector('.vd-barra');

  // ---------- Formação dos 10 primeiros: só entre formacao10Inicio e formacao10Fim ----------
  var f10 = agora() >= new Date(CONFIG.formacao10Inicio).getTime() && agora() < new Date(CONFIG.formacao10Fim).getTime();
  [].forEach.call(document.querySelectorAll('[data-formacao10]'), function (el) { el.hidden = !f10; });

  // ---------- Reta final: troca os selos pelos contadores ----------
  [].forEach.call(document.querySelectorAll('[data-reta]'), function (el) { el.hidden = !reta; });
  [].forEach.call(document.querySelectorAll('[data-antes-reta]'), function (el) { el.hidden = reta; });

  // ---------- Barra fixa: texto até faltarem 7 dias, contador depois ----------
  var barraReta = agora() >= new Date(CONFIG.barraContador).getTime();
  [].forEach.call(document.querySelectorAll('[data-barra-reta]'), function (el) { el.hidden = !barraReta; });
  [].forEach.call(document.querySelectorAll('[data-barra-antes]'), function (el) { el.hidden = barraReta; });

  // ---------- Contadores: todos os [data-contador] terminam em CONFIG.fim ----------
  // Depois do fim, cada um troca o tempo ([data-antes]) pelo aviso ([data-fim]) e a barra fixa some.
  var boxes = [].slice.call(document.querySelectorAll('[data-contador]'));
  var dois = function (n) { return (n < 10 ? '0' : '') + n; };
  var timer;
  function tick() {
    var s = Math.max(0, Math.floor((fim - agora()) / 1000));
    var t = { dias: Math.floor(s / 86400), horas: Math.floor(s % 86400 / 3600), min: Math.floor(s % 3600 / 60), seg: s % 60 };
    var curto = t.dias ? t.dias + 'd ' + dois(t.horas) + 'h ' + dois(t.min) + 'm' : dois(t.horas) + 'h ' + dois(t.min) + 'm ' + dois(t.seg) + 's';
    boxes.forEach(function (box) {
      [].forEach.call(box.querySelectorAll('[data-unidade]'), function (el) { el.textContent = dois(t[el.getAttribute('data-unidade')]); });
      [].forEach.call(box.querySelectorAll('[data-curto]'), function (el) { el.textContent = curto; });
      if (!s) {
        [].forEach.call(box.querySelectorAll('[data-antes]'), function (el) { el.hidden = true; });
        [].forEach.call(box.querySelectorAll('[data-fim]'), function (el) { el.hidden = false; });
      }
    });
    if (!s) {
      clearInterval(timer);
      if (barra) barra.hidden = true;
    }
  }
  if ((reta || barraReta) && boxes.length) {
    tick();
    timer = setInterval(tick, 1000);
  }
  if (agora() >= fim && barra) barra.hidden = true;

  // ---------- Barra fixa do celular ----------
  // Aparece depois que o hero sai da tela e some enquanto a oferta está visível (o botão dela já está ali).
  // No /teste/, <body data-barra-apos="#resultado">: o resultado faz o papel do hero.
  var hero = document.querySelector(document.body.dataset.barraApos || '.hero');
  var oferta = document.getElementById('secao-oferta');
  if (barra && hero && oferta && 'IntersectionObserver' in window) {
    var heroVisivel = true, ofertaVisivel = false;
    var atualizar = function () { barra.classList.toggle('is-oculta', heroVisivel || ofertaVisivel); };
    new IntersectionObserver(function (entries) { heroVisivel = entries[0].isIntersecting; atualizar(); }).observe(hero);
    new IntersectionObserver(function (entries) { ofertaVisivel = entries[0].isIntersecting; atualizar(); }).observe(oferta);
  }

  // ---------- Pílula de quem veio da live / do grupo ----------
  // utm_medium=grupo_vip ou stories, ou utm_campaign com "live" (links da mensagem 7 e do story da live).
  var medium = (params.get('utm_medium') || '').toLowerCase();
  var campaign = (params.get('utm_campaign') || '').toLowerCase();
  if (medium === 'grupo_vip' || medium === 'stories' || campaign.indexOf('live') !== -1) {
    var pill = document.querySelector('[data-pill]');
    if (pill) {
      pill.classList.add('is-live');
      // Links do Caso do dia e da reta final (utm_campaign sem "live") vêm do grupo, não da live.
      var daLive = medium === 'stories' || campaign.indexOf('live') !== -1;
      pill.lastChild.textContent = (daLive ? 'Você veio da live' : 'Você veio do Grupo VIP') + ': a condição está aqui embaixo ↓';
    }
    // origem_live em todos os eventos desta visita (PostHog), para comparar a conversão de quem veio da live.
    if (window.posthog && window.asTracking && !window.asTracking.interno) posthog.register_for_session({ origem_live: true });
  }
})();
