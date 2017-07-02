---
layout: post
title:  "Exceções e Erros em JavaScript"
---

Com o objetivo de tratar exceções e controlar erros, em tempo de execução, algumas linguagens implementam alguns mecanismos interessantes, como por exemplo [Go](https://golang.org/), que você pode trabalhar com funções de retornos múltiplos para passar erro e dados em caso de sucesso; e [Bash](https://www.gnu.org/software/bash/) que se trata erros quando o `exit` do programa é maior que zero `0`, já que zero significa sucesso, sem falar no "_exception_" de comandos encadeados com `&&`. Agora vamos falar sobre como JavaScript faz isso.

Bom, pra começar, as exceções são utilizadas como uma forma de _feedback_, para cógido saber o que fazer quando cair numa situação de erro. Agora você precisa entender que os [_statements_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements) (declarações, ou "comandos") e os objetos citados aqui são coisas **separadas**, apesar de **funcionar em conjunto**. Mais precisamente, vamos falar sobre 3 coisas:

* Objetos do tipo `Error`

* o `throw`

* e o bloco `try...catch`

_So, let's go there!_

## Objetos do tipo _Error_

Sabe quando o console te mostra algum erro de sintaxe, ou um erro de referência, falando que uma variável ou função não existe? Aquelas mensagens esquisitas são dos objetos de `Error`. Basicamente, esses objetos tem seu prototype composto pelos seguintes itens:

* `.constructor`: que inicializa os objetos, é chamado quando se instancia com o `new`, ou apenas chamando como função `Error()`;

* `.message`: a mensagem de erro, que é passada como primeiro argumento do construtor;

* `.name`: o tipo do erro. Ex.: "_Error_", "_ReferenceError_";

* `.toString()`: herdado do `Object.prototype.toString()` e retorna o valor de `.message`.

Ok, como eu disse, a propriedade `.name` especifica o tipo do Erro. Vamos dar uma olhada nos erros **nativos** e quando aparecem:

* ***EvalError***: lançado quando a função `eval()` lança algum erro;

* ***RangeError***: lançado quando encontra algum valor não está dentro do intervalo permitido;

* ***ReferenceError***: lançado quando uma referência inválida é detectada;

* ***SyntaxError***: lançado quando existe algum erro no _parse_, no momento que a _engine_ lê o código para interpretá-lo;

* ***TypeError***: lançado quando um parâmetro de uma função não é do tipo desejado;

* ***URIError***: lançado quando alguma operação de URI, `encodeURI()` ou `decodeURI()`, recebem parâmetros inválidos.

Bom, este são os erros nativos. Já que são extensões do objeto `Error`, nós também podemos criar nossos erros, para poder tratá-los da melhor forma possível. Exemplo:

```js
// Erro para regras de negócio
class BusinessError extends Error {
  constructor(msg) {
    super(msg);
  }

  // e podemos adicionar algum método específico
}
```

Ok, _next_!

## O "lançamento": _throw_

Okay. Reparou que falei dos erros serem lançados? É exatamente isso que acontece.

Durante a execução do programa, se houver algum tipo de inconsistência, dos tipos nativos de erro, ou se houver alguma situação que devemos avisar sobre erros, utiliza-se o `throw` para lançar "coisas" para que "alguém" faça algo com essa coisa.

Eu disse lançar "coisas" porque você pode lançar qualquer coisa, dentre elas, objetos de erro. Por exemplo:

```js
// lançar um erro de negócio, com nossa classe `BusinessError`
throw new BusinessError('CPF inválido');


// lançar uma string de erro
throw "Erro: foo";


// lançar o status de erro HTTP
throw 404;


// lançar objetos literais
throw {
  message: "Erro: bar",
  toString: function() {
    return this.message;
  }
};


// lançar funções
throw function() { /* ¯\_(ツ)_/¯ */ }
```

Não digo que lançar coisas que não sejam objetos de erro seja algo comum, nem que é uma boa prática, mas existe a possibilidade de fazer isso e é bom saber.

Beleza, deu pra entender a função do `throw`? Em poucas palavras, ele lança (ou "joga") o erro para a estrutura de controle, e é dela que vamos falar agora.


## O bloco _try..catch_

Enquanto se _tenta_ executar determinado trecho de código, pode ser que tenhamos erros que quebram o fluxo e todo o programa, não é mesmo? Para resolver esse problema, podemos tratar alguns erros no caso de ***falha*** durante a ***tentativa***. Por isso, utilizamos o `try..catch`.

A responsabilidade desta estrutura é **tentar executar algo** e, caso dê algum problema durante a execução, **pegar os erros** e tratá-los da forma mais adequada possível.

Então:

> O `catch` é quem pega as coisas lançadas pelo `throw` dentro do bloco `try`

Para entender melhor:

```js

// "Tentamos" executar algo
try {

  /* ... */

  // Caso haja algum erro que precise de tratamento (ex.: de negócio)
  if ( !usuario.permissao ) {

    // "Lançamos" um objeto de erro para o `catch`
    throw new BusinessError("Acesso não autorizado");

  }

  /* ... */

// O `catch` "pega" qualquer coisa lançada no `try`, através do `throw`
} catch (err) {

  // e fazemos o que precisar com isso
  alert(err.message);

}

```

Lembre o seguinte: qualquer erro nativo também é lançado e cairá no `catch`.


### _finally_!!!

O bloco `try..catch` também permite a execução de coisas no fim da execução do bloco, tendo sucesso ou caindo no `catch`. Para isso, utilizamos o bloco `finally`. Exemplo:

```js

try {

  // throw:
  // ┻━┻ ヘ╰( •̀ε•́ ╰)

} catch (e) {

  // ╰( ⁰ ਊ ⁰ )━☆ﾟ.*･｡ﾟ

} finally {

  // Sempre executa ao finalizar o `try` ou o `catch`
  // É um bom lugar pra executar coisas como:
  //  * fechar uma transação com o DB;
  //  * fechar arquivos que foram abertos para leitura;
  //  * atualizar o estado da view;

}

```

### Observação

Este mecanismo de tratamento de erros em tempo de execução (com `try..catch..finally` e `throw`) também é adotado por outras linguagens. Podemos citar PHP e Java como exemplo e cada uma delas tem seus objetos de erro específicos. JavaScript utiliza os objetos do tipo `Error`, PHP e Java tem seus objetos de `Exception`, que servem pra mesma coisa.


## Por fim

Bom, resolvi escrever este post porque eu achei sempre achava um post falando sobre o `try..catch`, outro falando sobre o `throw`, mas não tinha visto algum que explicava a coisa como um todo.

Então, fui claro? Deu pra entender a interação desses elementos?

Se tive alguma dúvida, ou se algo não ficou claro, ou se algo do que falei está errado, deixe um comentário ou me chame no twitter, será um prazer.

Até a próxima

(:

---

## Referências

* Error Objects - [http://www.ecma-international.org/ecma-262/7.0/index.html#sec-error-objects](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-error-objects)
* ECMAScript Language: Statements and Declarations - [http://www.ecma-international.org/ecma-262/7.0/index.html#sec-ecmascript-language-statements-and-declarations](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-ecmascript-language-statements-and-declarations)
* Error - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
* throw - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)
* try...catch - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
* try...catch...finally Statement (JavaScript) - [https://docs.microsoft.com/en-us/scripting/javascript/reference/try-dot-dot-dot-catch-dot-dot-dot-finally-statement-javascript](https://docs.microsoft.com/en-us/scripting/javascript/reference/try-dot-dot-dot-catch-dot-dot-dot-finally-statement-javascript)
* throw Statement (JavaScript) - [https://docs.microsoft.com/en-us/scripting/javascript/reference/throw-statement-javascript](https://docs.microsoft.com/en-us/scripting/javascript/reference/throw-statement-javascript)
* Error Object (JavaScript) - [https://docs.microsoft.com/en-us/scripting/javascript/reference/error-object-javascript](https://docs.microsoft.com/en-us/scripting/javascript/reference/error-object-javascript)
