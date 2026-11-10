# Aba "Comercial · Black" (lista para a equipe ir atrás)

Planilha **Leads · Black – Amar Saber**, aba **Comercial · Black** (primeira aba). Uma linha por pessoa, atualizada
sozinha às **8h, 12h, 16h e 20h** pelo fluxo n8n **"AS · Comercial (lista)"**. Quem compra muda de lista na
atualização seguinte, sem perder o que a equipe anotou.

## As listas (coluna "Lista")

| Lista | Quem | O que oferecer |
|---|---|---|
| **1 · Upsell** | comprou o Guia (front ou esteira) e não tem a Formação Completa | link **upsell** (Formação a R$ 297) |
| **2a · Comprou downsell** | comprou o curso + comunidade (R$ 187) e não tem o Guia | a vendedora escolhe: **front**, **esteira** ou **upsell** |
| **2b · Não comprou downsell** | começou o checkout, gerou Pix ou teve o cartão recusado no downsell e não comprou nada | link **downsell** |
| **3 · Grupo** | está ou esteve nos grupos VIP desta Black e não comprou nada (dos grupos #3 a #5 da Black passada, só quem se cadastrou este ano) | **front** ou **esteira** |
| Comprou tudo | tem o Guia e a Formação | não chamar para vender |
| Comprou só a Formação | caso raro | front |
| Estornou · não chamar | pediu reembolso | **não chamar** (decisão de 06/11) |

Os links de cada vendedora por produto estão no `VENDEDORES.md`.

## Colunas

**Da equipe (a automação nunca apaga nem muda):**
- **Vendedora:** escolha livre (Ana, Heid, Belle); quem assumir escreve o nome.
- **Status do contato:** A chamar, Chamado, Respondeu, Negociando, Não quer, Comprou.
- **Próxima ação:** data.
- **Observação.**

**Automáticas (refeitas a cada atualização):**
- **Lista** e **Oferta possível**.
- **Nome**, **Link WhatsApp** (abre a conversa), **WhatsApp**, **Email**, **Cidade/UF** (do endereço de entrega).
- **O que já tem:** cada compra com produto, data, valor, pagamento e a vendedora do link (se houver).
- **Grupo:** no grupo, saiu do grupo ou nunca entrou.
- **Automação:** última mensagem automática da recuperação e a data, e o aviso **EM ATENDIMENTO** quando a pessoa já
  respondeu um template (a equipe pode chamar; é só olhar a conversa no Kommo antes).
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
- Atualiza 4x por dia: uma compra feita às 12h05 só sai da lista às 16h. Antes de mandar link, confira em "O que já tem".
- Quem não deixou WhatsApp em nenhum lugar (compra sem telefone) não entra.
- Uma edição feita exatamente durante a gravação (alguns segundos) pode se perder.
