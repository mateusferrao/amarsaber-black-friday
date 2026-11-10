# Aba "Comercial · Black" (lista para a equipe ir atrás)

Planilha **Leads · Black – Amar Saber**, aba **Comercial · Black** (a primeira). Há uma linha por pessoa.
- O fluxo n8n **"AS · Comercial (lista)"** refaz a aba sozinho **de hora em hora, das 7h às 23h** (desde 10/11; antes eram 4 vezes por dia).
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

## Painel comercial (10/11): é por ele que as vendedoras trabalham
**Endereço:** `https://black.amarsaber.com.br/painel-comercial/` · **PIN:** passado pela gestão (não fica no
repositório).
- **Entrar:** PIN + "Quem é você?" (Heid, Ana ou Belle). O login dura até fechar a aba do navegador.
- **Abas:**
  - **Chamar agora:** 🟢 e sem dona, da Prioridade 1 para a 3;
  - **Conversa no Kommo:** 💬 sem dona (responderam a automação; assumir e continuar no Kommo, sem template);
  - **Meus contatos:** as pessoas da vendedora, primeiro o retorno de hoje ou atrasado, depois quem respondeu;
  - **Aguardando:** ⏳, com a data em que libera.
  - Busca por nome ou telefone em todas, e filtro por Motivo.
- **Cartão de cada pessoa:** Motivo, O que já tem, prioridade, a mensagem que já saiu e a resposta, e "Mais
  informações" (Grupo, Automação, Quiz, Pesquisa da live, Cadastro, os 4 links da vendedora).
- **Enviar mensagem:** mostra o texto exato do template, já com o nome, e só envia depois de "Confirmar". O template
  sai pelo Kommo (5052) em nome da vendedora (ver `KOMMO-TEMPLATES-FICHA.md`, "Templates do comercial"). Opções:
  - **Enviar mensagem** (template pelo Motivo; sem template próprio, sai o geral);
  - **Enviar retorno** (`vd_retorno`), no lugar do botão principal para quem já recebeu a primeira;
  - **Enviar outra mensagem:** abre as 7 mensagens, com a indicada no topo, e a vendedora escolhe qualquer uma (o
    retorno só depois da primeira). As regras de envio valem igual.
- **Depois do envio:** a pessoa passa a ser da vendedora (Vendedora preenchida, Status "Chamei", coluna Template com
  o que saiu), o lead entra no funil **Comercial Black** com ela como responsável, e as linhas dela na fila da
  recuperação viram `vendedora` (a automação não manda mais nada, nem a reta final).
- **Anotar:** Status do contato, Objeção e Retornar em, no próprio cartão; grava na aba na hora. Quem anota numa pessoa
  sem dona vira a dona. "Assumir" e "Soltar" mudam só a Vendedora.
- **Regras que o envio confere** (fluxo n8n "AS · Painel comercial (API)", nó `Preparar envios`):
  - só Situação 🟢; a pessoa não pode ser de outra vendedora; Status "Não quer" bloqueia;
  - nada nas 24 h depois de uma mensagem automática da recuperação;
  - no máximo 2 templates do comercial por pessoa, com 48 h entre eles; o retorno só depois do primeiro;
  - teto de 300 templates do comercial por dia, somando todas;
  - teto de 300 por dia vale para as três juntas.
- **Em produção desde 10/11, à tarde** (teste de ponta a ponta feito só com o número do Mateus). Para voltar ao modo
  de teste: `TELEFONE_TESTE = '5531994811420'` no nó `Preparar envios` e `MODO_TESTE = true` no nó `Montar lista`;
  publicar. No modo de teste só sai para esse número, sem os limites de 2 por pessoa e 48 h.
- **Usuários do Kommo (responsável do lead):** Heid = "Comercial 1 - Heid" (15829459), Ana = "Comercial 2 - Ana"
  (15829447), **Belle = "Amar Saber"** (15657099, `amarsaber@amarveterinaria.com.br`, decisão de 10/11). Esse usuário
  é a conta principal: a Belle também vê os avisos dos outros leads dele. O fluxo "AS · Vendas por vendedor" **não**
  usa esse usuário para atribuir venda (só o link dela conta), para não dar à Belle os leads da conta principal.
- **O que fica fora do painel:** a conversa em si (Kommo) e o cupom que a vendedora cria (Yampi).
- **Segurança:** o PIN é único para a equipe e a página mostra nomes e telefones. A página não entra no Google
  (`noindex`) e não tem rastreamento (sem Pixel, PostHog ou Clarity). Se o PIN vazar, troque a constante `PIN` no nó
  `Ler pedido` e publique.

## Guia rápido pela planilha (se o painel estiver fora)
A legenda está no topo da aba: linha 1 com o "como usar", linha 2 com o que é cada coluna e linha 3 com o cabeçalho.
1. Filtre **Situação = 🟢 Chamar agora** e **Vendedora vazia**. Comece pela **Prioridade 1 · quente**.
2. Escolha o **seu nome** em Vendedora **antes** de chamar, para ninguém chamar a mesma pessoa.
3. Mande o **seu** link do produto que está em **Mandar o link** pelo Kommo (os links ficam no `VENDEDORES.md` e no
   topo da aba "Vendas · Vendedores"). A coluna **Mandar template** não é mais usada: o template sai pelo painel.
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
O mesmo fluxo atualiza a aba **Estoque · Guia** em toda rodada:
- estoque da Black;
- estoque da esteira (separado na Yampi);
- Guias vendidos e o total.

Fica o alerta quando um dos dois tem menos de 50 unidades ou menos de 15% restante.

## Limites
- A compra muda a linha na hora. O resto (automação, grupo, cartão recusado) só na rodada seguinte (de hora em hora).
  **Antes de chamar, olhe o lead no Kommo:** se saiu mensagem automática nas últimas horas, espere.
- Venda de quem não deixou telefone no checkout não acha a linha na hora; entra na atualização completa seguinte.
- Números fixos e de fora do Brasil entram com o link do WhatsApp como vieram.
- E-mail só aparece para quem comprou.
- Os números da equipe ficam fora da aba. Hoje só a Heid está na lista de exclusão; faltam os números da Ana e da Belle.
- Uma edição feita durante a gravação (alguns segundos) pode se perder.
