# Formação Completa na Black: upsell (cartão) e bump (Pix e boleto)

Quem compra a Black (46520027) ou o downsell (46522438) já recebe o curso Atendimento Extraordinário, que é 1 dos 7
cursos da Formação Amar Saber. A oferta completa os outros 6 por **R$ 297** (preço de lista da Formação na loja:
**R$ 697**).

**Status (06/11):**
- textos, divisão das aulas e artes aprovados;
- cursos criados no Memberkit;
- produto, upsell e bumps criados na Yampi, **todos desligados**.

Painel feito ([FORMACAO-PAINEL.md](FORMACAO-PAINEL.md)). Upsell e bumps **ligados** desde 06/11, 16h.

**Teste do upsell (06/11, 16h19, pedidos de R$ 1 com o upsell temporariamente a R$ 1):**
- **Pedidos:** downsell 178003876 no cartão; a oferta apareceu depois do pagamento; o upsell 178003904 entrou como
  pedido **separado** (`is_upsell`), cobrado no mesmo cartão sem digitar de novo.
- **Página:** a pessoa caiu em `/compra-confirmada/`.
- **Memberkit:** assinaturas 38626 e 38676 ativas até 06/11/2027.
- **n8n:** o fluxo da comunidade gravou só o pedido do downsell.
- **Preço:** o upsell voltou para R$ 297 logo depois do teste.
- **Cupom de 100%:** com o pedido em R$ 0 não há cobrança no cartão, e a Yampi não mostra o upsell one click. Para
  testar, use um pedido de pelo menos R$ 1.
- **Falta:** teste do bump no Pix, reembolsos e limpeza dos dados de teste.

| Na Yampi | ID |
|---|---|
| Produto "Black 2026 · Formação Completa" (digital, fora da busca, lista R$ 697) | 46637102, SKU 307532282 |
| Upsell one click, cartão, finalização, depois de 46520027 e 46522438, R$ 297 | 449508 |
| Bump Pix, checkouts 46520027 e 46522438, de R$ 697 por R$ 297 | 281355 |
| Bump boleto, mesmos checkouts e preço | 282360 |
| Cupom `FORMACAOAMARSABER` (R$ 300 de desconto, R$ 697 → R$ 397, sem fim; vale até 31/12/2099) | 11202198 |

**Cadeado do Memberkit.** A URL de vendas dos 7 cursos leva ao checkout do produto novo. Com o cupom, o link fica
`https://seguro.amarsaberstore.com.br/r/510DFCQ5AV?promocode=FORMACAOAMARSABER` e cobra **R$ 397**. Como esse valor
não é R$ 297, o "essa condição só aparece aqui" continua verdadeiro.

**Atenção:** a API não restringe o cupom por produto. Se alguém digitar o código em outra compra, ganha R$ 300 de
desconto. No painel (Marketing → Cupons → FORMACAOAMARSABER), restringir ao produto **Black 2026 · Formação Completa**.

## Onde aparece

| Quem | Como | Quando |
|---|---|---|
| Paga no cartão | **upsell one click** da Yampi (sem digitar o cartão de novo) | na tela de finalização, logo depois da compra |
| Paga no Pix | **bump** marcado no checkout | no checkout, só quando escolhe Pix |
| Paga no boleto | **bump** marcado no checkout | no checkout, só quando escolhe boleto |

O mesmo vale no checkout da Black e no do downsell.

**Pedidos e entrega:**
- o upsell gera um **pedido separado**, sem frete;
- o bump entra no mesmo pedido;
- nos dois casos, o produto novo **"Black 2026 · Formação Completa"** libera a assinatura **Black 2026 · Plataforma
  Completa** (38676) do Memberkit por 365 dias.

## Números do texto (de onde vêm)

| No texto | Fonte |
|---|---|
| 7 cursos | os 7 cursos de [FORMACAO-MEMBERKIT.md](FORMACAO-MEMBERKIT.md), os mesmos da Formação na Kiwify |
| 6 cursos, 111 aulas, cerca de 7 horas | o inventário sem o Atendimento (111 aulas, 7,0 h de vídeo, medido no Tella) |
| 1 ano de acesso | extensão de 365 dias na assinatura 38676 |
| certificado em cada curso | os 7 modelos de certificado configurados no Memberkit |
| 7 dias de garantia | igual à oferta principal |
| R$ 697 | preço de lista do produto Formação Amar Saber (44424159) na Yampi |
| "essa condição só aparece aqui" | o R$ 297 só existe no upsell e nos bumps; quem chega pelo cadeado do Memberkit fala com a equipe no WhatsApp, a outro preço |

## Upsell (cartão)

- **Nome interno:** Black 2026 · Formação Completa (cartão)
- **Texto da oferta:**

> Você já tem 1 dos 7 cursos da Formação Amar Saber. Leve os outros 6 por R$ 297 (o preço normal da Formação é
> R$ 697): plantão, leitura de hemograma, clínica de felinos, casos clínicos reais da Amar, procedimentos e cálculo de
> dose. São 111 aulas curtas, com 1 ano de acesso, certificado em cada curso e 7 dias de garantia. A cobrança é no mesmo
> cartão, em 1 clique. Essa condição só aparece aqui.

## Bumps (Pix e boleto)

Os dois bumps usam o mesmo texto e só mudam o meio de pagamento.

| Campo | Texto |
|---|---|
| Nome interno | Black 2026 · Formação Completa (Pix) / (boleto) |
| Título | Complete a Formação Amar Saber por R$ 297 |
| Mensagem | O curso do seu pedido é 1 dos 7 cursos da Formação. Marque aqui e leve os outros 6: plantão, hemograma, felinos, casos clínicos reais, procedimentos e cálculo de dose. 111 aulas, 1 ano de acesso, certificado e 7 dias de garantia. Essa condição só aparece aqui. |
| Botão | + Completar a Formação |
| Preço | de R$ 697 por R$ 297 |

## Página /compra-confirmada/ (bloco no ar desde 06/11)

> **Se você levou a Formação completa:** os 7 cursos aparecem na sua área de membros da MemberKit, no mesmo login do
> Atendimento Extraordinário. O acesso chega no e-mail da compra.

## Antes de ligar

1. Os 6 cursos estão no Memberkit, com aulas, capas e certificados, e a assinatura 38676 libera os 7 com 365 dias.
2. O webhook da Yampi "Memberkit · Black (formação)" está ativo e marca só o produto novo.
3. Pedidos de teste foram feitos e reembolsados:
   - cartão com o upsell aceito;
   - cartão com o upsell recusado;
   - Pix com o bump.
4. **Redirecionamento.** Os produtos 46520027 e 46522438 já mandam cartão e boleto para `/compra-confirmada/`.
   Falta o redirecionamento **depois do upsell** (Yampi → Checkout), e o teste mostra se o do cartão no produto pula o upsell.
