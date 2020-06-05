import React, { useContext, PropsWithChildren } from "react";
import { Helmet } from "react-helmet";
import { SiteContext } from "../context/site";
import { getJsonLDForPost, getJsonLDForPage, SEOProps } from "../lib/seo";

export const SEO = (props: PropsWithChildren<SEOProps>) => {
  const site = useContext(SiteContext);

  return (
    <Helmet
      defaultTitle={site.metadata.title}
      titleTemplate={`%s | ${site.metadata.title}`}
    >
      {props.title && <title>{props.title}</title>}
      <meta property="og:title" content={props.title || site.metadata.title} />
      <meta name="author" content={site.metadata.title} />
      <meta property="og:locale" content="pt_BR" />
      <meta
        name="description"
        content={props.description || site.metadata.description}
      />
      <meta
        property="og:description"
        content={props.description || site.metadata.description}
      />
      <link rel="canonical" href={site.url + props.url} />
      <meta property="og:url" content={site.url + props.url} />
      <meta property="og:site_name" content={site.metadata.title} />
      <meta property="og:image" content={site.url + site.metadata.logo} />

      {props.blog && <meta property="og:type" content="article" />}
      {props.blog && (
        <meta
          property="article:published_time"
          content={props.blog.published_time.toJSON()}
        />
      )}

      <script type="application/ld+json">
        {JSON.stringify(
          props.blog
            ? getJsonLDForPost(site, props)
            : getJsonLDForPage(site, props)
        )}
      </script>
    </Helmet>
  );
};
