import { PAGES } from "../../../config/pages";

export type SEOProps = {
  url: string;
  blog?: { published_time: Date };
  title?: string;
  description?: string;
};

export const getJsonLDBase = (
  site: SiteType<typeof PAGES>,
  props: SEOProps
) => ({
  url: `${site.url}${props.url}`,
  publisher: {
    "@type": "Organization",
    logo: {
      "@type": "ImageObject",
      url: `${site.url}${site.metadata.logo}`,
    },
    name: site.metadata.title,
  },
  author: {
    "@type": "Person",
    name: site.metadata.title,
  },
  headline: props.title || site.metadata.title,
  description: props.description || site.metadata.description,
  "@context": "https://schema.org",
});

export const getJsonLDForPage = (
  site: SiteType<typeof PAGES>,
  props: SEOProps
) => ({
  "@type": "WebSite",
  ...getJsonLDBase(site, props),
  name: site.metadata.title,
});

export const getJsonLDForPost = (
  site: SiteType<typeof PAGES>,
  props: SEOProps
) => ({
  "@type": "BlogPosting",
  ...getJsonLDBase(site, props),
  dateModified: props.blog!.published_time.toJSON(),
  datePublished: props.blog!.published_time.toJSON(),
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${site.url}${props.url}`,
  },
});
