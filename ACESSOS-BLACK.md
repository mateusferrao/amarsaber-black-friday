# Liberação dos acessos da Black (curso e comunidade)

Quem paga a Black na Yampi recebe sozinho:

| O quê | Onde | Prazo | Como chega |
|---|---|---|---|
| Curso Atendimento Extraordinário | Memberkit, assinatura **Black 2026 · Atendimento Extraordinário** (id 38626, Turma A 394987) | 365 dias a partir do pagamento | integração nativa Yampi → Memberkit, com o webhook da Yampi filtrado pelos 2 produtos (e-mail de boas-vindas do Memberkit) |
| Comunidade Amar Saber | grupo **Comunidade - Guia Amar Saber** no WhatsApp, campanha de mesmo nome no SendFlow | 3 meses a partir do pagamento | e-mail com o link (automação do Kommo); desde 03/11 a pessoa entra direto pelo link, sem aprovação |

**Produtos novos (10/11), vendidos pelos links das vendedoras:**
- **Esteira completa** (46682535, SKU BF26ESTEIRA, `r/MOXSHIVAJY`): R$ 1.834,70 com o cupom BLACKESTEIRA (R$ 794),
  físico, estoque próprio de 300. Libera tudo: curso (Memberkit 38626), Formação (38676), comunidade e e-mail (fluxo
  de acessos, `PRODUTOS` do "Normalizar pedidos") e o Guia impresso.
- **Formação Completa · comprador Black** (46682536, SKU BF26FORMACAO297, `r/OXZJFHDY7F`): R$ 297 sem cupom, digital.
  Libera só a Formação (38676), sem comunidade.
- **Webhooks (marcados no painel em 10/11; a API aceita o PUT mas não grava produtos novos):** esteira no "Memberkit ·
  Black (curso)" (1774262); esteira e Formação de comprador no "Memberkit · Black (formação)" (1775941) e no "Yampi"
  da UTMify (1645171). Conferido pela API.
- **Cupons restritos ao produto** no painel (BLACKAMARSABER, BLACKAMARSABERDS, BLACKESTEIRA), conferido no checkout.

Produtos da Yampi que liberam: **46520027** (Guia + curso + comunidade, R$ 497) e **46522438** (downsell curso +
comunidade, R$ 187). Além deles, a **Formação Completa** (46637102, R$ 297 no upsell do cartão e nos bumps de Pix e
boleto) libera os 7 cursos na assinatura **Black 2026 · Plataforma Completa** (38676) por 365 dias. Não libera
comunidade. Detalhes em [FORMACAO-UPSELL.md](FORMACAO-UPSELL.md). Qualquer outro produto da loja não libera nada.

## Fluxo

```
Yampi pedido pago (46520027 ou 46522438)
 ├─► Memberkit (nativo): aluno criado na assinatura 38626 (365 dias); reembolso bloqueia
 └─► n8n "AS · Acessos Black"
       Pedidos   webhook as-black-acessos + varredura de 30 min na API da Yampi
                 → tabela "AS · Acessos Black" + aba "Comunidade · Acessos"
                 → (KOMMO_ATIVO) lead em Clientes Black / Acesso enviado → e-mail com o link do grupo
       Entradas  DESLIGADO desde 03/11 (gatilho "A cada 5 minutos" desativado): o grupo não pede mais
                 aprovação, para não arriscar banimento do chip. A conferência de intrusos é feita depois.
                 (Quando ligado: pedido de entrada com o mesmo WhatsApp da compra → aprova; não bateu → aba
                 "Comunidade · Pendentes" depois de 30 min.)
       Saída     fora do escopo por enquanto (gatilho das 9h desativado; veja abaixo)
```

- **Um pedido = uma linha**, idempotente pelo número do pedido: paid, invoiced e delivered do mesmo pedido não
  duplicam. A data de pagamento vem do histórico de status da Yampi (alias `paid`).
- **Duas compras da mesma pessoa:** cada pedido tem o seu prazo; a pessoa só sai quando nenhum pedido está válido.
- **Webhook perdido:** a varredura de 30 min lê os 100 pedidos mais recentes da Yampi e grava o que faltou.
- **Comprou com outro WhatsApp:** o pedido de entrada fica na aba **Comunidade · Pendentes**. A equipe escreve o
  número do pedido da Yampi na coluna "Pedido Yampi (preencher para liberar)", e a rodada seguinte (até 5 min) aprova
  e marca "Liberado". Pedido inexistente, sem pagamento ou vencido volta como "Não liberado".
- **Reembolso:** `cancelled`/`refunded` depois de pago marca a linha como `revogado`, para a equipe ver. Ninguém sai
  do grupo sozinho. Status desconhecido depois de pago só gera observação para conferir. O alias exato do reembolso na
  Yampi ainda não apareceu num pedido real.

## Sem aprovação de entrada (desde 03/11)

O Mateus desligou "Aprovar novos participantes" no grupo da comunidade, e o gatilho *A cada 5 minutos* do fluxo foi
desativado. Por isso:
- quem tem o link entra direto, comprador ou não. O link só sai no e-mail da compra, mas pode ser repassado;
- a etapa **Entrou no grupo** do Kommo e a coluna `no_grupo` da tabela não são mais marcadas sozinhas;
- a aba **Comunidade · Pendentes** para de receber linhas;
- **conferência de intrusos:** comparar os participantes do grupo (exportação do SendFlow) com os WhatsApp da tabela
  **AS · Acessos Black** (DDD + 8 últimos dígitos, a mesma regra) e tirar à mão quem não comprou nem é da equipe;
- para religar a aprovação: ligar a opção no grupo e reativar o gatilho *A cada 5 minutos* (o código continua igual,
  com `APROVAR_ATIVO = true`).

O texto do e-mail no Kommo ainda fala em "peça para entrar" e "aprovação automática". Texto novo para o modelo
`AS · Acesso comunidade Black`, no lugar do parágrafo "Como entrar":

> Como entrar: toque no link com o seu WhatsApp e entre no grupo.

## Fora do escopo por enquanto: saída e renovação

O prazo de 3 meses da comunidade fica **registrado** (coluna "Comunidade até" e campo `as_comunidade_ate` no Kommo),
mas por enquanto ninguém é removido do grupo e não há aviso de vencimento nem oferta de renovação. A trilha da saída
continua no fluxo, com o gatilho *Todo dia às 9h* desativado e `REMOVER_ATIVO = false`, para reaproveitar quando a
remoção voltar (o 1º vencimento é em fevereiro/2027). A renovação (avisos 30 e 15 dias antes) ainda não foi criada.

## Formação para os 10 primeiros da live (10/11)
Fluxo separado **AS · Formação 10 primeiros** (`4GuNRs0e6Lk5OzPv`): a cada 5 minutos, os 10 primeiros pedidos pagos
com o Guia a partir de 10/11 às 20h ganham a assinatura 38676 (Formação completa, 1 ano) pela API do Memberkit
(`POST /api/v1/users` com `membership_level_id`; a assinatura 38626 do curso não muda). Reembolso tira a 38676 e passa a
vaga ao próximo. Lista na tabela "AS · Formação 10" e na aba **Formação · 10 primeiros**. Regra completa em
`OFERTA-PRIMEIROS-COMPRADORES.md`.

## Memberkit: liberação garantida pelo n8n (desde 11/11)
- **O problema:** a integração nativa Yampi → Memberkit deixou **41 dos 82 compradores pagos sem acesso** ao curso.
  - 15 ficaram com o curso **inativo**, em geral pessoas com cartão recusado antes do pagamento aprovado.
  - 26 **nunca foram cadastrados** no Memberkit.
- **Causa** (conferida em 11/11 pelo histórico de status de cada pedido):
  1. **Cartão aprovado na hora:** o pedido já nasce "pago", sem passar por "aguardando pagamento".
     - Em 06/11, o `order.created` saiu dos dois webhooks do Memberkit, para o Pix não pago parar de mandar o e-mail
       de acesso. Sobrou só o `order.status.updated`.
     - Como o status desses pedidos nunca muda, a Yampi não avisava o Memberkit.
     - Nenhum dos 43 pagamentos no cartão aprovado na hora recebeu acesso pela integração. O upsell também nasce
       pago, então caiu no mesmo caso.
     - Os que tinham cadastro inativo receberam antes o aviso de um pedido recusado ou cancelado, mas não o do pago.
  2. **Pix pago com um pedido antigo ainda aberto:**
     - o pedido antigo expira 30 min depois, como "cancelado", quando o novo já está pago;
     - o Memberkit recebe esse "cancelado" e desativa o curso;
     - aconteceu com 3 pessoas.
  3. **E-mail digitado errado na compra:** 1 pessoa (gamil).
  - O Pix que passa de "aguardando" para "pago", sem pedido antigo aberto, funcionou normalmente.
- **Correção de 11/11:**
  - o `order.paid` (Pedido aprovado) entrou nos dois webhooks do Memberkit, para o curso e a Formação. Ele só
    dispara no pagamento, então o Pix não pago continua sem e-mail;
  - o fluxo abaixo passou a rodar a cada 5 min e a reenviar quem teve outro pedido cancelado ou recusado na última
    hora.
  - Caso real: a Maryana Moura pagou o Guia e a Formação, mas ficou com o curso inativo e sem a Formação.
- **Em 11/11, ~10h:**
  - os 41 foram liberados pela API: curso 38626 por 1 ano a partir do pagamento, e a Formação 38676 para quem
    comprou;
  - uma nova conferência deu os 82 com acesso ativo.
- **Fluxo novo "AS · Memberkit · garantir acesso"** (n8n `98WvEhMsY8fsd4zr`):
  - **a cada 5 min:** lê os pedidos pagos na Yampi desde 27/10 e libera no Memberkit quem ainda não foi liberado por
    ele (tabela **"AS · Memberkit liberados"**, chave `email|nível`):
    - curso 38626: front, downsell, esteira;
    - Formação 38676: upsell/bump, Formação de comprador, esteira;
  - **a cada 5 min, também:** reenvia a liberação de quem pagou e tem outro pedido que virou cancelado ou recusado
    na última hora. Isso desfaz a desativação do caso 2 da causa;
  - **todo dia às 6h15:** reenvia a liberação de todos os pedidos pagos, o que conserta quem a integração nativa
    desativar;
  - **reembolso ou estorno:** o pedido deixa de estar "pago" e não é mais reenviado. O bloqueio continua com a
    integração nativa do Memberkit;
  - **e-mail digitado errado na compra:** é corrigido na lista `CORRIGIR` do nó "Decidir" (hoje, a Giullya).
- **A integração nativa continua ligada.** Os dois avisos da Yampi para o Memberkit seguem ativos:
  - curso (1774262): `order.status.updated` + `order.paid`;
  - Formação (1775941): `order.updated` + `order.status.updated` + `order.paid`.

  O fluxo novo só garante a liberação.

## Onde está cada coisa

| Sistema | Item |
|---|---|
| n8n | fluxo **AS · Acessos Black** (`hnIC4dP5ECARANTk`), tabela **AS · Acessos Black**. Interruptores no topo dos nós *Decidir pedido* (`KOMMO_ATIVO`), *Decidir entradas* (`APROVAR_ATIVO`); a saída (*Quem sai hoje*) está desativada. A chave do webhook fica no nó *Ler webhook*, não no repositório |
| Planilha | **Leads · Black – Amar Saber**, abas **Comunidade · Acessos** (uma linha por pedido) e **Comunidade · Pendentes** |
| SendFlow | campanha **Comunidade - Guia Amar Saber** (conta BF 2026, 93618-8016), criação de grupos desligada |
| Kommo | funil **Clientes Black** (14699768): Acesso enviado 113585712 · Entrou no grupo 113585716 · Precisa de ajuda 113585720 · Acesso encerrado 113585724. Campos do lead: `as_nome` 881487, `as_pedido` 882627, `as_comunidade_ate` 882629, `as_curso_ate` 882631 |
| Memberkit | assinatura 38626 → curso 297948 / Turma A 394987. Assinatura 38676 (Formação Completa) → os 7 cursos (ver [FORMACAO-PAINEL.md](FORMACAO-PAINEL.md)) |

## Ativação

1. ~~SendFlow: campanha da comunidade e grupo importado~~ (30/10 e 01/11). Convite do grupo:
   `https://chat.whatsapp.com/KcaNKf553yk2k5fu29qeDc`. **Falta (Mateus):** confirmar no celular que "Aprovar novos
   participantes" está ligado no grupo.
2. ~~Kommo: funil Clientes Black e campos~~ (30/10).
3. ~~n8n: tabela, abas, fluxo, credencial Yampi API~~ (30/10 e 01/11). Fluxo **publicado** em 01/11 com `KOMMO_ATIVO` e
   `APROVAR_ATIVO` desligados: grava os pedidos da Black e lista os pendentes, mas não aprova nem manda e-mail. Webhook
   e varredura testados com um pedido antigo (descartado por não ser da Black).
4. ~~Yampi: webhook "AS · Acessos Black (n8n)"~~ (01/11, pela API; order.paid e order.status.updated). O n8n já filtra os
   2 produtos.
5. ~~**Memberkit ↔ Yampi:**~~ (01/11; conferido pela API: "Memberkit · Black (curso)" ativo, URL
   `memberkit.com.br/callbacks/yampi/…`, Pedido criado + Status atualizado, só os produtos 46520027 e 46522438). a integração nativa não escolhe produto, então o filtro fica no webhook da Yampi.
   A API da Yampi não grava a lista de produtos do webhook: ela é marcada no painel.
   - Memberkit → Integrações → Yampi: nome `Yampi · Black 2026`, **chave secreta** = a do webhook "Memberkit · Black
     (curso)" na Yampi (Configurações → Webhooks), modalidade **Assinatura**, conteúdo **Black 2026 · Atendimento
     Extraordinário** → **Gerar URL de Notificação**.
   - Yampi → Configurações → Webhooks → editar **"Memberkit · Black (curso)"** (criado desligado pela API em 01/11,
     eventos Pedido criado e Status do pedido atualizado): colar a URL do Memberkit, marcar **só** os produtos
     46520027 e 46522438, ativar e salvar. Sem produto marcado, o webhook vale para a loja inteira.
   - Depois disso, ninguém mexe nesse webhook pela API: um PUT sem a lista de produtos pode apagar o filtro.
   - **06/11: sem "Pedido criado".** Um Pix gerado e não pago (pedido de teste 178013480) fez o Memberkit mandar o
     e-mail de acesso, com a assinatura `pending` e tudo trancado. Para isso não acontecer com quem não paga, os
     webhooks "Memberkit · Black (curso)" (1774262) e "Memberkit · Black (formação)" (1775941) ficaram sem
     `order.created`; os produtos foram mantidos (conferido pela API).
     - O de curso ficou só com `order.status.updated`.
     - O da formação ficou com `order.updated` e `order.status.updated`.
     - Falta confirmar, com um pedido pago de teste, que o acesso chega só com o pagamento.
   - **Pela API**, a lista de produtos de um webhook se grava com o campo `products_ids`. O campo `products` é
     ignorado no PUT e não apaga a lista.
   - **UTMify:** o webhook "Yampi" (1645171) recebe também a Formação Completa (46637102) desde 06/11.
6. ~~Kommo: caixa, modelo e bot de e-mail~~ (01/11). E-mail de teste chegou na caixa de entrada; `KOMMO_ATIVO = true` e
   fluxo publicado em 01/11.
7. ~~Teste de ponta a ponta~~ (01/11, simulação sem pedido real na Yampi, com os dados do Mateus) e `APROVAR_ATIVO = true`.
   - Memberkit: aviso da Yampi assinado com a chave do webhook, para os 2 produtos → aluno criado na assinatura 38626
     até 01/11/2027 e e-mail de boas-vindas recebido.
   - n8n (entrada temporária de simulação, já removida): 2 pedidos da Black gravados, Guia avulso ignorado, sem duplicar
     no reenvio, cancelamento depois de pago → `revogado`; lead no Kommo e e-mail com o link recebidos.
   - Entrada no grupo: o 99137-2667 pediu para entrar e foi aprovado sozinho na rodada seguinte (SendFlow `matched = 1`).
     O número chega sem o 9 (`553191372667`), e a regra DDD + 8 dígitos casa.
   - Bug achado e corrigido: o nó *Lead criado* não lia o ID do lead (o n8n entrega a resposta do Kommo item a item).
   - Limpeza: linhas de teste apagadas da tabela e da planilha, leads de teste em Closed - lost, aluno de teste arquivado
     no Memberkit. Não testado: o aviso real da Yampi (só pela API, sem pedido real); o 1º pedido real confirma.

## Kommo: e-mail automático com o link do grupo

Caixa conectada em 01/11: **amarsaber@amarveterinaria.com.br** (servidor `mail03.l4email.com`, IMAP 993 e SMTP 465 com
SSL). Precisa estar como **Compartilhado**: a automação do funil envia pela caixa compartilhada da equipe.

1. **Caixa de e-mail:** menu **E-mail** → engrenagem / configurações da caixa → conferir o endereço conectado e se está
   ativo. Esse endereço é o remetente.
2. **Modelo:** E-mail → Modelos (ou Configurações → Modelos de e-mail) → **+ Novo modelo**. Nome
   `AS · Acesso comunidade Black`, assunto `Seu acesso à Comunidade Amar Saber`, corpo abaixo. Nome e data entram pelo
   seletor de campos (o modelo atual usa o nome do contato, que vem completo da Yampi; para só o primeiro nome, trocar
   pelo campo `as_nome` do lead).
3. **Bot:** Salesbot **"AS - LIBERAÇÃO DE ACESSOS"**, gatilho "Movido para ou criado na etapa" Clientes Black / Acesso
   enviado → passo **Enviar email** com o modelo `AS · Acesso comunidade Black`, remetente **Gerente responsável**, só
   o contato principal. O n8n cria o lead com o responsável **Amar Saber (15657099)**, dono da caixa, então o e-mail sai
   de `amarsaber@amarveterinaria.com.br`.
4. ~~Teste~~ (01/11): lead "TESTE · Acesso Black" (`mateusferraocosta2000@gmail.com`) recebeu o e-mail na caixa de
   entrada com o link certo; o lead foi para Closed - lost.

O n8n deixa no contato **só o e-mail da compra** antes de criar o lead (desde 09/11). O passo "Enviar email" manda
para **todos** os e-mails do contato principal: no teste de 09/11 (pedido 178395351) o contato tinha 3 e-mails e
chegaram 3 e-mails iguais. O Kommo não tem opção de escolher um só endereço. Os e-mails antigos ficam numa nota do
contato ("E-mails do contato antes da compra …"), nó "Kommo · nota e-mails antigos". Contato que já tinha só o e-mail
da compra não é mexido.

O bot também tinha o gatilho **"Qualquer nova conversa"**, que pode reenviar o e-mail quando o comprador escreve no
WhatsApp. Deve ficar só "Movido para ou criado na etapa" (ajuste no Kommo, pelo usuário).

**Texto (aprovar com a Dra. antes):**

> Oi, [as_nome]!
>
> Sua compra da Black do Guia de Protocolos foi confirmada, e aqui está o seu acesso à Comunidade Amar Saber no
> WhatsApp:
>
> 👉 [Entrar na comunidade](https://chat.whatsapp.com/KcaNKf553yk2k5fu29qeDc)
>
> Como entrar: toque no link com o WhatsApp do número que você usou na compra e peça para entrar. A aprovação é feita
> automaticamente em alguns minutos. Se você usou outro número na compra, responda este e-mail com o WhatsApp certo,
> que a equipe libera.
>
> O acesso ao curso Atendimento Extraordinário chega em outro e-mail, da MemberKit, com o seu login. O Guia
> impresso é enviado em até 10 dias úteis.
>
> Dúvidas: WhatsApp (31) 9 5349-5052.
>
> Dra. Maria Paula · Amar Saber

## Teste de ponta a ponta

1. Pedido real no downsell (cupom de 100% ou valor mínimo), com o próprio e-mail e WhatsApp:
   - Memberkit: aluno na Turma A com vencimento em pagamento + 365 dias; histórico de integrações sem erro;
   - n8n: linha `ativo` com `comunidade_ate` = pagamento + 3 meses, sem duplicar quando chegam paid e delivered;
   - Kommo: lead em Clientes Black / Acesso enviado e e-mail recebido;
   - WhatsApp: pedir para entrar → aprovado em até 5 min → linha `no_grupo`, lead em Entrou no grupo;
   - outro número sem compra pede para entrar → fica pendente e aparece em Comunidade · Pendentes depois de 30 min.
2. Reembolso do pedido de teste: Memberkit bloqueia; o n8n marca a linha como `revogado` e registra o status que
   chegou (confirma o alias do reembolso). A saída do grupo, se for o caso, é feita à mão.
3. Webhook perdido: com o webhook desligado, um pedido entra pela varredura de 30 min.
4. Pedido de outro produto (ex.: Guia Vol. 3 avulso) não entra na tabela.
