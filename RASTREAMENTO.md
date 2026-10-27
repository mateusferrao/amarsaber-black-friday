# Plano de rastreamento — LP Black Friday (black.amarsaber.com.br)

Tudo que a página mede, onde cada dado cai e como usar. O código fica em `assets/js/tracking.js`.

## Quem faz o quê

| Ferramenta | Conta | Papel | Não usar para |
|---|---|---|---|
| **Meta Pixel** `1393732806282634` (novo) + `1701576724241276` (antigo) | cliente | Otimizar anúncios e criar públicos | Medir venda real (PIX gerado conta como Purchase) |
| **Yampi** (checkout) | cliente | InitiateCheckout, AddPaymentInfo, Purchase — navegador + API de Conversões | — |
| **UTMify** (dashboard "Amar Saber") | Automato | **Venda paga e ROAS real** por campanha/anúncio (webhook Yampi) | Comportamento na página |
| **PostHog** (projeto 685982, plano grátis) | cliente | Funil da página, origem, engajamento | Gravações, cliques, heatmap |
| **Clarity** `z2xmncb9r0` | Automato | Gravações, heatmap, rage/dead clicks, performance | Contagem e funil |

Regra de ouro: **decidir verba pela UTMify** (venda paga); usar Meta para otimização; PostHog e Clarity
para entender *por que* a página converte ou não.

## Eventos (categorizados por etapa)

Todo evento do PostHog leva a propriedade `etapa` e todas as propriedades de origem (abaixo).

| Etapa | Evento PostHog / Clarity | Quando | Propriedades | Meta (os 2 pixels) |
|---|---|---|---|---|
| chegada | `$pageview` (automático) | abriu a página | — | `PageView` |
| chegada | `$pageleave` (automático) | saiu | tempo e % máx. de rolagem | — |
| engajamento | `lp_secao_vista` | seção ficou 1 s no meio da tela | `secao` (hero, para-quem, o-que-e, autoras, provas, bonus, oferta, faq), `ordem` 1–8 | — |
| engajamento | `lp_engajado` | 30 s com a aba visível | `segundos` | `EngagedVisit` (personalizado) |
| engajamento | `lp_video_play` | clicou na capa do vídeo | — | `VideoPlay` (personalizado) |
| engajamento | `lp_video_progresso` | assistiu 25/50/75/95% (vídeo de 13 min) | `percentual` | `VideoProgress` {percentual} |
| engajamento | `lp_faq_aberto` | abriu pergunta do FAQ | `pergunta` | — |
| intenção | `lp_cta_clique` | botão que rola até a oferta | `posicao` (hero, para-quem, para-quem-mobile, provas, bonus) | — |
| intenção | `lp_oferta_vista` | 30% da seção de preço na tela | `valor`, `segundos_ate_oferta` | `ViewContent` (R$ 497) |
| intenção | `whatsapp_clique` | link do WhatsApp | — | `Contact` |
| intenção | `lp_checkout` | botão da oferta (vai pra Yampi) | `valor`, `segundos_na_pagina` | `ClickCheckout` (personalizado) |
| checkout | — (Yampi) | entrou no checkout | — | `InitiateCheckout` |
| checkout | — (Yampi) | escolheu pagamento (repete a cada troca) | — | `AddPaymentInfo` |
| compra | — (Yampi) | **pedido criado** (PIX gerado conta) | — | `Purchase`, `Purchase - pix`, `Purchase - New client` |
| compra | — (UTMify) | **pedido pago** | — | — |

Todo evento da Meta leva `eventID` (deduplica se o mesmo evento chegar também por servidor).

## Origem do visitante (propriedades em todo evento do PostHog e tags no Clarity)

O último toque com UTM/fbclid fica guardado 7 dias (mesmo prazo da UTMify). Visita direta não apaga
uma origem recente; voltar do checkout também não conta como nova origem.

| Propriedade | De onde vem | Exemplo |
|---|---|---|
| `canal` | `utm_source` / fbclid / referrer | `meta_ads`, `instagram`, `whatsapp`, `email`, `meta_sem_utm`, `busca_organica`, `social_organico`, `referencia`, `direto`, `teste` |
| `campanha`, `campanha_id` | `utm_campaign` = `nome\|id` | `BF Guia`, `1202…` |
| `conjunto`, `conjunto_id` | `utm_medium` = `nome\|id` | `Publico Frio`, `1202…` |
| `anuncio`, `anuncio_id` | `utm_content` = `nome\|id` | `Video1`, `1202…` |
| `posicionamento` | `utm_term` | `Instagram_Reels` |
| `tem_fbclid` | fbclid na URL | `true` |
| `utm_*` | brutos, como vieram | — |

Clarity recebe ainda a tag `etapa_max` (`engajou` → `viu_oferta` → `clicou_checkout`) e o
**Custom user ID = distinct_id do PostHog** (achar no Clarity a gravação de quem aparece no PostHog).

## Padrão de links (UTMs) — use sempre

| Origem | Parâmetros |
|---|---|
| Anúncio Meta (nível anúncio → Parâmetros de URL) | `utm_source=FB&utm_campaign={{campaign.name}}\|{{campaign.id}}&utm_medium={{adset.name}}\|{{adset.id}}&utm_content={{ad.name}}\|{{ad.id}}&utm_term={{placement}}` |
| Instagram — bio | `?utm_source=instagram&utm_medium=bio&utm_campaign=bf` |
| Instagram — stories | `?utm_source=instagram&utm_medium=stories&utm_campaign=bf&utm_content=AAAA-MM-DD` |
| WhatsApp — lista/grupo | `?utm_source=whatsapp&utm_medium=lista&utm_campaign=bf&utm_content=disparo-1` |
| E-mail | `?utm_source=email&utm_medium=newsletter&utm_campaign=bf&utm_content=email-1` |
| Teste (não entra nos relatórios) | `?utm_source=teste-qualquer-coisa` |

Sem UTM, venda orgânica cai na UTMify como "sem origem" e no PostHog como `direto`.

## Tráfego interno

Abra uma vez `https://black.amarsaber.com.br/?interno=1` no navegador da equipe e do cliente: aquele
navegador para de enviar **qualquer** dado (Meta, PostHog, Clarity). `?interno=0` religa. Use em todo
celular/computador que vai ficar abrindo a página, para não sujar públicos e funis.

## Dashboards PostHog

- **AS · Funil da LP Black Friday** — funil geral, por campanha e por canal; tendência diária; WhatsApp.
- **AS · Aquisição (UTMs)** — visitantes por canal; tabela por campanha; cliques e conversão por anúncio; funil por posicionamento; dispositivo.
- **AS · Engajamento da LP** — seções vistas, retenção do vídeo, visitas engajadas, FAQ, CTAs.

## Como usar na Meta

Públicos personalizados (Site, pixel 1393…), para remarketing de Black Friday:

| Público | Regra |
|---|---|
| Viu a oferta e não comprou (7 d) | `ViewContent` **excluindo** `Purchase` |
| Clicou em comprar e não comprou (3 d) | `ClickCheckout` ou `InitiateCheckout` **excluindo** `Purchase` |
| Assistiu metade do vídeo (14 d) | `VideoProgress` com `percentual` igual a 50, 75 ou 95 |
| Visitante engajado (14 d) | `EngagedVisit` |
| Gerou PIX e não pagou | não dá pelo pixel (Purchase já dispara no PIX gerado) — usar a lista de pedidos pendentes da Yampi |

Otimização: campanha de vendas otimizando em `Purchase` (sinal forte, EMQ 8/10). Os eventos
personalizados servem para públicos e diagnóstico, não para otimizar.

## Segmentos Clarity (criar depois do 1º tráfego)

`etapa_max = clicou_checkout` · `etapa_max = viu_oferta` (viu e não clicou) · `canal = meta_ads` ·
heatmap da página separado desktop × mobile.

## Captura "Acesso antecipado" (`/acesso-antecipado/`)

Mesmos pixels, PostHog, Clarity e UTMify da LP, e o mesmo `tracking.js`. Como é o mesmo domínio, a origem
guardada (`as_origem`), o `?interno=1` e o `distinct_id` do PostHog valem nas duas páginas: dá para seguir
a pessoa da captura até o clique no checkout.

| Etapa | Evento PostHog / Clarity | Quando | Propriedades | Meta (os 2 pixels) |
|---|---|---|---|---|
| chegada | `$pageview` | abriu a captura ou o obrigado | — | `PageView` |
| engajamento | `lp_secao_vista` | seção 1 s no meio da tela | `secao` (hero, para-quem, dra, sumario) | — |
| engajamento | `lp_engajado` | 30 s com a aba visível | `segundos` | `EngagedVisit` |
| intenção | `lp_cta_clique` | botão que sobe até o formulário | `posicao` (dra, sumario) | — |
| intenção | `lp_form_inicio` | 1º clique num campo | — | — |
| intenção | `lp_form_erro` | tentou enviar com erro (1 evento por campo) | `campo` (nome, email, whatsapp), `motivo` (vazio, curto, formato, ddd) | — |
| conversão | `lp_lead` + identify (e-mail) | o n8n confirmou o recebimento | `repetido` | `Lead` (navegador + servidor, mesmo `eventID`) |
| conversão | `lp_lead_falha` | n8n fora do ar (2 tentativas) | `motivo`, `nome`, `email`, `whatsapp` | — |
| conversão | `lp_grupo_clique` | botão do grupo no obrigado | — | `GroupClick` (personalizado) |

- **Lead na Meta:** só depois do OK do n8n, nunca no clique. Vai com advanced matching (e-mail, telefone,
  nome, `external_id` = distinct_id do PostHog) e, pelo n8n, também pela API de Conversões, com o mesmo
  `event_id` (a Meta deduplica). O mesmo e-mail no mesmo navegador não gera um segundo `Lead`.
- **Testar a API de Conversões:** abrir `/acesso-antecipado/?test_event_code=TESTxxxx` (código da aba
  "Testar eventos" do Gerenciador de Eventos) e enviar o formulário.
- **Clarity:** `etapa_max` = `engajou` → `iniciou_form` → `virou_lead` (captura) e `clicou_grupo` (obrigado).
- **Planilha:** uma linha por envio, com Canal, Campanha/Conjunto/Anúncio (nome e ID), utm_* brutos,
  fbclid, Repetido, Interno (`?interno=1`), Página, distinct_id e event_id.
- **Otimizar campanha de captura:** em `Lead`. Públicos: `Lead` nos últimos 30 dias (excluir de captura,
  incluir no remarketing da Black); `GroupClick` = clicou para entrar no grupo; captura vista sem `Lead` = remarketing
  de captura.

## Downsell e obrigado da compra

### Quando o downsell aparece (`assets/js/voltar.js`, só na LP)

Uma vez por aba (`sessionStorage`, chave `as_downsell`), na primeira destas situações:

1. **Voltar na LP:** depois do primeiro toque, clique ou tecla na página, o botão voltar leva a
   `/oferta-especial/?…&de=voltar`. O Chrome ignora o histórico criado sem gesto do usuário, então quem só
   rolou a página e voltou sai normalmente.
2. **Volta do checkout:** clicou no link da Yampi pela LP e voltou em até 60 min → `/oferta-especial/?…&de=checkout`.

A troca é por `location.replace`: o voltar a partir do downsell sai do site, sem cair na LP de novo.
Na volta do checkout, se o navegador recarregar a LP, ela vai direto ao downsell sem enviar eventos
(sem PageView nem ViewContent repetidos); se restaurar da memória, não há envio novo de qualquer forma.
As `utm_*` e o `fbclid` seguem na URL, então UTMify, origem (`as_origem`) e `distinct_id` continuam os mesmos.
Sem `sessionStorage` (navegador que bloqueia), a LP não intercepta nada. `?interno=1` não envia eventos,
mas o redirecionamento funciona igual, para a equipe testar.

**Não funciona:** no Instagram do iPhone (não há voltar, o X fecha o navegador) e para quem abre o link da
Yampi direto, sem passar pela LP. Todo link de divulgação deve apontar para a LP.

### Eventos

| Página | Etapa | Evento PostHog / Clarity | Quando | Propriedades | Meta (os 2 pixels) |
|---|---|---|---|---|---|
| downsell | chegada | `$pageview` | abriu `/oferta-especial/` | — | `PageView` |
| downsell | intenção | `lp_downsell_vista` | ao abrir | `de` (voltar, checkout, direto), `valor` 187 | `DownsellView` (personalizado, R$ 187) |
| downsell | engajamento | `lp_secao_vista` | oferta 1 s no meio da tela | `secao` = downsell | — |
| downsell | intenção | `lp_downsell_checkout` | botão do checkout do downsell | `valor`, `segundos_na_pagina` | `DownsellCheckout` (personalizado, R$ 187) |
| downsell | intenção | `lp_downsell_recusa` | "Não, quero perder essa oportunidade" (volta à oferta da LP) | `de` | — |
| obrigado | compra | `lp_compra_confirmada` | abriu `/compra-confirmada/` (redirect da Yampi) | parâmetros que a Yampi mandar na URL, como `yampi_<nome>`, sem e-mail, nome, telefone, CPF ou endereço | só `PageView` |
| obrigado | intenção | `whatsapp_clique` | botão do WhatsApp | — | `Contact` |

- **Produto por página:** o `<body>` do downsell declara `data-produto-id`, `data-produto-nome`,
  `data-produto-valor` e os nomes do evento de checkout. O `tracking.js` usa esses valores no lugar do
  `CONFIG` (R$ 497) só naquela página.
- **Purchase:** continua só pela Yampi (navegador + API de Conversões), para a oferta principal, o upsell e
  o downsell. O obrigado não dispara `Purchase` para não contar em dobro.
- **Clarity:** `etapa_max` = `viu_downsell` → `clicou_downsell` (downsell) e `comprou` (obrigado), com `upgrade`
  da gravação nas duas.
- **Funil no PostHog:** `lp_checkout` → `lp_downsell_vista` (`de` = checkout) → `lp_downsell_checkout`
  mostra quantos desistentes do checkout o downsell recupera. A venda confirmada fica na UTMify.
- **Públicos na Meta:** `DownsellView` sem `Purchase` = viu as duas ofertas e não comprou.

## Limites conhecidos

- PostHog grátis: 1 milhão de eventos/mês e **para de gravar ao estourar**. Com autocapture desligado,
  cada visita gera ~6–15 eventos (≈ 70–150 mil visitas/mês).
- Bloqueadores de anúncio cortam Meta, PostHog e Clarity no navegador (10–30% do público, mais no desktop).
  A compra continua chegando na Meta pela API de Conversões da Yampi e na UTMify pelo webhook.
- PostHog termina no clique pro checkout; a compra fica na UTMify e na Meta. `lp_compra_confirmada` só aparece se a Yampi redirecionar para `/compra-confirmada/`.
- A UTMify guarda cada `utm_*` separado: se a pessoa vem de um anúncio e depois de um link com menos
  parâmetros, o link do checkout pode misturar campos das duas visitas.
