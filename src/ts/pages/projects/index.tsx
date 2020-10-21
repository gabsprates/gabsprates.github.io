import React, { useContext } from "react";
import { SEO } from "../../components/seo";
import { SiteContext } from "../../context/site";
import { markdownToHTML } from "../../lib/post";
import { projects } from "./content";

export const Projects = () => {
  const site = useContext(SiteContext);

  return (
    <main className="project">
      <SEO url={site.pages.home} />

      <h1 className="page-heading">Projetos</h1>

      <ul className="list">
        {projects.map((post) => (
          <li key={post.link}>
            <h2 className="project-title">{post.title}</h2>

            <div
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: markdownToHTML(post.description),
              }}
            />

            {post.source && (
              <a
                href={post.source}
                title={`Ver código do projeto "${post.title}"`}
                target="_blank"
                className="list-more"
              >
                Ver código
              </a>
            )}

            {post.link && (
              <a
                href={post.link}
                title={`Ver projeto "${post.title}"`}
                target="_blank"
                className="list-more"
              >
                Ver projeto
              </a>
            )}
          </li>
        ))}
      </ul>

      <p>Legal, né?</p>
    </main>
  );
};
