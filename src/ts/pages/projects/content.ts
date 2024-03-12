const minifyGraphqlLoader = {
  title: "minify-graphql-loader",
  source: "https://github.com/gabsprates/minify-graphql-loader",
  description: `
  Quando eu trabalhava na [Studio Sol](https://www.studiosol.com.br/), empresa por trás do [Cifra Club](https://www.cifraclub.com.br/) e [Palco MP3](https://www.palcomp3.com/), usávamos APIs **GraphQL**.
  
  Nossas queries e mutations estavam separadas em arquivos \`*.graphql\` e todos os espaços em branco (quebras de linha, espaços, etc.) iam parar no bundle final. Vi que algumas pessoas reclamavam disso nos repositórios dos principais projetos relacionados a GraphQL e resolvi escrever um loader pro **webpack**, que removia esses espaços desnecessários em tempo de build.

  Algum tempo depois, fiquei surpreso e orgulhoso quando abri o NPM e vi mais 1.000 downloads em um dia! 😍
  
  Devolvendo um pouco do que o open-source fez por mim. 😘
  `,
};

const pratannaBox = {
  link: "https://gabrielprates.com/pratanna-box/",
  title: "pratanna-box",
  source: "https://github.com/gabsprates/pratanna-box",
  description: `
  Este foi bem legal! 📦📦📦

  Eu estava querendo fazer, ou reproduzir, algum jogo e me falaram de um joguinho, antigo, que tinha umas caixinhas e tinha que organizar as coisas. Na hora eu lembrei do [Boxworld, de Windows 95](https://www.youtube.com/watch?v=X2MMVHSKUms) (que eu joguei bastante no 98) e resolvi implementá-lo.

  Fiz em **React** e **TypeScript** e às vezes me pego pensando em como otimizá-lo. 🙂  
  `,
};

const regraDe3Online = {
  link: "https://gabrielprates.com/regrade3.online/",
  title: "regrade3.online",
  source: "https://github.com/gabsprates/regrade3.online",
  description: `
  Fiz este projeto recentemente. Juntei a vontade de estudar sobre Google AdSense e a oportunidade de achar o domínio \`regrade3.online\` disponível.

  Fiz um arquivo \`index.html\` e fui escrevendo código. No final, o Google não aceitou pro AdSense e só três, ou quatro, pessoas que usam, contando comigo... 😂

  Ficou bonitinho e mantenho aí pelo carinho. \`¯\\_(ツ)_/¯\`
  `,
};

const englishQuiz = {
  title: "english-quiz",
  source: "https://github.com/gabsprates/english-quiz",
  description: `
  Este foi o **meu primeiro projeto React**. Tive um trabalho na faculdade, na disciplina de Inglês, que precisamos fazer um quiz. Eu queria estudar React mas sempre adiava, daí tive a ideia e fiz a proposta para minha equipe de fazer o quiz digital, no qual eu usaria React pra desenvolver a interface.
  
  É um projeto cheio de dependências e com várias melhorias possíveis, mas me orgulho de tê-lo feito: foi o desafio de aprender algo novo, algo que me tornei referência depois.
  
  Deu muito certo! 😁
  `,
};

export const projects: Array<{
  link?: string;
  title: string;
  source?: string;
  description: string;
}> = [minifyGraphqlLoader, pratannaBox, regraDe3Online, englishQuiz];
