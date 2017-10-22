---
layout: post
title: Shell Script -n2 --io-e-mais
---

Já viu a expressão **I/O**? I/O não é só o nome de um evento do Google, nem só uma extensão de sites hospedados no GitHub Pages. I/O é uma expressão que significa _Input_ (entrada) e _Output_ (saída), que são duas peças fundamentais para a computação. Vamos falar de como isso funciona no Bash.

Lembrando que este artigo faz parte de uma série de artigos que estou escrevendo sobre Shell Script. Não sei quantos serão, nem qual será a periodicidade, mas aqui estão os links:

* [Shell Script -n1 --intro]({{ site.baseurl }}/2017/01/08/shell-script-01-introducao.html)
* [Shell Script -n2 --io-e-mais]({{ site.baseurl }}/2017/10/21/shell-script-02-io-e-mais.html) <-- você está aqui

## Conceitos

Bom, o processo de I/O pode ser considerado a comunicação entre sistemas, ou a troca de informações entre sistemas (e aqui dá até pra abstrair o conceito de sistemas). Podemos interagir com os dispositivos por meio de periféricos de entrada e saída (~~lembra disso em alguma aula?~~), ou com algum serviço por meio de suas respectivas APIs.

Quando falamos de entradas e saídas no ambiente do Bash, também temos formas de fazer os programas se comunicarem e para isso, precisamos entender os 3 tipos do que chamamos de **_File Descriptors_**, que nada mais são que a forma como os programas se referem aos recursos (arquivos, sockets, dispositivos, etc).

São eles:

* **Standard Input** (`stdin`): File Descriptor **0**
* **Standard Output** (`stdout`): File Descriptor **1**
* **Standard Error** (`stderr`): File Descriptor **2**

Não quero entrar em muitos detalhes dos _File Descriptors_, mas tenha em mente os `std*`s e seus respectivos números, vamos precisar para os próximos tópicos.

_So let's go there!_

## Input / `stdin`

Ok, vamos falar agora sobre os inputs. Temos estes três tipos:

* **Redirecionamento**: `<`
* **Heredoc**: `<<`
* **Herestring**: `<<<`

### Redirecionamento: `<`

Confesso que pode parecer um pouco inútil redirecionar uma entrada, já que a maioria dos comandos aceita um arquivo ou string de entrada. Quem me fez enxergar que não é inútil foi o [Julio Neves](https://twitter.com/juliobash), quando troquei uma ideia com ele na Latinoware 2017. Tenha em mente que se existe uma possibilidade no Bash, ela não está lá por acaso. Vamos ver o comando `tr` como exemplo, já que ele espera uma input padrão:

```bash
# Podemos redirecionar o output com o `|`, que ainda vamos ver aqui.
$ cat index.html | tr [:lower:] [:upper:]

# Ou dispensar a execução do `cat`, fazendo o redirecionamento com `<`:
$ tr [:lower:] [:upper:] < index.html
```

Então, existem comandos que necessitam, e só funcionam, com o input padrão. Nesses casos o `<` é muito útil.

Agora vamos pro próximo.

### Heredoc: `<<`

Pra mim, este é a mais interessante e útil forma de manipular input no Bash. O **Heredoc** te permite entrar com um bloco de conteúdo, como se fosse um documento.

Já aconteceu várias vezes de eu ter um texto no _clipboard_ e precisar fazer alguma manipulação específica com ele. O problema de jogar um texto com quebras de linha no terminal é que, ao encontrar o _EOL_ (End Of Line), o Bash tenta executar aquela input, daí não adiantava eu colar lá. Uma opção era abrir o Vim e salvar o arquivo de texto pra fazer o que fosse necessário, mas aí eu ainda teria de manipular tudo depois.

Daí eu conheci o **Heredoc** e percebi como isso se resolve fácil. Ao invés de precisar abrir o Vim, Nano, ou qualquer outro editor para salvar o texto em questão, podemos utilizar a seguinte sintaxe:

```bash
# Não se preocupe com o `>`, é um redirecionamento de output.
# Falo mais sobre isso depois.
# Agora preste atenção na sintaxe do heredoc:
$ cat <<TEXTO > lorem_ipsum.txt
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
officia deserunt mollit anim id est laborum.
TEXTO
```

O delimitador `TEXTO` não é um padrão. Você pode utilizar qualquer string com caracteres alfanuméricos, então poderia ser `ARQUIVO`, `INPUT`, ou `EOL` como em vários exemplos por aí. O importante mesmo é **sempre abrir e fechar**.

Ok, next.

### Herestring: `<<<`

Seguindo a mesma ideia do Heredoc, o **Herestring** te permite a input de uma string. Com o **Herestring** você pode, por exemplo, fazer uma busca numa string grande que você tem, nada que não pudesse fazer com o Heredoc, mas aqui não precisamos do delimitador. Exemplo:

```bash
$ grep quis <<< "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
```

Daí você pode usar esta solução para o problema que se encaixar melhor, só não se esqueça de colocar a string **sempre entre aspas**!

Pronto, agora que falamos das inputs, _let's to talk about outputs_.

## Output / `stdout`

Sobre outputs, precisamos falar sobre estes dois tipos:

* **Redirecionamento**: `>`
* **Append** (_Acrescentar_): `>>`

### Redirecionamento: `>`

Como você pôde ver no exemplo do Heredoc (`cat <<TEXTO > lorem_ipsum.txt`), o caractere `>` direcionou a saída do comando para um arquivo chamado `lorem_ipsum.txt`. É só isso que ele faz mesmo, mas aí você pode aplicar à várias situações. Exemplo:

```bash
# Salvar o nome de todos os arquivos em `/tmp`.
$ ls /tmp > files.txt

# E com o `cat` você pode ver o que foi escrito:
$ cat files.txt
```

Quando se está escrevendo um script Bash para executar várias ações, isso é uma mão na roda, porque dá pra salvar um conteúdo prévio e utilizar quando necessário.

Aí você pergunta:

> Mas e se eu quiser ACRESCENTAR conteúdo no fim desse mesmo arquivo, posso utilizar o `>`?

Poder pode, mas saiba de uma coisa:

> Ao utilizar o `>` para um arquivo, se este arquivo não existir, ele será criado; se **já existir, ele tem seu conteúdo reescrito**.

Pode até ser útil em alguns casos, mas para resolver este problema, permita-me apresentar o próximo item.

### Append: `>>`

Respondendo a pergunta anterior, para acrescentar conteúdo no fim de um arquivo, você pode usar o operador de _append_: `>>`. Pronto, só isso mesmo. Um exemplo de situação real seria o direcionamento da saída de um `ls`. Exemplo:

```bash
# O comando a seguir vai salvar todos os arquivos e diretórios visíveis
# do teu diretório `$HOME`, dentro de `conteudo_user.txt`:
$ ls ~ > conteudo_user.txt
```

Agora me diga, você já tentou executar algum processo específico e até mandou salvar a saída em algum lugar, mas acabou mostrando mensagens de erro? Então, é agora que passamos para o próximo tópico deste artigo.

## Erros / `stderr`

Sim, os erros continuam aparecendo mesmo que você redirecione o output do comando. Isso acontece porque nós também temos o `stderr`, aquele _File Descriptor_ para os erros. Podemos brincar com ele das seguintes formas:

* **Redirecionamento**: `2>`
* **Redirecionamento duplo**: `&>`

### Redirecionamento de erro: `2>`

Basicamente, é a mesma coisa do redirecionamento de output normal, a única diferença é que você identifica o _File Descriptor_ com que está trabalhando. De resto, funciona da mesma forma.

Aqui eu devo falar uma coisa importante:

> A identificação do _FD_ é opcional para os outros casos, menos para o redirecionamento de erros.

Isso significa que:

* `<` é o mesmo que `0<`;
* `<<` é o mesmo que `0<<`;
* `<<<` é o mesmo que `0<<<`;
* `>` é o mesmo que `1>`;
* `>>` é o mesmo que `1>>`;

Mas o `2>` sempre precisa do `2`, para dizer que é realmente o _FD_ de erro. Caso contrário ele é tratado como output normal.

Uma outra coisa aqui é que você também pode usar o _append_ para esse caso:

```bash
# Salvar o log de uma app em Node:
$ node server.js 2>> /tmp/node-app.log
```

Até aqui tudo bem? Todas as responsabilidades separadas e tudo bonitinho. Maaas e se quisermos salvar tanto output quanto erros no mesmo arquivo?

### Redirecionamento de output e erro: `&>`

Não poderia ser mais simples! É só direcionar a saída de ambos com o `&>`. Não sei o nome desse operador, mas ele resolve esse problema. Então:

```bash
# Salvar qualquer saída de uma app em Node:
$ node server.js &> /tmp/node-app.log
```

Alguma dúvida até aqui? Vamos prosseguir?

## E o pipe: `|`

Até aqui já vimos sobre os redirecionamentos e como podemos trabalhar com eles. Apesar de que os exemplos que mostrei foram todos em linha de comando, também podemos usar tudo que foi estudado aqui em nossos scripts. Nosso próximo item não fica de fora.

Provavelmente você já viu o **pipe** por aí. Por definição, temos o seguinte:

> A **pipeline** is a sequence of one or more commands separated by one of the control operators ‘`|`’ or ‘`|&`’.

Mas essa definição, apesar de oficial, não deixa as coisas muito claras. Então, veja esta:

> O pipe é uma sequência de um ou mais comando conectados, onde o `stdout` do anterior é conectado ao `stdin` do próximo.

Vamos olhar aquele exemplo que eu mostrei novamente:

```bash
# O output do `cat` é conectado ao input do `tr`
$ cat index.html | tr [:lower:] [:upper:]
```

Então, o `|` funciona como um conector de input e output. Sempre o comando anterior passando dados para próximo comando. Veja este outro exemplo:

```bash
# Isto vai listar todo o conteúdo do diretório
# e conectar esse output com o input do `grep`;
#
# O `grep` vai filtrar os nomes que contém espaço
# e conectar esse output com o input do `tr`;
#
# O `tr` substitui os espaços por underlines e
# salva a saída para o arquivo `names.txt`
$ ls | grep ' ' | tr ' ' '_' > names.txt
```

Conseguiu perceber o poder do `|`? Conseguimos realizar várias ações de uma vez e, como isso é tudo do _built in_ do Bash, é super rápido.

Viu que legal? Consegue perceber o quão poderoso é manipular I/O?

## Conclusão

Trabalhar com esses redirecionamentos de informações é muito útil. Você pode criar seus scripts pessoais, ou automatizar alguma coisa no trabalho, como envio de e-mails, logs, rotinas, etc.

Conhecer e estudar I/O no Bash me ajudou muito no meu dia-a-dia, espero que eu tenha te ajudado também. Caso tenha alguma dúvida, deixe um comentário ou me chame no Twitter, será um prazer falar contigo.

Isso é tudo pessoal, até a próxima.

**(:**

---

### Referências

* [http://mywiki.wooledge.org/BashGuide/InputAndOutput](http://mywiki.wooledge.org/BashGuide/InputAndOutput)
* [https://bash.cyberciti.biz/guide/Main_Page](https://bash.cyberciti.biz/guide/Main_Page)
* [http://www.gnu.org/software/bash/manual/bashref.html#Redirections](http://www.gnu.org/software/bash/manual/bashref.html#Redirections)
