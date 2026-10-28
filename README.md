# Página de vendas — Black Friday Guia de Protocolos (Amar Saber)

Migração da página WordPress/Elementor
`amarsaber.com.br/black-friday-guia-de-protocolos-clinicos/` para HTML + CSS + JS puro,
hospedada no GitHub Pages. Sem build, sem dependências: editou, deu push, está no ar.

## Estrutura

```
index.html            ← todo o conteúdo (textos, links, preços)
assets/css/style.css  ← visual (cores no topo do arquivo, em :root)
assets/js/main.js     ← vídeo, FAQ, carrosséis do mobile, lightbox
assets/js/tracking.js ← rastreamento (Meta Pixel, PostHog, Clarity) — IDs em CONFIG no topo
assets/img/           ← imagens

acesso-antecipado/index.html          ← captura do Grupo VIP (formulário)
acesso-antecipado/obrigado/index.html ← "falta um passo" + botão do grupo
assets/css/captura.css                ← visual das 2 páginas da captura
assets/js/captura.js                  ← formulário: validação, envio ao n8n, evento Lead
assets/img/captura/                   ← imagens só da captura

oferta-especial/index.html   ← downsell (curso Atendimento Extraordinário + comunidade, R$ 187)
compra-confirmada/index.html ← obrigado da compra (redirect da Yampi)
assets/js/voltar.js          ← LP e teste: leva ao downsell no 1º voltar ou na volta do checkout (1x por aba)
assets/js/downsell.js        ← eventos do downsell (vista e recusa)
assets/js/compra.js          ← evento da compra confirmada

teste/index.html             ← teste de 7 perguntas, alternativa à LP (resultado + oferta na mesma página)
assets/js/teste.js           ← perguntas, pontuação, nome + WhatsApp (n8n), resultado e eventos
assets/css/teste.css         ← visual das telas do teste (o resto vem de style.css)
RASTREAMENTO.md       ← dicionário de eventos, UTMs e como usar os dados
DOMINIO-HOSTGATOR.md  ← passo a passo do domínio
```

## Como editar

| Quero mudar…                     | Onde                                                                 |
|----------------------------------|----------------------------------------------------------------------|
| Textos, títulos, FAQ             | `index.html` (cada seção tem um comentário `<!-- ===== N. NOME ===== -->`) |
| Preço / parcelas                 | `index.html` → seção `6. OFERTA` (`oferta__price`, `oferta__cash`)    |
| Link do checkout                 | `index.html` → procure `seguro.amarsaberstore.com.br`                 |
| Vídeo do YouTube                 | `index.html` → `data-youtube="ID_DO_VIDEO"`                           |
| Cores                            | `assets/css/style.css` → bloco `:root` no topo                        |
| Trocar uma imagem                | Substitua o arquivo em `assets/img/` mantendo o mesmo nome            |
| Pixels / IDs / valor da oferta   | `assets/js/tracking.js` → objeto `CONFIG` no topo                     |
| Link do grupo VIP do WhatsApp    | `acesso-antecipado/obrigado/index.html` → `href` do botão com `data-grupo` (link de rodízio do SendFlow: `sndflw.com/i/amarsaber-black-vip`) |
| Textos e data da captura         | `acesso-antecipado/index.html` (título, live de 10/11 20h, presentes) |
| Fim do contador da live          | `acesso-antecipado/index.html` → atributo `data-contador`             |
| Endereço do webhook (n8n)        | `assets/js/captura.js` → `CONFIG.webhook`                             |
| Preço, parcelas e link do downsell | `oferta-especial/index.html` (`ds-price` = 12x, `ds-cash` = à vista, botão `ds-btn`) e `data-produto-valor` no `<body>` |
| Tempo da "volta do checkout"     | `assets/js/voltar.js` → `CONFIG.checkoutMinutos`                      |
| Perguntas, pontos e textos do resultado do teste | `assets/js/teste.js` → `QUESTIONS` e `RESULTS`             |
| Oferta, provas e FAQ do teste    | `teste/index.html` (mesmos preços e link de checkout da LP: mude nos dois) |

## Captura "Acesso antecipado" (`/acesso-antecipado/`)

Migração de `amarsaber.com.br/` (formulário do Grupo VIP) e da página `amar-saber-confirmacao/`.
O formulário envia o lead para o n8n (fluxo **AS · Acesso antecipado Black → Google Sheets + CAPI**),
que grava na planilha **Leads · Acesso antecipado Black – Amar Saber** (aba `Leads`) e manda o `Lead`
à API de Conversões da Meta. Depois do envio a pessoa vai para `/acesso-antecipado/obrigado/`.
Se o n8n não responder, a pessoa segue para o grupo mesmo assim e o lead fica no PostHog
(`lp_lead_falha`, com nome e WhatsApp).

A LP de vendas (`/`) está com `noindex` até a abertura pública: o link sai primeiro no grupo em 10/11.

## Downsell e obrigado da compra

Quem aperta voltar na LP (depois de tocar na página) ou volta do checkout da Yampi vai, **uma vez por aba**,
para `/oferta-especial/`: curso Atendimento Extraordinário + 3 meses de comunidade, de R$ 440,70 por
R$ 187. O botão de recusa leva de volta à oferta da LP. A Yampi deve redirecionar o pós-compra (depois do
upsell nativo) para `https://black.amarsaber.com.br/compra-confirmada/`. As duas páginas têm `noindex`.
Detalhes e eventos: [RASTREAMENTO.md](RASTREAMENTO.md#downsell-e-obrigado-da-compra).

## Teste (`/teste/`)

Alternativa à LP para rodar tráfego em paralelo: 7 perguntas, nome + WhatsApp para liberar o resultado
(n8n **AS · Teste Black → Google Sheets + CAPI** → aba **Leads - Quiz** + Lead na API de Conversões),
resultado pela dor principal (plantão → Guia, consulta → curso, sozinho → comunidade) e a oferta da Black
logo abaixo, com o downsell no voltar. `noindex`. Eventos e onde a pessoa parou:
[RASTREAMENTO.md](RASTREAMENTO.md#teste-teste-alternativa-à-lp).

## Rastreamento

A página carrega Meta Pixel (`1393732806282634` + `1701576724241276`, só navegador), PostHog,
Microsoft Clarity e o script de UTMs da UTMify. Sem GTM, GA4 ou TikTok.

**Dicionário completo (eventos por etapa, origem do visitante, padrão de UTMs, públicos da Meta):
[RASTREAMENTO.md](RASTREAMENTO.md).**

- **Checkout:** InitiateCheckout, AddPaymentInfo e Purchase são enviados pela **Yampi** (navegador + API
  de Conversões). Por isso o clique na LP é `ClickCheckout`, e não InitiateCheckout: evita contar em dobro.
- **UTMs:** o script da UTMify guarda as `utm_*` e o `fbclid` e cola no link da Yampi. A venda paga chega
  na UTMify pelo webhook da Yampi, com as UTMs (ROAS real).
- **Gravações, cliques e heatmap:** Clarity (projeto `z2xmncb9r0`, conta Automato). O PostHog (projeto do
  cliente, plano grátis de 1 milhão de eventos) fica só com eventos e funis: autocapture desligado.
- **Equipe e cliente:** abrir uma vez com `?interno=1` para aquele navegador não ser rastreado.
- **Nomes de evento:** padrão Automato — português, prefixo `lp_`, iguais em todos os clientes.
- **Âncoras:** os CTAs rolam até a oferta sem mudar a URL (`#`), senão o Pixel da Meta envia PageView duplicado.

## Testar no computador

```bash
python -m http.server 8000
```

Abra http://localhost:8000.

## Publicar

Todo `git push` na branch `main` atualiza o site em ~1 minuto (GitHub Pages).

```bash
git add -A
git commit -m "Atualiza página"
git push
```
