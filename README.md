# Página de vendas — Black Friday Guia de Protocolos (Amar Saber)

Migração da página WordPress/Elementor
`amarsaber.com.br/black-friday-guia-de-protocolos-clinicos/` para HTML + CSS + JS puro,
hospedada no GitHub Pages. Sem build, sem dependências: editou, deu push, está no ar.

## Estrutura

```
index.html            ← todo o conteúdo (textos, links, preços)
assets/css/style.css  ← visual (cores no topo do arquivo, em :root)
assets/js/main.js     ← vídeo, FAQ, carrosséis do mobile, lightbox
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
| Pixels / tags                    | No **Google Tag Manager** (`GTM-5RPFTJ7G`), não no código             |

A página só carrega o GTM. Ele dispara GA4, TikTok e Pixel da Meta — veja as regras em
`DOMINIO-HOSTGATOR.md`, Passo 5.

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
