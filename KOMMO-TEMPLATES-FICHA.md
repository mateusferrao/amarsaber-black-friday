# Ficha dos templates de WhatsApp da recuperação (Kommo)

Cadastro no Kommo: **Automações → Modelos → Modelos de chat → + Novo modelo → Modelo de WhatsApp**. Só admin cria.
Os textos validados ficam em `RECUPERACAO-TEMPLATES.md`; esta ficha é a mesma coisa na ordem dos campos da tela.

**Em todos:**
- Categoria **Marketing** · tipo **Personalizado (Custom)** · idioma **Português (BR)** · conta do WhatsApp da (31) 9 5349-5052.
- **Nome:** exatamente o da ficha (o n8n chama o template por esse nome).
- **{{1}}** = o campo do lead **as_nome**. No corpo, no lugar de {{1}}, insira o marcador do campo as_nome (no editor, pelo seletor de campos; o marcador do Kommo é `{{lead.cf.881487}}`). Exemplo para a Meta: **Ana**.
- **{{2}}** (só no as_triagem) = o campo **as_dias** (`{{lead.cf.881493}}`). Exemplo: **9**.
- Botões: **Resposta rápida**. Depois de preencher, **Enviar para aprovação**.

| # | Nome | Cabeçalho | Rodapé | Botões |
|---|---|---|---|---|
| T1a | `as_resultado_plantao` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T1b | `as_resultado_consulta` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T1c | `as_resultado_sozinho` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T2 | `as_dor_plantao` | Imagem | Maria Paula · Amar Saber | Quero o link · Tenho uma dúvida |
| T3 | `as_dor_consulta` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T4 | `as_dor_sozinho` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T5 | `as_prova` | Imagem | Maria Paula · Amar Saber | Quero o link · Tenho uma dúvida |
| T6 | `as_triagem` | Texto: Maria Paula · Amar Saber | — | Preço · Entrega · Se serve pra mim |
| T7 | `as_checkout_15min` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T8 | `as_pix_expirou` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T9 | `as_cartao_recusado` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T10 | `as_reta_3dias` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T11 | `as_ultimo_dia` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T12 | `as_ultimas_horas` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T13 | `as_alternativa` | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |
| T17 | `as_curso_pedido` (id 45755, 06/11) | Texto: Maria Paula · Amar Saber | — | Quero o link · Tenho uma dúvida |

## Templates `_v2`: parcela da Kiwify (11/11)
Os links da recuperação passaram a abrir o checkout da Kiwify, onde a parcela é outra:
- R$ 497 em 12x de **R$ 51,40** (antes R$ 50,57);
- R$ 187 em 12x de **R$ 19,34** (antes R$ 19,03).

Para não interromper os envios enquanto a Meta analisava, os 7 templates que citam a parcela ganharam cópias `_v2`. O
texto é o mesmo, só muda o valor da parcela. Os textos abaixo já estão com os valores novos. Os originais continuam no
Kommo sem uso e podem ser apagados depois da Black.

| Original | Cópia (aprovada 11/11) | Bot que troca o template |
|---|---|---|
| `as_pix_expirou` (44111) | `as_pix_expirou_v2` (46857) | `AS · as_pix_expirou` (50213) |
| `as_cartao_recusado` (44113) | `as_cartao_recusado_v2` (46859)¹ | `AS · as_cartao_recusado` (50215) |
| `as_reta_3dias` (44125) | `as_reta_3dias_v2` (46861) | `AS · as_reta_3dias` (50249) |
| `as_ultimo_dia` (44117) | `as_ultimo_dia_v2` (46863) | `AS · as_ultimo_dia` (50217) |
| `as_vip_lancamento` (44239) | `as_vip_lancamento_v2` (46865) | `AS · as_vip_lancamento` (50563) |
| `as_alternativa` (44121) | `as_alternativa_v2` (46867) | `AS · as_alternativa` (50219) |
| `as_curso_pedido` (45755) | `as_curso_pedido_v2` (46869) | `AS · as_curso_pedido` (51865) |

¹ Ficou na categoria **Utilidade** (os outros são Marketing) e sem a vírgula depois do "Oi".

- **Troca nos bots:** quem faz é a equipe, no Kommo, porque a API não edita Salesbots. O bot continua o mesmo, só o
  template muda. O n8n roda os bots pelo id (mapa `BOTS` em "AS · Kommo enviar (subfluxo)"), então nada muda nele.
- **No bot `AS · Preço`:** o texto livre do R2 passa a dizer 12x de R$ 51,40.

## T1a · `as_resultado_plantao`

- **Quando sai:** 15 min depois do teste, para quem teve o plantão como ponto mais sensível
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}! Seu resultado saiu: o plantão é o seu ponto mais sensível.

Na emergência, cada minuto procurando dose no celular é um minuto longe do paciente. E é de madrugada que isso acontece, sem ninguém para perguntar.

O Guia de Protocolos põe as emergências em passos objetivos, com doses e cálculo de fluido, na sua bancada. Na Black ele vem com o curso Atendimento Extraordinário e 3 meses de comunidade, até 30/11.

Quer o link?
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T1b · `as_resultado_consulta`

- **Quando sai:** 15 min depois do teste, para quem teve a consulta como ponto mais sensível
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}! Seu resultado saiu: o seu ponto mais sensível é a conversa com o tutor.

Você explica o tratamento e o tutor responde “vou pensar e te aviso”. O animal vai embora sem tratar e a consulta não vira retorno.

No curso Atendimento Extraordinário eu ensino o passo a passo da consulta que usamos na Amar Veterinária, da anamnese ao pós-consulta. Na Black ele vem junto com o Guia de Protocolos e 3 meses de comunidade, até 30/11.

Quer o link?
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T1c · `as_resultado_sozinho`

- **Quando sai:** 15 min depois do teste, para quem teve decidir sozinho como ponto mais sensível
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}! Seu resultado saiu: o seu ponto mais sensível é decidir os casos difíceis sozinho.

Sem ninguém para conferir, você só descobre se acertou quando o paciente volta. Ou quando ele não volta.

Na Black, o Guia de Protocolos vem com 3 meses na Comunidade Amar Saber, um grupo de WhatsApp com veterinários que usam o Guia, com a minha participação e a da equipe. Você leva o caso e compara condutas antes de decidir. Até 30/11.

Quer o link?
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T2 · `as_dor_plantao`

- **Quando sai:** Dia seguinte ao teste, 10h (dor: plantão)
- **Cabeçalho:** Imagem: https://black.amarsaber.com.br/assets/img/pagina-1.jpg
- **Corpo:**

```
Oi, {{1}}. Essa é a página que você abriria às 2h da manhã.

No Guia de Protocolos cada emergência vem em passos objetivos, com as doses e o cálculo de fluido. Você consulta na hora, com o paciente na mesa.

A Black Friday do Guia vai até 30/11, num lote limitado.
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** Maria Paula · Amar Saber
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T3 · `as_dor_consulta`

- **Quando sai:** Dia seguinte ao teste, 10h (dor: consulta)
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}. Quantos tutores saíram da sua consulta dizendo “vou pensar” este mês?

Cada um é um tratamento que não aconteceu. No curso Atendimento Extraordinário eu mostro como conduzir a anamnese, explicar o exame físico e apresentar o tratamento ao tutor sem parecer vendedora.

Na Black, o curso completo vem junto com o Guia de Protocolos, até 30/11.
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T4 · `as_dor_sozinho`

- **Quando sai:** Dia seguinte ao teste, 10h (dor: decidir sozinho)
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}. Com quem você discutiu o último caso difícil?

Na Comunidade Amar Saber você leva o caso que te travou e compara condutas com veterinários de outras cidades. Eu e a equipe participamos das conversas. Na Black, o Guia de Protocolos vem com 3 meses de comunidade.

A condição vai até 30/11.
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T5 · `as_prova`

- **Quando sai:** Teste: mais 1 dia, 19h · Checkout, Pix e cartão: dia seguinte, 10h
- **Cabeçalho:** Imagem: https://black.amarsaber.com.br/assets/img/depoimento-1.jpg
- **Corpo:**

```
“Já vi e adorei o conteúdo.”

Foi o que uma colega mandou quando o Guia de Protocolos chegou. Já são mais de 1.500 vendidos, e o lote da Black Friday é limitado.

O seu ainda está a um clique, até 30/11.
```

- **Exemplos:** sem variáveis
- **Rodapé:** Maria Paula · Amar Saber
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T6 · `as_triagem`

- **Quando sai:** 2 dias depois da anterior, 10h (todas as sequências)
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}, o que está te segurando?

Faltam {{2}} dias para acabar a Black do Guia de Protocolos. Toca numa opção ou me escreve a sua dúvida, que eu te respondo agora.
```

- **Exemplos:** {{1}} = Ana · {{2}} = 9
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Preço · Entrega · Se serve pra mim

## T7 · `as_checkout_15min`

- **Quando sai:** 15 min depois do checkout abandonado na Yampi
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}! Seu Guia de Protocolos ficou a um clique.

O pedido parou no pagamento, e o lote da Black Friday é limitado. Se travou em alguma coisa, me responde aqui que a equipe resolve com você.

Quer o link para terminar?
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T8 · `as_pix_expirou`

- **Quando sai:** Na hora em que o Pix expira
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}. Seu Pix expirou, mas o pedido continua aqui.

O Guia de Protocolos ainda está na condição de Black Friday. Te mando um link novo agora: dá para pagar no Pix ou parcelar em 12x de R$ 51,40 no cartão.

Quer o link?
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T9 · `as_cartao_recusado`

- **Quando sai:** 10 min depois do cartão recusado
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}. O banco barrou o pagamento do seu Guia de Protocolos.

Costuma ser limite ou bloqueio de segurança. Dá para tentar outro cartão, parcelar em 12x de R$ 51,40 ou pagar no Pix, e a condição de Black continua valendo.

Quer o link de novo?
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T10 · `as_reta_3dias`

- **Quando sai:** Sáb 28/11, 10h (todos que não compraram)
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}, faltam 3 dias.

A Black Friday do Guia de Protocolos termina na segunda, 30/11, às 23h59. Até lá, o Guia impresso vem com o curso Atendimento Extraordinário e 3 meses de comunidade, em 12x de R$ 51,40.

Não deixa essa passar: quer o link?
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T11 · `as_ultimo_dia`

- **Quando sai:** Seg 30/11, 9h (todos que não compraram)
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Último dia, {{1}}.

Hoje às 23h59 a Black Friday do Guia de Protocolos sai do ar, e a oferta inteira acaba junto: o Guia impresso, o curso Atendimento Extraordinário e a comunidade. São 12x de R$ 51,40 só até as 23h59 de hoje.
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T12 · `as_ultimas_horas`

- **Quando sai:** Seg 30/11, 19h (todos que não compraram)
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}, faltam 5 horas.

A Black Friday do Guia de Protocolos termina hoje às 23h59, e depois disso a oferta não volta. Se ainda tem alguma dúvida, me responde agora que a equipe te ajuda até o fim.
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T13 · `as_alternativa`

- **Quando sai:** 48 h depois de tocar em "Preço" (se antes de 30/11)
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}! Se o Guia não cabe agora, dá para começar pela consulta.

O curso completo Atendimento Extraordinário (anamnese que conduz, exame físico explicado ao tutor, Técnica do Detetive e pós-consulta) vem com 3 meses na Comunidade Amar Saber.

R$ 187 à vista ou 12x de R$ 19,34, só até 30/11.
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T14 · `as_vip_convite` (id 44235)
Só para quem se cadastrou no acesso antecipado e nunca entrou no Grupo VIP. É a única mensagem que sai antes de 10/11,
porque não revela a oferta.

- **Quando sai:** na primeira janela (8h–21h) depois de a pessoa entrar na fila; só até 10/11 20h30
- **Cabeçalho:** sem cabeçalho
- **Corpo:**

```
Oi, {{1}}! Aqui é a Maria Paula.

Você se cadastrou no acesso antecipado da Black do Guia de Protocolos, mas ainda não entrou no Grupo VIP. É lá que eu mando o link da live de 10/11, às 20h, e a condição da Black antes do público.

Quer o link do grupo?
```

- **{{1}}:** campo **as_nome** pelo ícone {-} (exemplo: Mateus)
- **Rodapé:** Maria Paula · Amar Saber
- **Botões (resposta rápida):** Quero entrar · Pagar mais caro. O "Pagar mais caro" é a saída: o ramo dele vai para
  `AS · Sair`.

## T15 · `as_vip_lancamento` (id 44239)
Para quem está fora do Grupo VIP (cadastrou e não entrou, ou entrou e saiu).

- **Quando sai:** 10/11 às 20h30 (quem entra na fila depois disso recebe na entrada, dentro da janela 8h–21h)
- **Cabeçalho:** sem cabeçalho
- **Corpo:**

```
Oi, {{1}}! A Black Friday do Guia de Protocolos começou.

O Guia de Protocolos vem com o curso Atendimento Extraordinário e 3 meses de Comunidade Amar Saber, por R$ 497 à vista ou 12x de R$ 51,40. Separados, sairiam por R$ 1.137,70.

A condição vale até 30/11, ou enquanto o lote durar. Quer o link?
```

- **{{1}}:** campo **as_nome** (exemplo: Ana)
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## T16 · `as_vip_live` (id 44320)
Para quem está fora do Grupo VIP (cadastrou e não entrou, ou saiu). Não revela a oferta.

- **Quando sai:** 10/11 às 18h (descartado se não sair até as 20h)
- **Cabeçalho:** sem cabeçalho
- **Corpo:**

```
Oi, {{1}}! Hoje, às 20h, eu entro ao vivo no Instagram para abrir os três presentes da Black do Guia de Protocolos.

Um deles é a maior condição que o Guia já teve, e quem assistir fica sabendo antes de todo mundo (antes que o estoque acabe).

É no meu perfil: instagram.com/mariapaulaferrarivet
```

- **{{1}}:** campo **as_nome** (exemplo: Ana)
- **Rodapé:** Maria Paula · Amar Saber
- **Botões (resposta rápida):** Vou assistir · Perder oportunidade (a saída: vai para `AS · Sair`)

## T17 · `as_curso_pedido` (id 45755, criado em 06/11)

- **Quando sai:** carrinho abandonado (15 min), Pix expirado (na hora) ou cartão recusado (10 min) **do curso do
  downsell** (R$ 187, produto 46522438). O link que vai no "Quero o link" é o checkout do curso com o cupom
  BLACKAMARSABERDS.
- **Cabeçalho:** Texto: Maria Paula · Amar Saber
- **Corpo:**

```
Oi, {{1}}! Seu pedido do curso Atendimento Extraordinário ficou pela metade.

O curso completo, com 3 meses na Comunidade Amar Saber, continua por R$ 187 à vista ou 12x de R$ 19,34, só até 30/11. Se travou em alguma coisa no pagamento, me responde aqui que a equipe resolve com você.

Quer o link?
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida
- **Bot:** `AS · as_curso_pedido` (51865), igual ao `AS · as_checkout_15min`.

## Respostas dos Salesbots (texto livre, sem aprovação: vão dentro das 24 h depois do toque)

**R1 · Tocou em "Quero o link"**

```
Aqui está o link com a condição de Black Friday: {{lead.cf.881489}}

Se travar em qualquer parte do pagamento, me responde aqui.
```


**R2 · Tocou em "Preço" (triagem)**

```
Dá para parcelar em 12x de R$ 51,40 no cartão, ou pagar R$ 497 à vista no Pix ou boleto. Nesse valor vêm o Guia impresso, o curso completo Atendimento Extraordinário e 3 meses de comunidade, que somados valem R$ 1.137,70.
```
Botões: Quero o link

**R3 · Tocou em "Entrega" (triagem)**

```
O Guia é impresso e sai em até 10 dias úteis depois da confirmação do pagamento. O curso e a comunidade são online, e o acesso chega no seu e-mail.
```
Botões: Quero o link · Tenho uma dúvida

**R4 · Tocou em "Se serve pra mim" (triagem)**

```
Para quem está começando, o Guia é uma base de conduta para a rotina, com orientações diretas. Para quem já atende, ele vira a consulta rápida no meio do plantão e o padrão para treinar a equipe.
```
Botões: Quero o link · Tenho uma dúvida

**R5 · Tocou em "Tenho uma dúvida"** (quem escreve outra coisa não recebe texto: vai direto para o atendimento)

```
Pode mandar a sua dúvida aqui. A equipe responde em seguida.
```

**R6 · Tocou em "Quero entrar" (convite)**

```
Aqui está o link do grupo: https://sndflw.com/i/amarsaber-black-vip
Só eu e a equipe mandamos mensagem por lá.
```

**R8 · Tocou em "Vou assistir" (aviso da live)**

```
Combinado, te vejo às 20h! É aqui: https://instagram.com/mariapaulaferrarivet
```

**R7 · Tocou em "Pagar mais caro" (convite) ou "Perder oportunidade" (aviso da live)**

```
Combinado. Você não recebe mais mensagens da Black por aqui.
```


## Salesbots no Kommo: passo a passo
O n8n decide **qual** template sai e **quando**. O Kommo só envia, para a conversa ficar no histórico do lead. São
**27 bots, nenhum com gatilho**: o n8n roda os 18 de template pela API, e eles chamam os 9 de resposta com o passo
**Iniciar Salesbot**.

**Onde:** Configurações → **Salesbot** (ou Automações → Salesbot) → **+ Criar bot** → **Criar do zero**. Em cada
bot: dê o nome no topo, monte os passos com **Adicionar próximo passo** e clique **Salvar**. Na janela "Condição de execução", clique **Cancelar**; no aviso "Seu bot nunca será executado sem um gatilho", clique **Salvar**. Não adicione gatilho.

**Confira na lista de Salesbots que a coluna Gatilhos dos bots AS está vazia.** Se aparecer "Qualquer nova
conversa", o bot roda em toda conversa nova da conta: abra o bot, clique no gatilho no quadro **Gatilhos** e apague.

**Canal, em todo passo Enviar mensagem:** em **Canais**, marque só o **WhatsApp Business da (31) 9 5349-5052**, não
"Todos". A conta tem também uma conexão WA Lite, que não manda botões; com "Todos", o editor avisa que a mensagem sai
sem botões.

**Abrir conversa com quem nunca falou com o número (obrigatório nos 18 bots de template):** no passo **Enviar
mensagem**, em **Canais**, marque **"Se você nunca conversou em um canal: Tente enviar uma mensagem"**. Sem isso, o bot
rodado pelo n8n pula em silêncio todo contato sem conversa aberta (quem fez o teste, abandonou o checkout ou se
cadastrou e não entrou no grupo): não envia, não passa pelo ramo de falha, e o n8n marca como enviado. Achado em
29/10, quando os 25 primeiros convites não saíram. Nos bots de resposta não precisa, porque eles só respondem dentro
de uma conversa que já existe.

**Sinônimos (opcional):** no botão **Quero o link**, use **+ sinônimo** para `quero`, `link` e `manda o link`. Quem
digitar em vez de tocar também cai no ramo.

**Ordem:** primeiro os 9 bots de resposta (parte A), depois os 18 de template (parte B). O passo **Iniciar Salesbot**
só lista bots que já existem.

**Endereço do webhook** (passo **Ação → Enviar webhook**), igual em todos e com a `acao` trocada:
`https://n8n.automato.pro/webhook/as-black-kommo?chave=<CHAVE>&acao=<acao>`. A `<CHAVE>` está no nó "Ler evento" do
fluxo `AS · Recuperação Black` e não fica no repositório. O n8n acha o lead pelo id que o Kommo manda junto.

### A. Os 9 bots de resposta

**A1 · `AS · Atendimento`.** A pessoa quer falar com a equipe. O bot para a sequência e passa o lead para o time.
1. **Ação → Enviar webhook** → `…&acao=atendimento`
2. **Ação → Alterar etapa do lead** → funil *Recuperação Black* → *Em atendimento*
3. (opcional) **Ação → Adicionar tarefa** → "Responder dúvida da Black" → para hoje → responsável do atendimento

**A2 · `AS · Dúvida`.** A pessoa tocou em "Tenho uma dúvida".
1. **Enviar mensagem** → texto **R5**
2. **Iniciar Salesbot** → `AS · Atendimento`

**A3 · `AS · Link`.** A pessoa tocou em "Quero o link".
1. **Ação → Enviar webhook** → `…&acao=link`
2. **Enviar mensagem** → texto **R1**. No lugar do link, insira o campo do lead **as_link** (`{{lead.cf.881489}}`).
3. **Ação → Alterar etapa do lead** → *Recuperação Black* → *Pediu o link*

**A4 · `AS · Preço`.** Vem do botão "Preço" da triagem. O n8n agenda a alternativa de R$ 187 para 48 h depois.
1. **Ação → Enviar webhook** → `…&acao=preco`
2. **Enviar mensagem** → texto **R2** → **+ Botão de ação**: `Quero o link`
3. Nos ramos que aparecem embaixo da mensagem:
   - **Quero o link** → **Iniciar Salesbot** → `AS · Link`
   - **Outra resposta** → **Iniciar Salesbot** → `AS · Atendimento`

**A5 · `AS · Entrega`.** Vem do botão "Entrega" da triagem.
1. **Ação → Enviar webhook** → `…&acao=entrega`
2. **Enviar mensagem** → texto **R3** → **+ Botão de ação**: `Quero o link` e `Tenho uma dúvida`
3. Ramos:
   - **Quero o link** → `AS · Link`
   - **Tenho uma dúvida** → `AS · Dúvida`
   - **Outra resposta** → `AS · Atendimento`

**A6 · `AS · Serve`.** Vem do botão "Se serve pra mim" da triagem. É igual ao A5, com `…&acao=serve` e o texto
**R4**.

**A7 · `AS · Grupo`** (id 50553). Vem do botão "Quero entrar" do convite.
1. **Ação → Enviar webhook** → `…&acao=grupo`
2. **Enviar mensagem** → texto **R6**

**A8 · `AS · Sair`** (id 50555). Vem do botão "Pagar mais caro" do convite. Para todas as mensagens da Black para essa
pessoa.
1. **Ação → Enviar webhook** → `…&acao=sair`
2. **Enviar mensagem** → texto **R7**
3. **Ação → Alterar etapa do lead** → *Recuperação Black* → *Perdido*

**A9 · `AS · Live`** (id 50654). Vem do botão "Vou assistir" do aviso da live. Sem webhook.
1. **Enviar mensagem** → texto **R8**

### B. Os 19 bots de template
Nome: `AS · <nome do template>` (ex.: `AS · as_resultado_plantao`). Monte um, confira, e use **Duplicar** na lista
de bots para os outros. Em cada cópia, troque só o nome e o template.

1. **Enviar mensagem** → canal **WhatsApp da (31) 9 5349-5052** → **Modelo** (template) → o template de mesmo nome.
   Os templates aprovados guardam só `{{1}}` e `{{2}}`, sem ligação com o lead. No passo do bot, preencha a variável
   **{{1}}** com o campo **as_nome** (`{{lead.cf.881487}}`) e, só no `as_triagem`, a **{{2}}** com o campo **as_dias**
   (`{{lead.cf.881493}}`). O `as_prova` não tem variável.
2. Os botões do template viram ramos embaixo da mensagem. Se não virarem, adicione **+ Botão de ação** com o texto
   exato de cada botão.
3. Ramos:
   - **Quero o link** → **Iniciar Salesbot** → `AS · Link`
   - **Tenho uma dúvida** → **Iniciar Salesbot** → `AS · Dúvida`
   - **Outra resposta** → **Iniciar Salesbot** → `AS · Atendimento`
4. Não ligue **Sem resposta**. Assim o bot fica esperando o toque até o próximo template, que o n8n manda dias depois.
5. Ramo **Falha ao enviar a mensagem** → **Ação ▾ → Enviar webhook** →
   `https://n8n.automato.pro/webhook/as-black-kommo?chave=<CHAVE>&acao=falha`. O Kommo aceita rodar o bot mesmo
   quando a Meta recusa o template (ex.: falta de pagamento, erro 3107); sem esse ramo o n8n acha que a mensagem saiu.
   Com ele, a linha da fila fica com status `erro_envio` e para.

**Exceção: `AS · as_triagem`.** Os ramos são outros:
- **Preço** → `AS · Preço`
- **Entrega** → `AS · Entrega`
- **Se serve pra mim** → `AS · Serve`
- **Outra resposta** → `AS · Atendimento`

| # | Bot | Template | Ramos |
|---|---|---|---|
| 1 | `AS · as_resultado_plantao` | as_resultado_plantao | Link · Dúvida · Atendimento |
| 2 | `AS · as_resultado_consulta` | as_resultado_consulta | Link · Dúvida · Atendimento |
| 3 | `AS · as_resultado_sozinho` | as_resultado_sozinho | Link · Dúvida · Atendimento |
| 4 | `AS · as_dor_plantao` | as_dor_plantao | Link · Dúvida · Atendimento |
| 5 | `AS · as_dor_consulta` | as_dor_consulta | Link · Dúvida · Atendimento |
| 6 | `AS · as_dor_sozinho` | as_dor_sozinho | Link · Dúvida · Atendimento |
| 7 | `AS · as_prova` | as_prova | Link · Dúvida · Atendimento |
| 8 | `AS · as_triagem` | as_triagem | Preço · Entrega · Serve · Atendimento |
| 9 | `AS · as_checkout_15min` | as_checkout_15min | Link · Dúvida · Atendimento |
| 10 | `AS · as_pix_expirou` | as_pix_expirou | Link · Dúvida · Atendimento |
| 11 | `AS · as_cartao_recusado` | as_cartao_recusado | Link · Dúvida · Atendimento |
| 12 | `AS · as_reta_3dias` | as_reta_3dias | Link · Dúvida · Atendimento |
| 13 | `AS · as_ultimo_dia` | as_ultimo_dia | Link · Dúvida · Atendimento |
| 14 | `AS · as_ultimas_horas` | as_ultimas_horas | Link · Dúvida · Atendimento |
| 15 | `AS · as_alternativa` | as_alternativa | Link · Dúvida · Atendimento |
| 16 | `AS · as_vip_convite` | as_vip_convite | Quero entrar ▸ `AS · Grupo` · Pagar mais caro ▸ `AS · Sair` · Outra ▸ Atendimento |
| 17 | `AS · as_vip_lancamento` | as_vip_lancamento | Link · Dúvida · Atendimento |
| 18 | `AS · as_vip_live` (id 50660) | as_vip_live | Vou assistir ▸ `AS · Live` · Perder oportunidade ▸ `AS · Sair` · Outra ▸ Atendimento |
| 19 | `AS · as_curso_pedido` (id 51865, 06/11) | as_curso_pedido | Link · Dúvida · Atendimento |

O Kommo só deixa escolher o template depois que a Meta aprova. Dá para criar os 8 bots de resposta agora e os 17 de
template à medida que os templates forem aprovados.

### C. Depois dos bots
- Me avise: eu leio os IDs dos 17 bots de template pela API (`/api/v4/bots`) e preencho o BOTS no n8n.
- **n8n:** criar a credencial **Kommo API** (Header Auth/Custom: `Authorization: Bearer <token de longa duração>`) e
  escolher nos 5 nós HTTP do `AS · Kommo enviar`.
- No teste, confiro no n8n o formato do webhook que o Kommo manda e se o lead é achado.

---

# Templates do comercial (1:1 das vendedoras, 10/11)

**Como sai:** a vendedora toca **"Enviar mensagem"** no **painel comercial**
(`black.amarsaber.com.br/painel-comercial`, ver `COMERCIAL.md`). O fluxo n8n **"AS · Painel comercial (API)"** confere as
regras, cria ou atualiza o lead no funil **Comercial Black** e roda o bot do template no Kommo. A coluna "Mandar
template" da planilha não é mais usada.
- **Objetivo: a pessoa responder.** Nenhum template leva preço, oferta ou link. A proposta é da vendedora, no 1:1.
- **Condição especial:** o template pode prometer uma condição especial para todos (decisão de 10/11). As que existem:
  - a esteira (Guia + Formação por R$ 794, só pelo link da vendedora);
  - a Formação por R$ 297 para quem já comprou;
  - o cupom que a própria vendedora cria, só para fechar quem travou no preço.

**Em todos os templates:**
- Categoria **Marketing** · tipo **Personalizado** · **Português (BR)** · conta do WhatsApp da (31) 9 5349-5052 ·
  **sem cabeçalho** e **sem rodapé**.
- **{{1}}** = campo **as_nome** (`{{lead.cf.881487}}`); **{{2}}** = campo **as_vendedora** (`{{lead.cf.902683}}`). O
  n8n grava os dois no lead antes de rodar o bot, junto com **as_link** (o link da vendedora para o produto do caso).
- Funil do lead: **Comercial Black** (id 14749468). Etapas:

  | Etapa | id |
  |---|---|
  | Template enviado | 113968884 |
  | Respondeu | 113968888 |
  | Link enviado | 113968892 |
  | Negociando | 113968896 |
  | Não quer | 113968900 |

**Status na Meta (10/11): os 7 aprovados.** Os textos abaixo são os **cadastrados**, lidos pela API do Kommo em 10/11
(o usuário fez ajustes; ficam exatamente como ele deixou).

| # | Template | Para quem (Motivo da aba) | Botões | Bot |
|---|---|---|---|---|
| C0 | `vd_geral` | qualquer pessoa; também quando nenhum outro encaixa | Pode contar · Tenho uma dúvida | 52631 |
| C1 | `vd_upsell` | Comprou o Guia, falta a Formação | Pode explicar · Tenho uma dúvida | 52633 |
| C2 | `vd_falta_guia` | Comprou o downsell, falta o Guia | Pode passar · Tenho uma dúvida | 52643 |
| C3 | `vd_pedido` | Cartão recusado · Pix não pago · Carrinho abandonado · Pix/Boleto aguardando · Tentou o downsell e não pagou | Me ajuda · Tenho uma dúvida | 52635 |
| C4 | `vd_grupo` | Está no grupo · Saiu do grupo · Cadastrou e nunca entrou · Mensagem automática não entregue | Me conta · Tenho uma dúvida | 52637 |
| C5 | `vd_pesquisa` | Respondeu a pesquisa da live | Pode perguntar · Tenho uma dúvida | 52639 |
| C6 | `vd_retorno` | segunda mensagem, para quem não respondeu a primeira (só uma vez, 48 h depois) | Faz sim · Tenho uma dúvida | 52641 |

## C0 · `vd_geral`
```
Oi, {{1}}! Aqui é a {{2}}, da equipe da Dra. Maria Paula, da Amar Saber.

Estou atendendo no individual algumas pessoas da Black do Guia de Protocolos, com uma condição especial que só consigo passar por aqui. Posso te contar?
```

## C1 · `vd_upsell`
```
Oi, {{1}}! Aqui é a {{2}}, da equipe da Dra. Maria Paula, da Amar Saber.

Vi que você garantiu o seu Guia na Black, parabéns! Separei um bônus especial só para quem já comprou, e prefiro te explicar por aqui. Posso?
```
Atenção da vendedora: o texto fala em **bônus**; a oferta é a Formação por R$ 297 (de R$ 697). Apresente como "o bônus
de quem já comprou".

## C2 · `vd_falta_guia`
```
Oi, {{1}}! Aqui é a {{2}}, da equipe da Dra. Maria Paula, da Amar Saber. Você já tem o curso Atendimento Extraordinário e a comunidade. Vi que você está buscando evoluir profissionalmente, então queria te presentear com um bônus exclusivo. Posso te passar a condição?
```

## C3 · `vd_pedido`
```
Oi, {{1}}! Aqui é a {{2}}, da equipe da Dra. Maria Paula, da Amar Saber.

Vi que o seu pedido da Black não foi concluído. Aconteceu alguma coisa? Me conta, porque consigo te ajudar com uma condição especial por aqui antes do lote esgotar.
```

## C4 · `vd_grupo` (sem a apresentação da vendedora)
```
Oi {{1}}! Vi que você está acompanhando a Black do Guia de Protocolos. Estou atendendo pessoas selecionadas no individual, com uma condição especial que não está no site. Posso te contar?
```

## C5 · `vd_pesquisa` (sem a apresentação da vendedora)
```
Oi {{1}}! Li a sua resposta na pesquisa da live, obrigada! Quero entender o seu momento e te mostrar uma condição especial que só passo por aqui. Posso te fazer uma pergunta?
```

## C6 · `vd_retorno`
```
Oi, {{1}}, é a {{2}} de novo Te chamei esses dias e não quis deixar passar: a condição especial que comentei está esgotando. Ainda faz sentido você aproveitar essa oportunidade?
```
"Está esgotando" só pode ir enquanto for verdade (regra: urgência só a real).

## Bots do comercial no Kommo (13, criados pelo usuário em 10/11)
Todos **sem gatilho**, canal **só o WhatsApp da 5052**. Quem roda os bots de template é o n8n
(`POST /api/v2/salesbot/run`).

**Bots de template** (enviam o template; um ramo por botão; ramo de falha → webhook `acao=falha`):

| Bot | id | Ramos |
|---|---|---|
| `VD · vd_geral` | 52631 | Pode contar ▸ Quer conversar · Tenho uma dúvida ▸ Dúvida · Outra ▸ Outra resposta |
| `VD · vd_upsell` | 52633 | Pode explicar ▸ Explicar · Tenho uma dúvida ▸ Dúvida · Outra ▸ Outra resposta |
| `VD · vd_falta_guia` | 52643 | Pode passar ▸ Condição curso · Tenho uma dúvida ▸ Dúvida · Outra ▸ Outra resposta |
| `VD · vd_pedido` | 52635 | Me ajuda ▸ Pedido · Tenho uma dúvida ▸ Dúvida · Outra ▸ Outra resposta |
| `VD · vd_grupo` | 52637 | Me conta ▸ Quer conversar · Tenho uma dúvida ▸ Dúvida · Outra ▸ Outra resposta |
| `VD · vd_pesquisa` | 52639 | Pode perguntar ▸ Quer conversar · Tenho uma dúvida ▸ Dúvida · Outra ▸ Outra resposta |
| `VD · vd_retorno` | 52641 | Faz sim ▸ Quer conversar · Tenho uma dúvida ▸ Dúvida · Outra ▸ Outra resposta |

**Bots de resposta** (texto livre, mudam a etapa para "Respondeu" e chamam o webhook):

| Bot | id | Mensagem | Webhook `acao` |
|---|---|---|---|
| `VD · Quer conversar` | 52611 | Resposta curta que apresenta a vendedora (`{{lead.cf.902683}}`, porque C4 e C5 não apresentam) e pergunta se a pessoa atende em clínica, em plantão ou ainda está na faculdade | `quer` |
| `VD · Explicar` | 52615 | Que bom! 💗 Pra eu te mostrar o que mais faz sentido pra você, me conta rapidinho: hoje você atende mais em clínica, em plantão ou ainda está na faculdade? | `quer` |
| `VD · Condição curso` | 52619 | Que bom! 💗 Me conta: como está sendo o curso Atendimento Extraordinário até aqui? Já te passo a condição. | `quer` |
| `VD · Pedido` | 52623 | Me conta o que aconteceu no pagamento que eu já te ajudo 💗 | `pedido` |
| `VD · Dúvida` | 52627 | Pode mandar, estou aqui! 💗 | `duvida` |
| `VD · Outra resposta` | 52629 | (nenhuma mensagem) | `texto` |

Os textos dos bots de resposta são os combinados em 10/11; a API não mostra o conteúdo dos passos, então o que vale é o
que está cadastrado no Kommo.

**Webhook dos bots:** `https://n8n.automato.pro/webhook/as-black-comercial?chave=<CHAVE>&acao=<acao>`. A `<CHAVE>`
está no fluxo n8n "AS · Comercial (respostas)" e não fica no repositório. Esse fluxo grava na aba a coluna
**Resposta** ("Quer conversar · 10/11 14:19", "Tem uma dúvida", "Quer ajuda no pagamento", "Escreveu") ou, na falha,
"Template: não entregue". O painel mostra a resposta no cartão da pessoa.

**Sem botão de recusa (decisão de 10/11):** quem pedir para sair escreve; a mensagem cai em **Outra resposta**, e a
vendedora marca "Não quer" no painel. Com isso, essa pessoa não recebe mais template do comercial.

# Templates de campanha (12/11)

Textos lidos pela API do Kommo em 12/11, como foram cadastrados (com os ajustes do Mateus). Calendário e regras em
`DISPAROS-BLACK.md`. Nenhum tem assinatura da vendedora: ela se apresenta na conversa. `{{lead.cf.881487}}` = `as_nome`.
Os `vd_*` de campanha têm o rodapé "Responda SAIR para não receber mais". As versões sem `_v2` de `vd_formacao_aluno`,
`vd_formacao_cliente`, `vd_condicao_pagamento`, `vd_parcela_dia` e `vd_esteira` ficam no Kommo, mas nenhum fluxo usa.

| Template | id | Categoria | Uso |
|---|---|---|---|
| `vd_formacao_aluno_v2` | 47155 | Marketing | B1 · comprou a Black 2026 sem Formação (13/11) |
| `vd_formacao_cliente_v2` | 47157 | Marketing | B2 · comprou o Guia de 11/2025 até antes da Black 2026 sem Formação (13 a 15/11, em levas) |
| `vd_condicao_pagamento_v2` | 47159 | Marketing | C · clicou em comprar e não fez pedido (15 min depois, das 8h às 21h) |
| `vd_parcela_dia_v2` | 47161 | Marketing | A (só vip_cadastro) 21/11 · C 7 dias depois · pesquisa "valor" 19/11 |
| `vd_esteira_v2` | 47163 | Marketing | A (só vip_cadastro, sem bônus) 24/11 |
| `vd_serve_pra_mim` | 47165 | Marketing | A 18/11 · pesquisa "momento" 19/11 |
| `vd_formacao_prova` | 47167 | Marketing | B 18/11 |
| `vd_indicacao` | 47169 | Marketing | compradores 20/11 (quem indica e quem compra ganham +3 meses de comunidade) |
| `vd_formacao_aula` | 47171 | Marketing | B 25/11 (a vendedora oferece no máximo R$ 222) |
| `vd_formacao_ultimo` | 47173 | Marketing | B 30/11 (só se o desconto da Formação acabar em 30/11) |
| `vd_retorno_condicao` | 47175 | Marketing | C 48 h depois, se não respondeu (vendedora) |
| `as_prova_v2` | 47177 | Marketing | substitui o as_prova (prova da sequência de quem está fora do grupo) |
| `as_boleto_vence` | 47179 | Marketing | boleto no dia do vencimento, 10h |
| `as_pix_pendente` | 47181 | Utility | Pix da Kiwify gerado e não pago, 24 h depois |

## `vd_formacao_aluno_v2` (id 47155)
```
Os outros 6 cursos ficaram mais baratos pra você, {{lead.cf.881487}}.

Você comprou na Black e já tem o Atendimento Extraordinário, 1 dos 7 cursos da Formação Completa. Para os outros 6 (plantão, hemograma, felinos, casos clínicos, procedimentos, cálculos e muito mais), a Dra. Maria Paula liberou um desconto só para quem já é aluno.

Posso te mandar?
```
Rodapé: Responda SAIR para não receber mais; Botões: Pode mandar · Tenho uma dúvida.

## `vd_formacao_cliente_v2` (id 47157)
```
Você já tem o Guia, {{lead.cf.881487}}, e isso tem um valor agora.

Quem já usa o Guia tem um desconto na Formação Completa da Amar que não aparece no site. A condição eu só posso passar por aqui.

Quer saber?
```
Rodapé: Responda SAIR para não receber mais; Botões: Quero saber · Tenho uma dúvida.

## `vd_condicao_pagamento_v2` (id 47159)
```
Separei uma condição para quem chegou até o pagamento, {{lead.cf.881487}}.

Ela não está no site da Amar e eu só consigo passar por aqui. Quer que eu te mande?
```
Rodapé: Responda SAIR para não receber mais; Botões: Pode mandar · Tenho uma dúvida.

## `vd_parcela_dia_v2` (id 47161)
```
Menos de R$ 1,70 por dia, {{lead.cf.881487}}.

É quanto sai o Guia de Protocolos na Black: 12x de R$ 51,40, com o curso Atendimento Extraordinário e 3 meses de comunidade junto. Se o valor é o que pesa, me responde que eu te mostro uma condição que só passo por aqui.
```
Rodapé: Responda SAIR para não receber mais; Botões: Quero ver · Tenho uma dúvida.

## `vd_esteira_v2` (id 47163)
```
Os 7 cursos da Amar podem ir junto com o seu Guia, {{lead.cf.881487}}.

Quem fecha o Guia de Protocolos comigo nesta Black leva a Formação Completa (plantão, hemograma, felinos, casos clínicos, procedimentos, cálculos, atendimento e muito mais) por bem menos do que ela custa sozinha.

Posso te contar como fica?
```
Rodapé: Responda SAIR para não receber mais; Botões: Pode contar · Tenho uma dúvida.

## `vd_serve_pra_mim` (id 47165)
```
Recém-formado e com medo do plantão sozinho, {{lead.cf.881487}}?

Foi para isso que a Dra. Maria Paula escreveu o Guia de Protocolos: a conduta, a dose e o cálculo do fluido na mesma página, para consultar com o paciente na mesa. Na Black ele vem com o curso Atendimento Extraordinário e 3 meses de comunidade, mas por tempo limitado.

Se quiser saber se serve para o seu momento, me responde que eu te ajudo a decidir.
```
Rodapé: Responda SAIR para não receber mais; Botões: Quero saber · Tenho uma dúvida.

## `vd_formacao_prova` (id 47167)
```
Uma aula da Formação mostra o carrinho de emergência montado item por item, {{lead.cf.881487}}.

É do curso Entre o plantão e o medo, que também tem classificação de risco, XABCDE do trauma e fluidoterapia no paciente de risco. Ele faz parte da Formação Completa, que segue com desconto para quem já tem o Guia.

Quer que eu te mande o valor?
```
Rodapé: Responda SAIR para não receber mais; Botões: Pode mandar · Tenho uma dúvida.

## `vd_indicacao` (id 47169)
```
Tem um colega que vive conferindo dose no celular, {{lead.cf.881487}}?

Se ele comprar o Guia de Protocolos na Black pela sua indicação, você e ele ganham mais 3 meses na Comunidade Amar Saber, além dos 3 que já tem. Ele leva o mesmo pacote que você: o Guia, o curso e a comunidade.

Toca em "Quero indicar" que eu te mando o seu link. Essa oferta é por tempo limitado.
```
Rodapé: Responda SAIR para não receber mais; Botões: Quero indicar · Tenho uma dúvida.

## `vd_formacao_aula` (id 47171)
```
Menos de R$ 2 por aula, {{lead.cf.881487}}.

Na condição exclusiva que eu tenho pra você, é quanto sai cada aula da Formação Completa: são mais de 100 aulas de plantão, hemograma, felinos, casos clínicos, procedimentos, cálculos e muito mais, liberadas por 1 ano.

Quer que eu te mande o valor?
```
Rodapé: Responda SAIR para não receber mais; Botões: Pode mandar · Tenho uma dúvida.

## `vd_formacao_ultimo` (id 47173)
```
Hoje é o último dia do desconto da Formação, {{lead.cf.881487}}.

À meia-noite a Formação Completa volta ao preço normal, junto com o fim da Black. Se ainda faz sentido pra você, me responde agora que eu te passo o valor e o link.
```
Rodapé: Responda SAIR para não receber mais; Botões: Pode mandar · Tenho uma dúvida.

## `vd_retorno_condicao` (id 47175)
```
A condição que separei pra você continua valendo, mas por tempo limitado.

Te chamei há dois dias sobre o seu Guia de Protocolos e não quis deixar passar. Se ficou alguma dúvida (parcela, entrega, se serve pra você), me responde aqui que eu resolvo.

Quero muito te ver lá!
```
Rodapé: Responda SAIR para não receber mais; Botões: Quero a condição · Tenho uma dúvida.

## `as_prova_v2` (id 47177)
```
Já vi e adorei o conteúdo.

Foi o que uma colega mandou quando o Guia de Protocolos chegou. Já são mais de 2.000 vendidos, e o lote da Black Friday é limitado.

O seu ainda está a um clique, mas por tempo limitado.
```
Botões: Quero o link · Tenho uma dúvida.

## `as_boleto_vence` (id 47179)
```
Seu boleto do Guia de Protocolos vence hoje, {{lead.cf.881487}}.

O pedido fica reservado até o fim do dia. Se preferir pagar no Pix ou no cartão, me responde aqui que eu te mando o link.
```
Botões: Quero o link · Já paguei.

## `as_pix_pendente` (id 47181)
```
O Pix do seu pedido do Guia de Protocolos ainda está em aberto, {{lead.cf.881487}}.

O pedido segue reservado, mas por pouco tempo. Se travou em alguma coisa, me responde aqui que eu resolvo com você.
```
Botões: Quero o link · Já paguei.

## Salesbots dos templates de campanha (12/11): passo a passo
Iguais aos bots do comercial de 10/11:
- **sem gatilho**;
- canal **só o WhatsApp da (31) 9 5349-5052**;
- rodados pelo n8n (`POST /api/v2/salesbot/run`).

O nome do template já traz `{{lead.cf.881487}}` (as_nome), que o n8n grava no lead antes de rodar o bot.

**Ordem:** primeiro os bots de resposta (parte 1), depois os de template (parte 2), porque o passo **Iniciar Salesbot**
só lista bots que já existem.

### 1. Bots de resposta (2 novos + 1 ajuste)
**1a · `VD · Indicar`** (novo), para o botão "Quero indicar":
1. **Enviar mensagem** (texto de 13/11, com o link do lead): "Que ótimo! 💗 Aqui está o seu link de indicação: {{lead.cf.881489}}
   Quando seu colega comprar por ele, vocês dois ganham mais 3 meses de comunidade."
2. **Ação → Enviar webhook**: `https://n8n.automato.pro/webhook/as-black-comercial?chave=<CHAVE>&acao=indicar`
3. **Ação → Alterar etapa do lead**: *Comercial Black* → *Respondeu*

**1b · `AS · Já paguei`** (novo), para o botão "Já paguei" dos lembretes de boleto e Pix:
1. **Enviar mensagem**: "Obrigada! 💗 Vou conferir aqui e, se aparecer alguma pendência, te aviso."
2. **Iniciar Salesbot** → `AS · Atendimento` (para a sequência e a equipe confere o pagamento)

**1c · `VD · Outra resposta`** (id 52629, ajuste para o rodapé "Responda SAIR"):
1. Primeiro passo: **Condição** → mensagem do cliente **contém** `sair` (adicione também `Sair` e `SAIR`, caso a condição diferencie maiúsculas).
2. **Se sim:**
   - **Enviar mensagem**: "Combinado, não te mando mais mensagens. 💗";
   - **Ação → Enviar webhook** `…/as-black-comercial?chave=<CHAVE>&acao=sair`;
   - **Ação → Alterar etapa do lead** → *Comercial Black* → *Não quer*.
3. **Se não:** o que o bot já faz hoje (webhook `acao=texto`).

### 2. Bots de template (14)
**Montagem:** monte o primeiro duplicando `VD · vd_geral` (ou `AS · as_prova`, para os `as_*`). Em cada cópia, troque o nome, o template e os ramos da tabela.

**Em todo bot:**
- passo **Enviar mensagem** → **Canais**: só a 5052;
- marque **"Se você nunca conversou em um canal: Tente enviar uma mensagem"**. É obrigatório: os compradores antigos da base B2 nunca falaram com esse número, e sem isso o bot pula em silêncio;
- **não** ligue **Sem resposta**;
- **ramo de falha:**
  - bots `VD`: **Falha ao enviar a mensagem** → **Ação → Enviar webhook** `…/as-black-comercial?chave=<CHAVE>&acao=falha`;
  - bots `AS`: o mesmo, com o webhook da recuperação `…/as-black-kommo?chave=<CHAVE>&acao=falha`.

| # | Bot | Botão positivo → | Tenho uma dúvida → | Outra resposta → |
|---|---|---|---|---|
| 1 | `VD · vd_formacao_aluno_v2` | Pode mandar → `VD · Explicar` | `VD · Dúvida` | `VD · Outra resposta` |
| 2 | `VD · vd_formacao_cliente_v2` | Quero saber → `VD · Explicar` | `VD · Dúvida` | `VD · Outra resposta` |
| 3 | `VD · vd_condicao_pagamento_v2` | Pode mandar → `VD · Pedido` | `VD · Dúvida` | `VD · Outra resposta` |
| 4 | `VD · vd_parcela_dia_v2` | Quero ver → `VD · Explicar` | `VD · Dúvida` | `VD · Outra resposta` |
| 5 | `VD · vd_esteira_v2` | Pode contar → `VD · Explicar` | `VD · Dúvida` | `VD · Outra resposta` |
| 6 | `VD · vd_serve_pra_mim` | Quero saber → `VD · Explicar` | `VD · Dúvida` | `VD · Outra resposta` |
| 7 | `VD · vd_formacao_prova` | Pode mandar → `VD · Explicar` | `VD · Dúvida` | `VD · Outra resposta` |
| 8 | `VD · vd_indicacao` | Quero indicar → `VD · Indicar` | `VD · Dúvida` | `VD · Outra resposta` |
| 9 | `VD · vd_formacao_aula` | Pode mandar → `VD · Explicar` | `VD · Dúvida` | `VD · Outra resposta` |
| 10 | `VD · vd_formacao_ultimo` | Pode mandar → `VD · Explicar` | `VD · Dúvida` | `VD · Outra resposta` |
| 11 | `VD · vd_retorno_condicao` | Quero a condição → `VD · Explicar` | `VD · Dúvida` | `VD · Outra resposta` |
| 12 | `AS · as_prova_v2` | Quero o link → `AS · Link` | `AS · Dúvida` | `AS · Atendimento` |
| 13 | `AS · as_boleto_vence` | Quero o link → `AS · Link` · Já paguei → `AS · Já paguei` | — | `AS · Atendimento` |
| 14 | `AS · as_pix_pendente` | Quero o link → `AS · Link` · Já paguei → `AS · Já paguei` | — | `AS · Atendimento` |

**Por que os toques caem no painel:** os bots `VD` chamam o webhook do comercial, que grava a resposta na aba Comercial · Black. Os bots `AS` passam pela recuperação, que põe a pessoa em atendimento. Nos dois casos ela aparece em 💬 no painel. O n8n também tira da fila de recuperação quem respondeu a um `VD`.

**Depois de criar:** mandar os ids dos 16 bots novos (14 de template e 2 de resposta) para entrarem no "Config do Kommo" do n8n e no painel. O id aparece no endereço do bot aberto no Kommo.

## Objeção do grupo (13/11)
Para quem esteve no Grupo VIP e não comprou (público G em `DISPAROS-BLACK.md`). Cada botão grava a Objeção no painel e a pessoa fica com a vendedora. Cadastrado e aprovado em 13/11 (conferido pela API).

### `vd_objecao` (id 47209)
Marketing, pt_BR, sem cabeçalho.
```
O que ficou faltando para você garantir o seu Guia, {{lead.cf.881487}}?

Você acompanhou a Black do Guia de Protocolos de perto, e eu quero entender o que pesou na sua decisão. Toca numa opção ou me escreve: eu te respondo aqui, pessoalmente.
```
Rodapé: Responda SAIR para não receber mais; Botões: Preço · Serve pra mim? · Outra coisa.

### Salesbots
Montados como os de 12/11:
- sem gatilho;
- só a 5052;
- "Tente enviar uma mensagem" marcado.

| Bot | id | O que faz |
|---|---|---|
| `VD · vd_objecao` | 53221 | Preço → `VD · Objeção preço` · Serve pra mim? → `VD · Objeção serve` · Outra coisa → `VD · Objeção outra` · outra resposta → `VD · Outra resposta` (trata o SAIR) · falha → webhook `acao=falha` |
| `VD · Objeção preço` | 53211 | "Entendi! 💗 Me conta: o que pesa mais, o valor total ou a parcela? Já te mostro o que dá para fazer." · webhook `acao=obj_preco` · etapa Respondeu |
| `VD · Objeção serve` | 53215 | "Boa pergunta! 💗 Me conta: hoje você atende em clínica, em plantão ou ainda está na faculdade?" · webhook `acao=obj_serve` · etapa Respondeu |
| `VD · Objeção outra` | 53217 | "Me conta, estou aqui! 💗" · webhook `acao=obj_outra` · etapa Respondeu |

O webhook é o mesmo dos outros VD (`…/as-black-comercial?chave=<CHAVE>&acao=…`).
- **Objeção gravada na aba:**

  | Ação | Objeção |
  |---|---|
  | `obj_preco` | "Preço" |
  | `obj_serve` | "Serve para mim?" |
  | `obj_outra` | em branco (a vendedora escolhe) |

- A Resposta sempre recebe "Objeção: …".

## Horários livres (13/11): templates novos
Os dois são Marketing, pt_BR, sem cabeçalho, com rodapé "Responda SAIR para não receber mais". Os bots seguem o mesmo padrão:
sem gatilho, só a 5052, "Tente enviar uma mensagem" marcado e falha → webhook `acao=falha`.

### `vd_curso_comunidade_v2` (id 47261, bot `VD · vd_curso_comunidade` 53329; base antiga, 23 e 24/11)
```
O que veio junto do Guia nesta Black, {{lead.cf.881487}}, agora pode ser seu separado.

Quem comprou o Guia de Protocolos na Black levou também o curso Atendimento Extraordinário e 3 meses na Comunidade Amar Saber. Como você já tem o Guia, separei só essa parte pra você com uma condição exclusiva.

Quer que eu te mande?
```
Botões: Quero ver → `VD · Explicar` · Tenho uma dúvida → `VD · Dúvida` · outra resposta → `VD · Outra resposta`.

### `vd_black_friday` (id 47241, bot 53305; engajados sem compra, 27/11)
```
Hoje é a Black Friday, {{lead.cf.881487}}, e a condição do Guia vai só até segunda.

O Guia de Protocolos vem com o curso Atendimento Extraordinário e 3 meses de Comunidade, por 12x de R$ 51,40. Depois de 30/11, ou se o estoque acabar, essa condição acaba.

Quer o link?
```
Botões: Quero o link → `VD · Link` (novo) · Tenho uma dúvida → `VD · Dúvida` · outra resposta → `VD · Outra resposta`.

### Bot novo `VD · Link` (53301)
1. **Enviar mensagem:** "Aqui está o link com a condição da Black: {{lead.cf.881489}}
   Se travar em alguma parte, me responde aqui."
2. **Ação → Enviar webhook:** `…/as-black-comercial?chave=<CHAVE>&acao=quer`.
3. **Ação → Alterar etapa do lead:** *Comercial Black* → *Link enviado*.

### `vd_amanha_acaba` (engajados sem compra, 29/11)
Marketing, pt_BR, sem cabeçalho, rodapé "Responda SAIR para não receber mais".
```
Amanhã a Black do Guia acaba, {{lead.cf.881487}}.

Na segunda, 30/11, às 23h59, o Guia de Protocolos volta ao preço normal e o curso Atendimento Extraordinário e os 3 meses de Comunidade deixam de vir junto.

Ainda dá tempo: quer o link?
```
Botões: Quero o link → `VD · Link` · Tenho uma dúvida → `VD · Dúvida` · outra resposta → `VD · Outra resposta`.
Bot do template: `VD · vd_amanha_acaba`, no mesmo padrão dos outros. Quando estiver aprovado, o id do bot entra em `BOTS`.
