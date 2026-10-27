// Teste /teste/: 7 perguntas (2 de perfil + 5 situações), liberação com nome + WhatsApp, resultado pela dor
// principal (plantão, consulta ou decidir sozinho) e a oferta da Black na mesma página.
// O lead vai para o n8n (planilha "Leads - Quiz" + API de Conversões), com o mesmo event_id do Lead do navegador.
// Dicionário de eventos: RASTREAMENTO.md, seção "Teste".
(function () {
  'use strict';

  var CONFIG = {
    webhook: 'https://n8n.automato.pro/webhook/as-black-teste',
    timeoutMs: 8000,
    contentName: 'Teste Black Friday',
    saved: 'as_teste',              // resultado salvo (localStorage): quem volta vê o resultado
    progress: 'as_teste_progresso', // respostas em andamento (sessionStorage): sobrevive a recarregar
    sent: 'as_lead_teste',          // WhatsApps que já viraram Lead neste navegador
    contact: 'as_teste_contato'     // nome e WhatsApp, para preencher se a pessoa refizer o teste
  };

  var noop = function () {};
  var T = window.asTracking || { capture: noop, metaTrack: noop, reachStage: noop, origem: {}, pixels: [],
    eventId: function (n) { return n + '_' + Date.now().toString(36); } };
  var live = !!window.asTracking && !T.interno;

  // ---------- Perguntas ----------
  // pontos: plantao → Guia, consulta → curso Atendimento Extraordinário, sozinho → Comunidade.
  var QUESTIONS = [
    { id: 'tempo', texto: 'Há quanto tempo você atende?', opcoes: [
      { id: 'faculdade', texto: 'Ainda estou na faculdade' },
      { id: 'ate_2_anos', texto: 'Formado há menos de 2 anos' },
      { id: '2_a_5_anos', texto: 'De 2 a 5 anos' },
      { id: 'mais_5_anos', texto: 'Mais de 5 anos' }
    ] },
    { id: 'local', texto: 'Onde você mais atende hoje?', opcoes: [
      { id: 'clinica', texto: 'Clínica ou consultório' },
      { id: 'plantao', texto: 'Plantão ou emergência' },
      { id: 'domiciliar', texto: 'Atendimento domiciliar' },
      { id: 'estagio', texto: 'Estágio ou residência' }
    ] },
    { id: 'convulsao', texto: 'São 2h da manhã e chega um cão em crise convulsiva. O que acontece nos primeiros minutos?', opcoes: [
      { id: 'protocolo', texto: 'Sigo um protocolo que sei de cor', pontos: {} },
      { id: 'celular', texto: 'Começo pelo que lembro e confiro a dose no celular', pontos: { plantao: 2 } },
      { id: 'colega', texto: 'Mando mensagem para um colega mais experiente', pontos: { sozinho: 2, plantao: 1 } },
      { id: 'demora', texto: 'Demoro para organizar a cabeça e decidir por onde começar', pontos: { plantao: 3 } }
    ] },
    { id: 'fluido', texto: 'Paciente desidratado e você precisa calcular a fluidoterapia agora. Como faz?', opcoes: [
      { id: 'seguro', texto: 'Faço a conta com segurança', pontos: {} },
      { id: 'internet', texto: 'Procuro a fórmula na internet ou num PDF', pontos: { plantao: 2 } },
      { id: 'inseguro', texto: 'Faço, mas fico com a sensação de que posso ter errado', pontos: { plantao: 2 } },
      { id: 'conferir', texto: 'Peço para alguém conferir', pontos: { sozinho: 1, plantao: 1 } }
    ] },
    { id: 'tutor', texto: 'Você explica o tratamento e o tutor diz “vou pensar e te aviso”. Com que frequência isso acontece?', opcoes: [
      { id: 'quase_nunca', texto: 'Quase nunca', pontos: {} },
      { id: 'as_vezes', texto: 'Às vezes', pontos: { consulta: 1 } },
      { id: 'toda_semana', texto: 'Toda semana', pontos: { consulta: 2 } },
      { id: 'quase_todo_dia', texto: 'Quase todo dia', pontos: { consulta: 3 } }
    ] },
    { id: 'anamnese', texto: 'Na anamnese, o que mais acontece com você?', opcoes: [
      { id: 'roteiro', texto: 'Sigo um roteiro e cubro tudo', pontos: {} },
      { id: 'perde_fio', texto: 'O tutor fala muito e eu perco o fio da conversa', pontos: { consulta: 2 } },
      { id: 'esquece', texto: 'Esqueço uma pergunta importante e só lembro depois', pontos: { consulta: 2, plantao: 1 } },
      { id: 'nao_liga', texto: 'Pergunto tudo, mas não sei o que fazer com as respostas', pontos: { consulta: 1, plantao: 1 } }
    ] },
    { id: 'duvida', texto: 'Quando um caso te deixa em dúvida, com quem você discute?', opcoes: [
      { id: 'equipe', texto: 'Com a equipe ou um mentor que responde rápido', pontos: {} },
      { id: 'colegas', texto: 'Com colegas da faculdade, quando eles respondem', pontos: { sozinho: 2 } },
      { id: 'grupos', texto: 'Pesquiso sozinho em grupos e fóruns', pontos: { sozinho: 2 } },
      { id: 'ninguem', texto: 'Com ninguém. Decido e espero ter acertado', pontos: { sozinho: 3 } }
    ] }
  ];
  var TOTAL = QUESTIONS.length;
  var GATE = TOTAL;            // passo da liberação
  var DORES = ['plantao', 'consulta', 'sozinho']; // ordem de desempate: o Guia é o produto principal

  // ---------- Helpers ----------
  function load(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }
  function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }
  function drop(key) { try { localStorage.removeItem(key); } catch (e) {} }
  function loadSession(key) { try { return JSON.parse(sessionStorage.getItem(key)); } catch (e) { return null; } }
  function saveSession(key, value) { try { sessionStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }
  function dropSession(key) { try { sessionStorage.removeItem(key); } catch (e) {} }
  function digits(v) { return String(v || '').replace(/\D/g, ''); }
  function cookie(name) {
    var m = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : '';
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function leaving() { return document.documentElement.classList.contains('as-saindo'); }

  // ---------- Elementos ----------
  var screens = {
    perguntas: document.getElementById('teste'),
    gate: document.getElementById('teste-gate'),
    resultado: document.getElementById('resultado')
  };
  var afterResult = document.querySelectorAll('#secao-oferta, .provas, .faq, .teste-final');
  var intro = document.getElementById('teste-intro');
  var counter = document.querySelector('.teste__contador');
  var bar = document.querySelector('.teste__barra span');
  var title = document.getElementById('teste-pergunta');
  var optionsBox = document.querySelector('.teste__opcoes');
  var backButton = document.querySelector('.teste__voltar');
  if (!screens.perguntas || !title) return;

  // ---------- Estado ----------
  var answers = {};   // id da pergunta → índice da opção
  var step = 0;       // 0..6 perguntas, 7 liberação
  var pos = 0;        // posição desta página no histórico (0 = primeira entrada do teste)
  var started = false;
  var resultShown = false;
  var testStartedAt = Date.now();
  var stepShownAt = Date.now();
  var seenQuestions = {};

  function secondsSince(t) { return Math.round((Date.now() - t) / 1000); }
  function answeredCount() { return Object.keys(answers).length; }

  // ---------- Onde a pessoa está ----------
  // teste_etapa (pergunta_1..7, liberacao, resultado, oferta, checkout) vai em todo evento seguinte da
  // sessão, inclusive no $pageleave automático do PostHog: é ele que mostra onde a pessoa parou.
  // No Clarity vira tag, para abrir as gravações de quem saiu em cada ponto.
  var currentStage = '';
  function setStage(name) {
    if (name === currentStage) return;
    currentStage = name;
    stepShownAt = Date.now();
    var props = { teste_etapa: name, teste_respondidas: answeredCount() };
    if (live && window.posthog && posthog.register_for_session) posthog.register_for_session(props);
    if (live && window.clarity) clarity('set', 'teste_etapa', name);
  }

  function option(id) {
    var q = QUESTIONS.filter(function (x) { return x.id === id; })[0];
    return q && answers[id] !== undefined ? q.opcoes[answers[id]] : null;
  }
  function score() {
    var p = { plantao: 0, consulta: 0, sozinho: 0 };
    QUESTIONS.forEach(function (q) {
      var o = option(q.id);
      if (!o || !o.pontos) return;
      Object.keys(o.pontos).forEach(function (k) { p[k] += o.pontos[k]; });
    });
    return p;
  }
  function mainPain(p) {
    return DORES.reduce(function (best, k) { return p[k] > p[best] ? k : best; }, DORES[0]);
  }
  function answersText() {
    return QUESTIONS.map(function (q, i) {
      var o = option(q.id);
      return (i + 1) + '. ' + (o ? o.texto : '-');
    }).join(' | ');
  }
  function answerIds() {
    var r = {};
    QUESTIONS.forEach(function (q) { var o = option(q.id); if (o) r[q.id] = o.id; });
    return r;
  }
  function saveProgress() { saveSession(CONFIG.progress, { answers: answers, started: started }); }

  // ---------- Telas ----------
  function show(name) {
    Object.keys(screens).forEach(function (k) { screens[k].hidden = k !== name; });
    afterResult.forEach(function (el) { el.hidden = name !== 'resultado'; });
  }

  function renderQuestion(n) {
    step = n;
    show('perguntas');
    var q = QUESTIONS[n];
    intro.hidden = n !== 0;
    backButton.hidden = n === 0;
    counter.textContent = 'Pergunta ' + (n + 1) + ' de ' + TOTAL;
    bar.style.width = (n / TOTAL * 100) + '%';
    title.textContent = q.texto;
    optionsBox.innerHTML = '';
    q.opcoes.forEach(function (o, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'teste__opcao' + (answers[q.id] === i ? ' is-selected' : '');
      b.textContent = o.texto;
      b.dataset.i = i;
      optionsBox.appendChild(b);
    });
    if (n > 0) {
      window.scrollTo(0, 0);
      title.focus({ preventScroll: true });
    }
    setStage('pergunta_' + (n + 1));
    T.capture('lp_teste_pergunta_vista', {
      pergunta: n + 1,
      pergunta_id: q.id,
      revisita: !!seenQuestions[q.id],
      respondidas: answeredCount(),
      segundos_no_teste: secondsSince(testStartedAt),
      etapa: 'engajamento'
    });
    seenQuestions[q.id] = true;
  }

  var gateSeen = false;
  function renderGate() {
    step = GATE;
    show('gate');
    window.scrollTo(0, 0);
    var contact = load(CONFIG.contact);
    if (contact) {
      if (!fields.nome.value) fields.nome.value = contact.nome || '';
      if (!fields.whatsapp.value) fields.whatsapp.value = maskPhone(contact.whatsapp || '');
    }
    setStage('liberacao');
    if (gateSeen) return;
    gateSeen = true;
    // Meta: público "respondeu tudo e não deixou contato" (QuizGate sem Lead).
    T.metaTrack('QuizGate', { content_name: CONFIG.contentName }, true);
    T.capture('lp_teste_gate_vista', { segundos_no_teste: secondsSince(testStartedAt), etapa: 'intencao' });
  }

  function render(n) { if (n === GATE) renderGate(); else renderQuestion(n); }

  function goTo(n) {
    pos += 1;
    history.pushState({ teste: n, pos: pos }, '', location.href);
    render(n);
  }

  // ---------- Respostas ----------
  optionsBox.addEventListener('click', function (e) {
    var b = e.target.closest('.teste__opcao');
    if (!b) return;
    var q = QUESTIONS[step];
    var i = Number(b.dataset.i);
    var o = q.opcoes[i];
    answers[q.id] = i;

    if (!started) {
      started = true;
      T.metaTrack('QuizStart', { content_name: CONFIG.contentName }, true);
      T.capture('lp_teste_inicio', { etapa: 'engajamento' });
      T.reachStage('iniciou_teste');
    }
    var pts = o.pontos || {};
    T.capture('lp_teste_resposta', {
      pergunta: step + 1,
      pergunta_id: q.id,
      resposta_id: o.id,
      resposta: o.texto,
      pontos_plantao: pts.plantao || 0,
      pontos_consulta: pts.consulta || 0,
      pontos_sozinho: pts.sozinho || 0,
      segundos_na_pergunta: secondsSince(stepShownAt),
      segundos_no_teste: secondsSince(testStartedAt),
      etapa: 'engajamento'
    });
    if (step + 1 === 4) T.reachStage('metade_teste');
    saveProgress();
    b.classList.add('is-selected');
    // pequena pausa para a pessoa ver a opção marcada
    setTimeout(function () { goTo(step + 1); }, 180);
  });

  backButton.addEventListener('click', function () { history.back(); });

  window.addEventListener('popstate', function (e) {
    if (leaving()) return; // voltar.js já está levando ao downsell
    var s = e.state;
    if (!s || s.teste === undefined) return;
    if (resultShown) {
      // Depois do resultado o voltar sai do teste (o downsell, quando cabe, é do voltar.js).
      history.go(-(s.pos + 1));
      return;
    }
    if (s.teste === 'resultado') return;
    var target = Number(s.teste);
    if (target < step) T.capture('lp_teste_voltar', { de_pergunta: step + 1, para_pergunta: target + 1, etapa: 'engajamento' });
    pos = s.pos || 0;
    render(target);
  });

  // ---------- Formulário (mesmas regras da captura) ----------
  var form = document.getElementById('form-teste');
  var fields = { nome: form.elements.nome, whatsapp: form.elements.whatsapp };
  var button = form.querySelector('button[type="submit"]');
  var buttonText = button.textContent;

  function nationalDigits(v) {
    var d = digits(v);
    if (d.length > 11 && d.indexOf('55') === 0) d = d.slice(2);
    return d.slice(0, 11);
  }
  function maskPhone(v) {
    var d = nationalDigits(v);
    if (d.length <= 2) return d.length ? '(' + d : '';
    var rest = d.slice(2);
    var split = d.length === 11 ? 5 : 4;
    return '(' + d.slice(0, 2) + ') ' + (rest.length > split ? rest.slice(0, split) + '-' + rest.slice(split) : rest);
  }
  fields.whatsapp.addEventListener('input', function () { fields.whatsapp.value = maskPhone(fields.whatsapp.value); });

  var DDDS = ('11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 ' +
    '51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99').split(' ');
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
  function setMessage(input, text) {
    var box = fieldBox(input);
    box.classList.toggle('is-invalid', !!text);
    input.setAttribute('aria-invalid', text ? 'true' : 'false');
    box.querySelector('.cap-field__msg').textContent = text || '';
  }
  function check(name) {
    var error = RULES[name](fields[name].value);
    setMessage(fields[name], error ? error[1] : '');
    return error;
  }
  Object.keys(fields).forEach(function (name) {
    var input = fields[name];
    input.addEventListener('blur', function () { if (input.value.trim()) check(name); });
    input.addEventListener('input', function () { if (fieldBox(input).classList.contains('is-invalid')) check(name); });
  });

  var formStarted = false;
  form.addEventListener('focusin', function () {
    if (formStarted) return;
    formStarted = true;
    T.capture('lp_form_inicio', { origem: 'teste', etapa: 'intencao' });
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
      errors.forEach(function (err) { T.capture('lp_form_erro', { campo: err.campo, motivo: err.motivo, origem: 'teste', etapa: 'intencao' }); });
      return;
    }

    var p = score();
    var dor = mainPain(p);
    // Robô preencheu o campo escondido: mostra o resultado e não envia nada.
    if (form.elements.website.value) { showResult(dor, p, false); return; }

    var nome = fields.nome.value.trim().replace(/\s+/g, ' ');
    var whatsapp = nationalDigits(fields.whatsapp.value);
    var eventId = T.eventId('Lead');
    var distinctId = (window.posthog && posthog.get_distinct_id && posthog.get_distinct_id()) || '';
    var sent = load(CONFIG.sent) || [];
    var repeated = sent.indexOf(whatsapp) !== -1;
    var params = new URLSearchParams(location.search);
    var fbclid = params.get('fbclid') || '';
    var fbc = cookie('_fbc') || (fbclid ? 'fb.1.' + Date.now() + '.' + fbclid : '');
    var tempo = option('tempo'), local = option('local');

    var payload = Object.assign({}, T.origem, {
      nome: nome,
      whatsapp: whatsapp,
      dor: dor,
      pontos: p,
      perfil_tempo: tempo ? tempo.texto : '',
      perfil_local: local ? local.texto : '',
      respostas: answersText(),
      event_id: eventId,
      repetido: repeated,
      interno: !!T.interno,
      fbclid: fbclid,
      fbp: cookie('_fbp'),
      fbc: fbc,
      posthog_distinct_id: distinctId,
      pagina: location.href.split('#')[0],
      referrer: document.referrer,
      // ?test_event_code=TEST123 → o Lead do servidor aparece em "Testar eventos" no Gerenciador de Eventos
      test_event_code: params.get('test_event_code') || ''
    });

    button.disabled = true;
    button.textContent = 'CARREGANDO...';

    postWithRetry(payload).then(function () {
      if (!repeated) {
        // Advanced matching: a Meta faz o hash no navegador.
        var userData = { ph: '55' + whatsapp, fn: nome.split(' ')[0].toLowerCase() };
        if (distinctId) userData.external_id = distinctId;
        T.pixels.forEach(function (id) { if (window.fbq) fbq('init', id, userData); });
        T.metaTrack('Lead', { content_name: CONFIG.contentName, content_category: dor }, false, eventId);
        sent.push(whatsapp);
        save(CONFIG.sent, sent);
      }
      if (live && window.posthog && posthog.identify) posthog.identify('wa_55' + whatsapp, { nome: nome, whatsapp: whatsapp });
      T.capture('lp_lead', { repetido: repeated, origem: 'teste', dor: dor, segundos_no_teste: secondsSince(testStartedAt), etapa: 'conversao' }, { send_instantly: true });
      T.reachStage('virou_lead');
      if (window.clarity) clarity('upgrade', 'virou_lead');
    }, function (err) {
      // n8n fora do ar: a pessoa vê o resultado mesmo assim e o lead fica no PostHog para recuperar.
      T.capture('lp_lead_falha', { motivo: err.message, nome: nome, whatsapp: whatsapp, origem: 'teste', dor: dor, etapa: 'conversao' }, { send_instantly: true });
    }).then(function () {
      save(CONFIG.contact, { nome: nome, whatsapp: whatsapp });
      button.disabled = false;
      button.textContent = buttonText;
      showResult(dor, p, false);
    });
  });

  // ---------- Resultado ----------
  var FREQ = { as_vezes: 'às vezes', toda_semana: 'toda semana', quase_todo_dia: 'quase todo dia' };
  function quote(id) { var o = option(id); return '“' + escapeHtml(o ? o.texto : '') + '”'; }
  function safe(id) { return answers[id] === 0 || answers[id] === undefined; }
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  var RESULTS = {
    plantao: {
      titulo: 'Seu ponto mais sensível é o plantão',
      botao: 'QUERO O GUIA DE PROTOCOLOS',
      ordem: ['guia', 'curso', 'comunidade'],
      texto: function (p) {
        var first;
        if (!p.plantao && !p.consulta && !p.sozinho) {
          first = 'Você respondeu com segurança em quase tudo. Para quem já está nesse ponto, o Guia vira o padrão da equipe.';
        } else {
          var parts = [];
          if (!safe('convulsao')) parts.push('na emergência você respondeu ' + quote('convulsao'));
          if (!safe('fluido')) parts.push((parts.length ? 'no cálculo, ' : 'no cálculo da fluidoterapia você respondeu ') + quote('fluido'));
          first = (parts.length ? capitalize(parts.join(' e, ')) + '. ' : '') +
            'O tempo procurando uma dose ou uma fórmula é tempo longe do paciente.';
        }
        return [
          first,
          'O Guia de Protocolos reúne em um livro de bancada os passos de manejo das principais emergências e o cálculo de doses, fluidoterapia e transfusão. Ele foi escrito pela Dra. Maria Paula Ferrari e equipe a partir dos protocolos da Amar Veterinária.',
          'Esses protocolos existem espalhados em livros e na internet, e o Guia junta os que a clínica de pequenos usa no dia a dia num formato de consulta rápida.'
        ];
      }
    },
    consulta: {
      titulo: 'Seu ponto mais sensível é a conversa com o tutor',
      botao: 'QUERO O GUIA COM O CURSO',
      ordem: ['curso', 'guia', 'comunidade'],
      texto: function () {
        var tutor = option('tutor');
        var first;
        if (!safe('tutor') && !safe('anamnese')) {
          first = 'Você ouve “vou pensar e te aviso” ' + FREQ[tutor.id] + ' e, na anamnese, ' + quote('anamnese') + '.';
        } else if (!safe('tutor')) {
          first = 'Você ouve “vou pensar e te aviso” ' + FREQ[tutor.id] + '.';
        } else {
          first = 'Na anamnese, você respondeu ' + quote('anamnese') + '.';
        }
        return [
          first + ' A conduta pode estar certa e o tutor ainda assim ir embora sem tratar.',
          'No curso Atendimento Extraordinário, a Dra. Maria Paula ensina o passo a passo da consulta usado na Amar Veterinária: anamnese que conduz, exame físico explicado ao tutor, a Técnica do Detetive e o pós-consulta. Na Black, o curso completo vem junto com o Guia, que dá a conduta que você vai explicar.'
        ];
      }
    },
    sozinho: {
      titulo: 'Seu ponto mais sensível é decidir os casos difíceis sozinho',
      botao: 'QUERO O GUIA COM A COMUNIDADE',
      ordem: ['comunidade', 'guia', 'curso'],
      tituloOferta: 'Adquira já o Guia de Protocolos<span class="rosa"> e receba 3 meses na Comunidade Amar Saber</span>',
      texto: function () {
        var first = !safe('duvida')
          ? 'Quando um caso te deixa em dúvida, você respondeu ' + quote('duvida') + '.'
          : 'Nas situações do teste, você recorreu a outra pessoa para decidir.';
        return [
          first + ' Sem ninguém para conferir, você só descobre se acertou quando o paciente volta.',
          'Na Comunidade Amar Saber, um grupo de WhatsApp com veterinários que usam o Guia, você leva o caso que te travou, compara condutas e conhece colegas de outras cidades. A Dra. Maria Paula e a equipe da Amar participam das conversas. Na Black, são 3 meses de comunidade junto com o Guia.'
        ];
      }
    }
  };
  var PROFILE = {
    iniciante: 'Para quem está começando, o Guia dá uma base de conduta para a rotina, com orientações diretas.',
    experiente: 'Para quem já atende, o Guia é a consulta rápida no meio do plantão e o padrão para treinar a equipe.'
  };

  var resultBox = screens.resultado;
  var offerTitle = document.querySelector('[data-r="oferta-titulo"]');
  var offerTitleDefault = offerTitle ? offerTitle.innerHTML : '';
  var offerList = document.querySelector('.oferta__list');
  var checkoutButtons = document.querySelectorAll('[data-r="checkout"]');

  function fillResult(dor, p) {
    var r = RESULTS[dor];
    resultBox.querySelector('[data-r="titulo"]').textContent = r.titulo;
    resultBox.querySelector('[data-r="texto"]').innerHTML = r.texto(p).map(function (t) { return '<p>' + t + '</p>'; }).join('');
    var tempo = option('tempo');
    var beginner = tempo && (tempo.id === 'faculdade' || tempo.id === 'ate_2_anos');
    resultBox.querySelector('[data-r="perfil"]').textContent = beginner ? PROFILE.iniciante : PROFILE.experiente;
    resultBox.querySelector('[data-r="botao"]').textContent = r.botao;
    // Oferta: o item que resolve a dor aparece primeiro.
    r.ordem.forEach(function (item) { offerList.appendChild(offerList.querySelector('[data-item="' + item + '"]')); });
    if (offerTitle) offerTitle.innerHTML = r.tituloOferta || offerTitleDefault;
    checkoutButtons.forEach(function (b) { b.textContent = r.botao; });
  }

  function showResult(dor, p, fromSaved) {
    resultShown = true;
    dropSession(CONFIG.progress);
    fillResult(dor, p);
    save(CONFIG.saved, { answers: answers, dor: dor, pontos: p, salvo_em: Date.now() });
    show('resultado');
    setStage('resultado');

    if (fromSaved) {
      history.replaceState({ teste: 'resultado', pos: 0 }, '', location.href);
    } else {
      pos += 1;
      history.pushState({ teste: 'resultado', pos: pos }, '', location.href);
    }

    var tempo = option('tempo'), local = option('local');
    var props = { teste_dor: dor, teste_perfil_tempo: tempo ? tempo.id : '', teste_perfil_local: local ? local.id : '' };
    // A dor e o perfil vão junto em todo evento seguinte (oferta, checkout, downsell).
    if (live && window.posthog) posthog.register(props);
    if (window.clarity && live) Object.keys(props).forEach(function (k) { clarity('set', k, props[k]); });
    T.capture('lp_teste_resultado', Object.assign({
      dor: dor,
      pontos_plantao: p.plantao, pontos_consulta: p.consulta, pontos_sozinho: p.sozinho,
      respostas: answerIds(),
      salvo: !!fromSaved,
      etapa: 'intencao'
    }, props));
    T.reachStage('viu_resultado');
    if (window.clarity && live) clarity('upgrade', 'viu_resultado');

    // A partir daqui, o voltar leva ao downsell (uma vez por aba).
    if (window.asVoltar) window.asVoltar.arm();

    var offer = document.getElementById('secao-oferta');
    if (location.hash === '#secao-oferta' && offer) offer.scrollIntoView();
    else window.scrollTo(0, 0);
  }

  // Oferta na tela e clique no checkout também viram etapa (o ViewContent e o lp_checkout são do tracking.js).
  var offerSection = document.getElementById('secao-oferta');
  if (offerSection && 'IntersectionObserver' in window) {
    var offerSeen = new IntersectionObserver(function (entries) {
      if (!resultShown || !entries.some(function (en) { return en.isIntersecting; })) return;
      offerSeen.disconnect();
      if (currentStage === 'resultado') setStage('oferta');
    }, { threshold: 0.3 });
    offerSeen.observe(offerSection);
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('a[href*="seguro.amarsaberstore.com.br"]')) setStage('checkout');
  }, true);

  resultBox.querySelector('.resultado__refazer').addEventListener('click', function () {
    T.capture('lp_teste_refazer', { etapa: 'engajamento' }, { send_instantly: true });
    drop(CONFIG.saved);
    dropSession(CONFIG.progress);
    location.href = location.pathname + location.search;
  });

  // ---------- Início ----------
  if (leaving()) return; // volta do checkout: voltar.js está levando ao downsell

  var saved = load(CONFIG.saved);
  var state = history.state;
  if (saved && saved.answers && RESULTS[saved.dor] && state && typeof state.teste === 'number') {
    // Voltou para uma pergunta antiga depois de ver o resultado (ex.: voltar a partir do downsell):
    // sai do teste de uma vez, em vez de passar por todas as perguntas de novo.
    history.go(-(state.pos + 1));
    return;
  }
  if (saved && saved.answers && RESULTS[saved.dor]) {
    answers = saved.answers;
    started = true;
    showResult(saved.dor, score(), true);
    return;
  }

  var progress = loadSession(CONFIG.progress);
  if (progress && progress.answers && state && typeof state.teste === 'number') {
    // Recarregou no meio do teste: continua de onde parou.
    answers = progress.answers;
    started = !!progress.started;
    pos = state.pos || 0;
    render(state.teste);
  } else {
    dropSession(CONFIG.progress);
    history.replaceState({ teste: 0, pos: 0 }, '', location.href);
    renderQuestion(0);
  }
})();
