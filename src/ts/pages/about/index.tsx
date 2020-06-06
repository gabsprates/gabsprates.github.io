import React, { useContext } from "react";
import { markdownToHTML, parsePostContent } from "../../lib/post";
import MDContent from "./index.md";
import { SEO } from "../../components/seo";
import { SiteContext } from "../../context/site";

export const About = () => {
  const site = useContext(SiteContext);
  const post = parsePostContent(MDContent);
  const content = markdownToHTML(post.body);

  return (
    <article className="post">
      <SEO url={site.pages.about} title={post.attributes.title} />

      <header className="post-header">
        <h1 className="post-title">{post.attributes.title}</h1>
      </header>

      <div
        className="post-content"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
};
