import { PAGES } from "./pages";

export const site: SiteType<typeof PAGES> = {
  url: "http://gabrielprates.com",

  pages: PAGES,

  posts: {},

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
