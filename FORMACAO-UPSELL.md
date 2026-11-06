# Formação Completa na Black: upsell (cartão) e bump (Pix e boleto)

Quem compra a Black (46520027) ou o downsell (46522438) já recebe o curso Atendimento Extraordinário, que é 1 dos 7
cursos da Formação Amar Saber. A oferta completa os outros 6 por **R$ 297** (preço de lista da Formação na loja:
**R$ 697**).

**Status:** aguardando aprovação dos textos, da divisão das aulas
([FORMACAO-MEMBERKIT.md](FORMACAO-MEMBERKIT.md)) e das artes (`formacao/artes/`). Nada está ligado na Yampi.

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
| 6 cursos, 112 aulas, cerca de 7 horas | o inventário sem o Atendimento (112 aulas, 7,1 h de vídeo, medido no Tella) |
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
> dose. São 112 aulas curtas, com 1 ano de acesso, certificado em cada curso e 7 dias de garantia. A cobrança é no mesmo
> cartão, em 1 clique. Essa condição só aparece aqui.

## Bumps (Pix e boleto)

Os dois bumps usam o mesmo texto e só mudam o meio de pagamento.

| Campo | Texto |
|---|---|
| Nome interno | Black 2026 · Formação Completa (Pix) / (boleto) |
| Título | Complete a Formação Amar Saber por R$ 297 |
| Mensagem | O curso do seu pedido é 1 dos 7 cursos da Formação. Marque aqui e leve os outros 6: plantão, hemograma, felinos, casos clínicos reais, procedimentos e cálculo de dose. 112 aulas, 1 ano de acesso, certificado e 7 dias de garantia. Essa condição só aparece aqui. |
| Botão | + Completar a Formação |
| Preço | de R$ 697 por R$ 297 |

## Página /compra-confirmada/ (bloco novo)

> **Se você levou a Formação completa:** os 7 cursos aparecem na sua área de membros da MemberKit, no mesmo login do
> Atendimento Extraordinário. O acesso chega no e-mail da compra.

## Antes de ligar

1. Os 6 cursos estão no Memberkit, com aulas, capas e certificados, e a assinatura 38676 libera os 7 com 365 dias.
2. O webhook da Yampi "Memberkit · Black (formação)" está ativo e marca só o produto novo.
3. Pedidos de teste foram feitos e reembolsados:
   - cartão com o upsell aceito;
   - cartão com o upsell recusado;
   - Pix com o bump.
4. O redirecionamento pós-compra para `/compra-confirmada/` está configurado (depois do upsell, Pix e boleto).
