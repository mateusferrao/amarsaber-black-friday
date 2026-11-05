// Pesquisa da live /live/: 6 perguntas (tema, caso pedido, se já tem o Guia, o que pesaria na decisão, tempo de
// atendimento e local), WhatsApp opcional e envio ao n8n (aba "Pesquisa da live" da planilha Leads · Black).
// Sem Lead da Meta: quem responde já é lead. Eventos só no PostHog e tags no Clarity.
// Nada se perde se a pessoa não clicar em enviar: cada pessoa tem um ID, e a planilha atualiza a mesma linha.
//   - saiu no meio (fechou a aba, trocou de app): envia o que já respondeu, status "parcial";
//   - chegou à última tela: envia tudo na hora, status "respondeu";
//   - clicou em enviar: envia com o WhatsApp (se deu), status "enviado".
// Dicionário de eventos: RASTREAMENTO.md, seção "Pesquisa da live".
(function () {
  'use strict';

  var CONFIG = {
    webhook: 'https://n8n.automato.pro/webhook/as-black-live',
    timeoutMs: 8000,
    sent: 'as_pesquisa_live', // já respondeu neste navegador (localStorage): quem volta vê a tela final
    id: 'as_pesquisa_id'      // ID desta resposta (sessionStorage): sobrevive a recarregar a página
  };

  var noop = function () {};
  var T = window.asTracking || { capture: noop, reachStage: noop, origem: {} };
  var live = !!window.asTracking && !T.interno;

  // ---------- Perguntas ----------
  // tipo "escolha": toca e avança; opção com "texto" abre o campo livre (opcional) antes de avançar.
  // tipo "texto": só o campo livre, opcional.
  // As opções de "tempo" e "local" são as do /teste/ (assets/js/teste.js), para comparar os dois públicos.
  var QUESTIONS = [
    { id: 'tema', tipo: 'escolha', texto: 'O que mais te trava na rotina?', opcoes: [
      { id: 'plantao', texto: 'O plantão: dose e conduta na hora' },
      { id: 'consulta', texto: 'A consulta: o tutor que diz "vou pensar"' },
      { id: 'sozinho', texto: 'O caso difícil que decido sozinho' },
      { id: 'outro', texto: 'Outro', abre: 'Qual?' }
    ] },
    { id: 'caso', tipo: 'texto', texto: 'Qual caso ou dúvida você quer que eu resolva ao vivo?' },
    { id: 'tem_guia', tipo: 'escolha', texto: 'Você já tem o Guia de Protocolos?', opcoes: [
      { id: 'nao', texto: 'Ainda não' },
      { id: 'anterior', texto: 'Tenho uma edição anterior' }
    ] },
    { id: 'pesaria', tipo: 'escolha', texto: 'Na Black, o que mais pesaria na sua decisão de levar o Guia?', opcoes: [
      { id: 'valor', texto: 'O valor' },
      { id: 'entrega', texto: 'O prazo de entrega' },
      { id: 'momento', texto: 'Se serve para o meu momento' },
      { id: 'anterior', texto: 'Já tenho uma edição anterior' },
      { id: 'decidido', texto: 'Nada, já vou levar' },
      { id: 'outro', texto: 'Outro', abre: 'O quê?' }
    ] },
    { id: 'tempo', tipo: 'escolha', texto: 'Há quanto tempo você atende?', opcoes: [
      { id: 'faculdade', texto: 'Ainda estou na faculdade' },
      { id: 'ate_2_anos', texto: 'Formado há menos de 2 anos' },
      { id: '2_a_5_anos', texto: 'De 2 a 5 anos' },
      { id: 'mais_5_anos', texto: 'Mais de 5 anos' },
      { id: 'nao_atendo', texto: 'Não atendo', abre: 'O que você faz hoje?' }
    ] },
    // Quem marcou "Não atendo" pula esta
    { id: 'local', tipo: 'escolha', texto: 'Onde você mais atende hoje?', pular: function () { return answers.tempo && answers.tempo.id === 'nao_atendo'; }, opcoes: [
      { id: 'clinica', texto: 'Clínica ou consultório' },
      { id: 'plantao', texto: 'Plantão ou emergência' },
      { id: 'domiciliar', texto: 'Atendimento domiciliar' },
      { id: 'estagio', texto: 'Estágio ou residência' },
      { id: 'outro', texto: 'Outro', abre: 'Onde?' }
    ] }
  ];

  // ---------- Helpers ----------
  function load(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }
  function save(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }
  function nationalDigits(v) {
    var d = String(v || '').replace(/\D/g, '');
    if (d.length > 11 && d.indexOf('55') === 0) d = d.slice(2);
    return d;
  }
  var DDDS = ('11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 ' +
    '51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99').split(' ');
  function whatsappError(v) {
    var d = nationalDigits(v);
    if (!d) return null; // opcional
    if (d.length < 10) return 'Faltam números. Use DDD + número, ex.: (31) 99999-9999. Ou deixe em branco.';
    if (DDDS.indexOf(d.slice(0, 2)) === -1) return 'Esse DDD não existe. Confira os 2 primeiros números.';
    if (d.length === 11 && d[2] !== '9') return 'Celular com 11 números começa com 9 depois do DDD.';
    if (d.length > 11) return 'Número longo demais. Use DDD + número.';
    return null;
  }

  // ---------- Elementos ----------
  var screens = {
    perguntas: document.getElementById('pesquisa'),
    envio: document.getElementById('pesquisa-envio'),
    fim: document.getElementById('pesquisa-fim')
  };
  if (!screens.perguntas) return;
  var card = document.getElementById('pesquisa-card');
  var title = document.getElementById('pesquisa-pergunta');
  var optionsBox = card.querySelector('.teste__opcoes');
  var counter = card.querySelector('.teste__contador');
  var bar = card.querySelector('.teste__barra span');
  var back = card.querySelector('.teste__voltar');
  var textBox = card.querySelector('.live-texto');
  var textLabel = textBox.querySelector('.live-texto__pergunta');
  var textArea = textBox.querySelector('textarea');
  var textNext = textBox.querySelector('.live-acoes__seguir');
  var form = document.getElementById('form-pesquisa');
  var phone = document.getElementById('pesquisa-whatsapp');
  var sendBack = screens.envio.querySelector('.live-envio__voltar');
  var sendButton = form.querySelector('button[type="submit"]');
  var sendText = sendButton.textContent;

  var answers = {};   // id da pergunta → { id, texto, outro } (escolha) ou { texto } (texto livre)
  var history = [];   // índices das perguntas mostradas, para o Voltar
  var current = -1;
  var started = false;
  var startedAt = 0;
  var onSendScreen = false;
  var finalSent = false;       // clicou em enviar e o n8n recebeu
  var lastSignature = '';      // o último envio igual não é repetido
  var queue = Promise.resolve(); // envios em ordem: o "enviado" nunca chega antes do "respondeu"
  var responseId = (function () {
    var v = null;
    try { v = sessionStorage.getItem(CONFIG.id); } catch (e) {}
    if (!v) {
      v = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
      try { sessionStorage.setItem(CONFIG.id, v); } catch (e) {}
    }
    return v;
  })();

  function show(name) {
    onSendScreen = name === 'envio';
    Object.keys(screens).forEach(function (k) { screens[k].hidden = k !== name; });
    window.scrollTo(0, 0);
  }
  function visible() { return QUESTIONS.filter(function (q) { return !(q.pular && q.pular()); }); }
  function nextIndex(from) {
    for (var i = from + 1; i < QUESTIONS.length; i++) if (!(QUESTIONS[i].pular && QUESTIONS[i].pular())) return i;
    return -1;
  }

  function render(index) {
    current = index;
    var q = QUESTIONS[index];
    var list = visible();
    var pos = list.indexOf(q) + 1;
    counter.textContent = 'Pergunta ' + pos + ' de ' + list.length;
    bar.style.width = Math.round(((pos - 1) / list.length) * 100) + '%';
    back.hidden = history.length === 0;
    title.textContent = q.texto;
    optionsBox.innerHTML = '';
    textBox.hidden = true;
    textArea.value = '';

    if (q.tipo === 'texto') {
      optionsBox.hidden = true;
      openText('', answers[q.id] ? answers[q.id].texto : '');
    } else {
      optionsBox.hidden = false;
      q.opcoes.forEach(function (o) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'teste__opcao';
        b.textContent = o.texto;
        if (answers[q.id] && answers[q.id].id === o.id) b.classList.add('is-selected');
        b.addEventListener('click', function () { choose(q, o, b); });
        optionsBox.appendChild(b);
      });
      var prev = answers[q.id];
      if (prev && prev.abre) openText(prev.abre, prev.outro || '');
    }
    title.focus({ preventScroll: true });
    // Depois da 1ª pergunta, mantém o topo do cartão na tela (a anterior pode ter deixado a página rolada)
    if (history.length && card.getBoundingClientRect().top < 0) card.scrollIntoView({ block: 'start' });
  }

  function openText(label, value) {
    textLabel.textContent = label;
    textArea.value = value || '';
    textBox.hidden = false;
  }

  function begin() {
    if (started) return;
    started = true;
    startedAt = Date.now();
    T.capture('lp_pesquisa_inicio', { etapa: 'engajamento' });
    T.reachStage('iniciou_pesquisa');
  }

  function record(q, extra) {
    var a = answers[q.id] || {};
    T.capture('lp_pesquisa_resposta', Object.assign({
      pergunta_id: q.id,
      numero: visible().indexOf(q) + 1,
      resposta_id: a.id || (a.texto ? 'texto' : 'vazio'),
      resposta: a.id ? a.texto : '',
      com_texto: !!(a.outro || (q.tipo === 'texto' && a.texto)),
      etapa: 'engajamento'
    }, extra || {}));
  }

  function choose(q, o, button) {
    begin();
    [].forEach.call(optionsBox.children, function (el) { el.classList.toggle('is-selected', el === button); });
    var prev = answers[q.id];
    answers[q.id] = { id: o.id, texto: o.texto, abre: o.abre || '', outro: prev && prev.id === o.id ? prev.outro : '' };
    if (o.abre) { openText(o.abre, answers[q.id].outro); textArea.focus(); return; }
    textBox.hidden = true;
    record(q);
    setTimeout(advance, 180);
  }

  textNext.addEventListener('click', function () {
    var q = QUESTIONS[current];
    var v = textArea.value.trim().slice(0, 500);
    if (q.tipo === 'texto') { begin(); answers[q.id] = { texto: v }; }
    else if (answers[q.id]) answers[q.id].outro = v;
    else return;
    record(q);
    advance();
  });

  function advance() {
    history.push(current);
    var n = nextIndex(current);
    if (n === -1) {
      bar.style.width = '100%';
      show('envio');
      // Respondeu tudo: as respostas já vão para a planilha, mesmo que a pessoa feche sem clicar em enviar
      send('respondeu').catch(noop);
      T.capture('lp_pesquisa_respondeu', Object.assign({ etapa: 'conversao' }, summary()));
      return;
    }
    render(n);
  }

  back.addEventListener('click', function () {
    if (!history.length) return;
    render(history.pop());
  });
  sendBack.addEventListener('click', function () {
    show('perguntas');
    render(history.pop());
  });

  // ---------- Envio ----------
  function fieldMessage(text) {
    var box = phone.closest('.cap-field');
    box.classList.toggle('is-invalid', !!text);
    phone.setAttribute('aria-invalid', text ? 'true' : 'false');
    box.querySelector('.cap-field__msg').textContent = text || '';
  }
  phone.addEventListener('blur', function () { fieldMessage(whatsappError(phone.value)); });
  phone.addEventListener('input', function () {
    if (phone.closest('.cap-field').classList.contains('is-invalid')) fieldMessage(whatsappError(phone.value));
  });

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
  function postWithRetry(payload) { return post(payload).catch(function () { return post(payload); }); }

  function answerText(id) { var a = answers[id]; return a ? (a.id ? a.texto : a.texto || '') : ''; }
  function answerOther(id) { var a = answers[id]; return a && a.id ? (a.outro || '') : ''; }
  function answerId(id) { var a = answers[id]; return a && a.id ? a.id : ''; }
  function answeredCount() { return Object.keys(answers).filter(function (k) { return answers[k].id || answers[k].texto; }).length; }

  // Texto digitado e ainda não confirmado (a pessoa saiu antes de tocar em CONTINUAR) também vale
  function keepTyped() {
    if (textBox.hidden || current < 0 || onSendScreen) return;
    var q = QUESTIONS[current], v = textArea.value.trim().slice(0, 500);
    if (!v) return;
    if (q.tipo === 'texto') answers[q.id] = { texto: v };
    else if (answers[q.id] && answers[q.id].abre) answers[q.id].outro = v;
  }

  function collect() {
    return {
      tema: answerText('tema'), tema_outro: answerOther('tema'),
      caso: answerText('caso'),
      tem_guia: answerText('tem_guia'),
      pesaria: answerText('pesaria'), pesaria_outro: answerOther('pesaria'),
      tempo: answerText('tempo'), tempo_outro: answerOther('tempo'),
      local: answerText('local'), local_outro: answerOther('local')
    };
  }
  function summary() {
    return {
      tema: answerId('tema'), tem_guia: answerId('tem_guia'), pesaria: answerId('pesaria'),
      tempo: answerId('tempo'), local: answerId('local'),
      tem_caso: !!answerText('caso'), respondidas: answeredCount(),
      segundos_na_pesquisa: startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0
    };
  }
  function buildPayload(status, whatsapp) {
    return Object.assign({}, T.origem, {
      id: responseId,
      status: status,
      respondidas: answeredCount(),
      respostas: collect(),
      whatsapp: whatsapp || '',
      website: form.elements.website.value || undefined,
      interno: !!T.interno,
      posthog_distinct_id: (window.posthog && posthog.get_distinct_id && posthog.get_distinct_id()) || '',
      pagina: location.href.split('#')[0],
      referrer: document.referrer
    });
  }
  function signature(p) { return p.status + '|' + p.whatsapp + '|' + JSON.stringify(p.respostas); }

  // Envio com fetch (respondeu / enviado), em fila
  function send(status, whatsapp) {
    var payload = buildPayload(status, whatsapp);
    var sig = signature(payload);
    if (finalSent || sig === lastSignature) return queue;
    lastSignature = sig;
    queue = queue.then(function () { return postWithRetry(payload); }, function () { return postWithRetry(payload); });
    return queue;
  }

  // Saiu da página (fechou a aba, trocou de app, voltou para o WhatsApp): sendBeacon chega mesmo com a página indo embora
  function sendOnExit() {
    if (!started || finalSent) return;
    keepTyped();
    var payload = buildPayload(onSendScreen ? 'respondeu' : 'parcial', '');
    var sig = signature(payload);
    if (sig === lastSignature) return;
    lastSignature = sig;
    var body = JSON.stringify(payload);
    var ok = false;
    try { ok = navigator.sendBeacon && navigator.sendBeacon(CONFIG.webhook, new Blob([body], { type: 'text/plain;charset=UTF-8' })); } catch (e) {}
    if (!ok) { try { fetch(CONFIG.webhook, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: body, keepalive: true }); } catch (e) {} }
    if (!onSendScreen) T.capture('lp_pesquisa_parcial', Object.assign({ etapa: 'engajamento', ultima_pergunta: current >= 0 ? QUESTIONS[current].id : '' }, summary()), { transport: 'sendBeacon' });
  }
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') sendOnExit(); });
  window.addEventListener('pagehide', sendOnExit);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sendButton.disabled) return;
    var error = whatsappError(phone.value);
    fieldMessage(error);
    if (error) { phone.focus(); return; }
    if (form.elements.website.value) { show('fim'); return; } // robô

    var whatsapp = nationalDigits(phone.value);
    var resumo = Object.assign(summary(), { deu_whatsapp: !!whatsapp });

    sendButton.disabled = true;
    sendButton.textContent = 'ENVIANDO...';
    send('enviado', whatsapp).then(function () {
      finalSent = true;
      if (live && whatsapp && window.posthog && posthog.identify) posthog.identify('wa_55' + whatsapp);
      T.capture('lp_pesquisa_enviada', Object.assign({ etapa: 'conversao' }, resumo), { send_instantly: true });
      T.reachStage('enviou_pesquisa');
      save(CONFIG.sent, { em: new Date().toISOString() });
    }, function (err) {
      // n8n fora do ar: a pessoa vê o fim mesmo assim e as respostas ficam no PostHog para recuperar.
      finalSent = true;
      T.capture('lp_pesquisa_falha', Object.assign({ motivo: err.message, respostas: collect(), whatsapp: whatsapp, etapa: 'conversao' }, resumo), { send_instantly: true });
    }).then(function () {
      sendButton.disabled = false;
      sendButton.textContent = sendText;
      show('fim');
    });
  });

  // ---------- Início ----------
  if (load(CONFIG.sent) && !/[?&]refazer=1/.test(location.search)) { show('fim'); return; }
  render(0);
})();
