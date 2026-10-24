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

## Rastreamento

A página carrega Meta Pixel (`1393732806282634` + `1701576724241276`, só navegador), PostHog,
Microsoft Clarity e o script de UTMs da UTMify. Sem GTM, GA4 ou TikTok.

| Evento | Quando | Meta | PostHog / Clarity |
|---|---|---|---|
| PageView | abre a página | `PageView` | `$pageview` (automático) |
| Viu a oferta | seção de preço aparece na tela | `ViewContent` (R$ 497) | `offer_viewed` |
| Clicou comprar | botão da oferta (vai pra Yampi) | `ClickCheckout` (personalizado) | `checkout_click` |
| WhatsApp | clique no link do WhatsApp | `Contact` | `whatsapp_click` |
| CTA | botões que levam até a oferta | — | `cta_click` (`posicao`) |
| Engajamento | play no vídeo, scroll 25/50/75/100%, FAQ | — | `video_play`, `scroll_depth`, `faq_open` |

- **Checkout:** InitiateCheckout, AddPaymentInfo e Purchase são enviados pela **Yampi** (navegador + API
  de Conversões). Por isso o clique na LP é `ClickCheckout`, e não InitiateCheckout: evita contar em dobro.
- **UTMs:** o script da UTMify guarda as `utm_*` e o `fbclid` e cola no link da Yampi. A venda paga chega
  na UTMify pelo webhook da Yampi, com as UTMs (ROAS real).
- **Gravações e heatmap:** Clarity. O PostHog fica com eventos e funis (gravação desligada).

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
