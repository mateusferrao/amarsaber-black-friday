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
