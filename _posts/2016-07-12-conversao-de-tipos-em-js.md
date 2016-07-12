---
layout: post
title:  "Conversão de tipos em JavaScript"
---

Um dia desses eu recebi um quebra-gelo no Telegram, com o seguinte:

```js
Number(null);	// 0
null == 0;	// true né?
```

De cara eu pensei que seria `false`, mas fiz questão de rodar no console e ver no que dava. Claro que deu `false`. Mesmo assim, quis entender o motivo de `Number(null)` retornar `0` e fui procurar na [documentação](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-type-conversion) do ECMAScript 6, ou ECMAScript 2015.

O JavaScript, ou ECMAScript, tem um conjunto de operações abastratas que ocorrem por baixo dos panos. Dentre estas operações, temos as conversões de tipos (*Types Conversions*), que é executada sempre que necessário - que é justamente o caso do `Number(null)`.

Existem várias operações abstratas de conversão de tipos em JS, mas vou abordar apenas as mais comuns.

### ToPrimitive

Praticamente tudo em JS é tratado como um objeto, então a conversão *ToPrimitive* transforma o *input* para o seu devido tipo primitivo, isto é, retorna o valor sem ser um objeto. Talvez seja um pouco óbvio e muito comum, mas é interessante ver no console. Primeiro vejamos os tipos primitivos:

```js
// Tipos primitivos
String('foo');      // 'foo'
Number(2016);       // 2016
Boolean(true);      // true
```

Agora, já que temos objetos pra quase tudo em JS, veja o retorno ao rodar no console do Chromium/Chrome:

```js
// Tratando como objetos
new String('foo');
// String {0: "f", 1: "o", 2: "o", length: 3, [[PrimitiveValue]]: "foo"}

new Number(2016);
// Number {[[PrimitiveValue]]: 2016}

new Boolean(false);
// Boolean {[[PrimitiveValue]]: false}
```

Veja que os objetos sempre guardam o valor primitivo, que é retornado por baixo dos panos quando precisamos utilizar o valor para alguma outra operação, como por exemplo:

```js
var ano = new Number(2016);
ano + 1; // 2017

var str = new String('foo');
str.concat(' bar'); // 'foo bar'
```

Para converter valores do tipo `Object`, é feita uma análise de qual o valor primitivo do objeto, por exemplo:

```js
// `Object(2010)` retorna o valor primitivo do objeto `Number`,
// nesse caso, 2010
Object(2010) + 6;   // 2016

// `Object('foo')` retorna o valor primitivo do objeto `String`,
// nesse caso, 'foo'
Object("foo").concat(' bar');   // 'foo bar'

// `Object(true)` retorna o valor primitivo do objeto `Boolean`,
// nesse caso, true
Object(true) && false;  // false
```


### ToNumber

A operação abstrata *ToNumber* transforma a entrada em um tipo numérico, e é aqui que entramos naquele exemplo do `Number(null)`.

A conversão para valores numéricos funciona basicamente com as seguintes regras:

```js
// Estas regras estão definidas no ECMAScript
Number(undefined);  // NaN
Number(null);       // +0
Number(true);       // 1
Number(false);      // +0
```

Então, por regra, é por isso que Number(null) retorna 0, e isso não siginifica que `null == 0`, já que são valores primitivos diferentes.

Mas e quanto a conversão de *string* para *number*, `Number("2016")`?

Para fazer a conversão de uma string, o *ToNumber* tenta interpretar a string na codificação **UTF-16** e caso não consiga, retorna `NaN`, assim:

```js
Number("2016");       // 2016
Number("20.16");      // 20.16
Number("-0");         // -0
Number("+Infinity");  // +Infinity
Number("++Infinity"); // NaN
Number("201 6");      // NaN
Number("foo");        // NaN

// Para objetos, o retorno é correspondente ao
// valor primitivo do tipo do objeto
Number(Object(2016))  // 2016
Number(Object("21"))  // 21
Number(Object("foo")) // NaN
```


### ToBoolean

A operação abstrata *ToBoolean* transforma a entrada em um tipo booleano, que assim como o *ToNumber*, segue algumas regras. Vamos lá:

```js
!!undefined;        // false
!!null;             // false
!!Number(+0);       // false
!!Number(-0);       // false
!!Number(NaN);      // false

// Qualquer outro valor numérico retorna true
!!Number(21);       // true

// String retorna `false` se estiver vazia,
// caso contrário, retorna `true`
!!String("");       // false
!!String("foo");    // true

!!Object();         // true
```


### ToString

A operações abstratas *ToString* tem a função de transformar a entrada em uma *string*, e assim como as outras operações aqui descritas, também segue as suas regras de conversão, que são:

```js
String(undefined);      // "undefined"
String(null);           // "null"
String(true);           // "true"
String(false);          // "false"

// Para objetos, o retorno é correspondente ao
// valor primitivo do tipo do objeto
String(Object(2016))  // '2016'
String(Object("21"))  // '21'
String(Object(true))  // 'true'
String(Object(true))  // 'true'
String(Object())      // '[object Object]'
```

Para converter um `Number` para *string*, há uma série de considerações a se fazer, vou citar algumas. Tomando como base `String(Number(m))`:

```js
// 1. Se m for NaN:
String(Number(NaN)); // "NaN"

// 2. Se m for +0 ou −0:
String(Number(-0)); // "0"

// 3. Se m for menor que 0 (zero):
String(Number(-2016)); // "-2016"

// 4. Se m for +Infinity:
String(Number(+Infinity)); // "Infinity"

// 5. Para números muito grandes, muito pequenos,
// ou que tem alguma forma particular para serem
// representados como Number:
	Number(2345678987654321123456);	 // 2.3456789876543211e+21
 String(Number(2345678987654321123456)); // "2.3456789876543211e+21"
```

### ToObject
Por último, temos a *ToObject*, que transforma a entrada em um objeto, quando possível. Até aqui já tivemos a oportinudade de perceber esse tipo de conversão, já que alguns dos exemplos mostraram como *ToObject* funciona. O que acontece basicamente é que *ToObject* avalia o tipo primitivo da entrada e retorna um novo objeto daquele tipo, com o valor da entrada. Veja bem:

```js
Object(2016);	// Number {[[PrimitiveValue]]: 2016}
Object('foo');	// String {0: "f", 1: "o", 2: "o", length: 3, [[PrimitiveValue]]: "foo"}
Object(true);	// Boolean {[[PrimitiveValue]]: true}
```

Enfim, achei a resposta para o `Number(null)` retornar `0` e deu pra aprender um bocado. Recomendo que você dê uma olhada na [documentação do ECMAScript](http://www.ecma-international.org/ecma-262/6.0/index.html), existem várias outras operações abstratas interessantes.

Como curiosidade, olha só e tente adivinhar qual o resultado do último:

```js
Object(true);				// new Boolean(true)
Object(true) == Boolean(true);		// true
Object(true) == new Boolean(true);	// ??
```

O próprio `Boolean(true)` retorna o valor primitivo `true`, que faz com que o objeto gerado em `Object(true)` sofra uma conversão para o valor primitivo e assim fazer a igualdade. Já `new Boolean(true)` retorna um novo objeto, que na comparação `==` retorna `false`. Isso porque ao comparar dois objetos em JS, a comparação é para saber se os dois objetos são iguais. Faça o teste: `{} == {}`.

Bom... é isso. Espero que eu tenha sido claro, mas se você ficou com dúvidas, me mande um tweet, vamos trocar ideia (:

Até a próxima.
