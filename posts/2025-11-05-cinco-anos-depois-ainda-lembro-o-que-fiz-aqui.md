---
layout: post
title: "Cinco anos depois, ainda lembro o que fiz aqui?"
---

Cinco anos e meio se passaram desde que eu procurei um gerador de site estático para substituir o Jekyll e, depois de alguns testes, resolvi fazer o meu próprio. Em **cinco anos** (neste blog): não escrevi nenhum post novo, adicionei uma página para falar dos meus projetos e mudei minha foto de perfil. **Nada mais**. Um dos motivos: não documentei nada do que fiz, além dos testes, e já não lembrava se daria trabalho pra rodar tudo e escrever algum conteúdo novo. Neste post vou falar um pouco sobre esse processo e aproveitar pra explicar ~(documentar)~ o que fiz; e ver se vale a pena manter. Por onde começar?

## Colocando tudo pra rodar outra vez

Dando um pouco mais de contexto, o projeto em si é um gerador de páginas estáticas, no formato blog, que usa React e TypeScript, com posts escritos em arquivos Markdown.

<!-- Quando eu era criança e apagava a luz do quarto, eu ficava olhando pro interruptor de luz que brilhava bem fraquinho no escuro pensando "_é a única coisa que eu vejo e sei onde está_". Olhando pra esse projeto, me sinto no quarto escuro outra vez e o interruptor brilhando é o script `build` do `package.json`. Esse é o meu ponto de partida pra essa análise. Espero que depois de "apertar esse botão", eu consiga "ver" o que temos por aqui. _Click!_ -->

Bem, cinco anos depois, com certeza já não era mais a mesma versão do sistema operacional, nem do Node.js. O que mais? Aaah, as dependências do projeto... Geralmente uma dor de cabeça... Pra falar a verdade, após clonar o repositório, nem `yarn install` funcionava mais (Node.js, yarn e pacotes já não se davam bem). O pior é que se você já não lembra nem tem documentado o porquê de ter usado uma biblioteca, ou até uma versão específica de uma delas, como vai saber o que deve e não deve atualizar?

A primeira coisa que fiz foi atualizar o webpack (_"Oi velho amigo, quanto tempo!"_). Honestamente, já faz alguns anos que nem uso mais webpack no meu dia-a-dia, e olha que eu falava bastante dele por aqui. Até inventei de começar uma série de artigos que ia "_focar nos core concepts do webpack e tentar clarear como as coisas funcionam_". Série de um post só. Isso até me ajudou a desenvolver o sentimento de "se quer ver alguma coisa ir pra frente, ache uma forma de facilitar o uso dela", o que muita gente chama de **Developer Experience**. Enfim, atualizei o time todo: `webpack`, `webpack-cli`, `webpack-dev-middleware`, `webpack-dev-server`, `webpack-node-externals`, `html-webpack-plugin`. Alguns breaking changes aqui e ali, com configurações e coisas na execução do server, mas tudo fluindo.

Próximo, as coisas de CSS. SASS, outro que já não uso tanto. O ecossistema do CSS evoluiu tanto, né? Não é como se não precisássemos mais de nenhum tipo de pré, ou pós, processamento, mas boa parte das coisas já são possíveis nativamente. Bom, descobri que um tal de `node-sass` já não se usava mais, agora é só o `sass` mesmo. Os companheiros também foram atualizados: `css-loader`, `sass-loader`, `style-loader`. Quase me esqueci: `mini-css-extract-plugin`, que nostalgia. Bom, com esses tive que pesquisar um pouco mais nos _release notes_ e novas configurações, mas no fim deu certo também. E obrigado time do SASS que fizeram uma ferramenta pra atualizar o código automaticamente, a maior parte do _diff_.

Por último, TypeScript. Esse sim, já vai comigo há alguns anos e nossa relação só melhora. Felizmente, sem dores de cabeça, tudo segue funcionando corretamente aqui.

Isso tudo foi só pra fazer meu `dev server` funcionar. Ainda não lembrava como o `build` funcionava, mas daqui já dá pra focar no que queremos saber.

## Uma visão geral

Com o processo de atualizar as dependências, algumas coisas foram voltando à memória, como por exemplo o uso do webpack para gerar os arquivos CSS (do SASS) e os scripts JavaScript (do TypeScript), executados pelo Node.js, responsáveis por gerar os arquivos HTML.

Hoje em dia enxergo isso como um nível desnecessário de complexidade, mas julgar o passado com toda a bagagem do que já aprendemos com ele é fácil, difícil é lembrar porquê fiz isso tudo (😅). Acho que na época, já que o Node.js não rodava TS e eu não tinha muita fé nem no Deno, nem no ts-node, daí a necessidade de transpilar tudo.

De acordo com a configuração do webpack, meu ponto de entrada principal é `main: path.resolve(__dirname, "./src/renderer.tsx")` e `renderer.tsx`, dentre outras coisas, exporta a função `renderer` que é usada pelo **contexto de execução** e:

- Recebe:
    - A URL da página que é pedida;
    - As informações do site (nome, descrição, etc.);
    - Os caminhos dos arquivos Markdown;
    - As informações do resultado do build do webpack, com os assets.
- Renderiza a árvore React da UI com `renderToStaticMarkup`:
    - Usa `StaticRouter` (do React Router) pra saber qual route de destino;
    - Alimentando os templates com as informações recebidas.
- Retorna o resultado da renderização, que é a string HTML da página em questão.

![visão geral da arquitetura do projeto](/assets/posts/overvoew-project-arch.svg)

A árvore do React só não inclui o `<!DOCTYPE html>`, mas todo o conteúdo da `<html>` está ali:

- `<meta>` tags com `react-helmet` no `<head>`;
- `<link rel="stylesheet" ... />` com os estilos vindos do webpack, também no `<head>`;
- O `StaticRouter` decidindo o que mostrar no miolo do `<body>`;
    - Cada página tem seu próprio componente, com JSX e carrega o Markdown como HTML quando necessário.
- E até o `<script>` do Disqus, pra seção dos comentários nos posts.

Olhando assim, é mais simples do que eu pensava. Os pontos mais complicados são nos componentes que geram as `<meta>` tags `og:*` e `application/ld+json` pra SEO, e nas funções que lidam com Markdown e links/URLs.

Além da função `renderer`, esse arquivo também exporta:

- Um objeto literal, de configuração, seguindo uma interface, por isso o `.ts` e a necessidade de transpilação;
- A função `getPostLink`, que monta uma string com o link do post; e
- A função `pathToPostParams`, que extrai as informações de data e _slug_ do post, baseado no nome do arquivo.

Essas últimas só estão aí por causa do TypeScript.

Eu poderia falar do outro ponto de entrada do `feed: path.resolve(__dirname, "./src/feed/index.tsx")`, mas é só um amontoado de concatenação de strings pra gerar o RSS do blog, dá pra deixar isso pra outro dia.

Até aqui, até me parecia OK, mas aí veio a pergunta: por que funções como `getPostLink` e `pathToPostParams`, além do objeto de configuração (é só um objeto!), tiveram que ser exportadas do principal ponto de entrada? Foi a hora de lembrar de como isso tudo roda. Vamos falar dos **contextos de execução**.

## Os contextos de execução: dev server e build

Nesse ponto já sabemos que `renderer` precisa de algumas informações pra funcionar corretamente e que tudo precisa ser compilado pra gerar o JS que será executado de fato. Como Developer Experience é super importante, vamos falar primeiro do **dev server**.

### Dev Server com webpack e express

Uma visão geral do dev `server.js`:

- Uma aplicação `express()`;
- Que carrega o caminho dos arquivos de posts (`{ [nome_do_arquivo.md]: 'caminho_absoluto.md' }`) no contexto da requisição através de um middleware;
- Também carrega as informações do build do webpack (output, por exemplo) no contexto da requisição, através de outro middleware;
- Define rotas para servir os assets que não são gerados;
- Responde todas as demais requisições (`app.get("/*", (...)`) com, ou o resultado da execução da função `renderer()` (**que é carregada em memória dinamicamente** após cada build), ou erro.
- Faz o build do webpack de fato, escrevendo os estáticos (JS, CSS, imagens) no disco para conseguir servi-los depois e, após terminar, sobe a aplicação do express na porta `4000`.

Aqui já dá pra ver um pouco da macarronada: começamos mesclar arquivos de **código fonte JavaScript**, importando arquivos **JavaScript gerados** do TypeScript, pra pegar **informações estáticas**, mas **definidas no TypeScript**, pra então fazer um tipo de "**injeção de dependências**" pro **código gerado ser executado** com as informações que precisa.

Essa parte ainda dá um nó na minha cabeça e é justo ela que eu tinha um pouco de medo quando pensava "vou escrever um post novo", daí deixava pra lá. Agora eu me lembro de tudo... Ou quase, ainda tem o **build**...

### O script de build

Honestamente, tive uma boa surpresa aqui, melhor organizado do que eu pensei que estaria.

Basicamente temos um callback JavaScript mesmo, a função `runner()`, para o compilador do webpack executar após gerar os bundles. Algumas funções com responsabilidades claras, como por exemplo `copyAssets()` (os estáticos não gerados), `copyFavicon()`, `copyStyle()` (os arquivos CSS gerados), e outras que poderiam ter um isolamento melhor, como `generatePages()` e `generateFeed()`, que estão dentro da `runner()`.

Vamos lá, o que acontece aqui:

1. Primeiro, faz a validação se não houve erros na compilação;
1. Depois importa o bundle do main, pra usar as mesmas funções `renderer()`, `getPostLink()`, `pathToPostParams()` que já comentamos antes, além do objeto `site`;
1. Também importa o bundle do `feed`, pra gerar o RSS;
1. Carrega o caminho dos arquivos de posts;
1. Copia os estilos baseado nos chunks gerados;
1. Copia os assets estáticos;
1. Copia o favicon;
1. Gera as páginas dos artigos com a função `renderer()`, salvando a string HTML em um arquivo pra cada post;
1. Gera as páginas avulsas (**Sobre mim** - super desatualizada, e **Projetos**), igual pros artigos;
1. Gera o `feed.xml` e fim.

Aqui tem o mesmo probleminha da macarronada do dev-server, mas até que não sente tanto.

Todo esse conteúdo copiado e gerado vai pra `/docs` pra depois fazer o deploy.

Eita!!! O deploy, tinha me esquecido dessa gambiarra...

## O deploy no GitHub Pages

Vamos lá então... O ano era 2020 e eu só pensei "_GitHub Actions!_"

Aqui tenho que explicar um pouco sobre as branchs do projeto:

- A "principal", onde todo o código fonte está é a `development`;
- Quando vou escrever um novo post, geralmente fica na branch `novo_post`;
- Processo de atualização, cada um com a própria branch (eu espero);
- E a `main`, que era (olha o tempo verbal) usada pelo GitHub Pages pra publicar o site.

Agora, o que o Actions fazia a cada _push_ pra `development`, depois de clonar a branch no container em execução, era: rodar os scripts `install`, `test` (pra dizer que tinha boas práticas) e `build`, depois mover tudo de dentro de `/docs` pra `/tmp/docs`, copiar `/tmp/docs/CNAME` e `/tmp/docs/.nojekyll` (pro GitHub não rodar o Jekyll), **remover tudo** do diretório de trabalho do container (incluindo `.github`, `.gitignore`, `.prettierignore` e `.prettierrc`), pra então copiar tudo de `/tmp/docs` pra lá de novo. **Por quê?** Pra depois gerar um commit, usando os tokens de acesso que criei pra essa Action (tudo pelo CI/CD e "Pipiline moderna") e fazer push pra `master`. Aí o GitHub fazia o deploy.

Olha, não sei você, mas eu olhei pra isso e pensei "_Onde é que eu tava com a cabeça?!_"

O bom é que isso aí já foi pro saco, agora não tem mais Action personalizado, só o build jogando tudo em `/docs` mesmo, mesma branch, sem tokens de acesso pessoais, só a configuração necessária pro GitHub Pages pegar o diretório correto e fazer o deploy dos estáticos. Faço o build na mão, localmente mesmo, não precisa de nenhuma automatização de CI/CD pra isso, Deus me livre!

## 2025, e agora?

Bom, pelo menos consegui documentar o que fiz, se algum dia for mexer de novo, vou saber onde estou me metendo.

Mas pra falar a verdade, quero mexer nisso. Tem muita coisinha aqui que dá pra ser aposentada, facilitar a vida e poder escrever sem medo do build/deploy.

É pra ser um projeto simples e, qual é, 2025 já (listinha pra me ajudar lembrar do que quero fazer):

- Node.js já tem `--watch`, não precisa de `nodemoon`.
- Node.js já suporta TypeScript, tem que ter um jeito de eu rodar React no Node diretamente com TS, sem processo de build, sem webpack, nem vite, nem nada. Vou pesquisar sobre isso.
- Dá pra organizar melhor esse código, deixar as coisas no devido lugar... Pensando arquiteturalmente, qual o sentido de meu código fonte ser separado em diretórios pra `scss` e `ts`? O que isso me diz sobre o projeto em si? Praticamente nada. Dá pra ter uma estrutura que deixa claro sobre o que é. E de fato, `/config`, `/core`, `/src`, `/types`... Caramba, que monte de coisinha solta.
- Pois esse SASS. Meu CSS nem é tão complicado assim, olha que tiro isso CSS puro, só preciso de uma oportunidade. 
- Preciso melhorar os links desses posts, `/ano/mes/dia/post.html` não faz sentido nenhum pra mim aqui. Olha a frequência que eu escrevo! Pode ser melhor, e quero, mas hoje tenho família, compromissos e trabalho, passo muito mais tempo fora da tela. Bom, quero tentar mudar essas URLs sem perder SEO e ainda preservar as threads de comentários. Tenho que rever a meta tag pra _canonical URL_.
- Eu preciso muito atualizar o **Sobre Mim**, muita coisa já rolou: empresas diferentes, funções diferentes, países diferentes... Certeza que foram só 5 anos? 🤔
- Será que consigo atingir traduzir o conteúdo? Eita, as URLs de novo.

Quero escrever mais coisas aqui. Trabalhei em comunidade e-commerce na Black Friday, também com ambiente Cloud, com projetos open-source, aprendi que arquitetura é mais sobre _trade-offs_ do que estrutura de diretórios e que nem todo teste vale a pena ser feito; mexi um pouco com Python, um pouco de Java, senti saudade do PHP, flertei com o Rust e sigo com o mundo JS/TS.

Além das experiências profissionais, tem as culturais, linguísticas e, por que não, espirituais também. Muita coisa legal pra falar sobre, eu acho.

O que acha? Será que consigo organizar tudo e compartilhar essas ideias todas?