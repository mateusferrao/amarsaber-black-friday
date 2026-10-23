# Domínio da HostGator → GitHub Pages (passo a passo)

## Situação atual (verificado no DNS)

- `amarsaber.com.br` usa os nameservers da HostGator (`ns994` / `ns995.hostgator.com.br`).
- O domínio raiz aponta pro servidor da HostGator (`162.241.203.66`), onde roda **o WordPress inteiro**
  (home, termos, política de privacidade, outras páginas).
- A página nova já está no ar em: **https://mateusferrao.github.io/agente-lancamento/**

## Qual endereço usar?

| Opção | Endereço exemplo | WordPress continua? | Recomendo |
|---|---|---|---|
| **A. Subdomínio** | `bf.amarsaber.com.br` (ou `protocolos.`, `oferta.`…) | Sim, nada muda nele | ✅ **Sim** |
| B. Domínio inteiro | `amarsaber.com.br` | **Não** — o site todo sai do ar e passa a ser só esta página | Só se for abandonar o WordPress |

Abaixo, a opção A. Troque `bf` pelo nome que escolher.

---

## Passo 1 — Criar o subdomínio na HostGator (DNS)

1. Entre no **Portal do Cliente HostGator** → **Hospedagens** → **Gerenciar** → **cPanel**.
2. No cPanel, abra **Zone Editor** (Editor de Zona DNS).
3. Na linha do `amarsaber.com.br`, clique em **Gerenciar** (Manage).
4. Clique em **+ Adicionar registro** e escolha **CNAME**:
   - **Nome:** `bf.amarsaber.com.br.`
   - **TTL:** `14400` (ou o padrão)
   - **Registro / Destino:** `mateusferrao.github.io`   ← sem `https://`, sem `/agente-lancamento`
5. **Salvar**.

> ⚠️ Se já existir um subdomínio `bf` criado em **cPanel → Domínios/Subdomínios**, apague-o lá antes.
> Ele cria um registro **A** que conflita com o CNAME.

## Passo 2 — Configurar o domínio no GitHub

1. Abra https://github.com/mateusferrao/agente-lancamento/settings/pages
2. Em **Custom domain**, digite `bf.amarsaber.com.br` → **Save**.
   (O GitHub cria um arquivo `CNAME` no repositório — não apague.)
3. Espere o check **"DNS check successful"** (de 5 min a algumas horas, depende da propagação).
4. Marque **Enforce HTTPS** (fica disponível depois que o certificado é emitido, ~15 min a 1 h).

## Passo 3 — Testar

- Abra `https://bf.amarsaber.com.br` → deve mostrar a página nova com cadeado.
- Teste no celular (4G, fora do Wi-Fi) pra fugir do cache.
- Confira no terminal (opcional):

```bash
nslookup bf.amarsaber.com.br
```

Deve responder `canonical name = mateusferrao.github.io`.

## Passo 4 — Redirecionar o link antigo (importante p/ anúncios e links já divulgados)

Quem clicar em `amarsaber.com.br/black-friday-guia-de-protocolos-clinicos/` deve cair na página nova.
Escolha **um** jeito:

**Jeito fácil (plugin no WordPress):**
1. WordPress → **Plugins → Adicionar novo** → instale **Redirection** (by John Godley).
2. **Ferramentas → Redirection → Adicionar novo**:
   - URL de origem: `/black-friday-guia-de-protocolos-clinicos/`
   - URL de destino: `https://bf.amarsaber.com.br/`
   - Tipo: **301**
3. Salve. A página antiga no Elementor pode ficar como rascunho.

**Jeito .htaccess (cPanel → Gerenciador de Arquivos → `public_html/.htaccess`)**, na primeira linha:

```
Redirect 301 /black-friday-guia-de-protocolos-clinicos/ https://bf.amarsaber.com.br/
```

> O redirect 301 preserva os parâmetros UTM? O `Redirect` do Apache **mantém** a query string
> (`?utm_source=...`), então o rastreamento das campanhas continua funcionando.

## Passo 5 — Pixels (via Google Tag Manager)

A página nova carrega só o GTM `GTM-5RPFTJ7G`, o mesmo do WordPress. Regras atuais do container
(lidas do GTM publicado):

| Tag no GTM | Dispara quando | Na página nova |
|---|---|---|
| GA4 `G-XYC0M24PJN` | Todas as páginas | ✅ Funciona em qualquer endereço |
| TikTok `CT0D2HJC77UB52N3D5TG` | Todas as páginas | ✅ Funciona em qualquer endereço |
| Meta Pixel `1701576724241276` (HTML) | Page Path **contém** `/black-friday-guia-de-protocolos-clinicos/` | ❌ caminho mudou |
| Meta Pixel `1701576724241276` (template) | Page Path **igual a** `/` | ✅ em `https://bf.amarsaber.com.br/` |

Ou seja: **no endereço provisório `mateusferrao.github.io/agente-lancamento/` o Pixel da Meta não
dispara**; no subdomínio (página na raiz `/`) ele dispara sozinho pela regra "Page Path = /".

Recomendado (deixa explícito e evita surpresa):
1. GTM → **Acionadores → Novo** → *Visualização de página* → *Algumas* →
   `Page Hostname` **igual a** `bf.amarsaber.com.br`.
2. Adicione esse acionador à tag do Pixel da Meta → **Enviar / Publicar**.
3. Teste com a extensão **Meta Pixel Helper** e com o **Modo de visualização** do GTM.

- **Meta (Gerenciador de Eventos):** se o domínio verificado for `amarsaber.com.br`, o subdomínio já
  está coberto.
- **GA4:** nada a fazer; o subdomínio aparece em *Hostname*.

> Os scripts diretos de GA4 e TikTok que o WordPress injetava por plugin **não** foram copiados:
> o GTM já dispara os dois, e manter ambos duplicaria os eventos.

---

## Se quiser a opção B (domínio inteiro)

Só faça se o WordPress for desligado de vez. No **Zone Editor**:

1. Apague os registros **A** de `amarsaber.com.br.` e crie 4 registros **A** apontando para:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
2. Troque o `www` para **CNAME** → `mateusferrao.github.io`
3. **Não mexa** nos registros **MX** (e-mail) nem TXT.
4. No GitHub, Custom domain = `amarsaber.com.br`.

## Problemas comuns

| Sintoma | Causa | Solução |
|---|---|---|
| "DNS check unsuccessful" no GitHub | Propagação ou registro A conflitando | Espere 1–2 h; apague subdomínio criado pelo cPanel |
| Página 404 do GitHub | Custom domain não salvo / arquivo `CNAME` apagado | Salve de novo em Settings → Pages |
| Sem cadeado (HTTPS) | Certificado ainda sendo emitido | Espere e marque "Enforce HTTPS" |
| Abre o WordPress | Cache do navegador/DNS | Teste em aba anônima ou 4G |
