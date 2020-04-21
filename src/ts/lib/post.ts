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
  return fm<PostAttributes>(content);
};

export const markdownToHTML = (md: string) =>
  marked(md, {
    gfm: true,
    xhtml: false,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    renderer: new marked.Renderer(),
    highlight: function (code, language) {
      const hljs = require("highlight.js");
      const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
      return hljs.highlight(validLanguage, code).value;
    },
  });

export const getDescription = (content: string) => {
  const nextLineBreak = content.indexOf("\n");
  if (nextLineBreak === -1) return content;
  return content.substr(0, nextLineBreak);
};

export const getPostLink = (params?: PostURLParams) => {
  if (!params) return "/";

  return `/${params.year}/${params.month}/${params.day}/${params.post}.html`;
};

export const pathToPostParams = (path: string) => {
  const regex = /([0-9]{4})-([0-9]{2})-([0-9]{2})-([a-zA-Z0-9-_]+)\.md/;
  const matches = path.match(regex);

  if (!matches || matches.length < 5) return;

  const [, year, month, day, post] = matches;
  return { day, post, year, month };
};
