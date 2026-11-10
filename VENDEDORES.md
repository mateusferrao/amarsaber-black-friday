# Vendas por vendedora (bônus da Black 2026)

Cada vendedora tem um link pessoal. A venda feita por esse link aparece sozinha na planilha **Leads · Black**, aba
**"Vendas · Vendedores"**, e a aba **"Bônus"** soma por pessoa.

Decisão de 09/11: o rastreio é **só por UTM e planilha**. Não há cupom pessoal nem webhook novo na Yampi.

## Links (atualizados em 10/11: um link por produto)

Os mesmos links estão no **topo da aba "Vendas · Vendedores"** (linhas 1 a 13); as vendas começam na linha 17
(cabeçalho na linha 16, que o fluxo n8n usa: não mover).

Os links abrem direto no checkout, já com o cupom do produto (o da Formação de comprador não usa cupom: o preço já é
R$ 297). Não mande a LP. O `utm_term` diz qual link foi usado e aparece na coluna **Link (produto)** da aba de vendas e
na tabela "Vendas pagas por produto vendido" da aba Bônus (conta pelo produto do pedido, então vale também para
vendas feitas pelos links antigos, sem `utm_term`).

Cupons restritos ao produto no painel da Yampi (conferido no checkout em 10/11: cada cupom só desconta no próprio
produto; esteira R$ 794, front R$ 497, downsell R$ 187, Formação de comprador R$ 297 sem cupom).

### Ana

| Produto | Link |
|---|---|
| **front** · Guia Vol. 3 + curso + comunidade · R$ 497 | https://seguro.amarsaberstore.com.br/r/LUIR27AS3L?promocode=BLACKAMARSABER&utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=ana&utm_term=front |
| **downsell** · Só curso + comunidade · R$ 187 | https://seguro.amarsaberstore.com.br/r/5PS9VFMQHI?promocode=BLACKAMARSABERDS&utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=ana&utm_term=downsell |
| **upsell** · Formação Completa para quem já comprou · R$ 297 (de R$ 697) | https://seguro.amarsaberstore.com.br/r/OXZJFHDY7F?utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=ana&utm_term=upsell |
| **esteira** · Esteira completa: Guia + curso + comunidade + Formação · R$ 794 (de R$ 1.834,70) | https://seguro.amarsaberstore.com.br/r/MOXSHIVAJY?promocode=BLACKESTEIRA&utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=ana&utm_term=esteira |

### Heid

| Produto | Link |
|---|---|
| **front** · Guia Vol. 3 + curso + comunidade · R$ 497 | https://seguro.amarsaberstore.com.br/r/LUIR27AS3L?promocode=BLACKAMARSABER&utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=heid&utm_term=front |
| **downsell** · Só curso + comunidade · R$ 187 | https://seguro.amarsaberstore.com.br/r/5PS9VFMQHI?promocode=BLACKAMARSABERDS&utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=heid&utm_term=downsell |
| **upsell** · Formação Completa para quem já comprou · R$ 297 (de R$ 697) | https://seguro.amarsaberstore.com.br/r/OXZJFHDY7F?utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=heid&utm_term=upsell |
| **esteira** · Esteira completa: Guia + curso + comunidade + Formação · R$ 794 (de R$ 1.834,70) | https://seguro.amarsaberstore.com.br/r/MOXSHIVAJY?promocode=BLACKESTEIRA&utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=heid&utm_term=esteira |

### Belle

| Produto | Link |
|---|---|
| **front** · Guia Vol. 3 + curso + comunidade · R$ 497 | https://seguro.amarsaberstore.com.br/r/LUIR27AS3L?promocode=BLACKAMARSABER&utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=belle&utm_term=front |
| **downsell** · Só curso + comunidade · R$ 187 | https://seguro.amarsaberstore.com.br/r/5PS9VFMQHI?promocode=BLACKAMARSABERDS&utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=belle&utm_term=downsell |
| **upsell** · Formação Completa para quem já comprou · R$ 297 (de R$ 697) | https://seguro.amarsaberstore.com.br/r/OXZJFHDY7F?utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=belle&utm_term=upsell |
| **esteira** · Esteira completa: Guia + curso + comunidade + Formação · R$ 794 (de R$ 1.834,70) | https://seguro.amarsaberstore.com.br/r/MOXSHIVAJY?promocode=BLACKESTEIRA&utm_source=vendedor&utm_medium=whatsapp_1a1&utm_campaign=black_vendas&utm_content=belle&utm_term=esteira |

**O que oferecer a quem** (a aba "Comercial · Black" mostra o que a pessoa já tem):

| Quem | Link |
|---|---|
| Ainda não comprou nada | **front** ou **esteira** (quem quer tudo) |
| Comprou o Guia (front) sem a Formação | **upsell** (R$ 297) |
| Comprou só o downsell (curso + comunidade) | a vendedora escolhe: **front**, **esteira** ou **upsell** |
| Tentou o downsell e não pagou | **downsell** |

- O que identifica a vendedora é `utm_source=vendedor` + `utm_content=<nome>`. A `metadata[vendedor]` saiu dos links:
  no teste de 09/11 ela não chegou ao pedido, só as UTMs.
- Copie o link inteiro. Se cortar a UTM, a venda some da planilha.
- O upsell de 1 clique depois da compra no cartão (e o bump no Pix e no boleto) continua automático: o upsell vai
  para a vendedora do pedido principal e o bump já está dentro do mesmo pedido.
- **Quem usou o seu link é seu (10/11).**
  - Se a pessoa abandona o carrinho, deixa o Pix vencer ou tem o cartão recusado pelo seu link, ela **não recebe
    nenhuma mensagem automática** da recuperação.
  - Na aba "Comercial · Black", ela aparece em 🟢 Chamar agora, com o motivo (por exemplo, "Cartão recusado") e o seu
    nome em "Link da vendedora".
- **Só chame quem está em 🟢 ou 💬 na aba "Comercial · Black".** Quem está em ⏳ ainda está recebendo a sequência
  automática; espere a data de "Liberado em" (`COMERCIAL.md`).

## Influenciadoras (link na bio e posts)

Também entram na aba "Vendas · Vendedores", com o nome delas na coluna Vendedor. A diferença para as vendedoras: elas
podem mandar para a **LP**, porque o script da UTMify da LP leva as UTMs até o botão do checkout (testado em 09/11:
o botão saiu com `utm_source=vendedor … utm_content=milena`).

**Milena** (`milena`):

| Uso | Link |
|---|---|
| **Bio e posts (recomendado)**: o público dela ainda não conhece o produto, e a LP explica e mostra o preço | https://black.amarsaber.com.br/?utm_source=vendedor&utm_medium=influencer_bio&utm_campaign=black_vendas&utm_content=milena |
| Figurinha de link nos stories, para quem já decidiu (Guia, R$ 497) | https://seguro.amarsaberstore.com.br/r/LUIR27AS3L?promocode=BLACKAMARSABER&utm_source=vendedor&utm_medium=influencer_bio&utm_campaign=black_vendas&utm_content=milena |
| Só curso + comunidade (R$ 187) | https://seguro.amarsaberstore.com.br/r/5PS9VFMQHI?promocode=BLACKAMARSABERDS&utm_source=vendedor&utm_medium=influencer_bio&utm_campaign=black_vendas&utm_content=milena |

- O link tem que ir inteiro. Se a bio cortar o link, use um encurtador que preserve os parâmetros.
- **Vale a última UTM:** se a pessoa clica na bio e depois compra por um anúncio, pelo grupo ou pela recuperação, a
  venda sai com o outro canal.
- A venda da influenciadora não é 1:1. A gestão decide se entra no bônus ou se é só para medir.
- `utm_medium=influencer_bio` separa na UTMify e na Yampi as vendas dela das vendas no WhatsApp (`whatsapp_1a1`).
- Para uma influenciadora nova, troque `milena` pelo nome curto dela nos links.

## Regra de atribuição (na ordem)

1. **Link pessoal:** o pedido pago tem a UTM (ou a metadata) da vendedora → conta para ela.
2. **Upsell:** o pedido da Formação no cartão é separado e não traz a UTM. Ele herda a vendedora do pedido principal
   (`upsell_sale_id`).
3. **"a validar (Kommo: …)":** pedido sem o link, mas o lead do mesmo telefone está no nome da vendedora no Kommo.
   Só funciona para Heid e Ana, que têm usuário no Kommo. A gestão confirma trocando a coluna **Vendedor**; a troca
   manual é mantida nas atualizações seguintes.
4. Nenhum dos três → a linha fica sem vendedora (venda da LP, do grupo, da recuperação ou de anúncio).

**Bônus:** só pedido pago há mais de 7 dias (garantia). Estornado não conta. Pedido de teste e compra da própria
vendedora não contam.

**Todos os produtos contam** (Black, curso e Formação), desde que a venda seja no 1:1.

## Processo da vendedora

**Desde 10/11, a primeira mensagem sai pelo painel comercial** (`black.amarsaber.com.br/painel-comercial`, ver
`COMERCIAL.md`): o template vai pelo WhatsApp oficial em nome da vendedora, o lead entra no funil Comercial Black com
ela como responsável e o link dela fica no campo `as_link` do lead. O botão "Copiar meu link" do painel copia o link
certo para o caso.

1. Ao assumir uma conversa no Kommo, ponha-se como **responsável do lead** (vale para Heid e Ana; é a rede de
   segurança da regra 3).
2. Mande **o seu link**, nunca o da LP, um link antigo da automação ou um link pego no grupo. Se o cliente comprar por
   outro link, a venda sai com a UTM do outro canal.
3. Se o cliente pedir o link de novo dias depois, mande o seu link de novo.
4. O cliente abriu em outro celular, ou comprou pelo Google? A venda não vem com a UTM. Avise a gestão com o número do
   pedido para corrigir a coluna Vendedor.

## Como funciona por trás

- A Yampi já manda os pedidos da loja para o webhook do fluxo n8n **"AS · Acessos Black"**. Um nó paralelo,
  **"Encaminhar · vendas por vendedor"**, repassa o mesmo evento para o fluxo **"AS · Vendas por vendedor"**. Se o
  repasse falhar, a entrega dos acessos não para.
- **"AS · Vendas por vendedor":** lê o pedido (Black 46520027, curso 46522438, Formação 46637102 e, desde 10/11, esteira
  46682535 e Formação de comprador 46682536; só pagamento e mudança de status) → busca o lead no Kommo pelo telefone → lê a aba → monta a linha → grava pelo número do pedido.
- Pedido cancelado depois de pago vira **estornado**. Pedido que nunca foi pago (Pix vencido, cartão recusado) não
  entra na aba.
- A chave do webhook fica só no n8n, fora do repositório.

## Incluir uma vendedora nova

1. Escolha o nome curto, sem acento e minúsculo (ex.: `carol`).
2. No n8n, fluxo "AS · Vendas por vendedor", nó **Ler pedido**: acrescente `carol: 'Carol'` em `VENDEDORES`. Sem
   isso, a venda ainda entra, com o nome de `utm_content` com a primeira letra maiúscula.
3. Se ela tiver usuário no Kommo: nó **Montar linha**, acrescente `<id do usuário>: 'Carol'` em `RESPONSAVEIS`.
4. Gere os dois links trocando `ana` por `carol` nos dois lugares (`utm_content` e `metadata`).
5. A aba "Bônus" lista as vendedoras sozinha (`UNIQUE` da coluna Vendedor).
6. Painel comercial: acrescente o nome em `VENDEDORAS` nos nós **Ler pedido** e **Preparar envios** (com o id do
   usuário do Kommo) do fluxo "AS · Painel comercial (API)", e em `SLUG` e na escolha "Quem é você?" do
   `painel-comercial/` (`index.html` e `painel.js`).

## Limites conhecidos

- **Belle** usa no Kommo o usuário "Amar Saber" (15657099, a conta principal, decisão de 10/11). Por isso as vendas
  dela contam só pelo link: esse usuário **não** entra em `RESPONSAVEIS` do "AS · Vendas por vendedor" (senão os leads
  da conta principal virariam vendas "a validar" da Belle).
- O painel da Yampi só mostra `utm_source` e `utm_campaign`. Para ver por vendedora, use a aba da planilha (ou filtre
  `utm_source = vendedor` na Yampi e na UTMify).
- A UTMify vai mostrar o canal "vendedor" junto, sem separar quem vendeu.
