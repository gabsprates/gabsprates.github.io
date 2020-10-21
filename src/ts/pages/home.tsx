import React, { useContext } from "react";
import { SEO } from "../components/seo";
import { SiteContext } from "../context/site";
import { markdownToHTML, getPosts } from "../lib/post";
import { getFormatedDate } from "../lib/date";

export const Home = () => {
  const site = useContext(SiteContext);

  return (
    <main className="home">
      <SEO url={site.pages.home} />

      <h1 className="page-heading">Posts</h1>

      <ul className="list">
        {getPosts(site.posts).map((post) => (
          <li key={post.link}>
            <span className="post-meta">{getFormatedDate(post.date)}</span>

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

            <a
              href={post.link}
              title={`Ler "${post.title}" por completo`}
              className="list-more"
            >
              Leia mais
            </a>
          </li>
        ))}
      </ul>

      <p className="rss-subscribe">
        subscribe{" "}
        <a href="/feed.xml" title={"subscribe via RSS"}>
          via RSS
        </a>
      </p>
    </main>
  );
};
