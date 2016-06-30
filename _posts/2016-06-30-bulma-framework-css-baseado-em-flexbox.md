---
layout: post
title:  "Bulma: framework CSS baseado em flexbox"
---

Este artigo foi originalmente postado no [Tableless](tableless.com.br/bulma-framework-css-baseado-em-flexbox/) no dia 28 de junho de 2016.

---

> "Inspirado pelo Bootstrap, o Bulma visa oferecer a todos a alegria de fazer o design do site, com a simplicidade do flexbox e a elegância de Sass." - [Jeremy Thomas](http://jgthms.com/), criador do projeto Bulma.io.

Como o título diz, o [Bulma](http://bulma.io/) é um framework CSS baseado na tecnologia flexbox, que já tem uma grande [compatibilidade](http://caniuse.com/#search=flexbox) entre os navegadores. O pacote contém todos os elementos mais comuns como botões, formulários, menus, tabelas, títulos, notificações, barras de progresso e um simples sistema de grid (basta adicionar uma coluna, o resize das colunas é automático).

Vou mostrar alguns exemplos para que você possa entender o poder do Bulma.

Primeiramente, faremos a instalação que não precisa de nada mais que um link para o arquivo de estilos do Bulma:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.0.26/css/bulma.css">
```

Claro que você pode baixar e deixar no seu diretório local, e também baixar com o NPM: `npm install bulma`; mas o que quero mostrar é que tudo que você precisa é apenas de um arquivo de CSS.

Baixando com o NPM você terá como personalizar facilmente com SASS.

O Bulma não vem com nenhum pacote de icon-fonts acoplado, então, caso você pretenda usar algum, como o Font Awesome, você deve inserí-lo também.

## O Grid
Lembrando: como o Bulma foi baseado no Bootstrap, uma das semelhanças é o sistema de grid com 12 colunas.

Como falei, o grid funciona de forma muito simples. Tudo que você precisa é ter uma `div` com a classe `.columns` e suas filhas `.column`, como no exemplo abaixo:

```html
<div class="columns">
  <div class="column">.column</div>
  <div class="column">.column</div>
  <div class="column">.column</div>
  <div class="column">.column</div>
</div>
```

Você pode entender melhor como funciona com [esse exemplo](http://codepen.io/gabsprates/full/PNVJrP/).

Mas e se você quiser que uma coluna ocupe o espaço de duas? Ou três? Ou quatro? Simples!!!

Podemos utilizar as classes `is-2`, `is-3`, `is-4`, `is-5`, `is-6`, `is-7`, `is-8`, `is-9`, `is-10` e `is-11` para especificar qual a área ocupada pela `.column`.

Para entender melhor, aconselho a dar uma olhada [neste](http://bulma.io/documentation/grid/columns/) e [neste](http://bulma.io/documentation/grid/tiles/) links.

## Hero
Você já teve problemas com alinhar elementos verticalmente ao centro? O Bulma é um verdadeiro herói para essas situações! Veja este exemplo:

```html
<section class="hero is-large">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Título
        </h1>
        <h2 class="subtitle">
          Exemplo do uso do hero
        </h2>
      </div>
    </div>
  </section>
```

Aqui o Bulma centraliza os títulos na vertical, qualquer conteúdo seria alinhado também. [Clique aqui](http://bulma.io/documentation/layout/hero/) mais exemplos.

## Level
Por último, quero falar um pouco sobre as navbars. Veja esse código:

```html
<nav class="level">
    <p class="level-item has-text-centered">
      <a class="link is-info">Home</a>
    </p>
    <p class="level-item has-text-centered">
      <a class="link is-info">Menu</a>
    </p>
    <p class="level-item has-text-centered">
      <img src="http://bulma.io/images/bulma.png" alt="" style="height: 33px;">
    </p>
    <p class="level-item has-text-centered">
      <a class="link is-info">Reservations</a>
    </p>
    <p class="level-item has-text-centered">
      <a class="link is-info">Contact</a>
    </p>
  </nav>
```

Ele gera uma navbar em que os elementos são divididos com a largura igual e com alinhamento vertical no centro, mesmo com imagem ou até mesmo um `form`, ele manteria esse alinhamento.

Veja mais [aqui](http://bulma.io/documentation/components/level/).

## Enfim...
Estes foram alguns exemplos do poder do Bulma mas há muito mais que você pode conferir na própria [documentação do projeto](http://bulma.io/documentation/overview/start/).

Existem vários componentes legais, como cards, menus, paginação, mensagens, e várias outras coisas fáceis de usar e simples de compreender.

Isso é tudo pessoal (:
