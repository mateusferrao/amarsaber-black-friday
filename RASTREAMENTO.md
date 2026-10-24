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
| engajamento | `lp_secao_vista` | seção ficou 1 s no meio da tela | `secao` (hero, para-quem, o-que-e, autoras, provas, oferta, faq), `ordem` 1–7 | — |
| engajamento | `lp_engajado` | 30 s com a aba visível | `segundos` | `EngagedVisit` (personalizado) |
| engajamento | `lp_video_play` | clicou na capa do vídeo | — | `VideoPlay` (personalizado) |
| engajamento | `lp_video_progresso` | assistiu 25/50/75/95% (vídeo de 13 min) | `percentual` | `VideoProgress` {percentual} |
| engajamento | `lp_faq_aberto` | abriu pergunta do FAQ | `pergunta` | — |
| intenção | `lp_cta_clique` | botão que rola até a oferta | `posicao` (hero, para-quem, para-quem-mobile, provas) | — |
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

## Limites conhecidos

- PostHog grátis: 1 milhão de eventos/mês e **para de gravar ao estourar**. Com autocapture desligado,
  cada visita gera ~6–15 eventos (≈ 70–150 mil visitas/mês).
- Bloqueadores de anúncio cortam Meta, PostHog e Clarity no navegador (10–30% do público, mais no desktop).
  A compra continua chegando na Meta pela API de Conversões da Yampi e na UTMify pelo webhook.
- PostHog termina no clique pro checkout; compra só na UTMify e na Meta.
- A UTMify guarda cada `utm_*` separado: se a pessoa vem de um anúncio e depois de um link com menos
  parâmetros, o link do checkout pode misturar campos das duas visitas.
