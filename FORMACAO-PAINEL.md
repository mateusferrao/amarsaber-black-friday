# Memberkit: checklist do painel (Formação Amar Saber)

A API já fez a parte dela:
- criou os 6 cursos novos, com módulos e aulas;
- deu título e descrição às 23 aulas do Atendimento;
- tirou o título do Tella dos vídeos (`title=0`) nas 134 aulas;
- conferiu, aula por aula, que cada uma tem o vídeo certo.

Os vídeos estão como **"só incorporado"** no Tella: tocam dentro do Memberkit, e o link direto do Tella mostra "No
access". A trava por domínio exige o plano Premium do Tella (a conta é Pro).

O que segue **só dá para fazer no painel**: a API do Memberkit não edita curso, não apaga módulo e não recebe imagem.
As artes estão em [`formacao/artes/`](formacao/artes/).

## 1. Cada curso: Conteúdos → abrir o curso → Editar curso

Os 7 cursos levam a mesma **URL da página de vendas**, por enquanto o checkout da Black (teste; troca depois):

```
https://seguro.amarsaberstore.com.br/r/LUIR27AS3L?promocode=BLACKAMARSABER
```

Em todos: ligar **"Mostrar curso na vitrine de todos os alunos"** e enviar a capa, a capa vertical e a imagem de
destaque (o número no começo do arquivo é o do curso).

| # | Curso (id) | Sigla | Arquivos | Além disso |
|---|---|---|---|---|
| 01 | Atendimento Extraordinário (297948) | ATEND | `01-atend-*` | **Descrição** (hoje só repete o nome): "Como conduzir a consulta do primeiro contato ao pós-atendimento: rapport, anamnese, exame físico com o tutor junto, explicação do diagnóstico e autorização de exames, com o padrão usado na Amar Veterinária." Sigla `ATEND`. Arrastar **"Alinhando expectativas e explicando o diagnóstico"** para cima de **"Explicação visual na prática: barreira cutânea e piodermite"** |
| 02 | Entre o plantão e o medo (298515) | PLANT | `02-plant-*` | — |
| 03 | Leitura de hemograma (298516) | HEMO | `03-hemo-*` | renomear o módulo **"Módulo 1"** para **"Introdução"** |
| 04 | Clínica de felinos (298514) | FELIN | `04-felin-*` | **excluir o módulo "Módulo 1"**, que está vazio (as aulas estão em "Aulas") |
| 05 | Casos clínicos (298517) | CASOS | `05-casos-*` | renomear **"Módulo 1"** para **"Emergência"** |
| 06 | Procedimentos veterinários (298518) | PROC | `06-proc-*` | renomear **"Módulo 1"** para **"Coletas e exames rápidos"** |
| 07 | Cálculos, exames e condutas (298519) | CALC | `07-calc-*` | renomear **"Módulo 1"** para **"Cálculo de dose"** |

**Capas de módulo** (300×420): nos cursos 03, 05, 06 e 07, o arquivo `NN-sigla-modulo-K-300x420.png` vai no K-ésimo
módulo, na ordem em que eles aparecem.

## 2. Assinaturas → "Black 2026 · Plataforma Completa" (38676)

- **Conteúdos:** incluir os 6 cursos novos, cada um com a sua Turma A. O Atendimento (Turma A 394987) já está lá.

  | Curso | Turma A (id) |
  |---|---|
  | Entre o plantão e o medo | 395810 |
  | Leitura de hemograma | 395811 |
  | Clínica de felinos | 395809 |
  | Casos clínicos | 395812 |
  | Procedimentos veterinários | 395813 |
  | Cálculos, exames e condutas | 395814 |

- **Extensão de acesso:** 365 dias.

## 3. Certificados → Novo modelo de certificado (um por curso)

- **Frente:** `NN-sigla-certificado-frente-1056x816.png`
- **Verso:** `NN-sigla-certificado-verso-1056x816.png`
- **Campos:**
  - **nome do aluno:** sobre a linha, entre "Certificamos que" e "concluiu o curso" (fonte Helvetica, cor #22001b);
  - **datas de início e conclusão:** logo abaixo de "Período do curso";
  - **QR Code:** canto inferior direito, dentro da moldura.
- Conferir em **Visualizar** antes de salvar.

## 4. Integrações → Yampi (depois que o produto novo existir na Yampi)

- **Nome:** `Yampi · Black Formação`
- **Modalidade:** Assinatura
- **Conteúdo:** Black 2026 · Plataforma Completa
- Clicar em **Gerar URL de Notificação**. A URL vai no webhook "Memberkit · Black (formação)" da Yampi, com **só** o
  produto novo marcado.

Depois de cada item, me avise: confiro pela API o que ela mostra (turmas da assinatura, módulos e ordem das aulas).
