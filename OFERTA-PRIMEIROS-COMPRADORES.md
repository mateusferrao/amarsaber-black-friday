# Sala VIP para os 40 primeiros, oferta da sala e ativação do grupo depois da live

Decisões de 06 e 07/11/2026, tomadas pelo Mateus num debate por perguntas, com o Hormozi Squad como base (agentes
offers, pricing, launch, models e workshop). Este documento substitui a versão de 06/11, que tinha sido escrita antes
do debate.

## O problema
Hoje, comprar em 10/11 ou em 29/11 dá o mesmo preço, os mesmos presentes e o mesmo frete. Para um público em que 92%
dizem que "o valor" pesa, esperar é a decisão racional. A Sala VIP cria um motivo real para comprar na hora.

Dados de 06/11:
- 1.647 pessoas nos 5 Grupos VIP.
- Pesquisa da live, 60 respostas completas:
  - 93% ainda não têm o Guia;
  - 92% marcaram o valor;
  - 78% estão na faculdade ou se formaram há menos de 2 anos;
  - o plantão é o tema mais pedido.
- A Black passada teve mais de 70 vendas no 1º dia, com o link no grupo desde a manhã e mensagens o dia inteiro.

## As decisões

| Tema | Decisão |
|---|---|
| Objetivo da sala | urgência na abertura **e** receita dentro da sala, com o mesmo peso |
| Quem entra | **os 40 primeiros pedidos pagos da Black** (produto 46520027, "Guia + curso + comunidade"), pela ordem do pedido. O boleto entra se for pago. **Sem prazo de data ou hora** |
| Formato | **1 encontro ao vivo por vídeo**, fechado, com a equipe da Amar. Cada um leva o seu caso |
| Quando | **depois que o Guia chegar** (decisão interna). Desde 07/11, **nenhum texto público diz quando** é o encontro, nem "depois que o Guia chegar" |
| Diferença para a comunidade | é pequena (40 pessoas, o caso de cada um) e é o **primeiro** encontro: os encontros ao vivo da comunidade começam depois dela |
| Comunidade | passa a ter **encontros ao vivo para todos os compradores** (Black e downsell). Confirmado com a equipe. Texto genérico, sem quantidade e sem data |
| Ofertas na sala | (1) **Formação Completa por R$ 297**: cada caso discutido aponta para o curso da Formação que cobre o tema. (2) **Jornada Semente** (mentoria de ~R$ 7 mil para donos de clínica): pitch para todos, **sem preço**, com a chamada para **preencher a aplicação**; a venda acontece na call. **Nenhum produto novo** |
| Downsell de R$ 187 na sala | **não**: o curso e a comunidade já vêm dentro da Black |
| Texto do upsell e dos bumps ("Essa condição só aparece aqui") | **fica como está**, por decisão do Mateus (risco registrado abaixo) |
| Templates da recuperação | **não mudam** |
| Frete grátis | **fica como está** ("por tempo limitado") |
| "Sem bônus de abertura" (roteiro de 05/11) | **revogado**, por decisão do Mateus e do marketing |
| Sala na LP e no quiz | **saiu da LP e do quiz em 09/11** (chip do hero e card da oferta, decisão do Mateus); a regra dos 40 primeiros segue valendo pela planilha. Antes: sim, **de 07/11 até 11/11** (já visível antes da live, decisão de 07/11). O bloco some às 23h59 de 11/11 por segurança, mesmo que a sala não tenha lotado. O texto deixa a regra clara ("os 40 primeiros pedidos pagos"), sem explicar a ordem dos pedidos |
| Grupo antes da live | teaser na L0 (12h) e na 5 (19h50): "quem decidir primeiro leva algo que não vai se repetir" |
| Grupo na noite de 10/11 | 6a, 6b e 7 **manuais** (Mateus). Depois, **4 agendadas** (21h15, 22h, 22h45, 23h30), **sem número de vagas e sem mensagem de "fechou"**. O grupo só fala da sala nessa noite |
| Ritmo do grupo | **3 por dia de 11 a 17/11** e **2 por dia de 18 a 26/11**. Provas: depoimentos da LP e alguns vídeos novos da Dra. |

## Onde cada decisão foi aplicada

| Onde | O que mudou |
|---|---|
| `index.html` e `teste/index.html` | bloco "Sala VIP · 40 primeiros" na oferta (`data-sala-vip`); a comunidade aparece "com encontros ao vivo" na lista da oferta (e, na LP, também na dor "No caso difícil" e na FAQ) |
| `assets/js/venda.js` | `CONFIG.salaVipInicio` (07/11, 00h) e `CONFIG.salaVipFim` (11/11, 23h59) mostram e escondem o bloco. Para testar: `?previa=1&data=2026-11-10&interno=1` |
| `assets/css/venda.css` | estilo `.vd-sala` (caixa tracejada amarela) |
| `assets/js/teste.js` | resultado "decidir sozinho": a comunidade tem encontros ao vivo |
| `oferta-especial/index.html` | item da comunidade com encontros ao vivo |
| `LIVE-ROTEIRO.md` e `LIVE-ROTEIRO-EQUIPE.docx` | teaser na abertura, comunidade com encontros no Presente 02, bloco **8b · Sala VIP** no pitch, a sala no fechamento, "bônus" fora da lista do que não se fala, e a regra nova no item 7 (urgência) |
| `GRUPO-VIP-MENSAGENS.md` | **Já agendadas no SendFlow (07/11):** L0 (com o teaser e o lembrete do Instagram) e 5 (com o teaser). A 3b, a 4 e a 6b saíram (manutenção até a live). **Aguardam aprovação:** 7, 8, C, Casos #2 e #9 e p3 revisadas, 4 mensagens novas da noite (n2115 a n2330) e 10 de objeção e dor (o1111 a o2511) |
| Planilha de leads, aba **Sala VIP** | lista automática dos 40 primeiros (veja "Contagem") |

## Contagem dos 40
- A aba **Sala VIP** da planilha de leads monta a lista sozinha a partir da aba **Comunidade · Acessos**: os pedidos
  com "Guia + curso + comunidade", sem os marcados como `revogado` (reembolso), ordenados pelo **número do pedido**, os
  40 primeiros. **Não editar a aba.**
- O número do pedido da Yampi é sequencial, então a ordem do número é a ordem dos pedidos, e o fluxo do n8n não
  precisou mudar.
- **Boleto:** o pedido só entra na lista quando é pago, mas na posição do número dele. Um boleto pago dias depois pode
  entrar no meio da lista e tirar o 40º de então. **A lista só fica final depois que os boletos dos primeiros pedidos
  vencerem** (3 dias úteis).
- **Reembolso** libera a vaga para o próximo da fila.
- **Upsell da Formação:** ele gera um pedido separado, sem o produto da Black, e não ocupa vaga.
- **Operação:** quando a lista estiver final, a equipe manda a cada um, individualmente (e-mail pelo Kommo ou WhatsApp do
  atendimento), que a pessoa está na Sala VIP e que a data chega depois que o Guia for entregue.

## O encontro da Sala VIP (roteiro-base)
Cerca de 75 minutos, por vídeo, depois que o Guia chegar.

| Min | Bloco | Pontos |
|---|---|---|
| 0–5 | Abertura | por que só 40 · como funciona (cada um traz o seu caso, alguns são escolhidos antes) · o Guia na mão |
| 5–55 | Casos dos participantes | 4 a 6 casos enviados antes. Cada um termina em: onde está a conduta no Guia e **qual curso da Formação aprofunda o tema** (plantão, hemograma, felinos, casos clínicos, procedimentos, cálculos) |
| 55–65 | Formação Completa | os 6 cursos que faltam (o Atendimento Extraordinário eles já têm) · 111 aulas, 1 ano, certificado · **R$ 297** (lista R$ 697) · 7 dias de garantia |
| 65–72 | Jornada Semente | para quem tem ou vai ter clínica: o que é a mentoria e o que muda na clínica · **sem preço** · chamada: preencher a aplicação (a call vem depois) |
| 72–75 | Fechamento | os encontros da comunidade começam a seguir · obrigado |

A proporção é a do workshop do Hormozi: a maior parte é entrega, e a venda vem no fim. A garantia de 7 dias conta a
partir do recebimento do Guia, e esse é o período em que o encontro acontece: uma sala que pareça só venda vira pedido de
reembolso.

**Falta antes do encontro:**
- o link de checkout da Formação a R$ 297 (o produto 46637102 tem lista de R$ 697; o R$ 297 hoje só existe no upsell e
  nos bumps, então é preciso um cupom de R$ 400 restrito a esse produto);
- o link do formulário de aplicação da Jornada Semente.

## Riscos registrados (decisões tomadas sabendo deles)
1. **"Essa condição só aparece aqui."** O upsell e os bumps dizem isso, e a sala reoferece o mesmo R$ 297. Quem
   aceitou no checkout pode estar na sala e notar. O texto fica por decisão do Mateus. Se quiser trocar, a frase
   alternativa é "Essa condição é só para quem comprou a Black" (Yampi: upsell 449508, bumps 281355 e 282360).
2. **Bloco da LP depois de lotar.** O bloco fica até 11/11, 23h59, mesmo se as 40 vagas acabarem antes. O texto diz
   "os 40 primeiros pedidos pagos" para que ninguém entenda que ainda tem vaga garantida.
3. **Jornada Semente para uma sala de iniciantes.** Pela pesquisa, a maior parte da sala deve ser de estudantes e
   recém-formados (só 2 de 60 têm mais de 5 anos de atendimento). O pitch é para todos; a aplicação filtra quem se
   qualifica.
4. **Mensagens agendadas da noite.** Como saem sozinhas, não levam número de vagas. Se a sala lotar cedo, elas
   continuam verdadeiras porque descrevem a regra, e não as vagas restantes.

## Próximos passos
| O quê | Quem |
|---|---|
| Aprovar os textos novos e revisados em `GRUPO-VIP-MENSAGENS.md` | Mateus |
| Testar cada um no grupo Teste BF, agendar na campanha e cancelar as ações antigas (o SendFlow não edita agendadas) | Mateus (ou o Claude, depois da aprovação) |
| Atualizar os templates manuais 6b e 7 no SendFlow | Mateus |
| Vídeos da Dra. para a o1711 (e, se houver, a o2211) até 16/11 | Dra. |
| Data do encontro da sala e quem da equipe participa | Dra. e Mateus |
| Cupom da Formação a R$ 297 e link da aplicação da Jornada Semente | Daniel e Mateus |
