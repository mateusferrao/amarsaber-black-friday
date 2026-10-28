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

O Guia de Protocolos ainda está na condição de Black Friday. Te mando um link novo agora: dá para pagar no Pix ou parcelar em 12x de R$ 50,57 no cartão.

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

Costuma ser limite ou bloqueio de segurança. Dá para tentar outro cartão, parcelar em 12x de R$ 50,57 ou pagar no Pix, e a condição de Black continua valendo.

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

A Black Friday do Guia de Protocolos termina na segunda, 30/11, às 23h59. Até lá, o Guia impresso vem com o curso Atendimento Extraordinário e 3 meses de comunidade, em 12x de R$ 50,57.

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

Hoje às 23h59 a Black Friday do Guia de Protocolos sai do ar, e a oferta inteira acaba junto: o Guia impresso, o curso Atendimento Extraordinário e a comunidade. São 12x de R$ 50,57 só até as 23h59 de hoje.
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

R$ 187 à vista ou 12x de R$ 19,03, só até 30/11.
```

- **Exemplos:** {{1}} = Ana
- **Rodapé:** (vazio)
- **Botões (resposta rápida):** Quero o link · Tenho uma dúvida

## Respostas dos Salesbots (texto livre, sem aprovação: vão dentro das 24 h depois do toque)

**R1 · Tocou em "Quero o link"**

```
Aqui está o link com a condição de Black Friday: {{lead.cf.881489}}

Se travar em qualquer parte do pagamento, me responde aqui.
```


**R2 · Tocou em "Preço" (triagem)**

```
Dá para parcelar em 12x de R$ 50,57 no cartão, ou pagar R$ 497 à vista no Pix ou boleto. Nesse valor vêm o Guia impresso, o curso completo Atendimento Extraordinário e 3 meses de comunidade, que somados valem R$ 1.137,70.
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


## Salesbots no Kommo: passo a passo
O n8n decide **qual** template sai e **quando**. O Kommo só envia, para a conversa ficar no histórico do lead. São
**21 bots, nenhum com gatilho**: o n8n roda os 15 de template pela API, e eles chamam os 6 de resposta com o passo
**Iniciar Salesbot**.

**Onde:** Configurações → **Salesbot** (ou Automações → Salesbot) → **+ Criar bot** → **Criar do zero**. Em cada
bot: dê o nome no topo, monte os passos com **Adicionar próximo passo** e clique **Salvar**. Na janela "Condição de execução", clique **Cancelar**; no aviso "Seu bot nunca será executado sem um gatilho", clique **Salvar**. Não adicione gatilho.

**Ordem:** primeiro os 6 bots de resposta (parte A), depois os 15 de template (parte B). O passo **Iniciar Salesbot**
só lista bots que já existem.

**Endereço do webhook** (passo **Ação → Enviar webhook**), igual em todos e com a `acao` trocada:
`https://n8n.automato.pro/webhook/as-black-kommo?chave=<CHAVE>&acao=<acao>`. A `<CHAVE>` está no nó "Ler evento" do
fluxo `AS · Recuperação Black` e não fica no repositório. O n8n acha o lead pelo id que o Kommo manda junto.

### A. Os 6 bots de resposta

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

### B. Os 15 bots de template
Nome: `AS · <nome do template>` (ex.: `AS · as_resultado_plantao`). Monte um, confira, e use **Duplicar** na lista
de bots para os outros. Em cada cópia, troque só o nome e o template.

1. **Enviar mensagem** → canal **WhatsApp da (31) 9 5349-5052** → **Modelo** (template) → o template de mesmo nome.
2. Os botões do template viram ramos embaixo da mensagem. Se não virarem, adicione **+ Botão de ação** com o texto
   exato de cada botão.
3. Ramos:
   - **Quero o link** → **Iniciar Salesbot** → `AS · Link`
   - **Tenho uma dúvida** → **Iniciar Salesbot** → `AS · Dúvida`
   - **Outra resposta** → **Iniciar Salesbot** → `AS · Atendimento`
4. Não ligue **Sem resposta**. Assim o bot fica esperando o toque até o próximo template, que o n8n manda dias depois.
5. Se aparecer o ramo **Falha ao enviar mensagem**, deixe vazio: o n8n registra o erro pelo retorno da API.

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

O Kommo só deixa escolher o template depois que a Meta aprova. Dá para criar os 6 bots de resposta agora e os 15 de
template à medida que os templates forem aprovados.

### C. Depois dos bots
- Me avise: eu leio os IDs dos 15 bots de template pela API (`/api/v4/bots`) e preencho o BOTS no n8n.
- **n8n:** criar a credencial **Kommo API** (Header Auth/Custom: `Authorization: Bearer <token de longa duração>`) e
  escolher nos 5 nós HTTP do `AS · Kommo enviar`.
- No teste, confiro no n8n o formato do webhook que o Kommo manda e se o lead é achado.
