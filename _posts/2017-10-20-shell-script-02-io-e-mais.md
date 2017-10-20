---
layout: post
title: Shell Script -n2 --io-e-mais
---

Já viu a expressão **I/O**? I/O não é só o nome de um evento do Google, nem só uma extensão de sites hospedados no GitHub Pages. I/O é uma expressão que significa _Input_ (entrada) e _Output_ (saída), que são duas peças fundamentais para a computação. Vamos falar de como isso funciona no Bash.

Lembrando que este artigo faz parte de uma série de artigos que estou escrevendo sobre Shell Script. Não sei quantos serão, nem qual será a periodicidade, mas aqui estão os links:

* [Shell Script -n1 --intro](http://gabrielprates.com/2017/01/08/shell-script-01-introducao.html)
* [Shell Script -n2 --io-e-mais](http://gabrielprates.com/2017/10/20/shell-script-02-io-e-mais.html) <-- você está aqui

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

Confesso que não conheço e não consegui achar exemplos muito úteis do redirecionamento com o `<`, uma vez que ele só joga um arquivo para a input de um outro comando, ex.:

```bash
# Utilizando o `<`, seria assim:
$ cat < index.html

# Mas o `cat`, `grep` e outros comandos já esperam um arquivo de entrada.
# Ou seja, funciona tranquilamente sem o redirecionamento.
$ cat index.html
```

Então vamos pro próximo.

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

Seguindo a mesma ideia do Heredoc, o **Herestring** te permite a input de uma string. Parece tão útil quanto o redirecionamento, mas é mais ~~rsrs~~. Com o **Herestring** você pode, por exemplo, fazer uma busca numa string grande que você tem, nada que não pudesse fazer com o Heredoc, mas aqui não precisamos do delimitador. Exemplo:

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

> Mas e se eu quiser salvar mais coisa nesse mesmo arquivo, posso utilizar o `>`?

Poder pode, mas saiba de uma coisa:

> Ao utilizar o `>` para um arquivo, se este arquivo não existir, ele será criado; se **já existir, ele tem seu conteúdo reescrito**.

Pode até ser útil em alguns casos, mas para resolver este problema, permita-me apresentar o próximo item.

### Append: `>>`


## Erros / `stderr`
### Redirecionamento de erro: `2>`
### Redirecionamento de output e erro: `&>`

## E o pipe: `|`


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
