# Aba "Comercial · Black" (lista para a equipe ir atrás)

Planilha **Leads · Black – Amar Saber**, aba **Comercial · Black** (a primeira). Há uma linha por pessoa.
- O fluxo n8n **"AS · Comercial (lista)"** refaz a aba sozinho às **8h, 12h, 16h e 20h**.
- **Cada venda paga ou estornada atualiza na hora a linha do comprador** pelo fluxo "AS · Vendas por vendedor". Nesse
  caso, a coluna "Atualizado em" termina com "(venda)".
- O que a equipe preenche nunca é apagado.

**Regra principal (10/11): a vendedora só chama depois que a sequência automática da pessoa termina.** A reta final
(28 a 30/11) vai para todo mundo e não segura ninguém.

**Quem é só do grupo começa em 11/11, às 8h (decisão de 10/11).**
- **Quem segura:** está no grupo, saiu do grupo, cadastrou e nunca entrou, respondeu a pesquisa da live, ou não
  recebeu a mensagem automática.
- **Até lá:** essas pessoas ficam em ⏳, com "Liberado em" 11/11 08:00. A Black abre na live de 10/11, e a noite e a
  mensagem das 10h de 11/11 saem só no grupo.
- **O que pode ser chamado a qualquer hora:**
  - quem comprou só uma parte (falta a Formação ou o Guia);
  - quem teve o cartão recusado, deixou o Pix vencer ou abandonou o carrinho pelo link de uma vendedora;
  - quem respondeu a mensagem automática (💬, no Kommo).
- **Pela LP:** cartão, Pix e carrinho feitos pela LP continuam esperando a sequência automática deles.

## Guia rápido da vendedora
A legenda está no topo da aba: linha 1 com o "como usar", linha 2 com o que é cada coluna e linha 3 com o cabeçalho.
1. Filtre **Situação = 🟢 Chamar agora** e **Vendedora vazia**. Comece pela **Prioridade 1 · quente**.
2. Escolha o **seu nome** em Vendedora **antes** de chamar, para ninguém chamar a mesma pessoa.
3. Abra o **Link WhatsApp** e mande o **seu** link do produto que está em **Mandar o link** (os links ficam no
   `VENDEDORES.md` e no topo da aba "Vendas · Vendedores").
4. Preencha **Status do contato**, **Retornar em** e **Objeção**. As três só aceitam valores da lista. Detalhe que não
   cabe nelas vai como nota no lead do Kommo.
5. Se a coluna **Link da vendedora** tiver o nome de outra vendedora, a pessoa é dela.

## Situação (coluna A): o que fazer agora

| Situação | O que significa | O que fazer |
|---|---|---|
| 🟢 Chamar agora | sem automação em andamento | chamar |
| 💬 Continuar no Kommo | a pessoa respondeu uma mensagem automática e a conversa está aberta no Kommo | continuar por lá (link do lead na coluna Kommo) |
| ⏳ Aguardar automação | a pessoa ainda está recebendo a sequência automática | **não chamar** antes da data em **Liberado em** |
| ⛔ Não chamar | estornou ou pediu para não receber ("Pagar mais caro") | não chamar |
| ✅ Comprou tudo | tem o Guia e a Formação | não chamar para vender |

**Liberado em:**
- é a última mensagem prevista da sequência automática (sem contar a reta final), mais 24 h para a pessoa responder;
- quando um Pix da LP fica sem pagar, ele vence em 30 min e entra na recuperação; nesse caso a data é uma estimativa
  de 3 dias e é refeita na atualização seguinte;
- quem está fora do grupo e recebe o lançamento de 10/11 fica liberado por volta de **16/11, 10h**.

## Motivo (coluna C): por que a pessoa está na lista
Valores possíveis, do mais forte para o mais fraco:
- Comprou o Guia, falta a Formação
- Comprou o downsell, falta o Guia
- Comprou a Formação, falta o Guia
- Cartão recusado
- Pix não pago
- Carrinho abandonado
- Pix aguardando pagamento
- Boleto aguardando pagamento
- Tentou o downsell e não pagou
- Mensagem automática não entregue
- Respondeu a mensagem automática
- Respondeu a pesquisa da live
- Está no grupo, não comprou
- Saiu do grupo, não comprou
- Cadastrou e nunca entrou no grupo
- Pediu para não receber
- Estornou
- Comprou tudo

## Prioridade (só para 🟢 e 💬)
- **1 · quente:** dinheiro na mesa ou conversa aberta. Inclui:
  - listas 2a, 2b e 2c;
  - carrinho, Pix ou cartão recusado feito pelo link de uma vendedora;
  - upsell de quem comprou há até 3 dias;
  - na lista 3, quem respondeu a automação, quem não recebeu a mensagem automática ou quem respondeu a pesquisa da live.
- **2 · morno:** cadastrou neste ano (acesso antecipado), ou upsell de quem comprou há mais tempo.
- **3 · frio:** só está nos grupos da Black passada, sem cadastro deste ano.
- **—:** quem não deve ser chamado agora.

## Mandar o link (coluna G)
Valores possíveis:
- Upsell (Formação R$ 297)
- Front ou esteira
- Downsell (R$ 187)
- Front, esteira ou upsell (a vendedora escolhe)
- Front
- —

## As listas (coluna Lista)

| Lista | Quem |
|---|---|
| **1 · Upsell** | comprou o Guia (front ou esteira) e não tem a Formação Completa |
| **2a · Comprou downsell** | comprou o curso + comunidade (R$ 187) e não tem o Guia |
| **2c · Não pagou o Guia (carrinho/Pix)** | abandonou o checkout do Guia ou da esteira, gerou Pix ou boleto sem pagar, ou teve o cartão recusado, e não comprou nada |
| **2b · Não comprou downsell** | começou o checkout, gerou Pix ou teve o cartão recusado no downsell e não comprou nada |
| **3 · Grupo** | está ou esteve nos grupos VIP desta Black, ou se cadastrou e nunca entrou, e não comprou nada (dos grupos #3 a #5 da Black passada, só quem se cadastrou este ano) |
| Comprou só a Formação · Comprou tudo · Estornou · não chamar | ver a Situação |

## Colunas
- **Da equipe** (rosa; a automação nunca apaga nem muda; só aceitam valores da lista):
  - **Vendedora:** Ana, Heid ou Belle.
  - **Status do contato:** Chamei, Sem resposta, Respondeu, Link enviado, Negociando, Comprou, Não quer ou Número
    inválido.
  - **Retornar em:** data.
  - **Objeção:** Preço, Parcelamento, Prazo de entrega, Já tenho edição anterior, Não é o momento, Vai pensar, Serve
    para mim? ou Sem objeção.
- **Automáticas** (protegidas com aviso; refeitas a cada atualização):
  - **Situação, Liberado em, Motivo, Prioridade, Mandar o link:** ver acima.
  - **Link da vendedora:** de quem é o link usado no carrinho, no Pix, no cartão ou na compra.
  - **Lista.**
  - **O que já tem:** compras (produto, data, valor, pagamento e vendedora), estornos, **AGUARDANDO PAGAMENTO**, e
    também **CARTÃO RECUSADO**, **PIX NÃO PAGO** e **CARRINHO ABANDONADO** com o produto e a data. Quando o evento
    veio pelo link de uma vendedora, aparece o nome dela.
  - **Grupo:** no grupo, saiu do grupo ou nunca entrou.
  - **Automação:** só descreve o que já saiu e qual é a próxima mensagem. Quem decide se pode chamar é a coluna
    Situação.
  - **Quiz, Pesquisa da live, Cadastro, Origem do cadastro, Cidade/UF, Email, WhatsApp, Kommo** (link do lead).
  - **Chave:** DDD + 8 últimos dígitos. É por ela que a linha é atualizada; não editar.

## Link da vendedora e automação (as duas não se atropelam)
- **A automação não entra por cima da vendedora:**
  - se a pessoa abandona o carrinho, deixa o Pix vencer ou tem o cartão recusado **pelo link de uma vendedora**, ela
    não recebe nenhuma mensagem automática individual, nem a reta final;
  - na fila da recuperação, a pessoa fica com status `vendedora`;
  - na aba, ela aparece em **🟢 Chamar agora**, quente, com o nome da vendedora.

  Vale para os produtos front, downsell, esteira e Formação de comprador.
- **A vendedora não entra por cima da automação:** enquanto a sequência roda, a pessoa fica em ⏳.

## De onde vêm os dados (fluxo "AS · Comercial (lista)", n8n `DU3pXpHMjMZ6hLZP`)
- **Yampi:** pedidos desde 27/10 (pagos, estornados e aguardando pagamento) dos produtos:
  - 46520027 (front);
  - 46522438 (downsell);
  - 46637102 (Formação, upsell ou bump);
  - 46682535 (esteira);
  - 46682536 (Formação de comprador).
- **SendFlow:** exportação da campanha "Black 2026 · Grupo VIP", incluindo quem saiu.
- **Planilha:** abas "Leads - Grupo WhatsApp", "Leads - Quiz" e "Pesquisa da live".
- **Fila da recuperação (n8n):**
  - fluxo, status e mensagens enviadas;
  - próxima mensagem e alternativa;
  - linhas `vendedora`;
  - lead do Kommo.

  A previsão do "Liberado em" usa as mesmas regras de horário do disparador da recuperação.
- **Como grava:** "atualizar ou incluir" pela Chave. O cabeçalho fica na linha 3 e os dados começam na linha 4.

## Estoque (aba "Estoque · Guia")
O mesmo fluxo atualiza a aba **Estoque · Guia** nos 4 horários:
- estoque da Black;
- estoque da esteira (separado na Yampi);
- Guias vendidos e o total.

Fica o alerta quando um dos dois tem menos de 50 unidades ou menos de 15% restante.

## Limites
- A compra muda a linha na hora. O resto (automação, grupo, cartão recusado) só nas 4 atualizações do dia.
  **Antes de chamar, olhe o lead no Kommo:** se saiu mensagem automática nas últimas horas, espere.
- Venda de quem não deixou telefone no checkout não acha a linha na hora; entra na atualização completa seguinte.
- Números fixos e de fora do Brasil entram com o link do WhatsApp como vieram.
- E-mail só aparece para quem comprou.
- Os números da equipe ficam fora da aba. Hoje só a Heid está na lista de exclusão; faltam os números da Ana e da Belle.
- Uma edição feita durante a gravação (alguns segundos) pode se perder.
