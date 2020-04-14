interface SiteType<Pages> {
  url: string;

  metadata: {
    logo: string;
    title: string;
    email: string;
    description: string;
  };

  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    codepen?: string;
  };

  pages: Pages;

  posts: { [path: string]: string };

  link?: string; // @TODO do i need it?
  lang?: string; // @TODO do i need it?
  author?: string; // @TODO do i need it?
  baseurl?: string; // @TODO do i need it?
}
