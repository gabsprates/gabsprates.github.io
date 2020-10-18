import React, { useContext } from "react";
import { SEO } from "../components/seo";
import { SiteContext } from "../context/site";
import { markdownToHTML } from "../lib/post";

export const Podcast = () => {
  const site = useContext(SiteContext);

  const podcast = [
    {
      link: "",
      title: "",
      description: "",
    },
  ];

  return (
    <main className="home">
      <SEO url={site.pages.podcast} />

      <h1 className="page-heading">Podcast</h1>

      <ul className="post-list">
        {podcast.map((post) => (
          <li key={post.link}>
            <h2>
              <a href={post.link} title={post.title} className="post-link">
                {post.title}
              </a>
            </h2>

            <div
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: markdownToHTML(post.description),
              }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
};
