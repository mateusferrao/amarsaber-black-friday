// Rastreamento da LP: Meta Pixel (só navegador), PostHog (eventos/funil) e Microsoft Clarity (gravações/heatmap).
// Para trocar IDs ou dados da oferta, edite apenas CONFIG.
// Eventos do checkout (InitiateCheckout, AddPaymentInfo, Purchase) NÃO são enviados aqui: a Yampi envia
// (navegador + API de Conversões). Por isso o clique pro checkout é o evento personalizado ClickCheckout.
(function () {
  'use strict';

  var CONFIG = {
    metaPixels: ['1393732806282634', '1701576724241276'],
    posthog: { key: 'phc_w7v3y2rN3kkwfEbV8n7wVzoAzYEU7pNMBJWGpvWTaB9R', host: 'https://us.i.posthog.com' },
    clarityId: 'z2wy9ky01r',
    product: { id: 'guia-protocolos', name: 'Guia de Protocolos Clínicos', value: 497, currency: 'BRL' },
    checkoutHost: 'seguro.amarsaberstore.com.br',
    offerSection: '#secao-oferta'
  };

  // ---------- Meta Pixel ----------
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  // Sem isso o pixel manda um PageView extra a cada clique nos CTAs (a âncora #secao-oferta muda a URL).
  fbq.disablePushState = true;
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
    disable_session_recording: true // gravações ficam no Clarity
  });

  // ---------- Helpers ----------
  function eventId(name) {
    return name + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  // Meta: eventID em todo evento, pronto para deduplicar se um dia houver envio por servidor.
  function metaTrack(name, params, custom) {
    fbq(custom ? 'trackCustom' : 'track', name, params || {}, { eventID: eventId(name) });
  }

  // PostHog + Clarity
  function capture(name, props) {
    posthog.capture(name, props || {});
    clarity('event', name);
  }
  window.track = capture;

  var productParams = {
    content_name: CONFIG.product.name,
    content_ids: [CONFIG.product.id],
    content_type: 'product',
    value: CONFIG.product.value,
    currency: CONFIG.product.currency
  };

  // ---------- PageView ----------
  metaTrack('PageView');

  // UTMs da URL viram tags no Clarity (filtrar gravações por campanha).
  var params = new URLSearchParams(location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
    var value = params.get(key);
    if (value) clarity('set', key, value);
  });

  // ---------- ViewContent: seção de oferta apareceu na tela ----------
  var offer = document.querySelector(CONFIG.offerSection);
  if (offer && 'IntersectionObserver' in window) {
    var offerObserver = new IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
      offerObserver.disconnect();
      metaTrack('ViewContent', productParams);
      capture('offer_viewed', { value: CONFIG.product.value });
    }, { threshold: 0.3 });
    offerObserver.observe(offer);
  }

  // ---------- Cliques: checkout, WhatsApp, CTAs que levam à oferta ----------
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href') || '';

    if (href.indexOf(CONFIG.checkoutHost) !== -1) {
      metaTrack('ClickCheckout', productParams, true);
      capture('checkout_click', { value: CONFIG.product.value });
    } else if (href.indexOf('whatsapp') !== -1) {
      metaTrack('Contact');
      capture('whatsapp_click');
    } else if (link.dataset.cta) {
      capture('cta_click', { posicao: link.dataset.cta });
    }
  });

  // ---------- Profundidade de scroll (25/50/75/100%) ----------
  var marks = [25, 50, 75, 100];
  var reached = {};
  var ticking = false;
  function checkScroll() {
    ticking = false;
    var doc = document.documentElement;
    var percent = (window.scrollY + window.innerHeight) / doc.scrollHeight * 100;
    marks.forEach(function (mark) {
      if (reached[mark] || percent < (mark === 100 ? 98 : mark)) return;
      reached[mark] = true;
      capture('scroll_depth', { percent: mark });
    });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(checkScroll); }
  }, { passive: true });

  // ---------- FAQ aberto ----------
  document.querySelectorAll('.faq details').forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) capture('faq_open', { pergunta: item.querySelector('summary').textContent.trim() });
    });
  });
})();
