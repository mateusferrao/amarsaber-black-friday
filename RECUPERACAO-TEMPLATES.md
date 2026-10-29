# Recuperação de vendas da Black Friday: templates

Textos para cadastrar no Kommo (templates de WhatsApp, aprovados pela Meta), nas respostas do Salesbot e nos 4 e-mails
de carrinho abandonado da Yampi. Os fluxos do n8n (`AS · Recuperação Black` e `AS · Kommo enviar`) usam os **nomes dos
templates** abaixo: cadastre com o mesmo nome. Como ligar tudo: seção "Ativação" no fim.

Regras da cadência: 1ª mensagem na hora, a qualquer hora (responde ao que a pessoa acabou de fazer: teste, checkout,
Pix ou cartão; com mais de 60 min de atraso, espera as 8h); depois só das 8h às 21h e no máximo 2 por dia; compra
de qualquer produto para tudo; qualquer resposta fora dos botões pausa a automação e vai para o atendimento; nada sai
depois de 30/11 23h59.

## Sequências
Regras: 1ª mensagem na hora, a qualquer hora; depois só 8h–21h e no máx. 2/dia; compra de qualquer produto
para tudo; sem saída própria: qualquer texto fora dos botões segue o padrão e vai para o atendimento; resposta que não seja "Quero o link" pausa (status `atendimento`);
teste → checkout troca de sequência sem repetir mensagem; de 28 a 30/11 a reta final substitui o núcleo.

| Fluxo | Entrada | Passos |
|---|---|---|
| teste | lead do /teste/ | T1a/T1b/T1c (pela dor) +15 min → T2/T3/T4 (pela dor) dia seguinte 10h → T5 +1 dia 19h → T6 +2 dias 10h |
| checkout | Yampi `cart.reminder` | T7 +15 min → T5 dia seguinte 10h → T6 +2 dias 10h |
| pix | Pix expirado (Yampi) | T8 na hora → T5 dia seguinte 10h → T6 +2 dias 10h |
| cartão | `transaction.payment.refused` | T9 +10 min → T5 dia seguinte 10h → T6 +2 dias 10h |
| reta final | todos ativos sem compra | T10 28/11 10h → T11 30/11 9h → T12 30/11 19h |
| alternativa | tocou "Preço" | resposta R2 na hora → `as_alternativa` +48 h, se antes de 30/11 |


## Templates de WhatsApp (versão final, 15)
Cadastro no Kommo campo a campo: `KOMMO-TEMPLATES-FICHA.md`. Padrão: categoria **Marketing**, idioma **pt_BR**,
cabeçalho de texto **"Maria Paula · Amar Saber"** (ou imagem + o mesmo texto no rodapé), botões de resposta rápida.
`{{1}}` = primeiro nome (campo `as_nome`); `{{2}}` = dias até 30/11 (campo `as_dias`). A Meta não aceita corpo que começa
com variável: por isso todos abrem com "Oi, {{1}}" ou equivalente. Mudanças sobre a v2: triagem com 3 botões ("Outra
dúvida" saiu: texto livre já vai para o atendimento) e uma alternativa só (`as_alternativa`, o curso + comunidade de
R$ 187 da `/oferta-especial/`), no lugar de `as_alt_plantao`, `as_alt_consulta` e `as_alt_sozinho`.

**T1a · as_resultado_plantao** (15 min depois do teste, para quem teve o plantão como ponto mais sensível; Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}! Seu resultado saiu: o plantão é o seu ponto mais sensível.
>
> Na emergência, cada minuto procurando dose no celular é um minuto longe do paciente. E é de madrugada que isso acontece, sem ninguém para perguntar.
>
> O Guia de Protocolos põe as emergências em passos objetivos, com doses e cálculo de fluido, na sua bancada. Na Black ele vem com o curso Atendimento Extraordinário e 3 meses de comunidade, até 30/11.
>
> Quer o link?

**T1b · as_resultado_consulta** (15 min depois do teste, para quem teve a consulta como ponto mais sensível; Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}! Seu resultado saiu: o seu ponto mais sensível é a conversa com o tutor.
>
> Você explica o tratamento e o tutor responde “vou pensar e te aviso”. O animal vai embora sem tratar e a consulta não vira retorno.
>
> No curso Atendimento Extraordinário eu ensino o passo a passo da consulta que usamos na Amar Veterinária, da anamnese ao pós-consulta. Na Black ele vem junto com o Guia de Protocolos e 3 meses de comunidade, até 30/11.
>
> Quer o link?

**T1c · as_resultado_sozinho** (15 min depois do teste, para quem teve decidir sozinho como ponto mais sensível; Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}! Seu resultado saiu: o seu ponto mais sensível é decidir os casos difíceis sozinho.
>
> Sem ninguém para conferir, você só descobre se acertou quando o paciente volta. Ou quando ele não volta.
>
> Na Black, o Guia de Protocolos vem com 3 meses na Comunidade Amar Saber, um grupo de WhatsApp com veterinários que usam o Guia, com a minha participação e a da equipe. Você leva o caso e compara condutas antes de decidir. Até 30/11.
>
> Quer o link?

**T2 · as_dor_plantao** (Dia seguinte ao teste, 10h (dor: plantão); Imagem: assets/img/pagina-1.jpg; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}. Essa é a página que você abriria às 2h da manhã.
>
> No Guia de Protocolos cada emergência vem em passos objetivos, com as doses e o cálculo de fluido. Você consulta na hora, com o paciente na mesa.
>
> A Black Friday do Guia vai até 30/11, num lote limitado.

**T3 · as_dor_consulta** (Dia seguinte ao teste, 10h (dor: consulta); Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}. Quantos tutores saíram da sua consulta dizendo “vou pensar” este mês?
>
> Cada um é um tratamento que não aconteceu. No curso Atendimento Extraordinário eu mostro como conduzir a anamnese, explicar o exame físico e apresentar o tratamento ao tutor sem parecer vendedora.
>
> Na Black, o curso completo vem junto com o Guia de Protocolos, até 30/11.

**T4 · as_dor_sozinho** (Dia seguinte ao teste, 10h (dor: decidir sozinho); Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}. Com quem você discutiu o último caso difícil?
>
> Na Comunidade Amar Saber você leva o caso que te travou e compara condutas com veterinários de outras cidades. Eu e a equipe participamos das conversas. Na Black, o Guia de Protocolos vem com 3 meses de comunidade.
>
> A condição vai até 30/11.

**T5 · as_prova** (Teste: mais 1 dia, 19h · Checkout, Pix e cartão: dia seguinte, 10h; Imagem: assets/img/depoimento-1.jpg; botões Quero o link · Tenho uma dúvida)
> “Já vi e adorei o conteúdo.”
>
> Foi o que uma colega mandou quando o Guia de Protocolos chegou. Já são mais de 1.500 vendidos, e o lote da Black Friday é limitado.
>
> O seu ainda está a um clique, até 30/11.

**T6 · as_triagem** (2 dias depois da anterior, 10h (todas as sequências); Texto: Maria Paula · Amar Saber; botões Preço · Entrega · Se serve pra mim)
> Oi, {{1}}, o que está te segurando?
>
> Faltam {{2}} dias para acabar a Black do Guia de Protocolos. Toca numa opção ou me escreve a sua dúvida, que eu te respondo agora.

**T7 · as_checkout_15min** (15 min depois do checkout abandonado na Yampi; Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}! Seu Guia de Protocolos ficou a um clique.
>
> O pedido parou no pagamento, e o lote da Black Friday é limitado. Se travou em alguma coisa, me responde aqui que a equipe resolve com você.
>
> Quer o link para terminar?

**T8 · as_pix_expirou** (Na hora em que o Pix expira; Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}. Seu Pix expirou, mas o pedido continua aqui.
>
> O Guia de Protocolos ainda está na condição de Black Friday. Te mando um link novo agora: dá para pagar no Pix ou parcelar em 12x de R$ 50,57 no cartão.
>
> Quer o link?

**T9 · as_cartao_recusado** (10 min depois do cartão recusado; Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}. O banco barrou o pagamento do seu Guia de Protocolos.
>
> Costuma ser limite ou bloqueio de segurança. Dá para tentar outro cartão, parcelar em 12x de R$ 50,57 ou pagar no Pix, e a condição de Black continua valendo.
>
> Quer o link de novo?

**T10 · as_reta_3dias** (Sáb 28/11, 10h (todos que não compraram); Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}, faltam 3 dias.
>
> A Black Friday do Guia de Protocolos termina na segunda, 30/11, às 23h59. Até lá, o Guia impresso vem com o curso Atendimento Extraordinário e 3 meses de comunidade, em 12x de R$ 50,57.
>
> Não deixa essa passar: quer o link?

**T11 · as_ultimo_dia** (Seg 30/11, 9h (todos que não compraram); Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Último dia, {{1}}.
>
> Hoje às 23h59 a Black Friday do Guia de Protocolos sai do ar, e a oferta inteira acaba junto: o Guia impresso, o curso Atendimento Extraordinário e a comunidade. São 12x de R$ 50,57 só até as 23h59 de hoje.

**T12 · as_ultimas_horas** (Seg 30/11, 19h (todos que não compraram); Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}, faltam 5 horas.
>
> A Black Friday do Guia de Protocolos termina hoje às 23h59, e depois disso a oferta não volta. Se ainda tem alguma dúvida, me responde agora que a equipe te ajuda até o fim.

**T13 · as_alternativa** (48 h depois de tocar em "Preço" (se antes de 30/11); Texto: Maria Paula · Amar Saber; botões Quero o link · Tenho uma dúvida)
> Oi, {{1}}! Se o Guia não cabe agora, dá para começar pela consulta.
>
> O curso completo Atendimento Extraordinário (anamnese que conduz, exame físico explicado ao tutor, Técnica do Detetive e pós-consulta) vem com 3 meses na Comunidade Amar Saber.
>
> R$ 187 à vista ou 12x de R$ 19,03, só até 30/11.

## Respostas livres do Salesbot (dentro da janela de 24 h, sem aprovação)
- **R1 · Quero o link**: "Aqui está o link com a condição de Black Friday: {{link}}
  Se travar em qualquer parte do pagamento, me responde aqui."
- **R2 · Preço**: "Dá para parcelar em 12x de R$ 50,57 no cartão, ou pagar R$ 497 à vista no Pix ou boleto. Nesse
  valor vêm o Guia impresso, o curso completo Atendimento Extraordinário e 3 meses de comunidade, que somados valem
  R$ 1.137,70." [Quero o link] → n8n marca `objecao = preco` e agenda a alternativa em 48 h.
- **R3 · Entrega**: "O Guia é impresso e sai em até 10 dias úteis depois da confirmação do pagamento. O curso e a
  comunidade são online, e o acesso chega no seu e-mail." [Quero o link] [Tenho uma dúvida]
- **R4 · Se serve pra mim**: "Para quem está começando, o Guia é uma base de conduta para a rotina, com orientações
  diretas. Para quem já atende, ele vira a consulta rápida no meio do plantão e o padrão para treinar a equipe."
  [Quero o link] [Tenho uma dúvida]
- **R5 · Tenho uma dúvida**: "Pode mandar a sua dúvida aqui. A equipe responde em seguida." → pausa e vai para o
  atendimento. Quem escreve qualquer outra coisa não recebe texto: pausa e vai direto para o atendimento.

## E-mails da Yampi (carrinho abandonado; [nome] e o botão são as variáveis da Yampi)
**E1 · 30 min**
- Assunto: Seu Guia de Protocolos ficou a um clique
- Pré-cabeçalho: A condição de Black Friday continua valendo até 30/11.
- Corpo: Oi, [nome]. Aqui é a Maria Paula, da Amar Saber. Vi que o seu pedido do Guia de Protocolos ficou pela
  metade. Guardei tudo no carrinho. Na Black Friday, o pedido inclui o Guia de Protocolos Clínicos impresso, o curso
  completo Atendimento Extraordinário e 3 meses na Comunidade Amar Saber no WhatsApp, por 12x de R$ 50,57 ou R$ 497 à
  vista. Se alguma coisa travou no pagamento, responda este e-mail ou chame a gente no WhatsApp (31) 9 5349-5052.
- CTA: **Terminar meu pedido**

**E2 · 2 h**
- Assunto: A página que você abriria às 2h da manhã
- Pré-cabeçalho: Emergências, doses, fluidoterapia e anamnese num livro de bancada.
- Corpo: Oi, [nome]. O Guia de Protocolos nasceu dentro da Amar Veterinária, a partir dos protocolos que a gente usa
  no dia a dia. Eu escrevi com as Dras. Isabelle Viturino e Mariana Correa, e a Dra. Micaella Mendes escreveu o
  capítulo de clínica felina. Dentro dele: condutas para as principais patologias da clínica de pequenos;
  emergências em passos objetivos; cálculo de doses, fluidoterapia e transfusão de sangue; um roteiro completo de
  anamnese. [imagem: sumário do Guia]
- CTA: **Ver meu pedido**

**E3 · 24 h**
- Assunto: “Já vi e adorei o conteúdo”
- Pré-cabeçalho: Mais de 1.500 Guias vendidos, e as três perguntas que mais recebemos antes de decidir.
- Corpo: Oi, [nome]. Já são mais de 1.500 Guias de Protocolos vendidos. Esse é um dos recados que recebi:
  [imagem: depoimento]. *Quando chega?* O Guia é impresso e sai em até 10 dias úteis depois da confirmação do
  pagamento; o curso e a comunidade são online, e o acesso chega por e-mail. *Posso parcelar?* Sim, em 12x de
  R$ 50,57 no cartão, ou R$ 497 à vista no Pix ou boleto. *Serve para mim?* Para quem está começando, é uma base de
  conduta; para quem já atende, é a consulta rápida no meio do plantão e o padrão para treinar a equipe.
- CTA: **Terminar meu pedido**

**E4 · 48 h**
- Assunto: Seu carrinho da Black ainda está guardado (até 30/11)
- Pré-cabeçalho: Guia, curso e comunidade por 12x de R$ 50,57 até segunda, 23h59.
- Corpo: Oi, [nome]. Passando para avisar: a condição de Black Friday do Guia de Protocolos vai até segunda, 30/11,
  às 23h59. Seu carrinho ainda está guardado com o Guia impresso, o curso completo Atendimento Extraordinário e
  3 meses de comunidade, por 12x de R$ 50,57 ou R$ 497 à vista. Abraço, Maria Paula.
- CTA: **Não perder a condição de Black**
- Desligar os e-mails na Yampi em 30/11 23h59 (a Yampi não sabe a data final).

## Ativação
1. ~~Kommo: funil "Recuperação Black" e campos `as_*`~~ (feito pela API em 28/10).
2. ~~Yampi: webhook para `as-black-yampi`~~ (feito pela API em 28/10).
3. ~~n8n: conta, funil, etapa e campos no "Config do Kommo"; alternativa única~~ (feito em 28/10).
4. ~~Kommo: 15 templates aprovados e 21 Salesbots~~ (feito em 29/10; IDs dos bots no "Config do Kommo").
5. ~~n8n: credencial "Kommo API" nos 5 nós HTTP do `AS · Kommo enviar`~~ (feito em 29/10).
6. ~~Meta: forma de pagamento na conta do WhatsApp Business~~ (feito em 29/10). **Falta (usuário):** verificação da
   empresa na BM.
7. ~~Kommo: ramo "Falha ao enviar a mensagem" dos 15 bots → `acao=falha`; apagar as cópias "em revisão"~~ (feito em
   29/10). Quem atende os leads em "Pediu o link" e "Em atendimento": **a equipe comercial**.
8. ~~Teste de ponta a ponta e `ENVIO_ATIVO = true`~~ (feito em 29/10; ver "Teste de ponta a ponta" abaixo).
9. **Liga sozinho em 10/11 às 20h30** (`LIGA_EM`), depois do link da live no Grupo VIP.
10. **E-mails e cupons da Yampi:** cadastrar os 4 e-mails no painel; em 30/11 às 23h59, desligar os e-mails e os cupons
    BLACKAMARSABER e BLACKAMARSABERDS.

### Proteções do disparador (29/10)
- **Só depois de `LIGA_EM`** (10/11, 20h30) e com `ENVIO_ATIVO = true`. Antes disso, as linhas esperam sem mudar.
- **Teto de 200 envios por dia** somando todo mundo (`MAX_ENVIOS_DIA`): a BM sem verificação tem ~250 conversas
  iniciadas por 24 h na Meta. O que passa do teto vai para o dia seguinte às 8h.
- **No máximo 40 linhas por rodada** de 5 min ("Ordenar e limitar"), com checkout, Pix e cartão na frente. Sem isso,
  uma rodada longa se sobrepõe à seguinte e a mesma pessoa recebe duas vezes.
- **Falha de envio:** o ramo de falha do bot chama `acao=falha` e a linha fica `erro_envio` (para revisar à mão).
- **Aceite de WhatsApp:** o lead do teste só entra na fila com `consentimento: true` (texto junto do botão do /teste/).
- **Contato no Kommo:** a busca vai pelos 8 últimos dígitos e confere o DDD, porque o contato que veio do WhatsApp
  costuma estar salvo sem o 9. Assim não nasce contato duplicado.

### Estado atual (29/10)
- **Kommo:** funil "Recuperação Black" (14689116; etapas Em recuperação 113503588 · Pediu o link 113503592 · Em
  atendimento 113503596), campos do lead `as_nome` 881487, `as_link` 881489, `as_dor` 881491, `as_dias` 881493;
  15 templates aprovados com os marcadores `{{lead.cf.881487}}` (e `{{lead.cf.881493}}` na triagem); 21 bots.
- **Yampi:** webhook "AS · Recuperação Black (n8n)" ativo (cart.reminder, order.paid, order.status.updated,
  transaction.payment.refused) apontando para `as-black-yampi`. Ainda sem evento real para conferir o formato.
- **n8n:** tudo publicado, com `ENVIO_ATIVO = true`, `TELEFONE_TESTE` vazio e `TESTE_RAPIDO = false`. Nada sai antes
  de 10/11 às 20h30 (`LIGA_EM`).

### Teste de ponta a ponta (29/10, número do Mateus)
Com `TELEFONE_TESTE` e `TESTE_RAPIDO` (intervalos em minutos), a linha da fila andou sozinha pelo disparador:

| Passo | Resultado |
|---|---|
| as_resultado_plantao, as_dor_plantao (imagem), as_prova (imagem), as_triagem | Chegaram com "Oi, Mateus", os botões e "Faltam 33 dias". A 1ª se perdeu por causa do erro abaixo (reenviada depois e conferida) |
| Botão **Preço** na triagem | R2 com "Quero o link"; na fila, `objecao = preco` e alternativa agendada para 48 h depois |
| as_alternativa (disparada direto pelo bot) | Chegou com o texto de R$ 187 e os botões |
| Texto livre | n8n pôs a linha em `atendimento`; lead em "Em atendimento". Sem resposta automática, como previsto: a equipe responde |
| Pedido falso da Yampi (`order.status.updated`, status `invoiced`) | Linha marcada `comprou`. Status `invoiced` não manda CompraPaga à Meta nem grava na aba Compras |

**Erro achado e corrigido no `AS · Kommo enviar`:** o Kommo responde `application/hal+json`, e o n8n entregava o corpo
como texto em `data`. O "Montar lead" não via o contato achado e criava um contato duplicado (com o 9), e o
"Pegar lead" não lia o lead existente. Os dois nós agora leem o `data`. Depois da correção, o 2º envio em diante foi
para a conversa certa.

O contato duplicado "Mateus" +55 31 9 9481-1420 fica no Kommo (decisão do usuário). Os leads de teste foram para
"Perdido". A parcela de 12x R$ 50,57 do R2 foi conferida no checkout pelo usuário.
