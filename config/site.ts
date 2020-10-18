export const site: SiteConfig = {
  url: "https://gabrielprates.com",

  pages: {
    home: "/",
    about: "/about/",
    podcast: "/podcast/",
    projects: "/projects/",
  },

  social: {
    github: "gabsprates",
    twitter: "gabsprates",
    linkedin: "gabrielprates",
  },

  metadata: {
    logo: "/assets/perfil-small.jpg",
    email: "me@gabsprates.com",
    title: "Gabriel Prates",
    description: `Desenvolvedor há mais de ${
      new Date().getFullYear() - 2011
    } anos e baterista nas horas vagas\n#js #frontend #opensource #busquemconhecimento`,
  },
};
