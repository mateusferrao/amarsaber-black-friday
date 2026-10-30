# Liberação dos acessos da Black (curso e comunidade)

Quem paga a Black na Yampi recebe sozinho:

| O quê | Onde | Prazo | Como chega |
|---|---|---|---|
| Curso Atendimento Extraordinário | Memberkit, assinatura **Black 2026 · Atendimento Extraordinário** (id 38626, Turma A 394987) | 365 dias a partir do pagamento | integração nativa Yampi → Memberkit (e-mail de acesso do Memberkit) |
| Comunidade Amar Saber | grupo **Comunidade - Guia Amar Saber** no WhatsApp, campanha de mesmo nome no SendFlow | 3 meses a partir do pagamento | e-mail com o link (automação do Kommo) e aprovação automática da entrada |

Produtos da Yampi que liberam: **46520027** (Guia + curso + comunidade, R$ 497) e **46522438** (downsell curso +
comunidade, R$ 187). Não há upsell. Qualquer outro produto da loja não libera nada.

## Fluxo

```
Yampi pedido pago (46520027 ou 46522438)
 ├─► Memberkit (nativo): aluno criado na assinatura 38626 (365 dias); reembolso bloqueia
 └─► n8n "AS · Acessos Black"
       Pedidos   webhook as-black-acessos + varredura de 30 min na API da Yampi
                 → tabela "AS · Acessos Black" + aba "Comunidade · Acessos"
                 → (KOMMO_ATIVO) lead em Clientes Black / Acesso enviado → e-mail com o link do grupo
       Entradas  a cada 5 min: pedidos de entrada no grupo (aprovação ligada no grupo)
                 → mesmo WhatsApp da compra (DDD + 8 últimos dígitos): aprova (APROVAR_ATIVO)
                 → não bateu: aba "Comunidade · Pendentes" depois de 30 min (nunca recusa)
       Saída     todo dia 9h: venceu os 3 meses → remove pelo SendFlow (REMOVER_ATIVO, máx. 30/dia)
                 reembolso/chargeback → remove só com REMOVER_REVOGADOS
```

- **Um pedido = uma linha**, idempotente pelo número do pedido: paid, invoiced e delivered do mesmo pedido não
  duplicam. A data de pagamento vem do histórico de status da Yampi (alias `paid`).
- **Duas compras da mesma pessoa:** cada pedido tem o seu prazo; a pessoa só sai quando nenhum pedido está válido.
- **Webhook perdido:** a varredura de 30 min lê os 100 pedidos mais recentes da Yampi e grava o que faltou.
- **Comprou com outro WhatsApp:** o pedido de entrada fica na aba **Comunidade · Pendentes**. A equipe escreve o
  número do pedido da Yampi na coluna "Pedido Yampi (preencher para liberar)", e a rodada seguinte (até 5 min) aprova
  e marca "Liberado". Pedido inexistente, sem pagamento ou vencido volta como "Não liberado".
- **Reembolso:** `cancelled`/`refunded` depois de pago marca a linha como `revogado`. Status desconhecido depois de
  pago só gera observação para conferir. O alias exato do reembolso na Yampi ainda não apareceu num pedido real.

## Onde está cada coisa

| Sistema | Item |
|---|---|
| n8n | fluxo **AS · Acessos Black** (`hnIC4dP5ECARANTk`), tabela **AS · Acessos Black**. Interruptores no topo dos nós *Decidir pedido* (`KOMMO_ATIVO`), *Decidir entradas* (`APROVAR_ATIVO`) e *Quem sai hoje* (`REMOVER_ATIVO`, `REMOVER_REVOGADOS`). A chave do webhook fica no nó *Ler webhook*, não no repositório |
| Planilha | **Leads · Black – Amar Saber**, abas **Comunidade · Acessos** (uma linha por pedido) e **Comunidade · Pendentes** |
| SendFlow | campanha **Comunidade - Guia Amar Saber** (conta BF 2026, 93618-8016), criação de grupos desligada |
| Kommo | funil **Clientes Black** (14699768): Acesso enviado 113585712 · Entrou no grupo 113585716 · Precisa de ajuda 113585720 · Acesso encerrado 113585724. Campos do lead: `as_nome` 881487, `as_pedido` 882627, `as_comunidade_ate` 882629, `as_curso_ate` 882631 |
| Memberkit | assinatura 38626 → curso 297948 / Turma A 394987 |

## Ativação

1. ~~SendFlow: campanha da comunidade~~ (feito em 30/10).
2. **SendFlow (Mateus):** importar o grupo "Comunidade - Guia Amar Saber" na campanha, pelo painel (Campanha →
   Importar grupos), **sem padronizar**. Confirmar que a aprovação de entrada está ligada no grupo.
3. ~~Kommo: funil Clientes Black e campos~~ (feito em 30/10).
4. ~~n8n: tabela, abas da planilha e fluxo~~ (feito em 30/10, desligado). Trilha das entradas testada sem dados.
5. **n8n (Mateus):** criar a credencial **Yampi API** do tipo *Custom Auth* com
   `{"headers":{"User-Token":"<token>","User-Secret-Key":"<chave secreta>"}}` e escolher nos nós *Yampi · pedido* e
   *Yampi · últimos pedidos*.
6. **Memberkit (Mateus):** conferir "Extensão de acesso" = 365 na assinatura, gerar a URL de webhook da Yampi
   (Integrações → Yampi), vincular os produtos 46520027 e 46522438 à assinatura e mandar a URL. A Yampi manda todos os
   pedidos da loja para essa URL: se a tela não vincular por produto, usar a API do Memberkit pelo n8n em vez da
   integração nativa.
7. **Yampi:** cadastrar pela API o webhook do Memberkit e o `as-black-acessos` (order.paid, order.status.updated),
   com o fluxo publicado.
8. **Kommo (Mateus):** automação de e-mail na etapa Acesso enviado (passo a passo abaixo); depois `KOMMO_ATIVO = true`.
9. **Teste de ponta a ponta** (abaixo), depois `APROVAR_ATIVO = true`. `REMOVER_ATIVO` liga no teste e volta a
   `false` até o 1º vencimento (fevereiro/2027).

## Kommo: e-mail automático com o link do grupo

1. **Caixa de e-mail:** menu **E-mail** → engrenagem / configurações da caixa → conferir o endereço conectado e se está
   ativo. Esse endereço é o remetente.
2. **Modelo:** E-mail → Modelos (ou Configurações → Modelos de e-mail) → **+ Novo modelo**. Nome
   `AS · Acesso comunidade Black`, assunto `Seu acesso à Comunidade Amar Saber`, corpo abaixo. Nome e data entram pelo
   seletor de campos: `as_nome` e `as_comunidade_ate` do lead.
3. **Automação:** Leads → funil **Clientes Black** → Automatizar → coluna **Acesso enviado** → **+ Adicionar gatilho**
   → **Enviar e-mail**: ao mover ou criar nesta etapa, todos os leads, destinatário contato principal, remetente da
   caixa do passo 1, modelo `AS · Acesso comunidade Black`. Salvar.
4. **Teste:** lead de teste com o próprio e-mail nessa etapa; conferir remetente, nome, link e se caiu no spam.

O n8n grava o e-mail da compra no contato antes de criar o lead, porque o e-mail sai para o e-mail do contato.

**Texto (aprovar com a Dra. antes):**

> Oi, [as_nome]!
>
> Sua compra da Black do Guia de Protocolos foi confirmada, e aqui está o seu acesso à Comunidade Amar Saber no
> WhatsApp:
>
> 👉 [Entrar na comunidade] (link do grupo)
>
> Como entrar: toque no link com o WhatsApp do número que você usou na compra e peça para entrar. A aprovação é feita
> automaticamente em alguns minutos. Se você usou outro número na compra, responda este e-mail com o WhatsApp certo,
> que a equipe libera.
>
> Seu acesso à comunidade vale até [as_comunidade_ate].
>
> O curso Atendimento Extraordinário chega em outro e-mail, da MemberKit, com o login da área de membros. O Guia
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
2. Reembolso do pedido de teste: Memberkit bloqueia; o n8n registra o status que chegou (confirma o alias do
   reembolso). Com `REMOVER_ATIVO` e `REMOVER_REVOGADOS` ligados só no teste, o número sai do grupo no dia seguinte às 9h
   (ou rodando o nó à mão).
3. Webhook perdido: com o webhook desligado, um pedido entra pela varredura de 30 min.
4. Pedido de outro produto (ex.: Guia Vol. 3 avulso) não entra na tabela.
