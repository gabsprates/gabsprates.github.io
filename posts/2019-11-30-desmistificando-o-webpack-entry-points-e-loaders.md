---
layout: post
title: "Desmistificando o webpack: entry points e loaders"
---

É muito comum se ver perdido em um arquivo de configuração do webpack, principalmente se não tiver muita experiência com _bundlers_ ou _task runners_. Acredito que quanto mais se entende do funcionamento de alguma coisa, mais fácil fica de lidar com ela. Esta série de artigos vai focar nos _core concepts_ do webpack e tentar clarear como as coisas funcionam.

## A long time ago...

Antes de mais nada, ainda estamos em 2019 e sim, acho que contar um pouco sobre como chegamos aqui. Caso você se sinta confortável com essa parte "histórica", pode pular para a próxima seção.

Se voltarmos um pouco no tempo, chegaremos numa época em que se criava um grande arquivo `.js`, com todo o código da aplicação, e se colocava a respectiva tag `<script>` na página. Muitas vezes, acompanhado do jQuery. Ok, e se fossemos usar um plugin do jQuery, uma _lib_ de _date picker_? Aí seria preciso colocar mais uma `<script>` na página com essa tal _lib_. Até parece um pouco de _code splitting_ mas calma, chegaremos lá.

Avançando um pouco no tempo, veio o Node.js e conseguimos o poder de criar arquivos JS separados, ou módulos (o que ajudou muito na organização e reutilização de código), pra juntar tudo depois em um único **bundle** final. Também surgiram os pré-processadores de CSS, que juntavam vários arquivos de estilo em um bundle final. Surgiram também ferramentas para automatizar essas tarefas de _build_, como gulp e grunt. Até que surgiram ferramentas que poderiam centralizar todas as tarefas e, talvez o mais importante, juntar todas as peças. É aí que entra o [webpack](https://webpack.js.org/concepts/).

## O webpack

O webpack é um empacotador de módulos (ou _module bundle_), que se baseia em pontos de entrada (**_entry points_**) e, a partir deles, cria um **grafo** de suas respectivas **dependências**. Aqui começa a graça.

Para o webpack, um **módulo é qualquer coisa que seja importada**, por exemplo: uma URL em uma regra de CSS, o atributo `src` de uma imagem, uma chamada da função `require()`, ou um `import` explícito. O problema é que, nativamente, o webpack só interpreta conteúdo JavaScript e JSON. Por este motivo existem os **_loaders_** nas configurações. Um _loader_ vai dizer como aquele determinado tipo de arquivo deve ser processado e assim, passado para frente, seja para um próximo _loader_, ou para o próprio webpack continuar o processo de _build_. Durante este processo, o webpack emite alguns _hooks_ de eventos, que são utilizados pelos **_plugins_** para a execução de várias outras tarefas durante o processo. Isso tudo irá gerar os **_outputs_**, que é o que queremos.

Esta é uma visão bem geral de como o webpack funciona. Falamos de algumas coisas muito importantes aqui e podemos aprofundar um pouco para entender mais de alguns detalhes. No momento, vamos focar em: _entry points_ e _loaders_.

### entry points

O webpack se propõe a ser um _module bundle_ que não precisa de configurações e, para isso, adota várias configurações _default_. O _entry point_ padrão é `./src/index.js` e isso significa que todas as dependências do projeto serão mapeadas a partir desse arquivo. Adiantando um pouco a história, no final do processo de _build_, será gerado o arquivo `./dist/main.js` (outra configuração padrão) como _output_, com todo o código do projeto. O legal é que o _entry point_ pode ser composto por um ou mais arquivos, assim como o _output_. É possível:

```js
// webpack.config.js
const config = {
    // definir um novo arquivo como entry point:
    entry: "./caminho/do/arquivo.js"

    // ou definir alguns arquivos como entry points:
    entry: [
        "./caminho/do/arquivo_01.js",
        "./caminho/do/arquivo_02.js",
        "./caminho/do/arquivo_03.js"
    ]
}
```

Definindo o _entry point_ dessa forma, automaticamente também se define o **_chunk_** `main`, por isso o _output_ gerado se chama `main.js`. Por hora, basta saber que _chunk_ é um termo usado internamente para gerenciar o processo de build. Uma outra configuração possível de _entry points_ é definir um objeto com os _chunks_ e seus respectivos pontos de entrada:

```js
// webpack.config.js
const config = {
    entry: {
        // definir o chunk home
        home: "./caminho/do/arquivo/home.js"

        // definir o chunk contato
        contato: "./caminho/do/arquivo/contato.js"

        // definir o chunk produtos
        produtos: [
            "./caminho/do/arquivo/produto_01.js",
            "./caminho/do/arquivo/produto_02.js",
            "./caminho/do/arquivo/produto_03.js"
        ]
    }
}
```

Com a configuração acima, os três _chunks_ (`home`, `contato` e `produtos`) resultam em três arquivos de _output_: `dist/home.js`, `dist/contato.js` e `dist/produtos.js`. É bom ressaltar que estes são os pontos de entrada dos _chunks_ e que cada um deles terão suas respectivas dependências, compartilhadas ou não. _Chunks_ são um assunto muito extenso e não tão simples, prefiro deixar mais detalhes para um post posterior.

Pensando em uma aplicação web, em algum momento teremos um arquivo de estilo (CSS, SASS/SCSS, LESS, etc.) que pode ser importado em algum módulo, ou definido como um outro _entry point_. É aqui que precisamos falar sobre _loaders_.

### loaders

Como foi dito acima, o webpack só "entende", por padrão, arquivos JavaScript ou JSON e, apesar de se propor a funcionar sem configurações, caso o projeto tenha qualquer _source_ além de JS, precisamos colocar a mão na massa. Por esse motivo, ao encontrar algum arquivo com um conteúdo diferente (como TypeScript, SASS, JSX, etc.), o webpack emite um erro semelhante a este:

```bash
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
```

**You may need an appropriate loader to handle this file type.** A primeira coisa a se observar é "_this file type_". Vamos tomar como exemplo um arquivo SASS. Se o webpack só entende JS e JSON, como transformar um módulo SASS em um módulo JS? Bom, nesse ponto já tivemos _spoilers_... A resposta é: _loaders_!

Para o tipo de arquivo em questão, SASS, precisamos do chamado [`sass-loader`](https://github.com/webpack-contrib/sass-loader). Preparando um pequeno ambiente, para entender cada passo, temos a seguinte configuração, que diz para o webpack como processar esses arquivos:

```js
// webpack.config.js
module.exports = {
  // definimos um arquivo SCSS como entrypoint
  entry: "./style.scss",

  // definimos as regras de configuração dos módulos
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["./debug", "sass-loader"]
      }
    ]
  }
};

// debug.js
module.exports = source => {
  console.log(source);
  return source;
};
```

```scss
// style.scss
$color: #f00;
body {
  background: $color;
}
.bold {
  font-weight: bold;
}
```

`debug.js` é um _loader_ que nos mostra o conteúdo processado e passa ele para frente. E só.

A mensagem `Module parse failed: ...` seria exibida caso não houvesse o _loader_ para SASS. Já que ele está configurado, o conteúdo do módulo exibido pelo `debug.js` é:

```css
body {
  background: #f00; }

.bold {
  font-weight: bold; }
```

É um módulo processado, mas ainda não é JavaScript e o webpack ainda não pode seguir com o _build_. O próximo passo é encadeiar mais um _loader_, da mesma forma que o `debug.js`, o [`css-loader`](https://github.com/webpack-contrib/css-loader):

```js
use: ["./debug", "css-loader", "sass-loader"];
```

Este é um bom momento para ressaltar a importância da ordem dos _loaders_. Eles são resolvidos do último para o primeiro, em cadeia. Assim:

```
                                                   o módulo
                                                 é encontrado:
                                                "./style.scss"
                                                      |
                                                      ↓
"./debug"      <-      "css-loader"      <-      "sass-loader"
 |         o conteúdo                o conteúdo
 |        processado é              processado é
 |         passado pra               passado pra
 |           frente                    frente
 |
 ↓
o último loader manda o
conteúdo para o webpack
```

O resultado da atual cadeia de _loaders_ é:

```
exports = module.exports = require("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.id, "body {\n  background: #f00; }\n\n.bold {\n  font-weight: bold; }\n", ""]);
```

Os _loaders_ podem ter opções de configuração, como os que usamos, que podem ser descritas em um objeto da seguinte forma:

```js
use: [
  "./debug",
  {
    loader: "css-loader",
    options: {
      modules: true
    },
  }
  "sass-loader"
];
```

Agora temos um módulo JS que pode ser usado pelo webpack, ou algum outro _loader_, como [`style-loader`](https://github.com/webpack-contrib/style-loader), ou [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin), se necessário.

Sabendo desse funcionamento dos _loaders_, temos o poder de personalizar o processamento de qualquer tipo de arquivo. Caso o projeto só tenha JavaScript e JSON, compatíveis com a versão do Node.js que serão executados, não é preciso configurar nenhum _loader_, pois é só JS e já será suportado pelo Node.js. Caso utilize uma versão do JS incompatível com a versão do Node.js, será necessário um _loader_ para transpilar o JS ([`babel-loader`](https://github.com/babel/babel-loader), por exemplo) para uma versão compatíveis.

Um outro exemplo muito importante e comum, é um arquivo JSX de uma aplicação React. As tags HTML, e outros detalhes de sintaxe precisam ser processados. Nesse caso, este também é um trabalho para o `babel-loader`, no qual podemos configurar _presets_ e _plugins_ para interpretar o código e gerar uma versão do JS específica. Vale fazer o teste do Babel com nosso _loader_ personalizado de _debug_, uma forma simples de ver o conteúdo que está sendo gerado.

## A estrada é longa

Ainda existem várias outras coisas que fazem parte do processo de _build_ do webpack, mas é melhor deixar para outro post. Adianto que vamos falar sobre _plugins_, _output_, _code splitting_, _chunks_ e outras coisas. No momento, concentre-se em entender os _entry points_ e _loaders_. Faça testes e releia se precisar.

Qualquer dúvida, deixe nos comentários, será um prazer ajudar.

Até a próxima!

(:

---

### Referências

- https://webpack.js.org/concepts/
