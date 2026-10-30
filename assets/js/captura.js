// Formulário da captura "Acesso antecipado": máscara, validação, envio ao n8n e eventos de lead.
// O lead vai para o n8n (planilha + API de Conversões da Meta). O evento Lead do navegador usa o
// mesmo event_id, para a Meta deduplicar. Dicionário de eventos: RASTREAMENTO.md.
(function () {
  'use strict';

  var CONFIG = {
    webhook: 'https://n8n.automato.pro/webhook/as-black-lead',
    thankYou: 'obrigado/',
    timeoutMs: 8000,
    contentName: 'Acesso antecipado Black Friday'
  };

  var form = document.getElementById('form-lead');
  if (!form) return;

  var noop = function () {};
  var T = window.asTracking || { capture: noop, metaTrack: noop, reachStage: noop, origem: {}, pixels: [],
    eventId: function (n) { return n + '_' + Date.now().toString(36); } };

  // Só nome e WhatsApp: o grupo e a recuperação funcionam pelo telefone.
  var fields = {
    nome: form.elements.nome,
    whatsapp: form.elements.whatsapp
  };
  var button = form.querySelector('button[type="submit"]');
  var buttonText = button.textContent;

  // ---------- Helpers ----------
  function load(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }
  function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }
  function digits(v) { return String(v || '').replace(/\D/g, ''); }
  function cookie(name) {
    var m = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : '';
  }

  // ---------- WhatsApp: máscara (31) 99999-9999 ----------
  function nationalDigits(v) {
    var d = digits(v);
    if (d.length > 11 && d.indexOf('55') === 0) d = d.slice(2); // colou com +55
    return d.slice(0, 11);
  }
  function maskPhone(v) {
    var d = nationalDigits(v);
    if (d.length <= 2) return d.length ? '(' + d : '';
    var rest = d.slice(2);
    var split = d.length === 11 ? 5 : 4;
    return '(' + d.slice(0, 2) + ') ' + (rest.length > split ? rest.slice(0, split) + '-' + rest.slice(split) : rest);
  }
  fields.whatsapp.addEventListener('input', function () {
    fields.whatsapp.value = maskPhone(fields.whatsapp.value);
  });

  // ---------- Validação ----------
  var DDDS = ('11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 ' +
    '51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99').split(' ');

  // Cada regra devolve [motivo, mensagem] quando inválido, ou null.
  var RULES = {
    nome: function (v) {
      v = v.trim();
      if (!v) return ['vazio', 'Digite seu nome.'];
      if ((v.match(/\p{L}/gu) || []).length < 2) return ['curto', 'Digite seu nome completo.'];
      return null;
    },
    whatsapp: function (v) {
      var d = nationalDigits(v);
      if (!d) return ['vazio', 'Digite seu WhatsApp com DDD.'];
      if (d.length < 10) return ['curto', 'Faltam números. Use DDD + número, ex.: (31) 99999-9999.'];
      if (DDDS.indexOf(d.slice(0, 2)) === -1) return ['ddd', 'Esse DDD não existe. Confira os 2 primeiros números.'];
      if (d.length === 11 && d[2] !== '9') return ['formato', 'Celular com 11 números começa com 9 depois do DDD.'];
      return null;
    }
  };

  function fieldBox(input) { return input.closest('.cap-field'); }
  function setMessage(input, text, hint) {
    var box = fieldBox(input);
    var msg = box.querySelector('.cap-field__msg');
    box.classList.toggle('is-invalid', !!text && !hint);
    msg.classList.toggle('cap-field__msg--hint', !!hint);
    input.setAttribute('aria-invalid', text && !hint ? 'true' : 'false');
    msg.textContent = text || '';
  }

  function check(name) {
    var input = fields[name];
    var error = RULES[name](input.value);
    setMessage(input, error ? error[1] : '');
    return error;
  }

  // Valida ao sair do campo (só se a pessoa digitou algo) e corrige enquanto digita se já estava com erro.
  Object.keys(fields).forEach(function (name) {
    var input = fields[name];
    input.addEventListener('blur', function () { if (input.value.trim()) check(name); });
    input.addEventListener('input', function () { if (fieldBox(input).classList.contains('is-invalid')) check(name); });
  });

  // ---------- Início do formulário ----------
  // Na primeira tecla digitada (a gaveta já põe o foco no nome ao abrir, então o foco não serve).
  var started = false;
  form.addEventListener('input', function () {
    if (started) return;
    started = true;
    T.capture('lp_form_inicio', { etapa: 'intencao' });
    T.reachStage('iniciou_form');
  });

  // ---------- Envio ----------
  function post(payload) {
    var controller = 'AbortController' in window ? new AbortController() : null;
    var timer = controller && setTimeout(function () { controller.abort(); }, CONFIG.timeoutMs);
    // text/plain: requisição "simples", sem preflight de CORS. O n8n lê o JSON do corpo.
    return fetch(CONFIG.webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(payload),
      keepalive: true,
      signal: controller ? controller.signal : undefined
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) throw new Error('http_' + res.status);
    }, function (err) {
      clearTimeout(timer);
      throw new Error(err && err.name === 'AbortError' ? 'timeout' : 'rede');
    });
  }
  function postWithRetry(payload) {
    return post(payload).catch(function () { return post(payload); });
  }

  function goToThankYou() {
    location.href = new URL(CONFIG.thankYou, location.href).href;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (button.disabled) return;

    var errors = [];
    Object.keys(fields).forEach(function (name) {
      var error = check(name);
      if (error) errors.push({ campo: name, motivo: error[0] });
    });
    if (errors.length) {
      fields[errors[0].campo].focus();
      errors.forEach(function (err) { T.capture('lp_form_erro', { campo: err.campo, motivo: err.motivo, etapa: 'intencao' }); });
      return;
    }

    // Robô preencheu o campo escondido: finge sucesso e não envia nada.
    if (form.elements.website.value) { goToThankYou(); return; }
    form.dataset.enviado = '1'; // a gaveta não conta lp_form_fechado depois do envio

    var nome = fields.nome.value.trim().replace(/\s+/g, ' ');
    var whatsapp = nationalDigits(fields.whatsapp.value);
    var eventId = T.eventId('Lead');
    var distinctId = (window.posthog && posthog.get_distinct_id && posthog.get_distinct_id()) || '';
    var sent = load('as_lead') || [];
    var repeated = sent.indexOf(whatsapp) !== -1;

    var params = new URLSearchParams(location.search);
    var fbclid = params.get('fbclid') || '';
    var fbc = cookie('_fbc') || (fbclid ? 'fb.1.' + Date.now() + '.' + fbclid : '');

    var payload = Object.assign({}, T.origem, {
      nome: nome,
      email: '',
      whatsapp: whatsapp,
      consentimento: true, // o texto de aceite do WhatsApp está junto do botão
      event_id: eventId,
      repetido: repeated,
      interno: !!T.interno,
      fbclid: fbclid,
      fbp: cookie('_fbp'),
      fbc: fbc,
      posthog_distinct_id: distinctId,
      hero_variante: document.documentElement.getAttribute('data-hero') || '', // teste A/B do hero
      pagina: location.href.split('#')[0],
      referrer: document.referrer,
      // ?test_event_code=TEST123 → o Lead do servidor aparece em "Testar eventos" no Gerenciador de Eventos
      test_event_code: params.get('test_event_code') || ''
    });

    button.disabled = true;
    button.textContent = 'ENVIANDO...';

    postWithRetry(payload).then(function () {
      if (!repeated) {
        // Advanced matching: a Meta faz o hash no navegador.
        var userData = { ph: '55' + whatsapp, fn: nome.split(' ')[0].toLowerCase() };
        if (distinctId) userData.external_id = distinctId;
        T.pixels.forEach(function (id) { if (window.fbq) fbq('init', id, userData); });
        T.metaTrack('Lead', { content_name: CONFIG.contentName }, false, eventId);
        sent.push(whatsapp);
        save('as_lead', sent);
      }
      // Mesmo id do teste (/teste/): a pessoa é a mesma no PostHog pelas duas entradas.
      if (window.posthog && posthog.identify) posthog.identify('wa_55' + whatsapp, { nome: nome, whatsapp: whatsapp });
      T.capture('lp_lead', { repetido: repeated, etapa: 'conversao' }, { send_instantly: true });
      T.reachStage('virou_lead');
      if (window.clarity) clarity('upgrade', 'virou_lead');
    }, function (err) {
      // n8n fora do ar: a pessoa segue para o grupo e o lead fica no PostHog para recuperar.
      T.capture('lp_lead_falha', { motivo: err.message, nome: nome, whatsapp: whatsapp, etapa: 'conversao' }, { send_instantly: true });
    }).then(function () {
      setTimeout(goToThankYou, 400); // dá tempo do pixel e do PostHog saírem
    });
  });
})();

// Contador até a live: todos os [data-contador] (hero, presentes, fechamento e barra fixa) terminam na mesma data.
// Depois do horário, cada um troca o tempo ([data-antes]) pelo aviso ([data-fim]) e não reinicia.
(function () {
  'use strict';
  var boxes = [].slice.call(document.querySelectorAll('[data-contador]'));
  if (!boxes.length) return;
  var fim = new Date(boxes[0].getAttribute('data-contador')).getTime();
  var dois = function (n) { return (n < 10 ? '0' : '') + n; };
  var timer;
  function tick() {
    var s = Math.max(0, Math.floor((fim - Date.now()) / 1000));
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
    if (!s) clearInterval(timer);
  }
  tick();
  timer = setInterval(tick, 1000);
})();

// Presentes: espiar no toque (no mouse é o :hover do CSS) e evento lp_presente_espiar, uma vez por caixa.
(function () {
  'use strict';
  var vistos = {};
  [].forEach.call(document.querySelectorAll('[data-presente]'), function (btn) {
    var n = Number(btn.getAttribute('data-presente'));
    var timer;
    function registrar() {
      if (vistos[n]) return;
      vistos[n] = true;
      if (window.asTracking) window.asTracking.capture('lp_presente_espiar', { presente: n, etapa: 'engajamento' });
    }
    btn.addEventListener('mouseenter', registrar);
    btn.addEventListener('click', function () {
      registrar();
      btn.classList.toggle('is-espiando');
      clearTimeout(timer);
      if (btn.classList.contains('is-espiando')) timer = setTimeout(function () { btn.classList.remove('is-espiando'); }, 2500);
    });
  });
})();

// Gaveta do formulário: todo link para #form-guia abre a gaveta (no celular sobe de baixo; no desktop é uma janela).
// Fecha no X, no fundo, no Esc e no "voltar" do celular. Evento lp_form_aberto com a posição do botão.
(function () {
  'use strict';
  var gaveta = document.getElementById('form-guia');
  if (!gaveta) return;
  var primeiro = gaveta.querySelector('input:not([tabindex="-1"])');
  var form = document.getElementById('form-lead');
  var aberta = false;
  var origem = null;
  var abertaEm = 0;

  function abrir(posicao, quem) {
    if (aberta) return;
    aberta = true;
    origem = quem || null;
    abertaEm = Date.now();
    gaveta.classList.add('is-aberta');
    document.documentElement.classList.add('cap-sem-rolagem');
    try { history.pushState({ gaveta: true }, ''); } catch (e) {}
    if (window.asTracking) window.asTracking.capture('lp_form_aberto', { posicao: posicao || '', etapa: 'intencao' });
    setTimeout(function () { if (primeiro) primeiro.focus({ preventScroll: true }); }, 60);
  }
  function fechar(doHistorico) {
    if (!aberta) return;
    aberta = false;
    gaveta.classList.remove('is-aberta');
    // Fechou sem enviar: quanto tempo ficou e se chegou a digitar (onde as desistências acontecem).
    if (form && !form.dataset.enviado && window.asTracking) {
      var digitou = [].some.call(form.querySelectorAll('input:not([tabindex="-1"])'), function (i) { return i.value.trim() !== ''; });
      window.asTracking.capture('lp_form_fechado', { segundos: Math.round((Date.now() - abertaEm) / 1000), digitou: digitou, etapa: 'intencao' });
    }
    document.documentElement.classList.remove('cap-sem-rolagem');
    if (!doHistorico) { try { if (history.state && history.state.gaveta) history.back(); } catch (e) {} }
    if (origem && origem.focus) origem.focus({ preventScroll: true });
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href="#form-guia"]');
    if (link) { e.preventDefault(); abrir(link.getAttribute('data-cta'), link); return; }
    var sair = e.target.closest && e.target.closest('.cap-gaveta__fechar, .cap-gaveta__fundo');
    if (sair) { e.preventDefault(); fechar(); }
  });
  document.addEventListener('keydown', function (e) {
    if (!aberta) return;
    if (e.key === 'Escape') { fechar(); return; }
    if (e.key !== 'Tab') return;
    // Mantém o Tab dentro da gaveta
    var focaveis = [].slice.call(gaveta.querySelectorAll('a[href]:not([tabindex="-1"]), button, input:not([tabindex="-1"])'));
    var ini = focaveis[0], fim = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === ini) { e.preventDefault(); fim.focus(); }
    else if (!e.shiftKey && document.activeElement === fim) { e.preventDefault(); ini.focus(); }
  });
  window.addEventListener('popstate', function () { fechar(true); });
  // Chegou com #form-guia na URL (ex.: link de anúncio): abre já
  if (location.hash === '#form-guia') {
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    abrir('url');
  }
})();

// Barra fixa do celular: só aparece depois que a pessoa passa do hero.
(function () {
  'use strict';
  var barra = document.querySelector('.cap-barra');
  var hero = document.getElementById('topo');
  if (!barra || !hero || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function (entries) {
    barra.classList.toggle('is-oculta', entries[0].isIntersecting);
  }).observe(hero);
})();
