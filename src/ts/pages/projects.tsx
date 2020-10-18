import React, { useContext } from "react";
import { SEO } from "../components/seo";
import { SiteContext } from "../context/site";
import { markdownToHTML } from "../lib/post";

export const Projects = () => {
  const site = useContext(SiteContext);

  const projects = [
    {
      link: "https://github.com/gabsprates/minify-graphql-loader",
      title: "minify-graphql-loader",
      description:
        "webpack loader to minify GraphQL queries, mutations and fragments",
    },
    {
      link: "https://github.com/gabsprates/pratanna-box",
      title: "pratanna-box",
      description: "my implementation of boxworld (windows 95's sokoban)",
    },
    {
      link: "https://github.com/gabsprates/regrade3.online",
      title: "regrade3.online",
      description: "",
    },
    {
      link: "https://github.com/gabsprates/scrum-cards",
      title: "scrum-cards",
      description: "⌛ 📈 Scrum Cards: to help agile teams",
    },
    {
      link: "https://github.com/gabsprates/english-quiz",
      title: "english-quiz",
      description: "🇺🇸 🎲 A interactive quiz made with React",
    },
  ];

  return (
    <main className="home">
      <SEO url={site.pages.home} />

      <h1 className="page-heading">Projetos</h1>

      <ul className="post-list">
        {projects.map((post) => (
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
