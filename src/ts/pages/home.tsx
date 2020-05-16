import React, { useContext } from "react";
import fs from "fs";
import {
  getPostLink,
  getDescription,
  markdownToHTML,
  parsePostContent,
  pathToPostParams,
} from "../lib/post";
import { getFormatedDate, getDate } from "../lib/date";
import { SEO } from "../components/seo";
import { SiteContext } from "../context/site";

const getPosts = () =>
  Object.keys((global as GlobalExtended).BLOG_POSTS)
    .map((path) => {
      const post = parsePostContent(
        fs.readFileSync((global as GlobalExtended).BLOG_POSTS[path], {
          encoding: "utf-8",
        })
      );

      const params = pathToPostParams(path);

      const date = getFormatedDate(
        params ? getDate(+params.year, +params.month, +params.day) : new Date()
      );

      return {
        date,
        link: getPostLink(params),
        title: post.attributes.title,
        description: post.attributes.description || getDescription(post.body),
      };
    })
    .reverse();

export const Home = () => {
  const site = useContext(SiteContext);

  return (
    <main className="home">
      <SEO url={site.pages.home} />

      <h1 className="page-heading">Posts</h1>

      <ul className="post-list">
        {getPosts().map((post) => (
          <li key={post.link}>
            <span className="post-meta">{post.date}</span>

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

            <a href={post.link}>Leia mais</a>
          </li>
        ))}
      </ul>

      {/* @TODO: rss
    <p className="rss-subscribe">
      subscribe <a href="/feed.xml">via RSS</a>
    </p> */}
    </main>
  );
};
