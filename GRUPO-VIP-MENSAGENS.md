# Grupo VIP: roteiro de mensagens de 28/10 a 01/12

Roteiro dos Grupos VIP do WhatsApp, operados pelo SendFlow (campanha "Black 2026 · Grupo VIP", link de rodízio
`https://sndflw.com/i/amarsaber-black-vip`, no botão de `acesso-antecipado/obrigado/index.html`). Está na voz da
Dra. Maria Paula, em primeira pessoa, como os templates da recuperação (`RECUPERACAO-TEMPLATES.md`).

Regras:
- Os 3 presentes são reais e só são abertos na live: o curso Atendimento Extraordinário, 3 meses de Comunidade
  Amar Saber e a condição (R$ 1.137,70 por R$ 497). As dicas são verdadeiras e não revelam o conteúdo.
- Não mandar o link da LP antes de 10/11 às 20h: ela mostra os bônus.
- A live é no Instagram da Dra., @mariapaulaferrarivet. O link do perfil vai no grupo (3b, 4, 5, 6, 6a e 6b).
- Grupo só de avisos: só os administradores enviam. Dúvidas vão para o WhatsApp (31) 9 5349-5052.
- O produto da Black é o **Guia de Protocolos · Volume 3**. Quem tem o Volume 2 já recebeu as atualizações em PDF.
- **Caso do dia:** só agenda no SendFlow o caso que a Dra. validou no `CASOS-DO-DIA-VALIDACAO.docx`. Os textos aqui
  são os mesmos do arquivo; se ela ajustar algo lá, o ajuste vale aqui também.
- Fim de semana igual a dia útil. A leitura de 31/10–01/11 e 07–08/11 (aba "Grupos · Mensagens") diz se muda.

## Como operar no SendFlow
- **Teste antes:** toda mensagem nova vai primeiro para a campanha "Teste BF" (grupo de teste, com o operador 93618-8016 como admin) e é
  conferida no celular. Só depois vai para a campanha "Black 2026 · Grupo VIP", para todos os grupos.
- **Agendadas:** saem pela campanha inteira (todas as contas da campanha), no horário de Brasília da tabela.
- **Manuais (dia da live):** a 6, a 6a, a 6b e a 7 ficam prontas como template e o Mateus dispara pelo painel quando a
  Dra. abre cada presente. Ensaio na live de teste de 09/11.
- **Evento do WhatsApp:** nas mensagens 1 e 3, um evento nativo "Live da Black · Guia de Protocolos" em 10/11, 20h,
  com o link do Instagram. Quem toca em "Vou" recebe o lembrete do próprio WhatsApp.
- **@todos** (menciona todos e faz tocar o celular de quem silenciou): só nas mensagens 5, 6 e 7 e nas duas últimas de
  30/11.
- **Métricas:** o fluxo n8n "AS · Grupos SendFlow → Sheets" grava todo dia às 7h05 as entradas, saídas e a leitura de
  cada mensagem do dia anterior (abas "Grupos" e "Grupos · Mensagens") e a lista de quem se cadastrou e não entrou
  (aba "Grupos · Não entrou", para contato manual).

## Contato manual com quem não entrou no grupo
A aba "Grupos · Não entrou" lista, todo dia às 7h05, quem se cadastrou há mais de 2 h e não está no grupo. A equipe
manda no privado, pelo WhatsApp de dúvidas (31) 9 5349-5052, uma vez por pessoa, e marca "Contato feito":
> Oi, [NOME]! Aqui é da Amar Saber. Vi que você se cadastrou para a Black do Guia de Protocolos, mas ainda não entrou
> no Grupo VIP. É por lá que a Dra. Maria Paula manda o link da live de 10/11, às 20h, e a condição antes do público.
>
> Para entrar: https://sndflw.com/i/amarsaber-black-vip

## Links e UTM
Todo link da LP leva `utm_source=whatsapp&utm_medium=grupo_vip`, mais:

| Fase | `utm_campaign` | `utm_content` |
|---|---|---|
| Live (mensagem 7) | `live_1011` | — |
| Dia seguinte (mensagem 8) | `pos_live_1111` | — |
| Carrinho aberto (12/11 a 26/11) | `black_carrinho` | `caso01`…`caso10`, `p1`…`p5` |
| Reta final (27/11 a 30/11) | `black_reta` | `r2711`, `r2811`, `r2911`, `r3011a`, `r3011b`, `r3011c` |

Na UTMify e no PostHog, o `utm_content` mostra quais casos e quais dias trazem venda.

## Calendário

| Fase | Quando | # | Mensagem | Formato |
|---|---|---|---|---|
| Aquecimento | qui 29/10, 19h30 | A1 | Boas-vindas | texto |
| | sáb 31/10, 12h | A2 | Caso #0 · estado epilético | texto + enquete |
| | dom 01/11, 19h30 | A3 | Resposta do Caso #0 | imagem + texto |
| | ter 03/11, 19h | 1 | D-7 + 1ª dica | texto + evento |
| | qui 05/11, 12h | A4 | "O que mais te trava?" | enquete |
| | sex 06/11, 12h | 2 | 2ª dica | texto |
| | sáb 07/11, 12h | A5 | Bastidor: embrulhando os presentes | vídeo |
| | dom 08/11, 19h30 | A6 | Convite da Dra. | áudio |
| | seg 09/11, 12h | 3b | Caixinha de perguntas | texto |
| | seg 09/11, 19h | 3 | D-1 + 3ª dica | texto + evento |
| Live | ter 10/11, 12h | L0 | É hoje | texto |
| | 10/11, 18h | 4 | O link da live | texto |
| | 10/11, 19h50 | 5 | Já vai começar | texto, @todos |
| | 10/11, ~20h05 | 6 | Estamos ao vivo | texto, @todos, manual |
| | 10/11, ~20h08 | 6a | Presente 01 aberto | texto, manual |
| | 10/11, ~20h20 | 6b | Presente 02 aberto | texto, manual |
| | 10/11, ~20h21 | 7 | Presentes abertos + link da Black | texto, @todos, manual |
| Carrinho aberto | qua 11/11, 10h | 8 | Para quem não viu | texto |
| | qui 12/11, 10h | C | Para quem já comprou | texto |
| | qui 12/11 | caso01 | Corticoide no gato | 12h caso + enquete · 19h30 resposta |
| | sex 13/11 | caso02 | Indução de vômito | 12h · 19h30 |
| | sáb 14/11, 12h | p1 | O que tem de novo no Volume 3 | texto |
| | dom 15/11 | caso03 | Hipoglicemia | 12h · 19h30 |
| | seg 16/11 | caso04 | Antibiótico e estômago | 12h · 19h30 |
| | ter 17/11, 12h | p2 | Depoimento | imagem + texto |
| | qua 18/11 | caso05 | Cinomose | 12h · 19h30 |
| | qui 19/11 | caso06 | Fluido e azotemia | 12h · 19h30 |
| | sex 20/11, 12h | p3 | Os dois presentes que vêm junto | texto |
| | sáb 21/11 | caso07 | Babesiose e Imizol | 12h · 19h30 |
| | dom 22/11, 12h | p4 | Dúvidas frequentes | texto |
| | seg 23/11 | caso08 | Otite | 12h · 19h30 |
| | ter 24/11 | caso09 | Ligamento cruzado | 12h · 19h30 |
| | qua 25/11, 12h | p5 | Depoimento | imagem + texto |
| | qui 26/11 | caso10 | Transfusão | 12h · 19h30 |
| Reta final | sex 27/11, 9h | r2711 | Hoje é Black Friday | texto |
| | sáb 28/11, 12h | r2811 | Depoimento + dúvidas | imagem + texto |
| | dom 29/11, 19h30 | r2911 | Amanhã acaba | texto |
| | seg 30/11, 9h | r3011a | Último dia | texto |
| | seg 30/11, 19h | r3011b | Faltam 5 horas | texto, @todos |
| | seg 30/11, 23h | r3011c | Última hora | texto, @todos |
| Encerramento | ter 01/12, 10h | E | A condição acabou | texto |

A ordem dos presentes e o roteiro da live estão em `LIVE-ROTEIRO.md`.

---

# Fase 1 · Aquecimento (28/10 a 09/11)

## 0 · Descrição dos grupos
Vai na descrição fixa de todos os grupos (campo do SendFlow), para quem entra em qualquer dia. Este é o texto que
está na campanha:
> Bem-vindo ao Grupo VIP da Black Friday do Guia de Protocolos · Volume 3.
>
> 📅 10/11, terça, às 20h: a Dra. Maria Paula abre ao vivo, no Instagram dela (@mariapaulaferrarivet), três presentes e a maior
> condição que o Guia de Protocolos já teve. O link da Black sai aqui no grupo no mesmo momento, antes do público.
>
> Até lá, a Dra. manda por aqui casos da rotina e bastidores. Este grupo é só de avisos, para não lotar o seu
> celular.
>
> Dúvidas: WhatsApp (31) 9 5349-5052
>
> Dra. Maria Paula · Amar Saber

## A1 · qui 29/10, 19h30 · boas-vindas *(agendada; adiada de 28/10 porque o número operador caiu)*
> Oi, aqui é a Maria Paula. Que bom ter você no Grupo VIP da Black do Guia de Protocolos.
>
> Funciona assim: em 10/11, terça, às 20h, eu entro ao vivo no Instagram e abro três presentes. Um deles é a maior
> condição que o Guia já teve, e o link sai aqui no grupo antes de todo mundo.
>
> Até lá, o grupo é só de avisos. Vou mandar algumas coisas que uso na rotina da Amar. A primeira chega sábado, ao
> meio-dia.

## A2 · sáb 31/10, 12h · Caso #0 *(aguardando validação da Dra. até 30/10)*
A A1 promete "a primeira chega sábado, ao meio-dia". Se a Dra. não validar o Caso #0 até sexta, a A4 (enquete) sai no
sábado ao meio-dia no lugar dela, e o Caso #0 vai para quinta, 05/11, 12h, com a resposta às 19h30.

> 🩺 *Caso do dia*
>
> Labrador, 6 anos, chega nos braços do tutor convulsionando. Ele conta que a crise começou em casa há uns 5 minutos
> e não parou. Ainda não tem acesso venoso. Qual é a sua primeira conduta?
>
> Vota na enquete aqui embaixo. Amanhã, às 19h30, eu mando a resposta com a página do Guia que uso nesse caso.

Enquete "Qual é a sua conduta?", uma resposta só: **A)** Pegar o acesso venoso antes de medicar · **B)**
Benzodiazepínico agora, pela via que tiver (intrarretal ou IM) · **C)** Esperar a crise passar e investigar a causa

## A3 · dom 01/11, 19h30 · resposta do Caso #0 *(aguardando validação)*
Imagem: `assets/img/pagina-1.jpg` (capítulo de Emergências). [NEED: se a Dra. tiver a página do estado epilético do
Volume 3, ela entra no lugar.]
> ✅ *A resposta de ontem é a B.*
>
> Crise de 5 minutos ou mais é status epilepticus, uma emergência com alto risco de óbito. A prioridade é
> interromper a crise na hora com benzodiazepínico. Sem acesso venoso, não se perde tempo: existe a via intrarretal
> e a IM. O erro comum é gastar minutos tentando o acesso. E convulsão é sinal, não diagnóstico: depois de
> controlar, glicemia imediata e investigação da causa.
>
> As doses, o protocolo da crise refratária e a prevenção de novas crises estão no capítulo de Emergências do Guia.
> O estado epilético é novo no Volume 3.
>
> Na live de 10/11, às 20h, eu mostro como uso o Guia num plantão de verdade.

## 1 · ter 03/11, 19h · D-7 + evento
> Falta uma semana.
>
> Terça que vem, 10/11, às 20h, eu entro ao vivo no Instagram para abrir os três presentes da Black do Guia de
> Protocolos. A condição só aparece lá, e o link chega aqui antes de todo mundo.
>
> Primeira dica: um dos presentes tem a ver com a conversa com o tutor, aquela hora em que ele diz "vou pensar" e
> o animal vai embora sem tratar.
>
> Marca no calendário: 10/11, 20h.

Logo depois, o evento do WhatsApp: "Live da Black · Guia de Protocolos", 10/11, 20h, com o link do Instagram.


## A4 · qui 05/11, 12h · enquete
> Quero preparar a live pensando em vocês. Hoje, o que mais te trava na rotina?

Enquete, uma resposta só: O plantão: dose e conduta na hora · A consulta: o tutor que diz "vou pensar" · O caso
difícil que decido sozinho

## 2 · sex 06/11, 12h · 2ª dica
> Segunda dica: outro presente é para aquele caso difícil que você decide sozinho, sem ter com quem conferir a
> conduta.
>
> O terceiro eu não conto. Só adianto que é o maior que o Guia de Protocolos já teve.
>
> 10/11, terça, 20h, ao vivo.

## A5 · sáb 07/11, 12h · vídeo de bastidor *(a Dra. grava até 07/11)*
Vídeo de 15 a 30 s da Dra. com as 3 caixas rosa, sem mostrar o conteúdo. Legenda:
> Embrulhando os presentes de terça. 🎁 Ninguém fora daqui sabe o que tem dentro.

## A6 · dom 08/11, 19h30 · áudio da Dra. *(a Dra. grava até 08/11)*
Áudio de até 1 minuto, com as palavras dela: quem ela é em uma frase, o que acontece terça às 20h, por que vale
assistir ao vivo (os casos reais) e um pedido: tocar em "Vou" no evento do grupo.

## 3b · seg 09/11, 12h · perguntas para a live
> Amanhã, na live, vou responder as dúvidas de vocês.
>
> Abri uma caixinha de perguntas nos meus stories: https://www.instagram.com/mariapaulaferrarivet/. Manda lá o que você quer que eu responda, sobre o
> Guia, sobre a Black ou sobre um caso da sua rotina. As mais pedidas entram na live.

> Nota: abrir a caixinha nos stories antes de enviar esta mensagem.

## 3 · seg 09/11, 19h · D-1 + evento
> Amanhã, 20h.
>
> Eu abro os três presentes ao vivo no Instagram e, no mesmo minuto, o link da Black Friday chega aqui no grupo,
> antes do público. Na última campanha o estoque esgotou rápido, então quem está aqui tem a primeira chance.
>
> Amanhã às 18h eu mando o link da live.

Logo depois, o mesmo evento do WhatsApp da mensagem 1.

---

# Fase 2 · Dia da live (10/11)

## L0 · 12h · é hoje *(texto novo: revisar)*
> É hoje, às 20h.
>
> Eu entro ao vivo no Instagram e abro os três presentes. O link da Black chega aqui no grupo no mesmo minuto,
> antes do público.
>
> Às 18h eu mando o link da live.

## 4 · 18h · 2 h antes
> Hoje, às 20h.
>
> O link da live é este: https://www.instagram.com/mariapaulaferrarivet/
>
> Ativa o lembrete do Instagram para não perder. Às 20h os presentes são abertos, e o link da Black chega aqui.

> Nota: o lembrete só existe se a live estiver agendada no Instagram. Agendar até 09/11.

## 5 · 19h50 · 10 min antes · @todos
> Daqui a 10 minutos eu entro ao vivo: https://www.instagram.com/mariapaulaferrarivet/
>
> Deixa o grupo aberto: o link da Black sai aqui assim que os presentes forem abertos.

## 6 · ~20h05 · ao vivo · @todos · manual
> Estamos ao vivo: https://www.instagram.com/mariapaulaferrarivet/

## 6a · ~20h08 · quando a Dra. abre o Presente 01 · manual
> 🎁 Presente 01 aberto: o curso completo Atendimento Extraordinário, o passo a passo da consulta que a gente usa na
> Amar Veterinária.
>
> Ainda faltam dois. Estamos ao vivo: https://www.instagram.com/mariapaulaferrarivet/

## 6b · ~20h20 · quando a Dra. abre o Presente 02 · manual
> 🎁 Presente 02 aberto: 3 meses na Comunidade Amar Saber no WhatsApp, comigo e com a equipe, para você levar o caso
> que te travou.
>
> O último presente é a condição, e o link chega aqui no grupo em instantes: https://www.instagram.com/mariapaulaferrarivet/

## 7 · ~20h21 · quando a Dra. abre o Presente 03 · @todos · manual
> Os presentes estão abertos. A Black Friday do Guia de Protocolos começou para vocês:
>
> 🎁 Presente 01: o curso completo Atendimento Extraordinário
> 🎁 Presente 02: 3 meses na Comunidade Amar Saber no WhatsApp, comigo e com a equipe
> 🎁 Presente 03: a condição. Guia de Protocolos · Volume 3, curso e comunidade: R$ 1.137,70 por R$ 497 à vista ou
> 12x de R$ 50,57
>
> Link (com o cupom já aplicado):
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=live_1011
>
> O lote da Black é limitado. Não deixe essa passar: a condição vai até 30/11, às 23h59.

---

# Fase 3 · Carrinho aberto (11/11 a 26/11)

## 8 · qua 11/11, 10h · para quem não viu
> Para quem não conseguiu ver a live ontem: os três presentes foram o curso Atendimento Extraordinário, 3 meses de
> comunidade e o Guia de Protocolos · Volume 3 por R$ 497 (de R$ 1.137,70), em até 12x de R$ 50,57.
>
> O link está aqui: https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=pos_live_1111
>
> A condição vai até 30/11, às 23h59, enquanto o lote durar.

## C · qui 12/11, 10h · para quem já comprou
Ninguém sai do grupo depois de comprar. Esta é a única mensagem só para eles.
> Para quem já garantiu o Guia na Black: o acesso ao curso e à comunidade chega no e-mail que você usou na compra.
> Se não aparecer na caixa de entrada, confira o spam e a aba Promoções. Se o seu pedido inclui o Guia impresso, o
> envio acontece em até 10 dias úteis depois da confirmação do pagamento.
>
> Fica por aqui: até 26/11 eu mando um caso de plantão por dia, e você já vai poder conferir a conduta no seu Guia.
>
> Dúvida sobre o pedido: WhatsApp (31) 9 5349-5052.

## Caso do dia
Às 12h o caso e a enquete. Às 19h30 a resposta, com o que fica para o Guia e o link. A resposta mostra a conduta,
sem dose: o protocolo completo está no Guia. Se a Dra. mandar a foto da página do Guia sobre o tema, ela vai junto
com a resposta.

### Caso #1 · Corticoide no gato · 12/11 (qui) *(aguardando validação da Dra.)*

**12h · o caso + enquete**

> 🩺 *Caso do dia #1*
>
> Gato, 4 anos, com lesão ulcerada no lábio superior. A citologia por imprint mostra muitos eosinófilos: complexo granuloma eosinofílico, primeira ocorrência, lesão pequena. Qual corticoide você prescreve?
>
> Vota na enquete aqui embaixo. Às 19h30 eu mando a resposta.

Enquete "Qual é a sua conduta?", uma resposta só: **A)** Prednisolona oral · **B)** Prednisona oral · **C)** Depo-Medrol já na primeira consulta

**19h30 · a resposta** (certa: A)

> ✅ *Caso #1: a resposta é a A.*
>
> Prednisolona. O gato não converte a prednisona em prednisolona de forma eficiente, por uma deficiência enzimática hepática, então a prednisona perde efeito nele. Em lesão pequena e de primeira ocorrência, muitos pacientes respondem só à prednisolona oral, sem corticoide de depósito. O Depo-Medrol fica para casos moderados a graves, e nunca em gato diabético sem acompanhamento de endocrinologista.
>
> No Guia de Protocolos · Volume 3: dose e duração da prednisolona, quando usar o Depo-Medrol e o desmame obrigatório depois dele.
>
> A condição da Black vai até 30/11: https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=caso01

### Caso #2 · Indução de vômito · 13/11 (sex) *(aguardando validação da Dra.)*

**12h · o caso + enquete**

> 🩺 *Caso do dia #2*
>
> Cão de 3 anos, consciente e responsivo. O tutor chega dizendo que ele comeu um agente tóxico há uns 40 minutos. O produto não é corrosivo nem oleoso. Você induz o vômito?
>
> Vota na enquete aqui embaixo. Às 19h30 eu mando a resposta.

Enquete "Qual é a sua conduta?", uma resposta só: **A)** Sim, sempre que houver ingestão de tóxico · **B)** Sim, e se não vomitar, faz lavagem gástrica · **C)** Não: passou da janela de 30 minutos

**19h30 · a resposta** (certa: C)

> ✅ *Caso #2: a resposta é a C.*
>
> Não. A indução de vômito só é considerada quando a ingestão foi há no máximo 30 minutos, com o paciente consciente, sem risco de aspiração e sem sinais neurológicos graves, e quando o agente não é corrosivo, cáustico ou oleoso. Depois disso o tóxico já foi absorvido em parte, e nem a indução nem a lavagem gástrica trazem benefício. O erro comum é induzir "por garantia".
>
> No Guia de Protocolos · Volume 3: o protocolo de indução (com as opções de fármaco e dose) e todos os critérios de quando não induzir.
>
> A condição da Black vai até 30/11: https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=caso02

### Caso #3 · Hipoglicemia · 15/11 (dom) *(aguardando validação da Dra.)*

**12h · o caso + enquete**

> 🩺 *Caso do dia #3*
>
> Filhote de raça mini, 2 meses, chega inconsciente depois de passar o dia sem comer. O glicosímetro confirma hipoglicemia. Qual é a primeira conduta?
>
> Vota na enquete aqui embaixo. Às 19h30 eu mando a resposta.

Enquete "Qual é a sua conduta?", uma resposta só: **A)** Mel ou solução açucarada na gengiva · **B)** Glicose 50% IV, em bolus lento · **C)** Fluidoterapia sem glicose e reavaliar em 1 hora

**19h30 · a resposta** (certa: B)

> ✅ *Caso #3: a resposta é a B.*
>
> Glicose 50% IV, em bolus lento. A via oral (glicose, mel ou solução açucarada) é só para o paciente consciente: no inconsciente há risco de aspiração e a absorção não é confiável. Depois da correção inicial, fluidoterapia com glicose e glicemia a cada 15 minutos até estabilizar, sem correção abrupta. E investigar a causa: filhotes e raças mini são o grupo de maior risco.
>
> No Guia de Protocolos · Volume 3: a dose da glicose, o monitoramento e o capítulo novo de hipoglicemia, hipotermia e hipertermia.
>
> A condição da Black vai até 30/11: https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=caso03

### Caso #4 · Antibiótico e estômago · 16/11 (seg) *(aguardando validação da Dra.)*

**12h · o caso + enquete**

> 🩺 *Caso do dia #4*
>
> Cão vai fazer 20 dias de antibiótico. O tutor pergunta se precisa dar omeprazol junto "para proteger o estômago". O que você orienta?
>
> Vota na enquete aqui embaixo. Às 19h30 eu mando a resposta.

Enquete "Qual é a sua conduta?", uma resposta só: **A)** Sim, omeprazol durante todo o antibiótico · **B)** Não: dar o antibiótico sempre depois da alimentação · **C)** Trocar por antibiótico injetável

**19h30 · a resposta** (certa: B)

> ✅ *Caso #4: a resposta é a B.*
>
> Não é mais recomendado o omeprazol preventivo de rotina em antibiótico prolongado. A conduta atual é orientar que todo antibiótico seja dado depois da alimentação, o que reduz bastante os efeitos gastrointestinais e previne a gastrite induzida por fármaco.
>
> No Guia de Protocolos · Volume 3: a mudança vale para todos os protocolos do Guia, e cada tratamento traz o antibiótico, a dose e a duração.
>
> A condição da Black vai até 30/11: https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=caso04

### Caso #5 · Cinomose · 18/11 (qua) *(aguardando validação da Dra.)*

**12h · o caso + enquete**

> 🩺 *Caso do dia #5*
>
> Filhote com cinomose, sem nenhum sinal clínico ou laboratorial de infecção bacteriana secundária. Você entra com antibiótico?
>
> Vota na enquete aqui embaixo. Às 19h30 eu mando a resposta.

Enquete "Qual é a sua conduta?", uma resposta só: **A)** Sim, antibiótico em todo caso de cinomose · **B)** Sim, dois antibióticos para ampliar o espectro · **C)** Só se houver sinal de infecção bacteriana secundária

**19h30 · a resposta** (certa: C)

> ✅ *Caso #5: a resposta é a C.*
>
> O antibiótico não é obrigatório em todo caso de cinomose. Ele é indicado quando há sinais clínicos ou laboratoriais de infecção bacteriana secundária. E não se associa mais de um protocolo antibiótico ao mesmo tempo.
>
> No Guia de Protocolos · Volume 3: o protocolo completo da cinomose, com o suporte e qual antibiótico usar quando ele é indicado.
>
> A condição da Black vai até 30/11: https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=caso05

### Caso #6 · Fluido e azotemia · 19/11 (qui) *(aguardando validação da Dra.)*

**12h · o caso + enquete**

> 🩺 *Caso do dia #6*
>
> Cão idoso com ureia e creatinina altas nos exames, lesão renal aguda. A ideia na equipe é "entrar com bastante fluido para baixar os valores". O que você faz?
>
> Vota na enquete aqui embaixo. Às 19h30 eu mando a resposta.

Enquete "Qual é a sua conduta?", uma resposta só: **A)** Fluido em taxa alta até normalizar ureia e creatinina · **B)** Avaliar caso a caso: fluido não "normaliza" azotemia · **C)** Nunca usar fluido em paciente renal

**19h30 · a resposta** (certa: B)

> ✅ *Caso #6: a resposta é a B.*
>
> A fluidoterapia não reduz a azotemia na lesão renal aguda. Fluido em excesso sobrecarrega o rim, piora a função renal e favorece a progressão para doença renal crônica. O paciente precisa ser avaliado individualmente, e a fluidoterapia nunca deve ser instituída só para "normalizar" esses valores. Idosos, gatos, cardiopatas e anêmicos também pedem taxas mais conservadoras.
>
> No Guia de Protocolos · Volume 3: o cálculo da fluidoterapia e os cuidados específicos para anêmicos, idosos, gatos, cardiopatas e renais.
>
> A condição da Black vai até 30/11: https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=caso06

### Caso #7 · Babesiose e Imizol · 21/11 (sáb) *(aguardando validação da Dra.)*

**12h · o caso + enquete**

> 🩺 *Caso do dia #7*
>
> Cão com babesiose confirmada. Você vai aplicar o Imizol (imidocarb). O que faz antes e depois da aplicação?
>
> Vota na enquete aqui embaixo. Às 19h30 eu mando a resposta.

Enquete "Qual é a sua conduta?", uma resposta só: **A)** Atropina antes, de rotina, e libera o paciente · **B)** Aplica e libera, porque reação é rara · **C)** Sem atropina de rotina e observação de pelo menos 3 horas

**19h30 · a resposta** (certa: C)

> ✅ *Caso #7: a resposta é a C.*
>
> O uso preventivo de atropina antes do Imizol não é mais indicado de rotina (alguns colegas ainda usam, e fica a critério do veterinário, avaliando o paciente). O que é obrigatório é observar o paciente por pelo menos 3 horas depois da aplicação. Se houver reação, o manejo é pelo sintoma, nunca com medicação preventiva.
>
> No Guia de Protocolos · Volume 3: o cálculo da dose do Imizol, o intervalo entre as duas aplicações e a conduta para cada reação adversa.
>
> A condição da Black vai até 30/11: https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=caso07

### Caso #8 · Otite · 23/11 (seg) *(aguardando validação da Dra.)*

**12h · o caso + enquete**

> 🩺 *Caso do dia #8*
>
> Cão com otite. O tutor conta que limpa o ouvido todo dia, "para ajudar o remédio". O que você orienta?
>
> Vota na enquete aqui embaixo. Às 19h30 eu mando a resposta.

Enquete "Qual é a sua conduta?", uma resposta só: **A)** Limpeza só quando houver secreção significativa, e tratamento guiado pela citologia · **B)** Limpeza diária durante todo o tratamento · **C)** Antibiótico tópico de amplo espectro, sem exame

**19h30 · a resposta** (certa: A)

> ✅ *Caso #8: a resposta é a A.*
>
> Limpeza excessiva aumenta a inflamação e atrasa a recuperação: um pouco de cerúmen é protetor. A limpeza é feita no dia da consulta ou nos primeiros dias, quando há acúmulo de secreção. E a base da escolha do tratamento é a citologia do conduto, que diz se há cocos, bacilos ou Malassezia (otite só por Malassezia não leva antibiótico).
>
> No Guia de Protocolos · Volume 3: qual medicamento usar em cada resultado da citologia, a conduta nas otites recidivantes e as dicas para o tutor.
>
> A condição da Black vai até 30/11: https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=caso08

### Caso #9 · Ligamento cruzado · 24/11 (ter) *(aguardando validação da Dra.)*

**12h · o caso + enquete**

> 🩺 *Caso do dia #9*
>
> Cão com teste de gaveta positivo e ruptura do ligamento cruzado cranial confirmada no raio-X. O tutor pergunta se dá para tratar só com remédio e repouso. O que você responde?
>
> Vota na enquete aqui embaixo. Às 19h30 eu mando a resposta.

Enquete "Qual é a sua conduta?", uma resposta só: **A)** Dá: anti-inflamatório e repouso resolvem · **B)** Dá: condroprotetor regenera o ligamento · **C)** O manejo clínico é paliativo; o tratamento definitivo é cirúrgico

**19h30 · a resposta** (certa: C)

> ✅ *Caso #9: a resposta é a C.*
>
> Até a cirurgia, o tratamento é paliativo, para controlar a dor e a inflamação, porque todo caso de ruptura do ligamento cruzado cranial é cirúrgico. O organismo não consegue regenerar o colágeno do ligamento com medicação. A técnica é definida pelo ortopedista, e o sucesso depende também de dor controlada, pós-operatório e fisioterapia.
>
> A ruptura do ligamento cruzado é patologia nova no Guia de Protocolos · Volume 3: diagnóstico, projeções do raio-X, manejo até a cirurgia e as dicas para o tutor.
>
> A condição da Black vai até 30/11: https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=caso09

### Caso #10 · Transfusão · 26/11 (qui) *(aguardando validação da Dra.)*

**12h · o caso + enquete**

> 🩺 *Caso do dia #10*
>
> Paciente vai receber transfusão de sangue. Você faz dexametasona antes, como preparo?
>
> Vota na enquete aqui embaixo. Às 19h30 eu mando a resposta.

Enquete "Qual é a sua conduta?", uma resposta só: **A)** Não: foi retirada do preparo; se houver reação, interromper e tratar · **B)** Sim, dexametasona pré-transfusional de rotina · **C)** Sim, dexametasona e prometazina preventivas

**19h30 · a resposta** (certa: A)

> ✅ *Caso #10: a resposta é a A.*
>
> A dexametasona saiu do preparo pré-transfusional. Se o paciente tiver reação transfusional, principalmente alérgica ou anafilática, a transfusão é interrompida na hora, o paciente é avaliado e a reação é tratada.
>
> No Guia de Protocolos · Volume 3: o protocolo de tratamento das reações transfusionais, com fármacos e doses.
>
> A condição da Black vai até 30/11: https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=caso10

## Dias de prova e novidade

### p1 · sáb 14/11, 12h · o que tem de novo no Volume 3
> O Guia de Protocolos da Black é o Volume 3. O que entrou de novo:
>
> 📘 Ruptura do ligamento cruzado cranial, com diagnóstico, raio-X e manejo até a cirurgia
> 📘 Capítulo de hipoglicemia, hipotermia e hipertermia
> 📘 Protocolo do estado epilético, no capítulo de Emergências
> 📘 Sedação e tranquilização
> 📘 Leishmaniose pelas diretrizes Brasileish 2025
> 📘 Vacinas com as atualizações da WSAVA
>
> E condutas que mudaram, como o omeprazol preventivo, a atropina antes do Imizol e a dexametasona antes da
> transfusão. Algumas delas já apareceram aqui no Caso do dia.
>
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=p1

A lista vem do PDF de atualizações do Volume 2 para o 3 (as mesmas novidades do bloco "Novo no Volume 3" da LP).

### p2 · ter 17/11, 12h · depoimento
Imagem: `assets/img/depoimento-1.jpg` (um dos depoimentos da LP).
> Quem usa o Guia na rotina conta melhor do que eu. 💗
>
> A condição da Black vai até 30/11:
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=p2

### p3 · sex 20/11, 12h · os dois presentes que vêm junto
> Na Black, o Guia de Protocolos · Volume 3 não vem sozinho:
>
> 🎁 O curso completo Atendimento Extraordinário, o passo a passo da consulta que a gente usa na Amar Veterinária,
> para a hora em que o tutor diz "vou pensar"
> 🎁 3 meses na Comunidade Amar Saber no WhatsApp, comigo e com a equipe, para levar o caso que te travou
>
> Tudo por R$ 497 à vista ou 12x de R$ 50,57, até 30/11:
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=p3

### p4 · dom 22/11, 12h · dúvidas frequentes
> Respostas rápidas para as dúvidas mais comuns:
>
> *Comprei o Volume 2, tenho direito?* Quem tem o Volume 2 já recebeu as atualizações em PDF. O Volume 3 completo,
> com o curso e a comunidade, está na Black.
> *Dá para parcelar?* Sim, em até 12x de R$ 50,57.
> *Quando chega?* O acesso ao curso e à comunidade chega no e-mail da compra. O Guia impresso é enviado em até 10
> dias úteis depois da confirmação do pagamento.
>
> Outra dúvida? WhatsApp (31) 9 5349-5052.
>
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=p4

### p5 · qua 25/11, 12h · depoimento
Imagem: `assets/img/depoimento-2.jpg`.
> Mais de 1.500 Guias de Protocolos já foram vendidos. Este é um dos recados que chegam para a gente. 💗
>
> A Black vai até segunda, 30/11:
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_carrinho&utm_content=p5

---

# Fase 4 · Reta final (27/11 a 30/11)

## r2711 · sex 27/11, 9h · hoje é Black Friday
> Hoje é Black Friday, e a condição do Guia de Protocolos acaba segunda, 30/11, às 23h59.
>
> Guia de Protocolos · Volume 3, curso Atendimento Extraordinário e 3 meses de comunidade por R$ 497 à vista ou 12x
> de R$ 50,57:
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_reta&utm_content=r2711

## r2811 · sáb 28/11, 12h · depoimento + dúvidas
Imagem: `assets/img/depoimento-3.jpg`.
> Para quem ainda está em dúvida: dá para parcelar em até 12x de R$ 50,57, o acesso ao curso e à comunidade chega no
> e-mail da compra e o Guia impresso é enviado em até 10 dias úteis.
>
> Qualquer outra dúvida, me chama no WhatsApp (31) 9 5349-5052. A condição vai até segunda, 30/11:
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_reta&utm_content=r2811

## r2911 · dom 29/11, 19h30 · amanhã acaba
> Amanhã acaba.
>
> Segunda, 30/11, às 23h59, a condição da Black do Guia de Protocolos sai do ar. Se você vem deixando para depois, o
> link é este:
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_reta&utm_content=r2911

## r3011a · seg 30/11, 9h · último dia
> Último dia.
>
> Até hoje, às 23h59: Guia de Protocolos · Volume 3, curso Atendimento Extraordinário e 3 meses de comunidade por
> R$ 497 ou 12x de R$ 50,57.
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_reta&utm_content=r3011a

## r3011b · seg 30/11, 19h · faltam 5 horas · @todos
> Faltam 5 horas para a Black do Guia de Protocolos acabar: Guia · Volume 3, curso Atendimento Extraordinário e 3
> meses de comunidade por R$ 497 ou 12x de R$ 50,57.
>
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_reta&utm_content=r3011b

## r3011c · seg 30/11, 23h · última hora · @todos
> Última hora. Às 23h59 a condição da Black sai do ar.
>
> https://black.amarsaber.com.br/?utm_source=whatsapp&utm_medium=grupo_vip&utm_campaign=black_reta&utm_content=r3011c

---

# Fase 5 · Encerramento

## E · ter 01/12, 10h · a condição acabou
> A Black do Guia de Protocolos acabou ontem, às 23h59. Obrigada a cada um que esteve aqui, votou nos casos e
> assistiu à live.
>
> Para quem garantiu o Guia: bom plantão com ele. 💗
>
> O grupo continua, em silêncio, e é por aqui que eu aviso primeiro das próximas novidades da Amar Saber.

Depois do encerramento os grupos ficam como lista para o próximo lançamento: nenhuma mensagem até lá.
