# Kiwify · segundo checkout da Black (11/11)

Em 10 e 11/11 a Yampi, pelo Mercado Pago, recusou muitos cartões. Por isso a Black passou a vender também pela Kiwify.
As duas plataformas convivem: a Yampi recebe os pedidos já gerados e os links antigos, e o que for divulgado daqui em
diante aponta para a Kiwify.

A regra é que uma venda na Kiwify percorra o mesmo caminho de uma venda na Yampi:
- comunidade, Kommo e e-mail com o link do grupo;
- Memberkit;
- planilhas (Compras, Comunidade · Acessos, Vendas · Vendedores e Comercial · Black);
- vendedora identificada pela UTM;
- recuperação no WhatsApp e CompraPaga na Meta.

Os pedidos da Kiwify aparecem como **`KW-<referência>`**, e as abas ganharam a coluna **Checkout** (Yampi/Kiwify).

## Produtos (todos "só pagamento", preço final sem cupom)
| Produto Kiwify | Link | Preço | Equivale na Yampi | Memberkit |
|---|---|---|---|---|
| Black Friday: Guia de Protocolos + Atendimento Extraordinário + Comunidade | `pay.kiwify.com.br/t4PJOip` | R$ 497 (12x R$ 51,40) | 46520027 | 38626 |
| Curso Atendimento Extraordinário + 3 meses de Comunidade | `ysYUkuP` | R$ 187 (12x R$ 19,34) | 46522438 | 38626 |
| Esteira completa: Guia + curso + comunidade + Formação | `uKUsGJd` | R$ 794 (12x R$ 82,12) | 46682535 | 38626 + 38676 |
| Formação Completa (comprador, link das vendedoras) | `6uMOg9c` | R$ 297 (12x R$ 30,72) | 46682536 | 38676 |
| Formação Completa · Oferta pós-compra (upsell 1 clique) | `MrKKqps` | R$ 297 | 46637102 | 38676 |
| Formação Completa · Black (cadeado) | `6Es6K3u` | R$ 397 | 46637102 | 38676 |
| TESTE BLACK / TESTE UPSELL (só testes) | `12B0oFF` / `5Venypp` | R$ 5 | — | 38626 / 38676 |

- **Pede endereço:** Black, Esteira e TESTE BLACK, por causa do Guia impresso. A logística exporta os endereços do
  painel da Kiwify.
- **Pixels:** 1393732806282634 e 1701576724241276, com CAPI e domínio `pixels.amarsaber.com.br`. O Purchase da Kiwify
  dispara **só no pagamento**, enquanto o da Yampi conta o Pix gerado. O pixel `475913216709140` é da própria Kiwify
  e aparece em todo checkout dela.
- **Produtos antigos** ("GUIA DE PROTOCOLOS AMAR SABER" `290cfa50…` e "Formação Amar Saber (Desconto Exclusivo)"
  `013536f0…`): decisão de 11/11. Toda venda paga deles conta como Black ou Formação enquanto a equipe migra para os
  links novos.

## Webhooks na Kiwify (todos os produtos, 7 eventos)
- **"AS · Black (n8n)":** URL `https://n8n.automato.pro/webhook/as-black-kiwify`. A assinatura vem em `?signature=` e é
  um HMAC-SHA1 do corpo cru, com o token do webhook (fica só na Kiwify e no nó "Ler evento Kiwify"), conferido no n8n.
- **"UTMify":** dashboard "Amar Saber", webhook "Amar Saber - Kiwify".
- **Memberkit:** pelo app Memberkit da própria Kiwify, uma integração por produto.

## n8n · "AS · Kiwify (entrada)" (V1j1gVBgNJ60zT0L)
- **Webhook:**
  - grava o evento cru em **AS · Kiwify eventos**;
  - o nó **Processar** traduz o evento para o formato da Yampi e grava o estado em **AS · Kiwify pedidos**;
  - em seguida repassa para os outros fluxos (intervalo de 12 s entre os envios).
- **Repasses (interruptores `ENVIAR` no nó Processar):**

  | Destino | O que recebe |
  |---|---|
  | AS · Acessos Black (`as-black-acessos-kiwify`) | comunidade, Kommo e Comunidade · Acessos |
  | AS · Vendas por vendedor (`as-black-vendedor`) | evento no formato da Yampi, com o id equivalente |
  | AS · Recuperação Black (`as-black-yampi`) | carrinho (T7), cartão recusado (T9), Pix (T8), compra (para a cadência, CompraPaga, aba Compras) |
  | Memberkit API | curso/Formação por 1 ano, como o "garantir acesso" |

- **Pix:** a Kiwify não manda evento de "Pix expirou", porque o Pix dela vale cerca de 61 dias. A cada 5 min, o Pix
  gerado e não pago há 36 min (o mesmo tempo da Yampi) dispara o T8.
- **Conciliação (30 min):** busca na API as vendas pagas, reembolsadas e com chargeback dos últimos 2 dias que o
  webhook não trouxe. A credencial é "Kiwify API Amar Saber" (OAuth2 client credentials), com o header
  `x-kiwify-account-id` da conta.
- **Vendedora:**
  - O padrão é `utm_source=vendedor&utm_content=<ana|heid|belle>`.
  - `utm_source=<nome>`, fora do padrão, também vale.
  - Sem UTM, a venda fica como "a validar (Kommo)", igual na Yampi.
- **Teste:** o TESTE BLACK aparece como `TESTE (curso + comunidade)` na comunidade. Assim não entra na Sala VIP nem
  nos 10 primeiros, e o CompraPaga sai como `TESTE-KW-…`, com código de teste.

## Planilha · fila única de gravação (11/11)
Antes, cada fluxo gravava direto na planilha. Quando dois pedidos chegavam juntos, um sobrescrevia ou duplicava a linha
do outro, porque o Sheets lê a última linha e só depois escreve. Assim se perderam Lucas, Hemilly e Vitoria, e a aba
Compras ficou com 7 pedidos da Yampi em dobro, já removidos. A Yampi manda o mesmo `order.paid` duas vezes.

- **Quem põe na fila:** Recuperação (aba Compras), Acessos Black (Comunidade · Acessos) e Vendas por vendedor (Vendas ·
  Vendedores e Comercial · Black). Eles não gravam mais na planilha: inserem a linha em **AS · Fila da planilha**
  (Data Table `I5Sf5hYiQoMhVggM`), com `aba`, `chave`, `linha` (JSON) e `status=pendente`.
- **Quem grava:** **AS · Planilha (fila de gravação)** (`dx1OTMpVBCz7vJau`).
  - Roda a cada minuto e grava até 10 linhas, **uma de cada vez**, com appendOrUpdate pela chave (Pedido ou, no
    Comercial, Chave). Sem linha perdida e sem linha duplicada: um evento repetido só atualiza a mesma linha.
  - Tem tempo máximo de 55 s, para duas execuções nunca se sobreporem.
  - Erro do Sheets: até 3 tentativas. Se não der, a linha fica com `status=erro` e a mensagem na fila. Para regravar,
    basta voltar o status para `pendente`.
- **Vendas por vendedor:** "Ler vendas" junta a planilha com o que ainda está pendente na fila. Assim o upsell herda a
  vendedora do pedido principal mesmo antes de a linha chegar à planilha.
- A linha aparece na planilha em até ~1 min depois do evento.

## Upsell (página `/upsell/`, obrigado do Black e do Downsell)
- **Como funciona:** o botão é o snippet da Kiwify da oferta `MrKKqps`. `data-upsell-url` e `data-downsell-url` levam
  a `/compra-confirmada/?upsell=aceitou|recusou`.
- **Pagamento:**
  - cartão em 1 clique;
  - Pix gera um QR novo na própria página;
  - boleto não passa pela página.
- **Recusa do banco:** a Kiwify leva para `upsell=aceitou` **sem** `token`. Nesse caso o obrigado mostra "o pagamento
  da Formação não foi aprovado" e um link para tentar de novo.
- **Teste:** `/upsell-teste/` usa o TESTE UPSELL.

## Pendências
- **AS · Comercial (lista):** a Kiwify já entra na aba Comercial · Black e no Estoque · Guia, e o estoque desconta as
  vendas da Kiwify. O fluxo segue desligado porque a chave do SendFlow está bloqueada; testar no dia 12/11.
- **Botões da LP, do quiz e do downsell e links da recuperação (T5–T12):** trocar para a Kiwify depois do teste.
- **Parcelas:** o texto passa de "12x de R$ 50,57" para "12x de R$ 51,40". Os templates de WhatsApp já aprovados que
  citam o valor seguem com o valor antigo.
- **Aba Sala VIP:** já tem fórmula. Lista os 40 primeiros pela hora do pagamento, com Yampi e Kiwify juntas.
- **AS · Comercial (lista):** ao religar, a atualização das 8h, 12h, 16h e 20h também deve gravar a Comercial · Black
  pela fila, ou num horário em que a fila esteja parada.
