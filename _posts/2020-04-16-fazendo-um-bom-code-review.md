---
layout: post
title: "Fazendo um bom Code Review"
---

**Como fazer um bom code review?** Me faço essa pergunta periodicamente, para sempre fazer melhor. Recentemente vi uma [talk](https://www.youtube.com/watch?v=PJjmw9TRB7s), do [Derek Prior](https://www.linkedin.com/in/derek-prior-1145a2/), sobre o assunto e acredito que ele levantou uma ótima referência de como seria um bom code review e sua cultura. Neste post, vamos explorar um pouco os pontos levantados na talk.

Antes de começarmos, faça uma reflexão respondendo essas 3 perguntas:

- Você faz code review como parte do teu trabalho?
- Você gosta de fazer code review?
- Se você faz, faz porque **TEM** que fazer (como obrigação)?

Pronto? Vamos lá.

## Por que nós fazemos reviews?

**_Para achar bugs_**, você pode ter pensado. Isso realmente acaba fazendo parte do processo, analisando o _diff_ do Git.

Segundo o estudo _[Expectations, Outcomes, and Challenges of Modern Code Review](https://www.microsoft.com/en-us/research/publication/expectations-outcomes-and-challenges-of-modern-code-review/)_, realizado pela Microsoft em parceria com a Universidade de Lugano (Suíça), a grande maioria dos desenvolvedores entrevistados também acreditavam que **encontrar defeitos** era o maior motivo de se fazer code review. Dentre os motivos citados, temos:

1. **Encontrando defeitos**
2. **Melhoria de código**
3. **Soluções alternativas**
4. **Transferência de conhecimento**
5. **Conscientização da equipe**

Acredito, em concordância com a talk do Derek Prior, que podemos tirar um proveito muito grande desses outros motivos e usar o code review como uma ferramenta para nos ajudar a **fazer um trabalho cada dia melhor**.

Um das entrevistadas nesse estudo disse que code review é a

> discipline of explaining your code to your peers [that] drives a higher standard of coding. I think **the process is even more important than the result.**

Gosto dessa definição, mas se mudarmos a palavra **explicar** para **discutir**, percebemos que é uma questão de comunicação, saber comunicar melhor e ter uma comunicação melhor com o time. Um bom code review é consequência disso.

## Criando uma forte cultura de code review

Uma das coisas que precisamos pensar é **como devemos agir durante o code review?**

Nesse caso, precisamos identificar qual o nosso papel:

- **como autor**; e
- **como reviewer**

### Como autor, dê contexto suficiente

Quem faz review precisa saber **o que foi alterado e por quê?**

É muito importante que, ao criar um _pull/merge request_, você dê o máximo de contexto possível sobre o que está fazendo.

Se a pessoa que fará review for autora do código que você alterou, será mais fácil pra ela entender as tuas alterações. Caso ela nunca tenha visto aquele código, o que acontece muito, seja porque é uma pessoa nova no time, ou porque é alguém que não conhece mesmo aquele código, essa pessoa precisa saber o qual o objetivo daquele código e porquê aquela alteração foi feita.

Segundo a pesquisa citada:

> when the **context is clear and understanding is very high**, as in the case when the reviewer is the owner of changed files, **code review authors receive comments that explore "deeper details," are "more directed" and "more actionable and pertinent," and find "more subtle issues."**

É **importante que você dê contexto** para quer for fazer review. **Contexto** é a palavra chave!

- Se é uma alteração que propõe uma nova forma de fazer algo, explique e dê exemplos;
- Se é uma alteração que corrige um bug, dê contexto, diga como reproduzir, explique qual era o erro e como corrigiu;
- Se é uma nova feature, explique o requisito e passos para reprodução.

Coloque issues de referência também, se possível.

Segundo [Gary Vaynerchuk](https://www.garyvaynerchuk.com/content-is-king-but-context-is-god/):

> Content is king, but **context** is God

Dica: [templates de pull requests](https://help.github.com/en/github/building-a-strong-community/creating-a-pull-request-template-for-your-repository) podem ajudar nesse ponto.

### Como reviewer, faça perguntas no lugar de dar ordens

Já ouviu falar no [Método Socrático](https://pt.wikipedia.org/wiki/M%C3%A9todo_socr%C3%A1tico)? ~Lembrei de algumas pessoas falando que não entendem o motivo de ter filosofia em cursos de computação.~ Podemos aprender algo com ele:

> ...é uma técnica de investigação filosófica feita em **diálogo**, que consiste em o professor **conduzir** o aluno **a um processo de reflexão e descoberta** [...] Para isso o professor **faz uso de perguntas simples e quase ingênuas** que têm por **objetivo**, em primeiro lugar, **revelar** as contradições presentes na **atual forma de pensar** do aluno...

Considere o seguinte comentário (que eu provavelmente já fiz em algum review):

> Essa lógica tá repetida em vários lugares. Transforma numa função e chama a função quando precisar.

Consigo perceber alguns problemas com esse comentário:

- não incentivo a pesquisa da outra pessoa;
- de certa forma, tiro o crédito dela sobre o código que está escrevendo;
- não há discussão.

Talvez seja um pouco daquela história de _"dar o peixe ou ensinar a pescar"_. O que queremos é ter uma ótima discussão técnica, para o crescimento de todo mundo no time. Ser imperativo dessa forma não parece ajudar muito. Quando criamos, ou incentivamos a discussão, temos a oportunidade de que todo mundo tire proveito disso. Podemos aprender uns com os outros! Já parou pra pensar em quantas oportunidades podem ser perdidas por esse motivo?

Que tal transformar esse comentário em algo mais **positivo** e **instigador**?

> O que você acha de extrair essa lógica em uma função para evitar repetição?

Parece bobo, mas sim, faz uma grande diferença. A forma como se fala faz muita diferença. Lembre-se: **é uma questão de comunicação**. Pode doer um pouco no início, mas garanto que fará um grande bem ao time e a você.

Dica: algumas formas de começar uma discussão:

- **O que você acha de**... ?
- **Você já considerou**... ?
- **Você pode explicar melhor**... ?

Seja **positivo!!!**

Ok, conseguimos gerar uma discussão. E como resolvemos conflitos?

## Resolvendo conflitos

Bom, isso pode ser um pouco complicado. Pense o seguinte:

> É uma questão de **não estar bom**, **OU** é uma questão de que **eu faria diferente**?

Se é uma questão de **não estar bom**, explique os motivos, dê referências, tente não deixar dúvidas dos motivos que você discorda daquela solução, ou o porquê dela não ser boa. Existe algum [_trade-off_](https://pt.wikipedia.org/wiki/Trade-off) envolvido? Seja claro, positivo e instigue a pesquisa.

Se é uma questão de **eu faria diferente**, está tudo bem! Não é um problema, você só tem uma solução diferente e tão boa quanto! Lembre-se, é uma oportunidade de aprender (:

## O que revisar?

Na hora de revisar código, mantenha o foco em coisas como:

- **nomenclatura**: funções, variáveis, classes, métodos, etc., isso faz parte de um código limpo e saudável;
- **complexidade**: está difícil de entender o código em questão, ou tem uma forma melhor de fazer?
- **responsabilidade e requisito**: esse trecho de código faz o que deveria?

Por favor, se você está comentando coisas como **"use aspas simples no lugar de aspas duplas"**, ou **"use espaço no lugar de tab"**, ou **"tem que ter quebra de linha antes do `{`"**, por favor:

**PARE COM ISSO AGORA!**

Isso deve ser um trabalho para linters e formatadores de código. Essas ferramentas existem e salvam muito tempo útil. O padrão de estilo de código definido pelo teu time deve ser documentado e automatizado. Isso é algo que uma máquina pode fazer, deixe ela fazer e foque em coisas que só você pode fazer!

Dica: [tem um outro post meu](/2016/08/07/que-nao-vai-padronizar-o-que.html) com dicas de guias de estilo de código para C, CSS, JavaScript, PHP, Python e Ruby. Dê uma olhada e pesquise alguma ferramenta de automação e guia de estilo para as linguagens que você utiliza. Aceito sugestões nos comentários 😉

---

## O que ganhamos com code review?

Sem dúvidas, com um bom processo de code review, nós teremos:

- Um código melhor;
- Desenvolvedores melhores;
- Debates saudáveis;
- Um compartilhamento da propriedade do código.

Um dos motivos listados na pesquisa, sobre porquê fazer code review, é o **compartilhamento da propriedade do código**.

Acredito que isso significa que, vendo o código de outras pessoas e mostrando a elas o nosso, dando e recebendo feedbacks, nós compartilhamos o sentimento de que é um código do **time**, do **produto**.

Esse é um ponto que eu e meu time, front-ends do [Palco MP3](https://palcomp3.com.br) tentamos lembrar sempre que necessário. Durante o code review, nós fazemos o que podemos para entregar um resultado ótimo, tanto de código quanto de funcionalidade e usabilidade e ter em mente que é um resultado nosso. Mesmo que determinada feature foi escrita por uma pessoa em particular, o código acaba sendo do time, do produto; damos feedbacks, discutimos soluções e trazemos melhorias fazendo do code review uma ferramenta de desenvolvimento pessoal e da equipe.

Assim temos um código melhor, desenvolvedores mais maduros e, consequentemente, times e produtos melhores.
