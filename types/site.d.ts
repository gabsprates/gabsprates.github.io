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

  posts: BlogPosts;
}

type BlogPosts = { [path: string]: string };

type SiteConfig = Omit<SiteType<{}>, "posts">;
