import { PAGES } from "./pages";

export const site: SiteType<typeof PAGES> = {
  url: "http://gabrielprates.com",

  pages: PAGES,

  posts: {},

  social: {},

  metadata: {
    logo: "/assets/perfil-small.jpg",
    email: "me@gabsprates.com",
    title: "Gabriel Prates",
    description: `Descrição bacana aqui @TODO`,
  },
};
