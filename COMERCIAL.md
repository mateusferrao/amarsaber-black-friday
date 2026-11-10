# Aba "Comercial · Black" (lista para a equipe ir atrás)

Planilha **Leads · Black – Amar Saber**, aba **Comercial · Black** (primeira aba). Uma linha por pessoa, atualizada
sozinha às **8h, 12h, 16h e 20h** pelo fluxo n8n **"AS · Comercial (lista)"**. Além disso, **cada venda paga ou
estornada atualiza na hora a linha do comprador** (Lista, O que já tem e Oferta possível; "Atualizado em" termina com
"(venda)"), pelo fluxo "AS · Vendas por vendedor". O que a equipe anotou nunca é apagado.

## As listas (coluna "Lista")

| Lista | Quem | O que oferecer |
|---|---|---|
| **1 · Upsell** | comprou o Guia (front ou esteira) e não tem a Formação Completa | link **upsell** (Formação a R$ 297) |
| **2a · Comprou downsell** | comprou o curso + comunidade (R$ 187) e não tem o Guia | a vendedora escolhe: **front**, **esteira** ou **upsell** |
| **2c · Não pagou o Guia (carrinho/Pix)** | abandonou o checkout do Guia, gerou Pix ou boleto sem pagar (inclui Pix "aguardando pagamento" na Yampi) ou teve o cartão recusado, e não comprou nada | ajudar a finalizar: **front** ou **esteira** |
| **2b · Não comprou downsell** | começou o checkout, gerou Pix ou teve o cartão recusado no downsell e não comprou nada | link **downsell** |
| **3 · Grupo** | está ou esteve nos grupos VIP desta Black, **ou se cadastrou no acesso antecipado e nunca entrou no grupo** (coluna Grupo = "nunca entrou"), e não comprou nada (dos grupos #3 a #5 da Black passada, só quem se cadastrou este ano) | **front** ou **esteira** |
| Comprou tudo | tem o Guia e a Formação | não chamar para vender |
| Comprou só a Formação | caso raro | front |
| Estornou · não chamar | pediu reembolso | **não chamar** (decisão de 06/11) |

Os links de cada vendedora por produto estão no `VENDEDORES.md`.

## Prioridade (coluna B): por onde começar
- **1 · quente:** dinheiro na mesa ou conversa aberta. Listas 2a, 2b e 2c; upsell de quem comprou há até 3 dias; e,
  na lista 3, quem respondeu a automação (EM ATENDIMENTO), quem **não recebeu a mensagem automática** (template não
  entregue: só o 1:1 alcança) ou quem respondeu a pesquisa da live.
- **2 · morno:** cadastrou neste ano (acesso antecipado) e está ou esteve no grupo; upsell de quem comprou há mais tempo.
- **3 · frio:** só está nos grupos da Black passada, sem cadastro deste ano.

Filtre **Prioridade = 1 · quente** e **Vendedora vazia** para começar o dia.

## Colunas

**Da equipe (a automação nunca apaga nem muda):**
- **Vendedora:** escolha livre (Ana, Heid, Belle); quem assumir escreve o nome.
- **Status do contato:** A chamar, Chamado, Respondeu, Negociando, Não quer, Comprou.
- **Próxima ação:** data.
- **Observação.**

**Automáticas (refeitas a cada atualização):**
- **Lista** e **Oferta possível**.
- **Nome**, **Link WhatsApp** (abre a conversa), **WhatsApp**, **Email**, **Cidade/UF** (do endereço de entrega).
- **O que já tem:** cada compra com produto, data, valor, pagamento e a vendedora do link (se houver), e **AGUARDANDO
  PAGAMENTO** quando há Pix ou boleto gerado e ainda não pago.
- **Grupo:** no grupo, saiu do grupo ou nunca entrou.
- **Automação:** última mensagem automática da recuperação e a data, o aviso **EM ATENDIMENTO** quando a pessoa já
  respondeu um template (a equipe pode chamar; é só olhar a conversa no Kommo antes) e **MENSAGEM AUTOMÁTICA NÃO
  ENTREGUE** quando o template falhou.
- **Quiz:** dor, tempo de formada e onde atende.
- **Pesquisa da live:** se já tem o Guia, o que pesa na decisão e o caso que pediu.
- **Cadastro** e **Origem do cadastro** (canal, campanha e anúncio).
- **Kommo:** link do lead, quando existe.
- **Chave:** DDD + 8 últimos dígitos do telefone (é por ela que a linha é atualizada; não editar).

## Como usar
1. Filtre por **Lista** (comece pela 1 · Upsell, que já confiou na marca e compra mais fácil) e por **Vendedora**
   vazia.
2. Escreva o seu nome em **Vendedora** antes de chamar, para ninguém chamar a mesma pessoa.
3. Mande o **seu** link do produto da coluna **Oferta possível**.
4. Atualize **Status do contato** e **Próxima ação**.
5. Antes de chamar, olhe **Automação**: se a última mensagem automática saiu há pouco, espere ou mencione o que ela
   recebeu.

## De onde vêm os dados (fluxo "AS · Comercial (lista)", n8n `DU3pXpHMjMZ6hLZP`)
- **Yampi:** pedidos desde 27/10 (pagos e estornados) dos produtos 46520027 (front), 46522438 (downsell), 46637102
  (Formação upsell/bump), 46682535 (esteira) e 46682536 (Formação de comprador). Pix vencido e cartão recusado não
  contam como compra.
- **SendFlow:** exportação da campanha "Black 2026 · Grupo VIP" com quem saiu.
- **Planilha:** abas "Leads - Grupo WhatsApp" (cadastro), "Leads - Quiz" e "Pesquisa da live".
- **Fila da recuperação** (n8n): fluxo, status, último template e lead do Kommo.
- Grava com "atualizar ou incluir" pela coluna **Chave**, só nas colunas automáticas.

## Estoque (aba "Estoque · Guia")
O mesmo fluxo atualiza a aba **Estoque · Guia** nos 4 horários: estoque da Black (673 em 10/11), estoque da esteira
(300, separado na Yampi), Guias vendidos e o total. A linha fica **vermelha** com menos de 50 unidades ou menos de 15%
restante em qualquer dos dois. A conferência diária das 19h também cita o estoque.

## Limites
- A compra muda a linha na hora; o resto (grupo, automação, quem entrou ou saiu) só nas 4 atualizações do dia.
- Venda de quem não deixou telefone no checkout não tem como achar a linha: entra na atualização completa seguinte.
- Quem não deixou WhatsApp em nenhum lugar (compra sem telefone) não entra. Números fixos e de fora do Brasil entram
  com o link do WhatsApp como vieram.
- E-mail só aparece para quem comprou (a captura não pede e-mail). Nome vazio = está só no grupo da Black passada.
- Os números da equipe (admins, chips e vendedoras) ficam fora. Hoje só a Heid está na lista de exclusão: passar os
  números da Ana e da Belle para incluir.
- Uma edição feita exatamente durante a gravação (alguns segundos) pode se perder.
