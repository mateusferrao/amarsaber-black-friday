# Disparos individuais até o fim da Black (13/11 a 30/11)

Decisões de 12/11, tomadas pelo Mateus numa discussão por perguntas. São templates de WhatsApp pelo Kommo (número
5052), com duas frentes de peso igual: vender mais Guia e vender a Formação Completa. Live curta e fim do frete grátis
entram depois, quando tiverem data.

## Por que assim: o que a fila mostrou (12/11, 690 pessoas)
| Mensagem | Receberam | Compraram | Falha de envio |
|---|---|---|---|
| `as_cartao_recusado` | 29 | 16 (55%) | 2 |
| `as_pix_expirou` | 21 | 10 (48%) | 1 |
| `as_checkout_15min` | 58 | 7 (12%) | 2 |
| `as_vip_convite` (frio) | 143 | 7 (5%) | 28 (20%) |
| `as_vip_lancamento` (frio) | 387 | 7 (2%) | 21 (5%) |

- Mensagem colada a uma ação recente vende. Mensagem fria vende pouco:
  - quem saiu do grupo: 1 compra em 289;
  - quem se cadastrou e não entrou: 5 em 164.
- Ninguém recebia mensagem individual em dois públicos:
  - os compradores sem a Formação;
  - quem clicou em comprar na LP e não fez pedido (94 identificados entre 10 e 12/11).

## Regras
| Tema | Regra |
|---|---|
| Públicos | Compradores sem Formação · Fora do grupo sem compra · Clicou e não comprou · **No grupo sem compra, só com a pergunta da objeção (13/11)** |
| Conteúdo | Sempre oferta direta, variando o gancho: serve pra mim, parcela por dia, Formação junto, valor por aula, prova |
| Horário | Campanha dos compradores às 14h (até 16h45) e de quem não comprou às 19h (até 20h45), desde 13/11; vendedoras até 21h; automático só das 8h às 21h |
| Botões | Positivo + "Tenho uma dúvida". Os dois levam a pessoa para a vendedora (💬 no painel) |
| Saída | Rodapé "Responda SAIR para não receber mais" nos templates de campanha |
| Painel | **Tudo o que for para as vendedoras aparece no painel comercial** |
| Choque com a automática | A campanha sai; a mensagem automática da pessoa passa para o dia seguinte, no mesmo horário |
| Limite do painel | 4 templates por pessoa, com 48 h entre eles, para compradores e quem clicou (os outros seguem com 2) |
| Quando um disparo sai do calendário | Qualidade do número cai para média **ou** compra abaixo de 1% em 72 h |
| Quem não recebe campanha | Quem tem `erro_envio` na fila (a Meta já recusou) |

## Preço e condição (no 1:1, a vendedora decide)
- **Pergunta primeiro:** quando a pessoa responde, a vendedora pergunta o momento e a dúvida dela antes de oferecer.
- **Formação Completa:** piso de R$ 150. Para quem recebeu `vd_formacao_aula` ("menos de R$ 2 por aula"), no máximo
  R$ 222, que é o que faz a frase valer para quem tem 111 aulas.
- **Esteira (Guia + Formação):** R$ 697 (Formação a R$ 200), válida até 23h59 do dia seguinte.
  - **Nunca vai para quem já comprou qualquer bônus** (Formação, esteira ou combo) na Yampi ou na Kiwify. A conferência
    é por e-mail, CPF e telefone; na dúvida, não vai.
- **Desconto no Guia:** só quando a pessoa trava no preço.
- **Indicação:** quem indica e quem compra pela indicação ganham +3 meses de comunidade cada um.

## Públicos
| Público | Quem | Tamanho (12/11) | Quem envia |
|---|---|---|---|
| A | Fora do grupo, sem compra: `vip_cadastro` (cadastrou e não entrou) e `vip_saiu` (saiu do grupo) | ~336 (80 + 256) | automação, 19h |
| B1 | Comprou a Black 2026 e não tem Formação | 101 | automação, 19h |
| B2 | Comprou o Guia de 01/11/2025 até antes da Black 2026 e não tem Formação | 749 (628 da Black 2025) | automação, em 3 levas de ~250 |
| C | Clicou em comprar na LP (identificado pelo WhatsApp) e não fez pedido em 15 min | contínuo | automação e vendedora |
| Pesquisa | Respondeu a pesquisa da live e não comprou | — | vendedoras (painel) |
| G | Está no Grupo VIP e não comprou (13/11) | 954 | automação, 150 por noite de 14 a 27/11 |

## Calendário (individual)
O Grupo VIP segue o calendário de `GRUPO-VIP-MENSAGENS.md`.

**Contínuo:**
- recuperação de cartão, Pix e carrinho;
- **C:** `vd_condicao_pagamento_v2` 15 min depois do clique (só das 8h às 21h; fora disso, às 8h), depois `vd_retorno_condicao` (vendedora, 48 h) e `vd_parcela_dia_v2` (vendedora, 7 dias);
- **lembretes:** `as_boleto_vence` às 10h do dia do vencimento e `as_pix_pendente` 24 h depois de um Pix da Kiwify não pago.

| Dia | Individual |
|---|---|
| qui 12/11 | 19h `as_prova` → 102 fora do grupo · pesquisa da live: `vd_pesquisa` pelo painel, até 21h |
| sex 13/11 | 10h triagem/prova (checkout e Pix) · 19h `as_prova` → 200 fora do grupo · **14h B1 `vd_formacao_aluno_v2` → 133** · **14h B2 1ª leva `vd_formacao_cliente_v2` → ~250** |
| sáb 14/11 | 10h triagem → 9 · 19h `as_prova` → 36 · **14h B2 2ª leva → ~250** · **19h G `vd_objecao` → 150** |
| dom 15/11 | 10h triagem → ~106 · **14h B2 3ª leva → ~250** · **19h G → 150** |
| seg 16/11 | 10h triagem → ~200 · **19h G → 150** |
| ter 17/11 | 10h triagem → 36 (fim da sequência automática de quem está fora do grupo) · **19h G → 150** |
| qua 18/11 | **19h A → todos de A:** quem saiu do grupo recebe `vd_objecao`, quem só cadastrou recebe `vd_serve_pra_mim` · **19h G → 150** · **14h B `vd_formacao_prova`**, até 300 por dia de 18 a 21/11 |
| qui 19/11 | **19h pesquisa da live, 2º toque pela objeção** (valor → `vd_parcela_dia_v2`, momento → `vd_serve_pra_mim`, edição anterior → `vd_formacao_cliente_v2`, outros → `vd_condicao_pagamento_v2`) |
| sex 20/11 | 14h B e 19h G continuam |
| sáb 21/11 | **19h A (só `vip_cadastro`) `vd_parcela_dia_v2`** |
| sáb 22/11 | **14h indicação `vd_indicacao`** → compradores da Black (Lista "1 · Upsell" e "Comprou tudo") · 19h G |
| ter 24/11 | **19h A (só `vip_cadastro`, sem bônus) `vd_esteira_v2`** |
| qua 25/11 | **14h B `vd_formacao_aula`**, até 300 por dia de 25 a 28/11 |
| sáb 28/11 | 10h reta final `as_reta_3dias` |
| seg 30/11 | 9h `as_ultimo_dia` · 19h `as_ultimas_horas` · **14h B `vd_formacao_ultimo`** (só se o desconto da Formação acabar em 30/11) |

G segue às 19h, 150 por noite, até acabar o público (cerca de 7 noites, até ~21/11). As noites que sobram ficam livres
para a live e o fim do frete grátis.

## Templates (Kommo)
Os textos estão em `KOMMO-TEMPLATES-FICHA.md`, seção "Templates de campanha (12/11)".
- **Versões em uso:** as `_v2` (com o rodapé "SAIR"). As versões sem rodapé (`vd_formacao_aluno`, `vd_formacao_cliente`, `vd_condicao_pagamento`, `vd_parcela_dia`, `vd_esteira`) ficam no Kommo, mas nenhum fluxo usa.
- **Fora de uso:**
  - `vd_grupo`: a frase "acompanhando a Black" é falsa para quem está fora do grupo;
  - `vd_retorno`: diz "está esgotando" e só pode ir se isso for verdade.

## Medição
Cada disparo grava a campanha no lead e na fila. Na manhã seguinte de cada disparo:
- qualidade do número no WhatsApp Manager;
- respostas;
- bloqueios e "SAIR";
- compras em 72 h, pelo telefone cruzado com a aba Compras.

## Como funciona (n8n, 12/11)
**Envio:** a campanha usa a mesma ação "enviar" do painel. Valem as regras do painel, a pessoa fica com uma vendedora e tudo aparece no painel.

| Peça | O que faz |
|---|---|
| Data table **AS · Base Guia sem Formação** (`xWIsyS1KF1n7RRId`) | 749 compradores do Guia de 01/11/2025 até antes da Black 2026, sem Formação (Yampi + Kiwify, por e-mail, CPF e telefone) |
| **AS · Comercial (lista)**: nós `Ler base do Guia` e `Ajustar lista` | Põem essa base no painel (lista "1b · Base do Guia", motivo "Comprou o Guia antes da Black, falta a Formação"). Também mostram em 💬 quem está fora do grupo e respondeu uma mensagem de venda |
| **AS · Painel comercial (API)**, nó `Preparar envios` | Bots dos templates novos; motivo da base do Guia; até 4 mensagens para compradores sem Formação. Pedido com `campanha: true` não conta no teto de 300, não tem limite por pessoa (as 48 h valem) e não tira a pessoa da fila da recuperação. O registro grava `campanha = sim` |
| **AS · Comercial (respostas)** | Ações `indicar` e `sair`. "Sair" marca "Não quer" e põe a fila em `saiu`; qualquer outra resposta põe a fila em `vendedora` (a automação para) |
| **AS · Kommo enviar**, nó `Config do Kommo` | O passo `as_prova` roda o bot do `as_prova_v2` (53183, "+2.000"); bots dos lembretes de boleto (53185) e Pix (53187) |
| **AS · Disparos de campanha** (`P6NU3k2se6OtQqG9`) | A cada 5 min, das 14h às 16h45 (compradores) e das 19h às 20h45 (quem não comprou), nos dias do calendário (nó `Campanha de hoje`). Manda até 25 pessoas por rodada pela ação "enviar" do painel e registra em **AS · Campanhas** (`e3N0w9GCu0OELYXp`) |

**Quem é cada público na aba Comercial · Black:**
| Público | Regra |
|---|---|
| B1 | Motivo "Comprou o Guia, falta a Formação" |
| B2 | Motivo "Comprou o Guia antes da Black, falta a Formação". A leva (0, 1 ou 2) sai da chave |
| A | Lista "3 · Grupo", saiu ou nunca entrou no grupo |
| A_CAD | Só quem cadastrou e nunca entrou |
| G | Lista "3 · Grupo" e Grupo "no grupo". Ordem: respondeu a pesquisa da live → Prioridade quente → morna → fria |

Todos precisam estar com Situação 🟢 e sem "Não quer".

**Campanhas de uma noite e de várias (13/11), nó `Campanha de hoje`:**
- `dia`: uma noite só. `de`/`ate`: a campanha segue nas noites seguintes até acabar o público.
- `turno` (13/11): `tarde` (14h às 16h45, compradores) ou `noite` (19h às 20h45, quem não comprou). Cada rodada só manda as campanhas do turno da hora.
- `max_noite`: teto **por dia** (o nome ficou de antes), que conta as tentativas do dia. Sem teto, vai todo o público.
  - Cada rodada manda até 25 pessoas. Na tarde (34 rodadas) cabem até 850; na noite (22 rodadas), até 550.
  - A ordem da lista é a prioridade dentro da rodada.
- **Recusa do painel** (por exemplo, menos de 48 h desde a última mensagem): a pessoa volta a ser tentada no dia seguinte, se a campanha continuar.
- `por_grupo`: template diferente pela coluna Grupo. No toque A de 18/11, quem saiu do grupo recebe `vd_objecao`.
- A pessoa nunca recebe duas vezes o mesmo template de campanha.

**Objeção do grupo (13/11):** `vd_objecao` pergunta o que ficou faltando, com três botões.

| Botão | Resposta na aba | Objeção na aba |
|---|---|---|
| Preço | "Objeção: preço" | "Preço" |
| Serve pra mim? | "Objeção: serve pra mim?" | "Serve para mim?" |
| Outra coisa | "Objeção: outra coisa (ver no Kommo)" | em branco, a vendedora escolhe |

Os bots de resposta são do Kommo; o fluxo "AS · Comercial (respostas)" grava a resposta.

**Horários livres, só para quem tende a converter (13/11):** a regra é mensagem colada a uma ação. Pelos números da
fila, cartão recusado converte 55%, Pix vencido 48% e pedido de link 44%, contra 0,3% a 3% da mensagem fria.

| Campanha | Público | Mensagem | Quando |
|---|---|---|---|
| `r-objecao` | **R**: respondeu "Preço" ou "Serve pra mim?" ao `vd_objecao` há 48 h ou mais, não comprou e não recebeu outra mensagem do comercial depois (🟢 ou 💬) | Preço → `vd_parcela_dia_v2` · Serve pra mim? → `vd_serve_pra_mim` | Contínuo, à noite, de 16 a 30/11 |
| `p-1611` | **P**: respondeu a pesquisa da live e não comprou | Pelo que pesou na pesquisa: edição anterior → `vd_formacao_cliente_v2`; valor → `vd_parcela_dia_v2`; momento → `vd_serve_pra_mim`; resto → `vd_condicao_pagamento_v2` | Dom 16/11, 19h |
| `c-2311` | **C**: base antiga do Guia (lista 1b) que nunca respondeu o comercial | `vd_curso_comunidade_v2` (bot 53329), link do downsell da vendedora (R$ 187) | Dom 23 e seg 24/11, 14h, até 350 por dia |
| `e-2711` | **E**: engajado sem compra, ou seja, Lista 3, 2b ou 2c e pelo menos um sinal: respondeu o comercial, pediu o link, respondeu a pesquisa, ou Prioridade quente ou morna (🟢 ou 💬) | `vd_black_friday` (bot 53305; o botão "Quero o link" chama o `VD · Link`, bot 53301), link da Black da vendedora | Sex 27/11, 19h |
| `e-3011` | **E** | `as_ultimas_horas` (bot 50247) | Seg 30/11, 19h, sem trava de fadiga |

- **Fadiga:** quem ignorou 3 campanhas seguidas, sem nenhuma resposta ao comercial depois delas, não recebe a próxima. A
  exceção são as campanhas com `ignora_fadiga`.
- **Fonte das respostas:** o nó `Ler respostas` lê a AS · Comercial envios.
- **Bots no painel:** os bots dos dois templates novos entraram em `BOTS` do `Preparar envios` em 13/11.

**Pediu o link e não comprou (13/11):** quem toca "Quero o link" num template automático (bot `AS · Link`) mostrou a
maior intenção de compra.
- **Origem dos números:** pelo histórico da etapa "Pediu o link" no Kommo, 52 pessoas pediram o link até 13/11 e 23 compraram.
  Dos 29 que não compraram, 18 ainda estavam na sequência automática e 9 já estavam com uma vendedora.
- **Tabela AS · Pediu o link** (`o5nGz7AbqKN9WUNG`): começou com esses 18. Daqui em diante, o fluxo de campanha registra
  sozinho quem ficou com a observação "Pediu o link" na fila (nós `Novos pedidos de link` e `Gravar pediu o link`).
- **A pessoa sai da sequência automática no lugar da triagem.** A fila vai para `vendedora` (nós `Parar sequência` e
  `Fila: vendedora (link)`), e ela aparece 🟢 no painel.
- **Campanha contínua `l-link`:**
  - manda o `vd_objecao` 24 h depois do pedido, se a pessoa não comprou;
  - "não comprou" quer dizer Lista 3, 2b ou 2c na aba;
  - roda das 8h às 20h45, de hora em hora e nas janelas da tarde e da noite;
  - começou em 13/11 às 14h.
- O cron do fluxo passou a `*/5 14-16,19-20 * * *` mais `5 8-13,17-18 * * *`.

**Quem responde fica com a vendedora (13/11):**
- **Lista:** a "AS · Comercial (lista)" lê AS · Comercial envios. Quem respondeu uma mensagem do comercial a partir de 13/11 vira 💬, com prioridade quente.
  - Conta botão ou texto, inclusive de campanha.
  - Falha de envio e SAIR não contam.
- **Campanhas:** como a campanha só pega 🟢, a pessoa sai dos disparos.
- **Painel:** o template volta a ser liberado 24 h depois da resposta, contando também a resposta ao comercial.

**Pendências:**
- **Lembretes de boleto e Pix:** os bots e templates existem, mas o gatilho na recuperação ainda não foi feito.
- **Indicação (22/11, campanha `i-2211`, 14h):** feita em 13/11.
  - **Público:** compradores da Black, com Lista "1 · Upsell" ou "Comprou tudo".
  - **Comprou tudo (✅):** o painel e a campanha aceitam essa Situação só para o `vd_indicacao`. No painel, aparece o botão "🤝 Enviar indicação".
  - **Link:** no envio, o `as_link` do lead (campo 881489) recebe o link da Black com
    `utm_source=indicacao&utm_campaign=indicacao_black&utm_content=ind_<chave de quem indica>`. O bot `VD · Indicar` manda
    esse link quando a pessoa toca "Quero indicar".
  - **Registro:** a venda paga na Kiwify com essa UTM entra na aba **"Indicações"** (nós `Montar indicações` e
    `Gravar indicações` da "AS · Comercial (lista)"), com quem comprou e quem indicou. A coluna **Bônus** é da equipe, que
    soma os +3 meses de comunidade aos dois. Reembolso e chargeback aparecem na aba; compra com o próprio link fica marcada
    "mesma pessoa: não vale".
  - **Cabeçalhos da aba "Indicações":** Pedido · Status · Pago em · Produto · Valor · Quem comprou · WhatsApp de quem comprou ·
    Email de quem comprou · Indicado por · WhatsApp de quem indicou · Observação · Atualizado em · Bônus.
- **"Clicou e não comprou":** o fluxo (15 min depois do clique) ainda não foi feito.
