interface SiteConfig {
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

  pages: PathValue;
}

type PathValue = { [path: string]: string };

type BlogPosts = PathValue;

type SiteAndPosts = SiteConfig & { posts: BlogPosts };
