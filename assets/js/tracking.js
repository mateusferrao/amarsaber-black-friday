// Rastreamento da LP: Meta Pixel (só navegador), PostHog (eventos/funil) e Microsoft Clarity (gravações/heatmap).
// Nomes de evento seguem o padrão Automato: português, prefixo lp_ (iguais em todos os clientes).
// Dicionário completo de eventos e propriedades: RASTREAMENTO.md. Para trocar IDs ou dados da oferta, edite apenas CONFIG.
// Eventos do checkout (InitiateCheckout, AddPaymentInfo, Purchase) NÃO são enviados aqui: a Yampi envia
// (navegador + API de Conversões). Por isso o clique pro checkout é o evento personalizado ClickCheckout.
(function () {
  'use strict';

  var CONFIG = {
    metaPixels: ['1393732806282634', '1701576724241276'],
    posthog: { key: 'phc_w7v3y2rN3kkwfEbV8n7wVzoAzYEU7pNMBJWGpvWTaB9R', host: 'https://us.i.posthog.com' },
    clarityId: 'z2xmncb9r0',
    product: { id: 'guia-protocolos', name: 'Guia de Protocolos Clínicos', value: 497, currency: 'BRL' },
    checkoutHost: 'seguro.amarsaberstore.com.br',
    offerSection: '#secao-oferta',
    engagedSeconds: 30,     // tempo com a aba visível para contar como visita engajada
    attributionDays: 7,     // mesmo prazo da UTMify
    videoMarks: [25, 50, 75, 95]
  };

  // ---------- Helpers de armazenamento (podem falhar em aba anônima) ----------
  function load(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }
  function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }
  function drop(key) { try { localStorage.removeItem(key); } catch (e) {} }

  var params = new URLSearchParams(location.search);

  // ---------- Tráfego interno ----------
  // ?interno=1 desliga todo o rastreamento neste navegador (equipe e cliente olhando a página). ?interno=0 religa.
  if (params.get('interno') === '1') save('as_interno', true);
  if (params.get('interno') === '0') drop('as_interno');
  // A LP também fica muda quando o voltar.js já está levando a pessoa ao downsell (volta do checkout
  // com a página recarregada): sem isso, PageView e ViewContent contariam duas vezes.
  if (load('as_interno') || document.documentElement.classList.contains('as-saindo')) {
    var noop = function () {};
    window.track = noop;
    // captura.js ainda envia o lead para a planilha (marcado como interno), sem eventos.
    window.asTracking = { interno: true, capture: noop, metaTrack: noop, reachStage: noop, origem: {}, eventId: function (n) { return n; }, pixels: [], product: {}, productParams: {} };
    return;
  }

  // ---------- Meta Pixel ----------
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  CONFIG.metaPixels.forEach(function (id) {
    fbq('set', 'autoConfig', false, id); // sem eventos automáticos (SubscribedButtonClick etc.)
    fbq('init', id);
  });

  // ---------- Microsoft Clarity ----------
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", CONFIG.clarityId);

  // ---------- PostHog ----------
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p=null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="Zc Kc Xc Yc ih init Rh Ah Ih Eh Lh zu Ph Nh $h Uh Wh Vh Gh Qh Zh capture getExtension Fh dr Yh calculateEventProperties Kh register register_once register_for_session unregister unregister_for_session sd Th td getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys onActiveMatchingSurveysChanged renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync rd identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset od shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty ed Bh createPersonProfile setInternalOrTestUser nd oh sh opt_in_capturing opt_out_capturing rh has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing qh debug Hu Os getPageViewId captureTraceFeedback captureTraceMetric wh".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init(CONFIG.posthog.key, {
    api_host: CONFIG.posthog.host,
    defaults: '2026-05-30',
    person_profiles: 'identified_only',
    // Plano grátis = 1 milhão de eventos/mês. Cliques, heatmap, rage/dead clicks, gravações e
    // performance ficam no Clarity (ilimitado); o PostHog recebe só os eventos lp_* e pageview/pageleave.
    disable_session_recording: true,
    autocapture: false,
    rageclick: false,
    capture_heatmaps: false,
    capture_dead_clicks: false,
    capture_performance: false,
    loaded: function (ph) {
      // Mesmo visitante nas duas ferramentas: no Clarity, filtre "Custom user ID" pelo distinct_id do PostHog.
      clarity('identify', ph.get_distinct_id(), ph.get_session_id());
    }
  });

  // ---------- Origem do visitante ----------
  // Último toque com UTM/fbclid fica guardado 7 dias (como a UTMify) e vai em TODO evento do PostHog
  // e como tag no Clarity. O anúncio Meta manda "nome|id" em utm_campaign/medium/content: separamos os dois.
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  function splitNameId(value) {
    if (!value) return [null, null];
    var i = value.lastIndexOf('|');
    return i === -1 ? [value, null] : [value.slice(0, i), value.slice(i + 1)];
  }

  function channel(source, hasFbclid, referrer) {
    var s = (source || '').toLowerCase();
    if (s) {
      if (/^teste/.test(s)) return 'teste';
      if (/^(fb|facebook|meta)$/.test(s)) return 'meta_ads';
      if (/^(ig|instagram)$/.test(s)) return 'instagram';
      if (/^(whatsapp|wpp|zap)$/.test(s)) return 'whatsapp';
      if (/^(email|e-mail)$/.test(s)) return 'email';
      return s;
    }
    if (hasFbclid) return 'meta_sem_utm';           // anúncio sem parâmetros de URL ou link orgânico do FB/IG
    if (/google\.|bing\.|yahoo\.|duckduckgo\./.test(referrer)) return 'busca_organica';
    if (/instagram\.|facebook\.|fb\.|tiktok\.|youtube\.|linkedin\./.test(referrer)) return 'social_organico';
    if (referrer) return 'referencia';
    return 'direto';
  }

  function readAttribution() {
    var hasUtm = UTM_KEYS.some(function (k) { return params.get(k); });
    var hasFbclid = !!params.get('fbclid');
    // Voltar do checkout ou recarregar a página não é uma nova origem.
    var referrer = /amarsaber(store)?\.com\.br|localhost/.test(document.referrer) ? '' : document.referrer;
    var stored = load('as_origem');
    var fresh = stored && Date.now() - stored.salvo_em < CONFIG.attributionDays * 864e5;

    if (!hasUtm && !hasFbclid && !referrer && fresh) { delete stored.salvo_em; return stored; }

    var a = {};
    UTM_KEYS.forEach(function (k) { a[k] = params.get(k); });
    var campaign = splitNameId(a.utm_campaign), adset = splitNameId(a.utm_medium), ad = splitNameId(a.utm_content);
    a.campanha = campaign[0]; a.campanha_id = campaign[1];
    a.conjunto = adset[0]; a.conjunto_id = adset[1];
    a.anuncio = ad[0]; a.anuncio_id = ad[1];
    a.posicionamento = a.utm_term;
    a.tem_fbclid = hasFbclid;
    a.canal = channel(a.utm_source, hasFbclid, referrer);

    // Visita direta não apaga uma origem paga recente (último toque não direto).
    if (a.canal === 'direto' && fresh) { delete stored.salvo_em; return stored; }
    if (a.canal !== 'direto') save('as_origem', Object.assign({ salvo_em: Date.now() }, a));
    return a;
  }

  var origem = readAttribution();
  Object.keys(origem).forEach(function (k) {
    if (origem[k] !== null) return;
    delete origem[k];
    posthog.unregister(k); // não herda campo de uma origem anterior
  });
  posthog.register(origem);
  Object.keys(origem).forEach(function (k) { clarity('set', k, String(origem[k])); });

  // ---------- Envio ----------
  var startedAt = Date.now();
  function secondsOnPage() { return Math.round((Date.now() - startedAt) / 1000); }

  function eventId(name) {
    return name + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  // Meta: eventID em todo evento (deduplica se o mesmo evento também chegar por servidor).
  // id: passe o mesmo event_id enviado à API de Conversões (Lead da captura).
  function metaTrack(name, params, custom, id) {
    fbq(custom ? 'trackCustom' : 'track', name, params || {}, { eventID: id || eventId(name) });
  }

  // PostHog + Clarity. etapa = categoria do evento no funil (engajamento → intencao).
  function capture(name, props, options) {
    posthog.capture(name, props || {}, options);
    clarity('event', name);
  }
  window.track = capture;

  // Tag "etapa_max" no Clarity: filtra gravações por até onde a pessoa chegou.
  // Cada página pode ter as suas etapas em <body data-etapas="a,b,c">; sem o atributo, as da LP.
  var STAGES = (document.body.dataset.etapas || 'engajou,viu_oferta,clicou_checkout').split(',');
  var stageReached = -1;
  function reachStage(stage) {
    var i = STAGES.indexOf(stage);
    if (i <= stageReached) return;
    stageReached = i;
    clarity('set', 'etapa_max', stage);
  }

  // Produto da página: o da LP (CONFIG) ou o declarado no <body> (ex.: downsell em /oferta-especial/).
  var page = document.body.dataset;
  var product = {
    id: page.produtoId || CONFIG.product.id,
    name: page.produtoNome || CONFIG.product.name,
    value: page.produtoValor ? Number(page.produtoValor) : CONFIG.product.value,
    currency: CONFIG.product.currency
  };
  var productParams = {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: product.value,
    currency: product.currency
  };

  // ---------- PageView ----------
  metaTrack('PageView');

  // ---------- Seções vistas (onde as pessoas param de ler) ----------
  // Conta quando a seção fica 1 s no meio da tela (funciona com seção de qualquer altura e
  // ignora as que só passaram na rolagem automática dos CTAs).
  var sections = document.querySelectorAll('body > section');
  if ('IntersectionObserver' in window) {
    var dwellTimers = new Map();
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var section = entry.target;
        if (!entry.isIntersecting) { clearTimeout(dwellTimers.get(section)); return; }
        dwellTimers.set(section, setTimeout(function () {
          sectionObserver.unobserve(section);
          capture('lp_secao_vista', {
            secao: section.dataset.secao || section.className.split(' ')[0],
            ordem: Array.prototype.indexOf.call(sections, section) + 1,
            etapa: 'engajamento'
          });
        }, 1000));
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  // ---------- ViewContent: seção de oferta apareceu na tela ----------
  var offer = document.querySelector(CONFIG.offerSection);
  if (offer && 'IntersectionObserver' in window) {
    var offerObserver = new IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
      offerObserver.disconnect();
      metaTrack('ViewContent', productParams);
      capture('lp_oferta_vista', { valor: product.value, segundos_ate_oferta: secondsOnPage(), etapa: 'intencao' });
      reachStage('viu_oferta');
      clarity('upgrade', 'viu_oferta'); // garante a gravação dessa sessão mesmo com amostragem
    }, { threshold: 0.3 });
    offerObserver.observe(offer);
  }

  // ---------- Visita engajada: 30 s com a aba visível ----------
  var visibleSeconds = 0;
  var engagedTimer = setInterval(function () {
    if (document.visibilityState !== 'visible') return;
    if (++visibleSeconds < CONFIG.engagedSeconds) return;
    clearInterval(engagedTimer);
    metaTrack('EngagedVisit', {}, true);
    capture('lp_engajado', { segundos: CONFIG.engagedSeconds, etapa: 'engajamento' });
    reachStage('engajou');
  }, 1000);

  // ---------- Vídeo: play e quanto foi assistido ----------
  // main.js troca a capa pelo iframe (com enablejsapi=1) antes deste clique chegar aqui.
  // A API do YouTube só conecta num iframe que ainda não terminou de carregar, então ela é
  // pré-carregada quando o vídeo chega perto da tela.
  var youTubeApi = null;
  function loadYouTubeApi() {
    if (youTubeApi) return youTubeApi;
    youTubeApi = new Promise(function (resolve) {
      if (window.YT && YT.Player) return resolve();
      var previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () { if (previous) previous(); resolve(); };
      var script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    });
    return youTubeApi;
  }
  var videoBox = document.querySelector('.video[data-youtube]');
  if (videoBox && 'IntersectionObserver' in window) {
    var videoObserver = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      videoObserver.disconnect();
      loadYouTubeApi();
    }, { rootMargin: '800px 0px' });
    videoObserver.observe(videoBox);
  }

  function watchVideo(iframe, reload) {
    var done = {};
    function poll(player) {
      var duration = player.getDuration && player.getDuration();
      if (!duration) return;
      var percent = player.getCurrentTime() / duration * 100;
      CONFIG.videoMarks.forEach(function (mark) {
        if (done[mark] || percent < mark) return;
        done[mark] = true;
        metaTrack('VideoProgress', { percentual: mark }, true);
        capture('lp_video_progresso', { percentual: mark, etapa: 'engajamento' });
      });
    }
    var player = new YT.Player(iframe, {
      events: {
        onReady: function () {
          var timer = setInterval(function () {
            poll(player);
            if (CONFIG.videoMarks.every(function (m) { return done[m]; })) clearInterval(timer);
          }, 1000);
        }
      }
    });
    // API chegou depois do iframe carregar: recarrega o iframe para a conexão acontecer.
    if (reload) iframe.src = iframe.src;
  }

  // ---------- Cliques: checkout, WhatsApp, CTAs que levam à oferta, vídeo ----------
  document.addEventListener('click', function (e) {
    var cover = e.target.closest('.video__cover');
    if (cover) {
      metaTrack('VideoPlay', {}, true);
      capture('lp_video_play', { etapa: 'engajamento' });
      var iframe = document.querySelector('.video[data-youtube] iframe');
      var apiWasReady = !!(window.YT && YT.Player);
      if (iframe) loadYouTubeApi().then(function () { watchVideo(iframe, !apiWasReady); });
      return;
    }

    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href') || '';

    if (href.indexOf(CONFIG.checkoutHost) !== -1) {
      // Nomes por página: na LP ClickCheckout / lp_checkout; no downsell, os do <body>.
      var checkoutStage = page.etapaCheckout || 'clicou_checkout';
      metaTrack(page.eventoCheckout || 'ClickCheckout', productParams, true);
      // send_instantly: a página vai sair para a Yampi, não espera o lote.
      capture(page.eventoCheckoutPh || 'lp_checkout', { valor: product.value, segundos_na_pagina: secondsOnPage(), etapa: 'intencao' }, { send_instantly: true });
      reachStage(checkoutStage);
      clarity('upgrade', checkoutStage);
    } else if (link.hasAttribute('data-grupo')) {
      // Botão do grupo VIP (página de obrigado da captura).
      metaTrack('GroupClick', {}, true);
      capture('lp_grupo_clique', { etapa: 'conversao' }, { send_instantly: true });
      reachStage('clicou_grupo');
      clarity('upgrade', 'clicou_grupo');
    } else if (href.indexOf('whatsapp') !== -1) {
      metaTrack('Contact');
      capture('whatsapp_clique', { etapa: 'intencao' }, { send_instantly: true });
    } else if (link.dataset.cta) {
      capture('lp_cta_clique', { posicao: link.dataset.cta, etapa: 'intencao' });
    }
  });

  // Usado por captura.js (formulário de lead).
  window.asTracking = {
    capture: capture, metaTrack: metaTrack, reachStage: reachStage,
    origem: origem, eventId: eventId, pixels: CONFIG.metaPixels,
    product: product, productParams: productParams
  };

  // ---------- FAQ aberto ----------
  document.querySelectorAll('.faq details').forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) capture('lp_faq_aberto', { pergunta: item.querySelector('summary').textContent.trim(), etapa: 'engajamento' });
    });
  });
})();
