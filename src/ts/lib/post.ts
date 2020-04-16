import fs from "fs";
import fm from "front-matter";
import marked from "marked";

export const getPostFile = (
  posts: { [path: string]: string },
  params: PostURLParams
) => {
  const { day, year, month, post } = params;
  const postPath = posts[`${year}-${month}-${day}-${post}.md`];

  if (!postPath) throw new Error("Not Found");

  return fs.readFileSync(postPath, { encoding: "utf-8" });
};

export const parsePostContent = (content: string) => {
  const post = fm<PostAttributes>(content);
  const html = marked(post.body, {
    renderer: new marked.Renderer(),
    highlight: function (code, language) {
      const hljs = require("highlight.js");
      const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
      return hljs.highlight(validLanguage, code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });

  return { ...post, html };
};
