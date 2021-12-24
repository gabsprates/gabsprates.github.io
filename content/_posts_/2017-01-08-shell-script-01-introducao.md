---
layout: post
title: Shell Script -n1 --intro
date: 2017-01-08 17:54:40 -0300
---

Resolver as coisas pelo terminal ou não precisar muito do mouse sempre foi uma coisa que me chamou a atenção. Depois de passar alguns dias estudando (e colocando em prática) um pouco de shell script, consegui experimentar um pouco mais disso. Pude experimentar recursos e aprender mais como as coisas funcionam. Tem sido um ótimo período!

Pretendo escrever uma série de artigos sobre shell script, já que é uma coisa que se tornou parte do meu dia-a-dia, e assim compartilhar dessa experiência. Esse talvez será o mais conceitual, já que devemos nos acostumar com uma série de conceitos e termos. Não sei quantos serão, nem qual será a periodicidade, mas aqui estão os links:

- [Shell Script -n1 --intro](/2017/01/08/shell-script-01-introducao.html) <-- você está aqui
- [Shell Script -n2 --io-e-mais](/2017/10/21/shell-script-02-io-e-mais.html)

## Primeiros passos

Antes de prosseguirmos, precisamos responder algumas questões, e a primeira delas é:

> O que é **shell**???

Podemos definir **shell** como uma interface de usuário, seja ela uma *Command-Line Interface* (CLI), ou uma *Graphical User Interface* (GUI). Shells são interativos, ou seja, aceitam comandos, sejam eles via mouse ou teclado. Alguma dúvida aqui?

Segunda pergunta:

> Se **shell** é uma interface de usuário, o que é **Shell Script**?

Ok. Interfaces de usuário aceitam comandos, certo? Sejam GUIs ou CLIs (onde é mais explícito), elas aceitam comandos. Falando em CLIs, escrevemos os comandos. Esse conjunto de comandos que escrevemos para interagir com o shell em questão, quando escritos em blocos, podem ser considerados shell script.

> O que é POSIX?

*POSIX* (**P**ortable **O**perating **S**ystem **I**nterface) é uma família de padrões de sistemas abertos baseados em Unix, definidos pela [IEEE](http://www.ieee.org/index.html), também conhecido como **IEEE 1003**. Ah, o **X** de POSIX, vem do Uni**x** e esse termo foi proposto por [Richard Stallman](https://en.wikipedia.org/wiki/Richard_Stallman).

> *Tá*, mas qual é a relação de shell script e POSIX?

Scripts shell são construídos de palavras-chave, comandos padrão, comandos do SO, funções e estruturas de controle. Parece uma linguagem de programação qualquer, certo? Esse é o padrão, é o conjunto de normas propostos pelo POSIX.

Existem várias implementações de interpretadores baseados no POSIX: [Bash](https://www.gnu.org/software/bash/), [CSH](https://en.wikipedia.org/wiki/C_shell), [KSH](https://en.wikipedia.org/wiki/KornShell), [TCSH](https://en.wikipedia.org/wiki/Tcsh), [ZSH](https://en.wikipedia.org/wiki/Z_shell) e outros. O Bash é o mais comum deles, muito usado nos descendentes da família Unix (aqui estou contando com o GNU/Linux e os sistemas MacOS). Por ser mais comum, e o que eu uso, vou adotar Bash para os exemplos desses artigos.

## Filosofia Unix

Já ouviu falar sobre a Filosofia Unix? Ela propõe algumas ideias interessantes para o desenvolvimento de software, como por exemplo:

- Programas devem fazer uma coisa, e fazer aquilo bem feito.

- Programas devem trabalhar juntos para atingir objetivos.

- *Keep it Simple, Stupid* (Mantenha isso simples, estúpido).

Esses pontos foram disseminados em praticamente todas as comunidades de desenvolvimento de software, porque realmente são boas práticas. Em Shell Script não é diferente, talvez é até mais perceptível. Futuramente vamos falar de redirecionamento de entradas e saídas, e algumas outras coisas que deixarão isso mais claro.

## Nosso "Hello World"!

Vamos escrever um pequeno programinha em Bash, para eu poder explicar algumas coisas durante o caminho.

### Tipos de Comandos

Vamos lá. Podemos dizer que temos alguns tipos de comandos, são eles:

- **Alias**: São atalhos definidos para algum outro programa. Ex.: **ll** é um alias para **ls -lh**;

- **Palavras-chave**: `if`, `then`, `for`, etc.;

- **Funções**: Funções definidas pelo usuários;

- ***Built in*** (Embutidos): Funções que fazem parte do próprio shell;

- **Programas**.

O último item, os **Programas** são localizados pelo sistema através da variável `$PATH`. Se você mexe com NPM, provavelmente já se deparou com essa variável de ambiente. Vamos dar uma olhada nela, abra seu terminal (ou seu Prompt Shell, para falar bonito), digite `echo $PATH` e observe o retorno. No meu caso:

```sh
$ echo $PATH
/usr/local/bin:/usr/local/sbin:/usr/bin:/home/gabriel/.npm-global/bin
```

Separados por `:` (dois pontos), esses são os caminhos que contém os programas rastreados pelo sistema, aqueles que você começa digitar e aperta `TAB` para autocompletar. Então, esses são os comandos que estão disponibilizados para trabalharmos.

Ah, você pode usar o `type` para saber informações sobre o tipo do comando. Ex.: `type echo`.

Vamos usar alguns desses comandos para exibir todos os programas rastreados pelo sistema. Crie o arquivo `listar-programas.sh` e dê permissão para que seu usuário execute esse programa com o comando `chmod u+x listar-programas.sh`, vamos trabalhar nele.

Por enquanto, salve o arquivo com o comando que executamos antes, mas assim:

```sh
#!/bin/bash
echo $PATH
```

A primeira linha desse código é o nosso ***Shebang*** (`#!`). Em sistemas *Unix-like*, ele é usado para indicar um executor para o determinado script. Talvez você já tenha visto algo parecido em algum projeto em Node.js (`#!/usr/bin/node`), ou Python (`#!/usr/bin/python`).

Ok, você deu a permissão de execução que falei? Então vá no seu prompt shell e execute esse arquivo. Teve o mesmo retorno de quando executamos o código direto na linha de comando? Sim? Ótimo, vamos continuar.

### read & $IFS

`$IFS` é uma variável especial em Bash. **Internal Field Separator** (IFS) é usada para separar expressões, ou linhas, dentro do comando `read`. Seu valor padrão é composto pelos caracteres de **espaço**, **tabulação**, e **nova linha**, mas pode ser alterado quando necessário.

Como vimos, a saída do comando `echo $PATH` mostra os caminhos separados por dois pontos (`:`), portanto, vamos usar o `$IFS` para mostrar que setar nosso caractere de separação:

```sh
#!/bin/bash

# A atribuição de valores não deve conter espaços
# entre o identificador da variável e o valor atribuído.
IFS=':'
```

Agora vamos usar o comando `read` para fazer a leitura da variável `$PATH`, quebrando seu conteúdo em todos os caracteres `:`. Acrescente o seguinte comando:

```sh
# O parâmetro `-a` atribui o conteúdo lido a índices
# sequenciais da variável `caminhos`, iniciando em zero

# `<<<` é uma maneira de direcionar entrada, que falarei em um post posterior

read -a caminhos <<< $PATH
```

Pronto, temos um array de caminhos dos programas registrados pelo sistema. Como temos que iterar em um loop, já que vamos ler cada um dos valores do array, conheça a estrutura de repetição `for`, em Bash:

```sh
# O índice `@` pega todos os valores de `caminhos`
for caminho in ${caminhos[@]}
do
  echo $caminho
done
```

Salve o script e teste. O retorno deve ser cada um dos caminhos do `$PATH`, um em cada linha. Como temos o *path* de onde estão os programas, vamos trocar o `echo` por `ls`, para que sejam exibidos todos os programas que estejam nesses diretórios. O código final (sem os comentários) ficará assim:

```sh
#!/bin/bash

IFS=':'
read -a caminhos <<< $PATH

for caminho in ${caminhos[@]}
do
  ls $caminho
done
```

## Conclusão

Este artigo foi para dar uma pequena introdução no assunto. Pretendo escrever mais coisas sobre Shell Script (lembrando que estou escrevendo os exemplos para o interpretador Bash), aí iremos explorar mais recursos e comandos básicos. Espero te ajudar de alguma forma.

Isso é tudo pessoal, até a próxima.

**(:**

---

### Referências

- [http://tiswww.case.edu/php/chet/bash/bash-intro.html](http://tiswww.case.edu/php/chet/bash/bash-intro.html)
- [https://en.wikipedia.org/wiki/Unix_shell](https://en.wikipedia.org/wiki/Unix_shell)
- [https://bash.cyberciti.biz/guide/Main_Page](https://bash.cyberciti.biz/guide/Main_Page)
