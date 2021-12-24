---
layout: post
title: "Que não vai padronizar, o quê?!"
description: "Adotar padrões pode parecer chato no início, mas é a melhor opção para manter o código legível e fácil de manter."
date: 2016-08-07 17:54:40 -0300
---

> Baaam!

Adotar padrões pode parecer chato no início, mas é a melhor opção para manter o código legível e fácil de manter. Talvez, não exista nada pior que um código mal formatado, com identações malucas (com tabulações e espaços juntas), funções com nomes escritos de forma aleatória e sem sentido, e vários outros problemas que dificultam a leitura, não somente de terceiros, mas do próprio autor do código depois de uma semana.

Pensando nisso, foram desenvolvidos os guias de estilo de código. Geralmente, as comunidades de linguagens desenvolveram seus padrões, até mesmo para facilitar a vida dos desenvolvedores, e até mesmo na construção de frameworks. A ideia desse post é apresentar alguns dos padrões que conheço, então se você conhece algum outro, deixe nos comentários.

Ah, antes de continuar, é bom lembrar que algumas empresas tem seus próprios *Style Guides*, então é sempre bom passar saber se na sua tem algum. #FicaADica

Por padrão, vamos por ordem alfabética. (:


## C
Um dia, em uma aula de Estrutura de Dados, fiquei curioso pra saber se existia algum guia para a [linguagem C](https://pt.wikipedia.org/wiki/C_(linguagem_de_programa%C3%A7%C3%A3o)) e fiquei contente em encontrar pelo menos 2. São eles:

  * [Apache Developers&apos; C Language Style Guide](https://httpd.apache.org/dev/styleguide.html)
  * [NASA - C Style Guide](http://homepages.inf.ed.ac.uk/dts/pm/Papers/nasa-c-style.pdf)

Não encontrei uma fonte oficial do guia da NASA, mas mesmo assim vale a pena dar uma olhada, é um material bacana.


## CSS
[CSS](https://pt.wikipedia.org/wiki/Cascading_Style_Sheets) é sem dúvidas umas das coisas mais legais pra mim. Por ser fácil de começar brincar com CSS, a chance de se encontrar um código bagunçado é muito alta. Existem alguns guias para ajudar a deixar seu código mais estiloso:

  * [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.xml)
  * [jQuery - CSS Style Guide](http://contribute.jquery.org/style-guide/css/)
  * [Primer - GitHub CSS Style Guide](http://primercss.io/)
  * [WordPress CSS Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/css/)

Alguns deles falam sobre HTML também, por isso não vou colocar uma seção específica pra HTML aqui.

Existem algumas técnicas muito legais também. Talvez você já tenha ouvido falar em SMACSS, BEM, OOCSS, e por aí vai. Recomendo o post do [Jean Carlo Emer](https://twitter.com/jcemer): [OOCSS, SMACSS, BEM, DRY CSS: afinal, como escrever CSS?](http://tableless.com.br/oocss-smacss-bem-dry-css-afinal-como-escrever-css/).


## JavaScript
Por ser a linguagem que está dominando o mundo, o [JavaScript](https://pt.wikipedia.org/wiki/JavaScript) tem vários *Style Guides*, e quando digo 'vários', é porque tem muitos mesmo. Vou citar os mais comuns pra mim:

  * [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
  * [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
  * [jQuery - JavaScript Style Guide](https://contribute.jquery.org/style-guide/js/)
  * [npm-coding-style](https://docs.npmjs.com/misc/coding-style)

Preciso fazer um gancho pra um projeto sobre JS. Se você não sabe JS, ou acha que não sabe, dê uma lida na [série de livros *You Don&apos;t Know JS*](https://github.com/cezaraugusto/You-Dont-Know-JS). Caso você já saiba ou se sente seguro sobre grande parte da linguagem, nos ajude a terminar essas traduções (:


## PHP
Com certeza, [PHP](https://pt.wikipedia.org/wiki/PHP) é uma das linguagens com uma das comunidades mais ativa, e particularmente, uma das minhas linguagens preferidas. Aqui estão alguns guias bacanas:

  * [CodeIgniter - PHP Style Guide](http://www.codeigniter.com/user_guide/general/styleguide.html)
  * [PSR-2: Coding Style Guide](http://www.php-fig.org/psr/psr-2/)
  * [WordPress - PHP Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/)

Existe o [PHP-FIG (PHP Framework Interoperability Group)](http://www.php-fig.org/), que cuida das PSRs (PHP Standard Recommendation), padrões gerais para se trabalhar com PHP. É um trabalho muito interessante e eu recomendo que você dê uma olhada em todas as PSRs.


## Python
Não tenho muito para falar de [Python](https://pt.wikipedia.org/wiki/Python) por não conhecer muito, mas sei que existe o tal da [PEP 8 -- Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/), que é um guia de estilo da própria linguagem. Acho que já uma boa referência.


## Ruby
Comecei estudar a [linguagem Ruby](https://pt.wikipedia.org/wiki/Ruby_(linguagem_de_programa%C3%A7%C3%A3o)) há algum tempo e achei muito bonita. Estou seguindo o *style guide* do GitHub, mas encontrei outro aqui também, então aqui estão os links:

  * [GitHub - Ruby Styleguide](https://github.com/styleguide/ruby)
  * [Ruby Hacking Style Guide](https://ruby-hacking-style-guide.github.io/)

---

Alguns desses guias se divergem, outros são bem parecidos, mas isso é bom, dá pra pegar o melhor de cada um.

Não falei de algum que você gosta, ou deixei de falar de alguma linguagem que você conhece e sabe que tem um *style guide* bacana? Deixe nos comentários, será um prazer aprender contigo!

Espero ter ajudado (:

Até a próxima.
