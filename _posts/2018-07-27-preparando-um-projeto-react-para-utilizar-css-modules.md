---
layout: post
title: Preparando um projeto React para utilizar CSS Modules
---

Com toda a evolução das tecnologias front-end, os processos de arquiteturar, criar e manter projetos saudáveis pode ser muito complicado. Um problema bem comum é manter o CSS de uma maneira escalável e sem efeitos colateráis, o que se torna um desafio a medida que o projeto cresce. Pensando nisso, e tomando proveito da ideia de componentes e modularização, surgiram algumas ideias para manter o CSS dentro de um escopo. Escopo dos componentes em questão.

O objetivo deste post é clarear o entendimento e uso de CSS Modules e sua implementação num projeto JavaScript com Webpack de forma geral. De quebra, com o estudo teremos o básico para um projeto React e CSS Modules, com suporte para SASS, que pode ser [clonado aqui](https://github.com/gabsprates/react-css-modules).

### CSS Modules

Talvez você já tenha visto falar em CSS-in-JS, styled-components, ou em CSS Modules, e vamos falar um pouco disso aqui. As ideias são basicamente para o mesmo resultado, mas não vou falar de bibliotecas JS que te fazem escrever CSS como objetos JS, nem que te fazem escrever uma string com _template literal_ para ser parseada depois (styled-components), o que faremos é configurar nosso projeto para escrever um CSS puro e bem escopado.

Como a própria documentação do [CSS Modules](https://github.com/css-modules/css-modules) diz, _um CSS Module é um arquivo de CSS no qual todas os nomes de classes e nomes de animações estão no escopo local, por default._

Isso é possível graças a especificação do [ICSS (Interoperable CSS)](https://github.com/css-modules/icss), que diz para o _loader_ como ele deve tratar os arquivos e o que retornará como módulo. Olhando de um nível mais alto, no fim das contas escrevemos o arquivo CSS e o _loader_ gera um objeto com os seletores mapeados em propriedades. Exemplo:

```scss
/* style.css */

.button {
  background: #333;
}
```

```javascript
// button.js

import styles from './style.css';

console.log(styles);
// { button: "button" }

const Button = () => (
  `<button class='${ styles.button }'>Click!</button>`
);
```

Isso nos permite ter um objeto de estilo específico para cada componente, com um escopo definido para ele. Se precisarmos utilizar o estilo de um componente em outro lugar, ou aproveitar um CSS global (ex.: grid, cores), o objeto de referência ainda será único e isso também faz com que não haja duplicidade.

Além de ter um módulo com escopo fechado e sem ambiguidades, podemos otimizar os nomes das classes, IDs e animaçes, e gerar um bundle de CSS ainda menor. Após configurar tudo e colocar para rodar, em desenvolvimento ou produção, o CSS gerado pode ser:

- injetado em tags `<style>`;
- extraído e servido em um arquivo `.css`

Nesse ponto, o DOM gerado no HTML terá o identificador de CSS correto, porque foi referenciado pelo objeto mapeado do respectivo módulo.

Para entender melhor, é necessário configurar algumas regras no bundler em questão, aqui vamos usar o [Webpack](https://webpack.js.org/).

### Configuração do Webpack

Devemos inserir uma regra na configuração do Webpack para ler os arquivos CSS e deixar os _loaders_ realizarem seu trabalho:

```javascript
// webpack.config.js

module.exports = {
  entry: [ ... ],
  output: { ... },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ ... ]
      }
    ]
  }
};
```
Os _loaders_ necessários são:

- [`css-loader`](https://github.com/webpack-contrib/css-loader): para habilitar o uso dos CSS Modules;
- [`style-loader`](https://github.com/webpack-contrib/style-loader): para injetar o CSS na página.

Ambos tem opções necessárias e interessantes, veja a seguir.

#### `css-loader`

Instalação:

```bash
npm install --save-dev css-loader
```

Regra:

```javascript
{
  loader: "css-loader",
  options: {
    modules: true,
    localIdentName: "[sha1:hash:7]"
  }
}
```

- `modules`: habilita/desabilita os CSS Modules;
- `localIdentName`: configura a identidade (classe, ID, _animation name_) gerada pelo _loader_.

O `localIdentName` pode ser configurado de algumas formas, que estão [disponíveis aqui](https://github.com/webpack/loader-utils#interpolatename).

Com a configuração acima, o exemplo anterior do `.button` irá gerar o objeto `{ button: "_38782ef" }`. Assim, o seletor CSS da classe `.button` será, no output, `._38782ef`. Isso otimiza bastante o tráfego de informações quando temos um nome muito grande como, por exemplo, a proposta do BEM.

Para mais configurações, [veja a documentação](https://github.com/webpack-contrib/css-loader#options).

#### `style-loader`

Instalação:

```bash
npm install style-loader --save-dev
```

Regra:

```javascript
{
  loader: "style-loader",
  options: {
    singleton: true
  }
}
```

Nesta configuração, todo o CSS gerado será injetado por apenas uma tag `<style>`. Na configuração _default_ do `style-loader`, ele cria uma tag `<style>` para cada módulo CSS. 

Para mais configurações, [veja a documentação](https://github.com/webpack-contrib/style-loader#options).

#### Configuração final para CSS injetado na página

Com as devidas configurações, o `webpack.config.js` ficará assim:

```javascript
module.exports = {
  entry: [ ... ],
  output: { ... },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader", ... },
          { loader: "css-loader", ... }
        ]
      }
    ]
  }
};
```

Segundo a documentação do Webpack sobre a [cadeia de múltiplos loaders](https://webpack.js.org/configuration/module/#rule-use) (apesar de não ser o assunto em questão, fica a dica), o resultado do `css-loader` deve ser processado pelo `style-loader`, por isso vem depois. _"Last to first configured"_.

#### Configuração final para CSS extraído em arquivo

Para extrair o CSS gerado, é preciso utilizar um plugin que extrai texto de um ou mais _bundles_. O [Extract Text Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) é bastante usado, mas recomendam o [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) para extrair arquivos CSS e, por isso, será usado aqui.

Instalação:

```bash
npm install --save-dev mini-css-extract-plugin
```

E a configuração do webpack ficará assim:

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: [ ... ],
  output: { ... },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", ... }
        ]
      }
    ]
  }
}
```

E nesse caso, o `style-loader` não é necessário. Ele deve ser utilizado como _fallback_ caso utilize o Extract Text Plugin.

Agora basta colocar um `<link />` no `index.html` com o caminho para o `style.css`, considerando o [`publicPath`](https://webpack.js.org/configuration/output/#output-publicpath).

#### Utilizando SASS

Para projetos que utilizam SASS, basta alterar a regra do `/\.css$/` para `\.s[ca]ss$/` e adicionar o `sass-loader` depois do `css-loader`.

Instalação:

```bash
npm install sass-loader node-sass webpack --save-dev
```

E a configuração ficará assim:

```javascript
{
  test: /\.s[ca]ss$/,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    { loader: "css-loader", ... }
    { loader: "sass-loader", ... }
  ]
}
```

Para opções de configuração, veja a [documentação do `node-sass`](https://github.com/sass/node-sass#options).

## Dicas

### Integrando com React

O conceito de CSS Modules não é restrito ao uso com React, mas combina muito bem. Tudo que você precisa fazer, após finalizar o setup do projeto, é importar o módulo de CSS e utilizar no `className` do componente, bem parecido com o primeiro exemplo deste artigo.

Para configurar um projeto React do zero, siga este tutorial: [Creating a React App... From Scratch.
](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)

### TypeScript + CSS Modules

Caso tenha um projeto que utilize TypeScript e deseja utilizar CSS Modules, será necessário um conjunto de tipos das respectivas classes de CSS. O _loader_ [typings-for-css-modules-loader](https://github.com/Jimdo/typings-for-css-modules-loader) faz esse trabalho. Ela deve ser utilizada no lugar do `css-loader` e irá gerar um arquivo `.d.ts` para os arquivos CSS do projeto.

## Conclusão

Tudo o que foi feito aqui será usado para um outro post, com mais detalhes sobre a utilização de CSS Modules com React. Se liga no _feed_!

Deixe um comentário, ou vá no repositório desse projeto no GitHub e abra uma issue. Vamos discutir o problema ;)