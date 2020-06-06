---
layout: post
title: O dia que eu aprendi React
---

Apesar de ter ouvido falar tanto de [React](https://facebook.github.io/react/) ([no ZOFE](http://zofe.com.br/posts/react-componentes-e-a-web/), [no DNE](http://devnaestrada.com.br/2016/09/23/angular-vs-react.html), num evento da Locaweb, no FrontInBH2016 e no resto da vida), eu, de fato, não havia parado pra ver como era essa *lib*. Até que um dia, um professor passou um trabalho que seria basicamente um *game show* de perguntas sobre a matéria. Na hora, tive a ideia do que fazer.

Na verdade, só tive a ideia, mas fiquei sem saber o que utilizar. Comecei com Bootstrap e jQuery, porque pensei *"não vou arriscar e fazer algo rápido logo."*, mas aí eu pensei *"olha, na verdade é uma boa oportunidade para testar algo novo..."*, e instalei o [AngularJS](https://www.angularjs.org/). Nos mesmos dias que comecei, eu estava lendo o post do Diego Eis no Medium do Tableless sobre ['hello world com React'](https://medium.com/tableless/hello-world-com-react-desde-o-rascunho-7629bd801d3e#.s6ibs85pt), e adivinha? Resolvi testar o React. Tá bom, agora é sério, parei aqui.

No post, Diego Eis fala sobre umas vídeo-aulas que ele viu, do Matheus Lima, no [jscasts](http://jscasts.teachable.com/p/comecando-com-react-js) e aí eu resolvi dar uma olhada e seguir nesse projetinho me baseando nesse curso. Daí surgiu a [v1.0 do English Quiz](https://github.com/gabsprates/english-quiz/releases/tag/v1.0), que no fim das contas funcionou bem e meu trabalho foi um sucesso ~~apesar de eu não ter aplicado as melhores práticas no desenvolvimento~~. Confesso que pude perceber muito mais, ou talvez, realmente entendi *closures* fazendo esse trabalho.

Apesar do título desse post, eu não aprendi React em um dia. Na verdade, ainda não parei de aprender. Já li boa parte da documentação e implementei várias coisinhas de testes, mas cada vez que converso sobre, eu tenho uns momentos *mind blown*.

Exatamente por isso, estou reescrevendo esse projeto. Para isso, gastei uns dias das férias estudando, testando e tendo ótimos momentos de descoberta. Acho que alguns pontos são válidos de colocar aqui separadamente, então vamos lá.

## ES6, ES2015 or *whatever*

O primeiro deles, e na verdade o mais importante: **JavaScript e as novas *features* do ES6!**

Pode parecer clichê dizer isso, mas na verdade é a parte mais importante de todo o resto. Participar da tradução do [You Don't Know JS](https://github.com/cezaraugusto/You-Dont-Know-JS) tem me ajudado bastante, daí a base em JS eu até que já tinha, mas como falei, comecei pelas vídeo-aulas do Matheus Lima, e aquele curso era com **ES5**. Daí a aplicação, apesar de funcionando, ficou com uma carinha de "esse código poderia ser mais bonito e mais legível", daí parei pra olhar a documentação do React com mais carinho e mais tempo, vi os exemplos em **ES6** e fui logo procurar saber sobre as coisas que eu ainda entendia muito, como por exemplo: sistema de módulos e o `class` syntax sugar. Depois posso até fazer um post falando mais sobre o sistema de módulos, achei interessante, apesar de (até onde eu saiba) não ter nenhum navegador que implementou suporte (até a presente data).

Então, se você ainda não começou a usar, dá uma olhada na página do [Learn ES2015](http://babeljs.io/learn-es2015/), do site do Babel. ES6 é um ótimo amigo e já está ficando velho.

**:p**

## webpack

Já tentou usar o [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) mas percebeu que ele não gerava um bundle no diretório de ***output***? Eu percebi, achei que não prestava e achei que não tinha configurado direito, daí deixei pra lá... Até [{{ page.title }}]({{ post.url | prepend: site.baseurl }}) (#recursividade).

Sim, comunidades podem ajudar muito e exatamente por isso, leia as documentações e ajude. Aprendi a mexer com o [webpack](http://webpack.github.io/) assim, e entendi que o `webpack-dev-server` gera o bundle em memória, enquanto roda o servidor. Valeu o estudo porque agora posso usá-lo pra qualquer outra coisa, graças aos vários loaders e plugins! Vivendo e aprendendo. Esses links do webpack vão te levar para a documentação da versão 1, que foi a que eu usei, mas como recentemente foi lançada a versão 2, aconselho você olhar a [nova documentação](https://webpack.js.org/).

## React em si

Mais uma vez: leia documentações.

A do React é muito boa e dá ótimos exemplos e explicações. Se você tiver um tempinho pra dedicar a isso, será muito produtivo. Vídeo-aulas são bacanas, principalmente quando você está um pouco cansado para ler, mas a documentação é onde você acha os verdadeiros porquês por trás das coisas.

Entender como e quando usar `state` e `props` é fundamental. Entender os métodos `componentDidMount()` e `componentWillUnmount()` também são muito importantes para o [ciclo de vida](https://facebook.github.io/react/docs/state-and-lifecycle.html) do componente. E a melhor parte (pra mim) [pensar React](https://facebook.github.io/react/docs/thinking-in-react.html) e [pensar em composição](https://facebook.github.io/react/docs/composition-vs-inheritance.html) ajuda muito.

Estou refatorando a aplicação e (no presente momento) estou no [passo 3](https://facebook.github.io/react/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state) do processo de pensar em React. Quando estiver OK eu aviso, ok?

## Outras coisinhas

Por um motivo bobo, resolvi colocar o `border-radius` dos botões que estava criando com um número absurdo: `19941101px`. O resultado foi que descobri um break point na versão 50 do Firefox. O `border-radius` quebra em `17895698px`. Agora, por qual motivo alguém faria isso?

`¯\_(ツ)_/¯`

E o que mais? NodeJS e Express.js! Mas isso fica pra outro post. Sendo breve, aproveitei pra escrever uma API simples, com MVC, um CRUD básico e MongoDB pra armazenar as perguntas do quiz. Tá funcionando ~~hehe~~, mas já sei o que dá pra melhorar. Tá na lista.


## Conclusão

As férias da faculdade foram bem corridas, apertadas de serviço, e ótimas pra estudar outras coisas que não se vê na sala de aula. Estou feliz com esse progresso, fui até desafiado estudar Ionic2 e Angular2, mas deixa pra algum feriado prolongado aí.

Alguma dúvida? Algum comentário? Deixa aí embaixo, será um prazer trocar uma ideia.

Isso é tudo pessoal, até a próxima.

**(:**
