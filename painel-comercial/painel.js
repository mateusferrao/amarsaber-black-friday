/* Painel comercial da Black (black.amarsaber.com.br/painel-comercial).
   Lê e grava pelo fluxo n8n "AS · Painel comercial (API)": entrar, lista, salvar e enviar.
   O fluxo confere PIN e regras de novo; aqui as regras só servem para explicar à vendedora. */
(function () {
  'use strict';
  var API = 'https://n8n.automato.pro/webhook/as-painel-comercial';
  var KOMMO_LEAD = 'https://amarsaber.kommo.com/leads/detail/';
  var POR_PAGINA = 40;

  // ---------- Textos dos templates, como estão cadastrados no Kommo (10/11) ----------
  var TEMPLATES = {
    vd_geral: { nome: 'Mensagem geral', quando: 'serve para qualquer pessoa',
      texto: 'Oi, {nome}! Aqui é a {vend}, da equipe da Dra. Maria Paula, da Amar Saber.\n\nEstou atendendo no individual algumas pessoas da Black do Guia de Protocolos, com uma condição especial que só consigo passar por aqui. Posso te contar?',
      botoes: ['Pode contar', 'Tenho uma dúvida'] },
    vd_upsell: { nome: 'Comprou o Guia', quando: 'para quem comprou o Guia e ainda não tem a Formação',
      texto: 'Oi, {nome}! Aqui é a {vend}, da equipe da Dra. Maria Paula, da Amar Saber.\n\nVi que você garantiu o seu Guia na Black, parabéns! Separei um bônus especial só para quem já comprou, e prefiro te explicar por aqui. Posso?',
      botoes: ['Pode explicar', 'Tenho uma dúvida'] },
    vd_falta_guia: { nome: 'Falta o Guia', quando: 'para quem tem o curso e ainda não tem o Guia',
      texto: 'Oi, {nome}! Aqui é a {vend}, da equipe da Dra. Maria Paula, da Amar Saber. Você já tem o curso Atendimento Extraordinário e a comunidade. Vi que você está buscando evoluir profissionalmente, então queria te presentear com um bônus exclusivo. Posso te passar a condição?',
      botoes: ['Pode passar', 'Tenho uma dúvida'] },
    vd_pedido: { nome: 'Pedido não concluído', quando: 'para quem teve o cartão recusado, deixou o Pix vencer ou abandonou o carrinho',
      texto: 'Oi, {nome}! Aqui é a {vend}, da equipe da Dra. Maria Paula, da Amar Saber.\n\nVi que o seu pedido da Black não foi concluído. Aconteceu alguma coisa? Me conta, porque consigo te ajudar com uma condição especial por aqui antes do lote esgotar.',
      botoes: ['Me ajuda', 'Tenho uma dúvida'] },
    vd_grupo: { nome: 'Grupo', quando: 'para quem está, saiu ou nunca entrou no Grupo VIP',
      texto: 'Oi {nome}! Vi que você está acompanhando a Black do Guia de Protocolos. Estou atendendo pessoas selecionadas no individual, com uma condição especial que não está no site. Posso te contar?',
      botoes: ['Me conta', 'Tenho uma dúvida'] },
    vd_pesquisa: { nome: 'Pesquisa da live', quando: 'para quem respondeu a pesquisa da live',
      texto: 'Oi {nome}! Li a sua resposta na pesquisa da live, obrigada! Quero entender o seu momento e te mostrar uma condição especial que só passo por aqui. Posso te fazer uma pergunta?',
      botoes: ['Pode perguntar', 'Tenho uma dúvida'] },
    vd_retorno: { nome: 'Retorno', quando: 'segunda mensagem, para quem não respondeu a primeira',
      texto: 'Oi, {nome}, é a {vend} de novo Te chamei esses dias e não quis deixar passar: a condição especial que comentei está esgotando. Ainda faz sentido você aproveitar essa oportunidade?',
      botoes: ['Faz sim', 'Tenho uma dúvida'] }
  };
  // Mesma regra do fluxo n8n (nó "Preparar envios")
  var POR_MOTIVO = {
    'Comprou o Guia, falta a Formação': 'vd_upsell',
    'Comprou o downsell, falta o Guia': 'vd_falta_guia',
    'Cartão recusado': 'vd_pedido', 'Pix não pago': 'vd_pedido', 'Carrinho abandonado': 'vd_pedido',
    'Pix aguardando pagamento': 'vd_pedido', 'Boleto aguardando pagamento': 'vd_pedido', 'Tentou o downsell e não pagou': 'vd_pedido',
    'Respondeu a pesquisa da live': 'vd_pesquisa',
    'Está no grupo, não comprou': 'vd_grupo', 'Saiu do grupo, não comprou': 'vd_grupo',
    'Cadastrou e nunca entrou no grupo': 'vd_grupo', 'Mensagem automática não entregue': 'vd_grupo'
  };
  var ORDEM_MOTIVO = ['Comprou o Guia, falta a Formação', 'Comprou o downsell, falta o Guia', 'Comprou a Formação, falta o Guia',
    'Cartão recusado', 'Pix não pago', 'Carrinho abandonado', 'Pix aguardando pagamento', 'Boleto aguardando pagamento',
    'Tentou o downsell e não pagou', 'Mensagem automática não entregue', 'Respondeu a mensagem automática',
    'Respondeu a pesquisa da live', 'Está no grupo, não comprou', 'Saiu do grupo, não comprou', 'Cadastrou e nunca entrou no grupo'];
  var STATUS = ['', 'Chamei', 'Sem resposta', 'Respondeu', 'Link enviado', 'Negociando', 'Comprou', 'Não quer', 'Número inválido'];
  var OBJECAO = ['', 'Preço', 'Parcelamento', 'Prazo de entrega', 'Já tenho edição anterior', 'Não é o momento', 'Vai pensar', 'Serve para mim?', 'Sem objeção'];

  // ---------- Links de cada vendedora (VENDEDORES.md) ----------
  var SLUG = { Heid: 'heid', Ana: 'ana', Belle: 'belle' };
  var B = 'https://seguro.amarsaberstore.com.br/r/';
  function utm(s, t) { return 'utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=' + s + '&utm_term=' + t; }
  var PRODUTOS = {
    front: { nome: 'Guia + curso + comunidade · R$ 497', url: function (s) { return B + 'LUIR27AS3L?promocode=BLACKAMARSABER&' + utm(s, 'front'); } },
    esteira: { nome: 'Esteira completa (Guia + Formação) · R$ 794', url: function (s) { return B + 'MOXSHIVAJY?promocode=BLACKESTEIRA&' + utm(s, 'esteira'); } },
    upsell: { nome: 'Formação para quem já comprou · R$ 297', url: function (s) { return B + 'OXZJFHDY7F?' + utm(s, 'upsell'); } },
    downsell: { nome: 'Só curso + comunidade · R$ 187', url: function (s) { return B + '5PS9VFMQHI?promocode=BLACKAMARSABERDS&' + utm(s, 'downsell'); } }
  };
  function produtoIndicado(mandar) {
    if (/^Upsell/.test(mandar)) return 'upsell';
    if (/^Downsell/.test(mandar)) return 'downsell';
    return 'front';
  }

  // ---------- Estado ----------
  var sessao = null;      // { pin, vendedora }
  var dados = [];         // linhas da aba
  var modoTeste = false;
  var aba = 'chamar';
  var mostrando = POR_PAGINA;
  var $ = function (id) { return document.getElementById(id); };

  function guardar(s) { try { if (s) sessionStorage.setItem('as_painel', JSON.stringify(s)); else sessionStorage.removeItem('as_painel'); } catch (e) {} }
  function lerGuardado() { try { return JSON.parse(sessionStorage.getItem('as_painel') || 'null'); } catch (e) { return null; } }

  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function primeiroNome(n) { var p = String(n || '').trim().split(/\s+/)[0] || ''; return /[A-Za-zÀ-ÿ]{2,}/.test(p) ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : 'tudo bem'; }
  function telefone(t) { var d = String(t || '').replace(/\D/g, ''); if (d.length === 13 && d.indexOf('55') === 0) return '(' + d.slice(2, 4) + ') ' + d.slice(4, 9) + '-' + d.slice(9); return d; }
  function quando(iso) { var d = new Date(iso); if (isNaN(d)) return ''; return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }); }
  function dataBR(v) { var m = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(v || ''); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }

  function aviso(msg, erro, ms) {
    var a = $('aviso'); a.textContent = msg; a.classList.toggle('erro-aviso', !!erro); a.classList.add('mostrar');
    clearTimeout(aviso.t); aviso.t = setTimeout(function () { a.classList.remove('mostrar'); }, ms || (erro ? 7000 : 4000));
  }

  function chamar(corpo) {
    corpo.pin = sessao ? sessao.pin : corpo.pin;
    if (sessao && !corpo.vendedora) corpo.vendedora = sessao.vendedora;
    var ocupado = 'o sistema está fora do ar ou ocupado agora. Espere 1 minuto e tente de novo (se repetir, avise a gestão)';
    return fetch(API, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(corpo) })
      .catch(function () { throw new Error(ocupado); })
      .then(function (r) { if (!r.ok) throw new Error(ocupado + ' · erro ' + r.status); return r.json(); });
  }

  // ---------- Entrar ----------
  function entrar(ev) {
    ev.preventDefault();
    var pin = $('pin').value.trim();
    var v = document.querySelector('input[name=vendedora]:checked');
    $('erro-entrar').textContent = '';
    if (!pin) { $('erro-entrar').textContent = 'Digite o PIN.'; return; }
    if (!v) { $('erro-entrar').textContent = 'Escolha quem é você.'; return; }
    var b = $('botao-entrar'); b.disabled = true; b.textContent = 'Entrando…';
    chamar({ pin: pin, acao: 'entrar' }).then(function (r) {
      if (!r.ok) throw new Error(r.erro === 'PIN incorreto' ? 'PIN incorreto. Confira com a gestão.' : (r.erro || 'Não deu certo.'));
      sessao = { pin: pin, vendedora: v.value }; guardar(sessao); abrirPainel();
    }).catch(function (e) { $('erro-entrar').textContent = e.message || 'Sem conexão. Tente de novo.'; })
      .then(function () { b.disabled = false; b.textContent = 'Entrar'; });
  }

  function abrirPainel() {
    $('tela-entrar').hidden = true; $('tela-painel').hidden = false;
    $('eu').textContent = sessao.vendedora;
    try { if (!localStorage.getItem('as_painel_ajuda_lida')) { $('ajuda').open = true; localStorage.setItem('as_painel_ajuda_lida', '1'); } } catch (e) { $('ajuda').open = true; }
    carregar();
  }

  function sair() { sessao = null; guardar(null); dados = []; $('tela-painel').hidden = true; $('tela-entrar').hidden = false; $('pin').value = ''; }

  // ---------- Lista ----------
  function carregar() {
    $('atualizado').textContent = 'carregando a lista…';
    $('lista').innerHTML = '<p class="vazio">Carregando…</p>';
    chamar({ acao: 'lista' }).then(function (r) {
      if (!r.ok) { if (r.erro === 'PIN incorreto') { sair(); return; } throw new Error(r.erro || 'erro'); }
      dados = r.linhas || []; modoTeste = !!r.modo_teste;
      $('aviso-teste').hidden = !modoTeste;
      $('atualizado').textContent = 'Lista de ' + r.atualizado + ' (toque em Atualizar para ver mudanças)';
      mostrando = POR_PAGINA; desenhar();
    }).catch(function () {
      $('atualizado').textContent = 'não carregou';
      $('lista').innerHTML = '<p class="vazio">Não consegui carregar a lista. Confira a internet e toque em "Atualizar lista".</p>';
    });
  }

  var EXPLICA = {
    chamar: 'Pessoas liberadas e sem dona, das mais quentes para as mais frias. Toque em "Enviar mensagem": a pessoa passa a ser sua.',
    kommo: 'Responderam uma mensagem automática e a conversa já está aberta no Kommo. Não precisa de template: assuma e continue a conversa por lá.',
    meus: 'As pessoas que são suas. Primeiro quem tem retorno marcado para hoje ou atrasado, depois quem respondeu.',
    aguardar: 'Ainda recebendo as mensagens automáticas. Não chame antes da data de "Liberado". Quando liberar, a pessoa passa para "Chamar agora".',
    busca: 'Resultado da busca em todas as pessoas da lista.'
  };
  function prio(l) { var m = /^(\d)/.exec(l.Prioridade || ''); return m ? +m[1] : 9; }
  function ordemMotivo(l) { var i = ORDEM_MOTIVO.indexOf(l.Motivo); return i < 0 ? 99 : i; }
  function filtrarAba(a) {
    var eu = sessao.vendedora;
    if (a === 'chamar') return dados.filter(function (l) { return l['Situação'].indexOf('🟢') === 0 && !l.Vendedora; })
      .sort(function (x, y) { return prio(x) - prio(y) || ordemMotivo(x) - ordemMotivo(y); });
    if (a === 'kommo') return dados.filter(function (l) { return l['Situação'].indexOf('💬') === 0 && !l.Vendedora; })
      .sort(function (x, y) { return prio(x) - prio(y); });
    if (a === 'meus') {
      var hoje = new Date(); hoje.setHours(23, 59, 59);
      return dados.filter(function (l) { return l.Vendedora === eu; }).sort(function (x, y) {
        var dx = dataBR(x['Retornar em']), dy = dataBR(y['Retornar em']);
        var ux = dx && dx <= hoje ? 0 : (x.Resposta ? 1 : 2), uy = dy && dy <= hoje ? 0 : (y.Resposta ? 1 : 2);
        return ux - uy || (dx ? dx.getTime() : 9e15) - (dy ? dy.getTime() : 9e15) || String(y.ultimo_envio).localeCompare(String(x.ultimo_envio));
      });
    }
    return dados.filter(function (l) { return l['Situação'].indexOf('⏳') === 0; })
      .sort(function (x, y) { return (dataBR(x['Liberado em']) || 0) - (dataBR(y['Liberado em']) || 0); });
  }

  function desenhar() {
    ['chamar', 'kommo', 'meus', 'aguardar'].forEach(function (a) {
      var el = document.querySelector('[data-conta="' + a + '"]'); if (el) el.textContent = filtrarAba(a).length;
    });
    var termo = $('busca').value.trim().toLowerCase(), digitos = termo.replace(/\D/g, '');
    var lista;
    if (termo) {
      lista = dados.filter(function (l) {
        return l.Nome.toLowerCase().indexOf(termo) >= 0 || (digitos.length >= 4 && String(l.WhatsApp).indexOf(digitos) >= 0);
      });
      $('explica-aba').textContent = EXPLICA.busca;
    } else {
      lista = filtrarAba(aba);
      $('explica-aba').textContent = EXPLICA[aba];
    }
    // Filtro por motivo (opções da aba atual)
    var sel = $('filtro-motivo'), atual = sel.value, motivos = {};
    lista.forEach(function (l) { if (l.Motivo) motivos[l.Motivo] = (motivos[l.Motivo] || 0) + 1; });
    sel.innerHTML = '<option value="">Todos os motivos</option>' + Object.keys(motivos).sort(function (a, b) { return ORDEM_MOTIVO.indexOf(a) - ORDEM_MOTIVO.indexOf(b); })
      .map(function (m) { return '<option value="' + esc(m) + '"' + (m === atual ? ' selected' : '') + '>' + esc(m) + ' (' + motivos[m] + ')</option>'; }).join('');
    if (atual && motivos[atual]) lista = lista.filter(function (l) { return l.Motivo === atual; });

    var corte = lista.slice(0, mostrando);
    $('lista').innerHTML = corte.length ? corte.map(cartao).join('') : '<p class="vazio">' + (termo ? 'Ninguém encontrado.' : 'Ninguém aqui agora.') + '</p>';
    $('mais').hidden = lista.length <= mostrando;
    $('mais').textContent = 'Mostrar mais (' + (lista.length - mostrando) + ' restantes)';
  }

  // ---------- Regras (só para explicar; o fluxo confere de novo) ----------
  function templateDe(l, opcao) {
    if (/^Enviar:/.test(opcao)) return opcao.slice(7);
    if (opcao === 'Enviar retorno') return 'vd_retorno';
    if (opcao === 'Enviar genérico') return 'vd_geral';
    return POR_MOTIVO[l.Motivo] || 'vd_geral';
  }
  function bloqueioEnvio(l) {
    var eu = sessao.vendedora, s = l['Situação'];
    if (l.Vendedora && l.Vendedora !== eu) return 'Esta pessoa é da ' + l.Vendedora + '.';
    if (s.indexOf('🟢') !== 0) {
      if (s.indexOf('💬') === 0) return 'A conversa já está aberta no Kommo: continue por lá, sem template.';
      if (s.indexOf('⏳') === 0) return 'Ainda na sequência automática. Liberado em ' + (l['Liberado em'] || '?') + '.';
      return 'Não chamar (' + s.replace(/^\S+\s/, '') + ').';
    }
    if (l['Status do contato'] === 'Não quer') return 'Marcada como "Não quer": não recebe mais mensagem.';
    if (l['Status do contato'] === 'Número inválido') return 'Número marcado como inválido.';
    if (!modoTeste) {
      if (l.envios >= 2) return 'Já recebeu as 2 mensagens do comercial. Continue pelo Kommo se ela responder.';
      if (l.ultimo_envio) {
        var libera = new Date(new Date(l.ultimo_envio).getTime() + 48 * 3600e3);
        if (libera > new Date()) return 'Próxima mensagem liberada em ' + quando(libera.toISOString()) + ' (48 h depois da última).';
      }
    }
    return '';
  }

  function selo(l) {
    var p = prio(l);
    if (p === 1) return '<span class="selo selo--quente">🔥 quente</span>';
    if (p === 2) return '<span class="selo selo--morno">morno</span>';
    if (p === 3) return '<span class="selo selo--frio">frio</span>';
    return '';
  }
  function linkKommo(l) { return l.lead_comercial ? KOMMO_LEAD + l.lead_comercial : (/^https?:\/\//.test(l.Kommo) ? l.Kommo : ''); }

  function cartao(l) {
    var eu = sessao.vendedora, minha = l.Vendedora === eu, s = l['Situação'];
    var h = '<article class="pessoa" data-chave="' + esc(l.Chave) + '">';
    h += '<div class="pessoa__cab"><div><p class="pessoa__nome">' + esc(l.Nome || 'Sem nome') + '</p><span class="pessoa__tel">' + esc(telefone(l.WhatsApp)) + (l['Cidade/UF'] ? ' · ' + esc(l['Cidade/UF']) : '') + '</span></div>' + selo(l) + '</div>';
    var t = templateDe(l, 'Enviar');
    h += '<p class="motivo">' + esc(l.Motivo || '—') + (l['O que já tem'] ? '<small>' + esc(l['O que já tem']) + '</small>' : '') + '</p>';

    // Estado da pessoa, em uma frase
    if (l.Resposta) h += '<p class="estado estado--azul"><b>Respondeu:</b> ' + esc(l.Resposta) + '. Continue a conversa no Kommo.</p>';
    else if (/^não entregue/.test(l.Template)) h += '<p class="estado estado--vermelho"><b>A última mensagem não foi entregue</b> (o WhatsApp recusou: número sem WhatsApp, bloqueio ou limite da Meta para esta pessoa). Não insista hoje; se ela tiver conversa aberta, siga pelo Kommo.</p>';
    else if (l.Template && !/^não enviado/.test(l.Template)) h += '<p class="estado estado--ok"><b>Mensagem enviada:</b> ' + esc(l.Template) + '. Aguardando resposta.</p>';
    if (s.indexOf('💬') === 0) h += '<p class="estado estado--azul">Respondeu uma mensagem automática. A conversa está aberta no Kommo.</p>';
    else if (s.indexOf('⏳') === 0) h += '<p class="estado estado--amarelo">Recebendo mensagens automáticas. <b>Liberado em ' + esc(l['Liberado em'] || '?') + '</b>.</p>';
    else if (s.indexOf('⛔') === 0 || s.indexOf('✅') === 0) h += '<p class="estado estado--vermelho">' + esc(s) + ': não chamar.</p>';
    if (l.Vendedora && !minha) h += '<p class="estado estado--amarelo">Esta pessoa é da <b>' + esc(l.Vendedora) + '</b>.</p>';
    else if (!l.Vendedora && l['Link da vendedora'] && l['Link da vendedora'] !== eu) h += '<p class="info">Já usou o link da <b>' + esc(l['Link da vendedora']) + '</b>: combine com ela antes de chamar.</p>';

    // Ações
    var bloqueio = bloqueioEnvio(l), kommo = linkKommo(l);
    h += '<div class="acoes">';
    if (s.indexOf('🟢') === 0 && (!l.Vendedora || minha)) {
      // A mensagem indicada fica em destaque; "Enviar outra mensagem" abre as 7 para a vendedora escolher
      if (!l.envios) h += '<button type="button" class="botao botao--rosa" data-acao="enviar" data-opcao="Enviar"' + (bloqueio ? ' disabled' : '') + '>✉️ Enviar mensagem · ' + esc(TEMPLATES[t].nome) + '</button>';
      else h += '<button type="button" class="botao botao--rosa" data-acao="enviar" data-opcao="Enviar retorno"' + (bloqueio ? ' disabled' : '') + '>↩️ Enviar retorno</button>';
      h += '<button type="button" class="botao botao--claro" data-acao="escolher"' + (bloqueio ? ' disabled' : '') + '>Enviar outra mensagem</button>';
    }
    if (kommo && (minha || (!l.Vendedora && s.indexOf('💬') === 0))) h += '<a class="botao botao--claro" href="' + esc(kommo) + '" target="_blank" rel="noopener">Abrir no Kommo</a>';
    if (minha || !l.Vendedora) h += '<button type="button" class="botao botao--claro" data-acao="copiar" data-produto="' + produtoIndicado(l['Mandar o link']) + '">🔗 Copiar meu link</button>';
    if (!l.Vendedora && s.indexOf('⛔') !== 0 && s.indexOf('✅') !== 0) h += '<button type="button" class="botao botao--claro" data-acao="assumir">Assumir esta pessoa</button>';
    if (minha) h += '<button type="button" class="botao botao--claro" data-acao="soltar">Soltar</button>';
    if (bloqueio && s.indexOf('🟢') === 0) h += '<p class="bloqueio">⚠️ ' + esc(bloqueio) + '</p>';
    h += '</div>';

    // Anotações (só quem é dona ou pessoa sem dona)
    if (minha || !l.Vendedora) {
      h += '<div class="anotar">';
      h += '<label>Status do contato<select data-campo="Status do contato">' + STATUS.map(function (o) { return '<option value="' + esc(o) + '"' + (o === l['Status do contato'] ? ' selected' : '') + '>' + (o || '—') + '</option>'; }).join('') + '</select></label>';
      h += '<label>Objeção<select data-campo="Objeção">' + OBJECAO.map(function (o) { return '<option value="' + esc(o) + '"' + (o === l['Objeção'] ? ' selected' : '') + '>' + (o || '—') + '</option>'; }).join('') + '</select></label>';
      var d = dataBR(l['Retornar em']), iso = d ? d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') : '';
      h += '<label>Retornar em<input type="date" data-campo="Retornar em" value="' + iso + '"></label>';
      h += '</div>';
    }

    // Mais informações
    var extra = [['Mandar o link', l['Mandar o link']], ['Lista', l.Lista], ['Grupo', l.Grupo], ['Automação', l['Automação']], ['Quiz', l.Quiz],
      ['Pesquisa da live', l['Pesquisa da live']], ['Cadastro', l.Cadastro], ['Mensagens do comercial', l.envios ? l.envios + ' (última ' + quando(l.ultimo_envio) + ')' : 'nenhuma']];
    h += '<details class="mais-info"><summary>Mais informações e seus links</summary><dl>';
    extra.forEach(function (e) { if (e[1]) h += '<dt>' + esc(e[0]) + '</dt><dd>' + esc(e[1]) + '</dd>'; });
    h += '<dt>Seus links</dt><dd>' + Object.keys(PRODUTOS).map(function (k) { return '<button type="button" class="link" data-acao="copiar" data-produto="' + k + '">copiar</button> ' + esc(PRODUTOS[k].nome); }).join('<br>') + '</dd>';
    h += '</dl></details>';
    return h + '</article>';
  }

  function achar(chave) { for (var i = 0; i < dados.length; i++) if (String(dados[i].Chave) === String(chave)) return dados[i]; return null; }

  // ---------- Salvar anotações ----------
  function salvar(l, campos, el) {
    var antes = {}; Object.keys(campos).forEach(function (k) { antes[k] = l[k]; });
    var donaAntes = l.Vendedora;
    Object.keys(campos).forEach(function (k) { l[k] = campos[k]; });
    if (!('Vendedora' in campos) && !l.Vendedora) l.Vendedora = sessao.vendedora;
    if (el) { el.classList.remove('salvo'); el.classList.add('salvando'); }
    return chamar({ acao: 'salvar', chave: l.Chave, campos: campos }).then(function (r) {
      if (!r.ok) throw new Error(r.erro || 'não salvou');
      if (el) { el.classList.remove('salvando'); el.classList.add('salvo'); }
      if (donaAntes !== l.Vendedora) desenhar();
      return true;
    }).catch(function (e) {
      Object.keys(antes).forEach(function (k) { l[k] = antes[k]; }); l.Vendedora = donaAntes;
      aviso('Não salvou: ' + e.message, true); desenhar(); return false;
    });
  }

  // ---------- Enviar ----------
  var pendente = null;
  function abrirEnvio(l, opcao) {
    var t = templateDe(l, opcao), tp = TEMPLATES[t];
    pendente = { l: l, opcao: opcao, t: t };
    $('m-nome').textContent = l.Nome || 'a pessoa';
    $('m-tipo').textContent = 'Mensagem "' + tp.nome + '" (' + tp.quando + '):';
    $('m-texto').textContent = tp.texto.replace(/\{nome\}/g, primeiroNome(l.Nome)).replace(/\{vend\}/g, sessao.vendedora);
    $('m-botoes').innerHTML = tp.botoes.map(function (b) { return '<span>' + esc(b) + '</span>'; }).join('');
    var m = $('modal-envio');
    if (typeof m.showModal === 'function') m.showModal();
    else if (window.confirm('Enviar a mensagem "' + tp.nome + '" para ' + (l.Nome || 'a pessoa') + '?')) enviar();
  }
  // Escolher qualquer uma das 7 mensagens (a indicada para o Motivo vem primeiro, marcada)
  var escolhendo = null;
  var ORDEM_TPL = ['vd_geral', 'vd_upsell', 'vd_falta_guia', 'vd_pedido', 'vd_grupo', 'vd_pesquisa', 'vd_retorno'];
  function abrirEscolha(l) {
    escolhendo = l;
    var indicada = l.envios ? 'vd_retorno' : templateDe(l, 'Enviar');
    var ordem = [indicada].concat(ORDEM_TPL.filter(function (k) { return k !== indicada; }));
    $('e-nome').textContent = l.Nome || 'a pessoa';
    $('e-lista').innerHTML = ordem.map(function (k) {
      var tp = TEMPLATES[k], semRetorno = k === 'vd_retorno' && !l.envios && !modoTeste;
      var texto = tp.texto.replace(/\{nome\}/g, primeiroNome(l.Nome)).replace(/\{vend\}/g, sessao.vendedora);
      return '<button type="button" class="opcao" data-tpl="' + k + '"' + (semRetorno ? ' disabled' : '') + '>' +
        '<span class="opcao__nome">' + esc(tp.nome) + (k === indicada ? ' <em>indicada</em>' : '') + '</span>' +
        '<span class="opcao__quando">' + esc(semRetorno ? 'só depois da primeira mensagem' : tp.quando) + '</span>' +
        '<span class="opcao__texto">' + esc(texto.length > 150 ? texto.slice(0, 150) + '…' : texto) + '</span></button>';
    }).join('');
    var m = $('modal-escolha');
    if (typeof m.showModal === 'function') m.showModal();
    else { var k = window.prompt('Qual mensagem? ' + ordem.join(', '), indicada); if (k && TEMPLATES[k]) abrirEnvio(l, 'Enviar:' + k); }
  }

  function enviar() {
    if (!pendente) return;
    var p = pendente; pendente = null;
    aviso('Enviando para ' + (p.l.Nome || 'a pessoa') + '…', false, 20000);
    chamar({ acao: 'enviar', chave: p.l.Chave, opcao: p.opcao }).then(function (r) {
      if (!r.ok) throw new Error(r.erro || 'não enviou');
      var l = p.l, agora = new Date();
      l.envios = (l.envios || 0) + 1; l.ultimo_envio = agora.toISOString(); l.Vendedora = sessao.vendedora;
      l.lead_comercial = r.lead_id || l.lead_comercial;
      l.Template = TEMPLATES[r.template || p.t].nome + ' · ' + quando(l.ultimo_envio) + ' · ' + sessao.vendedora + (r.teste ? ' (teste)' : '');
      if (!l['Status do contato']) l['Status do contato'] = 'Chamei';
      aviso('✅ Mensagem enviada! A pessoa agora é sua. Quando ela responder, a conversa aparece no Kommo.', false, 6000);
      desenhar();
    }).catch(function (e) { aviso('Não enviou: ' + e.message, true, 9000); });
  }

  function copiar(texto) {
    function ok() { aviso('Link copiado. Cole na conversa do Kommo.'); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(ok, function () { window.prompt('Copie o link:', texto); });
    else window.prompt('Copie o link:', texto);
  }

  // ---------- Eventos ----------
  function ligar() {
    $('form-entrar').addEventListener('submit', entrar);
    $('sair').addEventListener('click', sair);
    $('atualizar').addEventListener('click', carregar);
    $('mais').addEventListener('click', function () { mostrando += POR_PAGINA; desenhar(); });
    $('busca').addEventListener('input', function () { mostrando = POR_PAGINA; desenhar(); });
    $('filtro-motivo').addEventListener('change', function () { mostrando = POR_PAGINA; desenhar(); });
    document.querySelectorAll('.aba').forEach(function (b) {
      b.addEventListener('click', function () {
        aba = b.getAttribute('data-aba'); mostrando = POR_PAGINA; $('busca').value = ''; $('filtro-motivo').value = '';
        document.querySelectorAll('.aba').forEach(function (x) { x.classList.toggle('ativa', x === b); });
        desenhar(); window.scrollTo(0, 0);
      });
    });
    $('e-lista').addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-tpl]'); if (!b || b.disabled || !escolhendo) return;
      var l = escolhendo; escolhendo = null; $('modal-escolha').close();
      abrirEnvio(l, 'Enviar:' + b.getAttribute('data-tpl'));
    });
    $('modal-envio').addEventListener('close', function () { if ($('modal-envio').returnValue === 'ok') enviar(); else pendente = null; });

    $('lista').addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-acao]'); if (!b) return;
      var l = achar(b.closest('.pessoa').getAttribute('data-chave')); if (!l) return;
      var acao = b.getAttribute('data-acao');
      if (acao === 'enviar') abrirEnvio(l, b.getAttribute('data-opcao'));
      else if (acao === 'escolher') abrirEscolha(l);
      else if (acao === 'copiar') copiar(PRODUTOS[b.getAttribute('data-produto')].url(SLUG[sessao.vendedora]));
      else if (acao === 'assumir') salvar(l, { Vendedora: sessao.vendedora }).then(function (ok) { if (ok) aviso((l.Nome || 'A pessoa') + ' agora é sua. Está em "Meus contatos".'); });
      else if (acao === 'soltar') { if (window.confirm('Soltar ' + (l.Nome || 'esta pessoa') + '? Ela volta para a lista de todas.')) salvar(l, { Vendedora: '' }); }
    });
    $('lista').addEventListener('change', function (ev) {
      var el = ev.target, campo = el.getAttribute('data-campo'); if (!campo) return;
      var l = achar(el.closest('.pessoa').getAttribute('data-chave')); if (!l) return;
      var v = el.value;
      if (campo === 'Retornar em' && v) { var p = v.split('-'); v = p[2] + '/' + p[1] + '/' + p[0]; }
      var c = {}; c[campo] = v; salvar(l, c, el);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    ligar();
    var g = lerGuardado();
    if (g && g.pin && g.vendedora) { sessao = g; abrirPainel(); }
  });
})();
