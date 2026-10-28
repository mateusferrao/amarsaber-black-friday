# Recuperação de vendas da Black Friday: templates

Textos para cadastrar no Kommo (templates de WhatsApp, aprovados pela Meta), nas respostas do Salesbot e nos 4 e-mails
de carrinho abandonado da Yampi. Os fluxos do n8n (`AS · Recuperação Black` e `AS · Kommo enviar`) usam os **nomes dos
templates** abaixo: cadastre com o mesmo nome. Como ligar tudo: seção "Ativação" no fim.

Regras da cadência: 1ª mensagem na hora (8h–21h; senão às 8h); depois só das 8h às 21h e no máximo 2 por dia; compra
de qualquer produto para tudo; qualquer resposta fora dos botões pausa a automação e vai para o atendimento; nada sai
depois de 30/11 23h59.

## Sequências
Regras: 1ª mensagem na hora (8h–21h; senão às 8h); depois só 8h–21h e no máx. 2/dia; compra de qualquer produto
para tudo; sem saída própria: qualquer texto fora dos botões segue o padrão e vai para o atendimento; resposta que não seja "Quero o link" pausa (status `atendimento`);
teste → checkout troca de sequência sem repetir mensagem; de 28 a 30/11 a reta final substitui o núcleo.

| Fluxo | Entrada | Passos |
|---|---|---|
| teste | lead do /teste/ | T1a/T1b/T1c (pela dor) +15 min → T2/T3/T4 (pela dor) dia seguinte 10h → T5 +1 dia 19h → T6 +2 dias 10h |
| checkout | Yampi `cart.reminder` | T7 +15 min → T5 dia seguinte 10h → T6 +2 dias 10h |
| pix | Pix expirado (Yampi) | T8 na hora → T5 dia seguinte 10h → T6 +2 dias 10h |
| cartão | `transaction.payment.refused` | T9 +10 min → T5 dia seguinte 10h → T6 +2 dias 10h |
| reta final | todos ativos sem compra | T10 28/11 10h → T11 30/11 9h → T12 30/11 19h |
| alternativa | tocou "Preço" | resposta R2 na hora → T13/T14/T15 (pela dor) +48 h, se antes de 30/11 |

Lead sem dor (veio só da Yampi): alternativa de consulta (T14), que é o produto que já existe.

## Templates de WhatsApp (v2: gancho na 1ª linha, dor e urgência real)
Padrão: categoria **Marketing**, idioma **pt_BR**. Templates só de texto: cabeçalho de texto **"Maria Paula · Amar
Saber"**. Templates com imagem: rodapé **"Maria Paula · Amar Saber"**. Botões de resposta rápida **Quero o link ·
Tenho uma dúvida** (a triagem tem os seus). Sem botão de sair. `{{1}}` = primeiro nome (exemplo: Ana).
Urgência usada (confirmada pelo usuário): prazo de 30/11 23h59, quando a oferta inteira acaba; lote realmente limitado; dias que faltam (calculados pelo n8n).

**T1a · as_resultado_plantao** (15 min depois do teste)
> {{1}}, seu resultado saiu: o plantão é o seu ponto mais sensível.
>
> Na emergência, cada minuto procurando dose no celular é um minuto longe do paciente. E é de madrugada que isso acontece, sem ninguém para perguntar.
>
> O Guia de Protocolos põe as emergências em passos objetivos, com doses e cálculo de fluido, na sua bancada. Na Black ele vem com o curso Atendimento Extraordinário e 3 meses de comunidade, até 30/11.
>
> Quer o link?

**T1b · as_resultado_consulta**
> {{1}}, seu resultado saiu: o seu ponto mais sensível é a conversa com o tutor.
>
> Você explica o tratamento e o tutor responde “vou pensar e te aviso”. O animal vai embora sem tratar e a consulta não vira retorno.
>
> No curso Atendimento Extraordinário eu ensino o passo a passo da consulta que usamos na Amar Veterinária, da anamnese ao pós-consulta. Na Black ele vem junto com o Guia de Protocolos e 3 meses de comunidade, até 30/11.
>
> Quer o link?

**T1c · as_resultado_sozinho**
> {{1}}, seu resultado saiu: o seu ponto mais sensível é decidir os casos difíceis sozinho.
>
> Sem ninguém para conferir, você só descobre se acertou quando o paciente volta. Ou quando ele não volta.
>
> Quem compra o Guia de Protocolos na Black entra por 3 meses na Comunidade Amar Saber, um grupo de WhatsApp com veterinários que usam o Guia, com a minha participação e a da equipe. Você leva o caso e compara condutas antes de decidir. Até 30/11.
>
> Quer o link?

**T2 · as_dor_plantao** (imagem: página de emergência do Guia [NEED: qual página])
> {{1}}, essa é a página que você abriria às 2h da manhã.
>
> No Guia de Protocolos cada emergência vem em passos objetivos, com as doses e o cálculo de fluido. Você consulta na hora, com o paciente na mesa.
>
> A Black Friday do Guia vai até 30/11, num lote limitado.

**T3 · as_dor_consulta** (imagem [NEED: página de anamnese do Guia ou print de aula do curso])
> {{1}}, quantos tutores saíram da sua consulta dizendo “vou pensar” este mês?
>
> Cada um é um tratamento que não aconteceu. No curso Atendimento Extraordinário eu mostro como conduzir a anamnese, explicar o exame físico e apresentar o tratamento ao tutor sem parecer vendedora.
>
> Na Black, o curso completo vem junto com o Guia de Protocolos, até 30/11.

**T4 · as_dor_sozinho** (imagem [NEED: print da comunidade, sem dados de membros])
> {{1}}, com quem você discutiu o último caso difícil?
>
> Na Comunidade Amar Saber você leva o caso que te travou e compara condutas com veterinários de outras cidades. Eu e a equipe participamos das conversas. Quem compra o Guia de Protocolos na Black entra por 3 meses.
>
> A condição vai até 30/11.

**T5 · as_prova** (imagem: o print da LP com "E já vi e adorei o conteúdo"; frase e uso confirmados)
> “Já vi e adorei o conteúdo.”
>
> Foi o que uma colega mandou quando o Guia de Protocolos chegou. Já são mais de 1.500 vendidos, e o lote da Black Friday é limitado.
>
> O seu ainda está a um clique, até 30/11.

**T6 · as_triagem** (botões **Preço · Entrega · Se serve pra mim · Outra dúvida**)
> {{1}}, o que está te segurando?
>
> Faltam {{2}} dias para acabar a Black do Guia de Protocolos. Me conta o que pesa mais e eu te respondo agora.

`{{2}}` = dias até 30/11 (exemplo: 9)

**T7 · as_checkout_15min**
> {{1}}, seu Guia de Protocolos ficou a um clique.
>
> O pedido parou no pagamento, e o lote da Black Friday é limitado. Se travou em alguma coisa, me responde aqui que a equipe resolve com você.
>
> Quer o link para terminar?

**T8 · as_pix_expirou**
> {{1}}, seu Pix expirou, mas o pedido continua aqui.
>
> O Guia de Protocolos ainda está na condição de Black Friday. Te mando um link novo agora: dá para pagar no Pix ou parcelar em 12x de R$ 50,57 no cartão.
>
> Quer o link?

**T9 · as_cartao_recusado**
> {{1}}, o banco barrou o pagamento do seu Guia de Protocolos.
>
> Costuma ser limite ou bloqueio de segurança. Dá para tentar outro cartão, parcelar em 12x de R$ 50,57 ou pagar no Pix, e a condição de Black continua valendo.
>
> Quer o link de novo?

**T10 · as_reta_3dias** (28/11 10h)
> {{1}}, faltam 3 dias.
>
> A Black Friday do Guia de Protocolos termina na segunda, 30/11, às 23h59. Até lá, o Guia impresso vem com o curso Atendimento Extraordinário e 3 meses de comunidade, em 12x de R$ 50,57.
>
> Quer garantir o seu?

**T11 · as_ultimo_dia** (30/11 9h)
> Último dia, {{1}}.
>
> Hoje às 23h59 a Black Friday do Guia de Protocolos sai do ar, e a oferta inteira acaba junto: o Guia impresso, o curso Atendimento Extraordinário e a comunidade. São 12x de R$ 50,57 só até a meia-noite.

**T12 · as_ultimas_horas** (30/11 19h)
> {{1}}, faltam 5 horas.
>
> A Black Friday do Guia de Protocolos termina hoje às 23h59, e depois disso a oferta não volta. Se ainda tem alguma dúvida, me responde agora que a equipe te ajuda até o fim.

**T13 · as_alt_plantao** (48 h depois de tocar em "Preço")
> {{1}}, dá para começar com R$ 187.
>
> Você me disse que o preço pesou. Então separei o que resolve o seu ponto mais sensível, o plantão: o módulo Entre o plantão e o medo (classificação de risco, XABCDE, carrinho de emergência, fluidoterapia, transfusão e paciente séptico), mais 3 meses na Comunidade Amar Saber.
>
> R$ 187 à vista ou 12x de R$ 19,03, só até 30/11.

**T14 · as_alt_consulta**
> {{1}}, dá para começar com R$ 187.
>
> Você me disse que o preço pesou. Então separei o que resolve o seu ponto mais sensível, a consulta: o curso completo Atendimento Extraordinário (anamnese que conduz, exame físico explicado ao tutor, Técnica do Detetive e pós-consulta), mais 3 meses na Comunidade Amar Saber.
>
> R$ 187 à vista ou 12x de R$ 19,03, só até 30/11.

**T15 · as_alt_sozinho**
> {{1}}, dá para começar com R$ 187.
>
> Você me disse que o preço pesou. Então separei o que resolve o seu ponto mais sensível, os casos difíceis: o módulo Casos Clínicos, com mais de 20 casos reais, de cesárea e piometra a efusão pleural e convulsão, mais 3 meses na Comunidade Amar Saber para discutir os seus.
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
- **R5 · Tenho uma dúvida / Outra dúvida / texto livre**: "Pode mandar a sua dúvida aqui. A equipe responde em
  seguida." [NEED: horário de atendimento] → pausa e vai para o atendimento.

## E-mails da Yampi (carrinho abandonado; [nome] e o botão são as variáveis da Yampi)
**E1 · 30 min**
- Assunto: Seu Guia de Protocolos ficou a um clique
- Pré-cabeçalho: A condição de Black Friday continua valendo até 30/11.
- Corpo: Oi, [nome]. Aqui é a Maria Paula, da Amar Saber. Vi que o seu pedido do Guia de Protocolos ficou pela
  metade. Guardei tudo no carrinho. Na Black Friday, o pedido inclui o Guia de Protocolos Clínicos impresso, o curso
  completo Atendimento Extraordinário e 3 meses na Comunidade Amar Saber no WhatsApp, por 12x de R$ 50,57 ou R$ 497 à
  vista. Se alguma coisa travou no pagamento, responda este e-mail ou chame a gente no WhatsApp (31) 9 9082-2333.
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
- Pré-cabeçalho: Mais de 1.500 Guias vendidos, e as três perguntas que mais recebemos antes da compra.
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
- CTA: **Garantir na condição de Black**
- Desligar os e-mails na Yampi em 30/11 23h59 (a Yampi não sabe a data final).

## Ativação (quando o Kommo e a Yampi estiverem prontos)
1. **Kommo:** conectar o WhatsApp oficial; cadastrar os 17 templates com estes nomes e enviar para aprovação; criar
   um Salesbot por template (passo "Mensagem" com o template; os botões "Quero o link" e as respostas da triagem
   chamam o webhook do n8n, ver abaixo); criar os campos do lead `as_nome`, `as_link`, `as_dor` e `as_dias`.
2. **n8n `AS · Kommo enviar`:** preencher no nó "Config do Kommo" o endereço da conta, o funil, os IDs dos campos e
   o ID do Salesbot de cada template; criar a credencial "Kommo API" (token de longa duração).
3. **Salesbot → n8n:** cada botão faz um POST para o webhook `as-black-kommo` (endereço completo no fluxo) com
   `{ "telefone": "...", "acao": "link" | "preco" | "entrega" | "serve" | "atendimento" }`.
4. **Yampi:** criar o webhook com os eventos `cart.reminder`, `order.paid`, `order.status.updated` e
   `transaction.payment.refused` apontando para o webhook `as-black-yampi` do n8n (com a chave na URL); criar os
   produtos "Entre o plantão e o medo + comunidade" e "Casos Clínicos + comunidade" (R$ 187) e colar os links no
   "Config" do fluxo `AS · Recuperação Black`.
5. **n8n `AS · Recuperação Black`:** testar com `TELEFONE_TESTE` e `TESTE_RAPIDO`; depois `ENVIO_ATIVO = true` e
   publicar.
6. **E-mails da Yampi:** cadastrar os 4 e desligar em 30/11 às 23h59.

### Estado atual (28/10)
- `AS · Recuperação Black` (n8n 2ul2dmhhVyHCQPYe) e `AS · Kommo enviar` (exqe8KfQqIZGETyH) estão publicados, com o
  envio desligado (`ENVIO_ATIVO = false`). A fila `AS · Fila de recuperação` já recebe os leads do teste: o
  `AS · Teste Black` avisa a recuperação a cada lead (nó "Avisar recuperação"; internos não entram).
- Quem entrou na fila há mais de 24 h quando o envio for ligado pula a 1ª mensagem (resultado, checkout, Pix ou
  cartão) e entra no passo seguinte.
- Linhas de teste na fila: telefones 55319000000xx (ids 1 a 3), já fora da sequência (status `comprou` ou
  `atendimento`).
