---
layout: post
title: "React + Tipos + Testes = Qualidade"
date: 2018-03-19 17:54:40 -0300
---

Quando o assunto é qualidade em desenvolvimento, podemos falar sobre legibilidade, performance, custos, produtividade e algumas outras coisas. Vamos falar um pouco sobre algumas ferramentas e práticas que podem ajudar muito na hora de escrever e manter códigos front-end de qualidade.

Algum tempo antes do meu [último post](http://gabrielprates.com/2017/10/21/shell-script-02-io-e-mais.html), comecei a estudar bastante sobre testes e queria escrever algo sobre o assunto. Um outro assunto sobre o qual eu já havia lido e então comecei a brincar um pouco, foi o [TypeScript](https://www.typescriptlang.org/). Como nos últimos meses tudo isso (e muito mais) se tornou parte da minha stack como front-end na [Studio Sol](https://www.studiosol.com.br/), decidi escrever um post mais completo, com uma visão mais prática sobre tudo isso.

Agora vamos ao que interessa. Para melhor entendimento, vamos dividir este post em algumas partes básicas:

- **JavaScript e tipagem**
- **Tipagem em React**
- **Cultura de Teste**

So, let's go there!

## JavaScript e tipagem

Gostaria de começar falando que, se você ainda acha que JavaScript é uma linguagem sem tipagem, tá na hora de mudar esse conceito.

JavaScript tem tipos bem definidos sim, e tem valores primitivos dos seguintes tipos:

- **Undefined**
- **Null**
- **Boolean**
- **Number**
- **String**
- **Symbol**

Objetos partem do escopo do tipo **Object**, e aqui estamos falando de ***Function***, ***Date***, ***RegExp***, os _wrappers_ de ***String***, ***Number*** e ***Boolean***, vários outros e qualquer um que você crie.

Okay, podemos prosseguir.

Linguagens fortemente tipadas garantem certo nível de qualidade de código, porque você tem um ambiente, de certa forma, controlado e pode prevenir vários errinhos inesperados. Linguagens fracamente tipadas e de tipagem dinâmica, como JavaScript, apesar da flexibilidade, podem trazer alguns efeitos colaterais para o controle e tratamento dos dados.

Nesse ponto, eu gostaria de ressaltar que quando você e seu time entendem bem o comportamento dos tipos e suas coerções dentro da linguagem, vocês podem manipular muita coisa a seu favor. A tipagem dinâmica não é, em si, um problema mortal. No meu caso, quando comecei a desenvolver, eu evitei linguagens fortemente tipadas, ou qualquer coisa que tornasse meu processo de aprendizado mais burocrático, por isso foquei tanto em PHP e depois em JS.

Com o passar do tempo, senti a necessidade de algumas garantias a nível de código e tive uma experiência interessante na faculdade, [com Java](https://github.com/gabsprates/JavaPOO). Pude perceber mais clareza e produtividade em alguns trechos de código que escrevia e acredito que muito por causa de tipagem.

Ah! [A partir da versão 7 do PHP](https://secure.php.net/manual/en/migration70.new-features.php) também temos a possibilidade de deixar o código mais estrito. **;)**

A evolução do JavaScript, principalmente em 2015, favoreceu muito o desenvolvimento de software, e é perfeitamente possível escrever software robusto com JS puro, o [Rocket.Chat](https://rocket.chat/) que o diga. Mas antes disso, a Microsoft já vinha com uma [iniciativa ousada](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md) de criar uma ferramenta robusta para o desenvolvimento de código, o [TypeScript](https://www.typescriptlang.org/), que se destacava pelo seguinte ponto:

> TypeScript starts from the same syntax and semantics that millions of JavaScript developers know today.

Outras linguagens tentaram fazer "o mesmo" que o TypeScript faz (compilar para JS), como por exemplo o [Coffee Script](http://coffeescript.org/), a diferença primordial é o fato da sintaxe e semântica já serem conhecidas. Com a evolução do JS, os adicionais colocados pelo TS parecem mais uma evolução natural da linguagem. Tudo isso favoreceu muito a utilização de TypeScript e claro que não podemos deixar de falar da Google utilizando a linguagem no [Angular](https://angular.io/docs#assumptions).

Sim, com TypeScript precisamos escrever um código mais verboso, mas é um custo que vale a pena durante manutenção e reusabilidade, e o resultado final é JavaScript, então é bom demais! Você pode testar um pouco no [_playground_](https://www.typescriptlang.org/play/index.html) da linguagem.

Acho que deu pra entender como o TS se encaixa na história, né? Qualquer dúvida, comenta aí, a gente conversa mais e esclarece tudo.

## Tipagem em React

Como falei, o Angular `^2` é escrito com TypeScript e, graças à era Open Source da Microsoft, também podemos usar TS em aplicações Node.js, ou com jQuery, Vue.js, React, etc. Isso acontece porque existe  `@types` [pra quase tudo](https://www.npmjs.com/~types)!!! Faça o teste, procure por alguma biblioteca que você usa: [TypeSearch](http://microsoft.github.io/TypeSearch/).

Eu não vou ensinar instalar e configurar um projeto React pra usar TypeScript, a própria documentação do TS já tem guias pra isso e são bem explicados, dá uma olhadinha nesses links:

- [TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter) <- para quem for usar o `create-react-app`;
- [React & Webpack](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html) <- para quem quer instalar na mão, ou começar a usar num projeto já existente;
- [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) <- para saber mais.

O que quero focar aqui, é em pequenos exemplos de como a tipagem ajuda no desenvolvimento ~~e como um editor/IDE pode facilitar as coisas~~. Vamos para a prática!

Considerando a instalação e configuração manual, disponível no link **React & Webpack** acima, vou apenas mudar a utilização do [webpack](https://webpack.js.org/) e [webpack-dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server), pra não precisar instalar nada globalmente e não precisar ficar fazendo _build_ toda hora. Vamos fazer um componente `<TodoApp />`, o mesmo disponível na página do React e o código escrito para este post está disponível [neste repositório](https://github.com/gabsprates/todo-react-typescript).

Recomendo o uso do [VS Code](https://code.visualstudio.com/). Ele tem um ótimo suporte, quase que nativo, pro TypeScript, então facilita muita coisa.

Ok, o código original do componente é o seguinte:

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=React_TodoApp.js"></script>

Vamos dividir esses componentes em arquivos diferentes e ajustar os `import`s dos componentes, vai ficar assim:

- `src/components/TodoApp.tsx`

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=Modulos_TodoApp.tsx"></script>

- `src/components/TodoList.tsx`:

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=Modulos_TodoList.tsx"></script>

E nosso `src/index.tsx` fica assim:

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=Modulos_index.tsx"></script>

Você pode conferir como o código deve ficar [nesta tag](https://github.com/gabsprates/todo-react-typescript/tree/modulos). Agora, vamos executar o build do webpack com o `--watch` e ver o que vai acontecer:

```bash
$ ./node_modules/.bin/webpack --watch
```

O build vai mostrar vários erros. Isso era realmente o esperado, agora vamos ajustar tudo.

### `<TodoList />`

Em primeiro lugar, esse é um componente _stateless_, então vamos transformá-lo numa função, pra ficar mais enxuto e performático, assim:

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=Tipos_Pre_TodoList.tsx"></script>

Nesse ponto, os erros apontados para este arquivo já foram solucionados, isso porque o compilador estava dizendo que alguns tipos de um componente React não tinham sido especificados.

Agora imagine que você e sua equipe devam utilizar este componente em outras partes da aplicação, não apenas do `<TodoApp />`. Pode ser que queiram usar só para renderizar um conjunto de tarefas, ou algo do tipo. Como garantir que sempre vão receber os dados corretos para isso? Podem combinar e escrever isso em algum lugar, mas se o caso é documentar isso e deixar claro pra quem for utilizar o código, é melhor que esses tipos sejam especificados. Então vamos especificar que esse componente deve receber uma `prop` chamada `items`, que deve ser um array de elementos com uma descrição e um id.

Podemos definir esses "modelos" com `type` ou `interface`, mas acredito que interfaces são mais úteis quando definimos "modelos" ([ou "contratos", como algumas pessoas dizem](https://www.caelum.com.br/apostila-java-orientacao-objetos/interfaces/#interfaces)) para classes/métodos, então vamos criar um tipos mesmo:

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=Tipos_Done_TodoList.tsx"></script>

Um pouco mais verboso, né? Vale a pena, você vai ver. O `export` do `ItemType` também  será útil no próximo componente.

### `<TodoApp />`

Este componente não precisa de uma definição de `props`, já que não recebe nada, mas ele contém `state`, então é bom definir esses estados. Vamos importar tudo o que precisamos do outro componente e definir o tipo do nosso `state`:

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=Tipos_PT1_TodoApp.tsx"></script>

Reparou no `<{}, StateType>`? Como não precisamos de um modelo de `props`, declaramos apenas o modelo dos estados, daí nosso construtor espera que `props` seja um objeto vazio, ou seja, não precisa declarar nenhuma prop. Podemos até definir um estado _default_, o que ajudaria no caso de querermos reaproveitar esses dados. Veja só:

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=Tipos_PT2_TodoApp.tsx"></script>

Isso também poderia ser feito para `props`, e se definir um `static defaultProps`, o próprio compilador já entende o que deve fazer e inicializa nossas props.

Agora os únicos avisos de erro que temos são os tipos dos parâmetros do das funções de _handle_. Vamos ajeitar isso antes de inserir uma nova _feature_ em nosso componente.

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=Tipos_PT3_TodoApp.tsx"></script>

O que fizemos até aqui foi definir que nossos componentes devem seguir certo comportamento, mesmo que outra pessoa mexa nesse código, ou reutilize em alguma outra parte da aplicação. Temos `state`, `props` e métodos com consistência. Mesmo que o resultado final seja JavaScript puro, estamos garantindo integridade e qualidade durante o desenvolvimento.

### Nova funcionalidade

Agora que tudo já está certinho, e está [tudo aqui nesta tag](https://github.com/gabsprates/todo-react-typescript/tree/tipos/), vamos mexer em algumas coisinhas e criar um método para dar um _reset_ no nosso componente.

Vamos definir o método, fazer o bind no `constructor` e criar um `<button>` que irá chamá-lo. Vou cortar alguns trechos de código aqui para economizar espaço:

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=Reset_TodoApp.tsx"></script>

Viu que reutilizamos o `defaultState`? E que nosso novo método não precisa receber nenhum parâmetro e nem precisa especificar?

Conseguiu perceber como o código fica mais consistente? Se você estiver usando um editor/IDE bem configurado, vai conseguir ser muito mais produtivo. Faça o teste do VS Code, mas se quiser, pode configurar o Atom, ou Vim também.

Agora vamos entrar na parte que eu acho mais interessante: testes!

## Cultura de testes

Aaah, testes...

Quantas vezes você tentou trabalhar com uma biblioteca e, mesmo que encontrava algo documentado, não encontrava exemplos e isso dificultava um pouco pra trabalhar com ela? Ou, quantas vezes você mexeu em alguma parte do código e demorou um tempinho até perceber que alguma outra coisa parou de funcionar? Já aconteceu de ter que testar manualmente várias telas, inputs e outputs na aplicação pra garantir que está tudo funcionando depois de uma modificação grande? Pois é, garantir a estabilidade e documentação do seu código, e aplicação de forma geral, pode se tornar mais simples pelo fato de adotar uma cultura de testes de forma automatizada.

Vamos focar em testar as partes mais básicas do teu código e as comunicações entre um módulo e outro. O assunto de testes é muito vasto, e eu particularmente gosto bastante, mas vou me conter aqui porque existem várias fontes sobre isso, aqui estão algumas:

- Pra quem gosta de ouvir:
  - https://www.lambda3.com.br/2016/11/podcast-18-testes/
  - https://hipsters.tech/testes-automatizados-hipsters-51/
  - http://zofe.com.br/posts/voce-testa-se-o-teste-do-codigo-testado-testavel/


- Pra quem gosta de ler:
  - https://willianjusten.com.br/entendendo-testes-de-software/
  - https://blog.umbler.com/br/qualidade-de-software-1-7-motivos-para-considerar-o-teste-de-software-indispensavel/
  - https://jcemer.com/voce-e-irresponsavel-por-nao-escrever-testes-de-front-end.html

Aqui eu vou focar mais nos testes unitários da nossa aplicação. Existem várias ferramentas diferentes para testar código JavaScript, e TypeScript no nosso caso. Eu escolhi falar sobre Jest por alguns motivos e dentre eles, ~~porque é o que eu uso no meu dia-a-dia~~ porque é simples de configurar. Ambientes de teste podem dar dor de cabeça para configurar, principalmente no ecossistema JS atuais (vede data da publicação). O maior complicador aqui é a configuração para testar nosso código TypeScript, mas mesmo assim é simples.


### Preparando ambiente

No ponto que nossa aplicação está, precisamos configurar tudo para fazer com que nosso código TypeScript seja testado pelo Jest. Para isso, vamos seguir alguns passos:

1. Terminar a instalação do ambiente React com webpack e Babel (no link abaixo tem outros links pro Babel e como configurar tudinho, mas na prática é pouca coisa):
  - https://reactjs.org/docs/add-react-to-an-existing-app.html
  - Devemos	 inserir o `babel-loader` na mesma _**rule**_ do `awesome-typescript-loader`, assim:
    - `use: [ { loader: "babel-loader" }, { loader: "awesome-typescript-loader" } ]`


2. Instalar o Jest e **ts-jest**:
  - https://facebook.github.io/jest/docs/en/tutorial-react.html#setup-without-create-react-app
  - https://github.com/kulshekhar/ts-jest#usage


3. Instalar o **Enzyme**, o seu adaptador para a versão do React que estamos utilizando (v. 16) e os tipos:
  - http://airbnb.io/enzyme/docs/installation/#working-with-react-16
  - `@types/enzyme` e `@types/enzyme-adapter-react-16`
  - Como estamos trabalhando com TypeScript, crie o arquivo `enzyme.adapter.tsx` com o conteúdo referenciado abaixo e coloque ele no `setupFiles` da configuração do Jest no `package.json` (deve ter sido criado no passo 2):

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=enzyme_config.js"></script>

Agora é só criar uma tarefa de testes no npm:

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=package_test.json"></script>

O resultado final dessas alterações pode ser visto [neste commit](https://github.com/gabsprates/todo-react-typescript/commit/48f8f87bf6bb28f633d971dfa5c258c46cbc5ae1).

Esclarecendo as coisas, o Jest é uma biblioteca para testar código JavaScript, já o Enzyme vai nos proporcionar toda dinâmica de renderização e manipulação de DOM que o browser faz. Agora vamos escrever nossos testes.

### Começando a testar

Para escrever nossos testes e fazer com que o Jest faça seu trabalho, só precisamos seguir a definição da própria biblioteca:

> Place your tests in a `__tests__` folder, or name your test files with a `.spec.js` or `.test.js` extension.

No nosso caso, vamos criar um diretório `__tests__`, que irá seguir a mesma estrutura do nosso diretório `src`, então vamos criar nosso primeiro teste, o do nosso componente `<TodoList />`, que é _stateless_:

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=Teste_TodoList.tsx"></script>

Muita informação de uma vez, mas vou explicar tudo. Seguinte:

Primeiro nós importamos as coisas necessárias para nosso teste: o React, a função `render` do Enzyme (vou mais sobre isso) e o nosso componente; depois criamos um _mock_, que é um conjunto de dados que será usado para testes; descrevemos o nosso contexto de teste e começamos especificar os casos. O primeiro caso deve renderizar a `<ul>` com uma `<li>`, daí mandamos o `render()` fazer o trabalho dele e então fizemos uma busca dentro do que foi renderizado para então verificar se a quantidade de itens estava certa e o texto também, com o `expect()`. O segundo caso é praticamente a mesma coisa, mas com mais itens, e pra não ficar repetitivo, usamos o `forEach()`.

Como falei, utilizamos o [`render()`](http://airbnb.io/enzyme/docs/api/render.html) do Enzyme e ele a melhor escolha para testar componentes estáticos, sem estado, como esse nosso componente do teste. Também temos as funções [`shallow()`](http://airbnb.io/enzyme/docs/api/shallow.html) e [`mount()`](http://airbnb.io/enzyme/docs/api/mount.html).

O `shallow` faz a montagem e renderização no nível do componente e testa o componente como uma unidade, ou seja, se você tiver componentes filhos, eles não serão montados e não vão afetar o teste do componente em questão.

Já o `mount` vai montar toda a árvore de componentes, _"da raiz até as folhas"_, e toda a respectiva estrutura do DOM. Isso é muito bom pra testar integração entre componentes.

Vamos testar nosso próximo componente, o `<TodoApp />`. Primeiro vamos testar a renderização e depois o disparo dos métodos de _handle_. Aqui está:

<script src="https://gist.github.com/gabsprates/f10c28281edc500e54518890c0df09da.js?file=Teste_TodoApp.tsx"></script>

Como falei, esses testes tem muito conteúdo, então vou citar algumas particularidades deles aqui:

- [`jest.spyOn`](https://facebook.github.io/jest/docs/en/jest-object.html#jestspyonobject-methodname) nos permite observar uma função, que no caso foi um método do prototype do componente. Poderíamos até substituir essa função por outra com o `jest.spyOn(...).mockImplementation(novaFuncao)`;
- Podemos simular eventos com o [`.simulate()` do Enzyme](http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html) e, dependendo do caso, precisamos passar um objeto como para definir o escopo do evento que precisamos;
- Podemos acessar a instância do componente montado. O Enzyme nos dá um "container" de manipulação do componente, mas podemos acessar o próprio componente alocado na memória e acessar métodos, `state`, `props`, etc.

### Integrando os testes

Testamos nossos componentes como unidades, os famosos testes unitários, mas também podemos fazer o que chamamos de testes de integração: montar tudo e testar o funcionamento da coisa como um todo. Podemos fazer isso com o `mount` do Enzyme. Aí seria mais ou menos assim:

- Montar o componente (`mount(<TodoApp />)`);
- Testar o funcionamento do formulário (com o `handleChange` e `handleSubmit`);
- E então testar se a inserção de novos itens fazem o `<TodoList />` renderizar mais `<li>` dentro d a`<ul>`.


## Conclusão

Trabalhar com uma linguagem tipada pode ajudar muito a garantir um bom código, pode deixá-lo mais claro, estrito e menos sujeito ao uso incorreto de alguma função.

Testar esse código ajuda muito na manutenção e para saber se tudo está funcionando em conjunto (testes de integração). Mas não se engane, como diria [Leo Balter](https://twitter.com/leobalter) ([no ZOFE #8](http://zofe.com.br/posts/voce-testa-se-o-teste-do-codigo-testado-testavel/)):

> Teste não diz que sua aplicação está funcionando, ou que ela está fazendo o que ela deveria fazer. Só diz que está testado.

Por isso é preciso definir bem o que será testado. Só testes unitários não resolvem tudo. Você pode até usar algumas técnicas como TDD para tentar guiar a escrita do seu código e se testar bem suas integrações, sempre terá um feedback do que não estiver funcionando corretamente após alguma alteração.

Isso dá espaço para falar de _code coverage_, mas isso é assunto para outro post.

Bom... isso é tudo, por agora.

Até a próxima.

(:


---

### Referências

- http://www.ecma-international.org/ecma-262/#sec-ecmascript-language-types
- https://jcemer.com/types-in-javascript-what-you-should-care.html
- https://tableless.com.br/guia-completo-react-ecossistema/
- https://tableless.com.br/diga-ola-ao-typescript-e-adeus-ao-javascript/
