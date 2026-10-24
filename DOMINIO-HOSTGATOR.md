# Domínio da HostGator → GitHub Pages (passo a passo)

## Situação atual (verificado no DNS)

- `amarsaber.com.br` usa os nameservers da HostGator (`ns994` / `ns995.hostgator.com.br`).
- O domínio raiz aponta pro servidor da HostGator (`162.241.203.66`), onde roda **o WordPress inteiro**
  (home, termos, política de privacidade, outras páginas).
- A página nova está no ar em **https://black.amarsaber.com.br** (repositório `mateusferrao/amarsaber-black-friday`).

## Qual endereço usar?

| Opção | Endereço exemplo | WordPress continua? | Recomendo |
|---|---|---|---|
| **A. Subdomínio** | `black.amarsaber.com.br` | Sim, nada muda nele | ✅ **Sim** |
| B. Domínio inteiro | `amarsaber.com.br` | **Não** — o site todo sai do ar e passa a ser só esta página | Só se for abandonar o WordPress |

Escolhido: **opção A — `black.amarsaber.com.br`**.

---

## Passo 1 — Criar o subdomínio na HostGator (DNS)

1. Entre no **Portal do Cliente HostGator** → **Hospedagens** → **Gerenciar** → **cPanel**.
2. No cPanel, abra **Zone Editor** (Editor de Zona DNS).
3. Na linha do `amarsaber.com.br`, clique em **Gerenciar** (Manage).
4. Clique em **+ Adicionar registro** e escolha **CNAME**:
   - **Nome:** `black.amarsaber.com.br.`
   - **TTL:** `14400` (ou o padrão)
   - **Registro / Destino:** `mateusferrao.github.io`   ← sem `https://`, sem `/amarsaber-black-friday`
5. **Salvar**.

> ⚠️ Se já existir um subdomínio `black` criado em **cPanel → Domínios/Subdomínios**, apague-o lá antes.
> Ele cria um registro **A** que conflita com o CNAME.

## Passo 2 — Configurar o domínio no GitHub

✅ **Já feito:** custom domain `black.amarsaber.com.br` configurado e arquivo `CNAME` no repositório
(não apague esse arquivo). Falta só:

1. Abra https://github.com/mateusferrao/amarsaber-black-friday/settings/pages
2. Confira que **Custom domain** mostra `black.amarsaber.com.br`.
3. Espere o check **"DNS check successful"** (de 5 min a algumas horas, depende da propagação).
4. Marque **Enforce HTTPS** (fica disponível depois que o certificado é emitido, ~15 min a 1 h).

## Passo 3 — Testar

- Abra `https://black.amarsaber.com.br` → deve mostrar a página nova com cadeado.
- Teste no celular (4G, fora do Wi-Fi) pra fugir do cache.
- Confira no terminal (opcional):

```bash
nslookup black.amarsaber.com.br
```

Deve responder `canonical name = mateusferrao.github.io`.

## Passo 4 — Redirecionar o link antigo (importante p/ anúncios e links já divulgados)

Quem clicar em `amarsaber.com.br/black-friday-guia-de-protocolos-clinicos/` deve cair na página nova.
Escolha **um** jeito:

**Jeito fácil (plugin no WordPress):**
1. WordPress → **Plugins → Adicionar novo** → instale **Redirection** (by John Godley).
2. **Ferramentas → Redirection → Adicionar novo**:
   - URL de origem: `/black-friday-guia-de-protocolos-clinicos/`
   - URL de destino: `https://black.amarsaber.com.br/`
   - Tipo: **301**
3. Salve. A página antiga no Elementor pode ficar como rascunho.

**Jeito .htaccess (cPanel → Gerenciador de Arquivos → `public_html/.htaccess`)**, na primeira linha:

```
Redirect 301 /black-friday-guia-de-protocolos-clinicos/ https://black.amarsaber.com.br/
```

> O redirect 301 preserva os parâmetros UTM? O `Redirect` do Apache **mantém** a query string
> (`?utm_source=...`), então o rastreamento das campanhas continua funcionando.

## Passo 5 — Pixels

A página **não usa mais o GTM**. O Meta Pixel, o PostHog, o Clarity e o script de UTMs da UTMify são
carregados direto pelo código (`assets/js/tracking.js`). Eventos e regras: veja o `README.md`, seção
**Rastreamento**.

- **Meta:** o domínio `amarsaber.com.br` está verificado no Business Manager e cobre o `black.`.
- **Anúncios Meta:** em cada anúncio, campo **Parâmetros de URL**:
  `utm_source=FB&utm_campaign={{campaign.name}}|{{campaign.id}}&utm_medium={{adset.name}}|{{adset.id}}&utm_content={{ad.name}}|{{ad.id}}&utm_term={{placement}}`

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
