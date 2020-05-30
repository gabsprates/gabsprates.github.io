import { site } from "../../config/site";
import { getPosts, markdownToHTML } from "../ts/lib/post";

export const feed = (posts: BlogPosts) => {
  const date = new Date();
  const limit = 10;

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.metadata.title}</title>
    <description>${site.metadata.description}</description>
    <link>${site.url}/</link>
    <atom:link href="${
      site.url
    }/feed.xml" rel="self" type="application/rss+xml"/>
    <pubDate>${rfc822(date)}</pubDate>
    <lastBuildDate>${rfc822(date)}</lastBuildDate>
    <generator>Gabriel Prates Blog Generator v1</generator>
    ${getPosts(posts)
      .slice(0, limit)
      .map(
        (post) => `
      <item>
        <title>${post.title}</title>
        <description>${encodeHTML(markdownToHTML(post.body))}</description>
        <pubDate>${rfc822(post.date)}</pubDate>
        <link>${site.url + post.link}</link>
        <guid isPermaLink="true">${site.url + post.link}</guid>
        ${
          post.tags ? post.tags.map((tag) => `<category>${tag}</category>`) : ""
        }
      </item>`
      )
      .join("")}
  </channel>
</rss>`;
};

const numpad = (num: number, pad: number) =>
  Array(pad)
    .fill(0)
    .concat(num)
    .join("")
    .substr(-1 * pad);

function getTZOString(timezoneOffset: number) {
  var prefix = timezoneOffset > 0 ? "-" : "+";
  var offsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  var offsetMinutes = Math.abs(timezoneOffset % 60);

  return prefix + numpad(offsetHours, 2) + numpad(offsetMinutes, 2);
}

function rfc822(date: Date) {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    days[date.getDay()] +
    ", " +
    numpad(date.getDate(), 2) +
    " " +
    months[date.getMonth()] +
    " " +
    date.getFullYear() +
    " " +
    numpad(date.getHours(), 2) +
    ":" +
    numpad(date.getMinutes(), 2) +
    ":" +
    numpad(date.getSeconds(), 2) +
    " " +
    getTZOString(date.getTimezoneOffset())
  );
}

const encodeHTML = (html: string) =>
  html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
