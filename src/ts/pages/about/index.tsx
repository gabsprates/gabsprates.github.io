import React from "react";
import fs from "fs";
import {
  getPostLink,
  getDescription,
  markdownToHTML,
  parsePostContent,
  pathToPostParams,
} from "../../lib/post";
import MDContent from "./index.md";

export const About = () => {
  const post = parsePostContent(MDContent);
  const content = markdownToHTML(post.body);

  return (
    <article className="post">
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
