import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PAGES } from "../../../config/pages";
import { SiteContext } from "../context/site";
import { getPostFile, parsePostContent, markdownToHTML } from "../lib/post";
import { getDate, getFormatedDate } from "../lib/date";
import { Discuss } from "../components/discuss";

export const Post = (props: RouteComponentProps<PostURLParams>) => {
  const { posts } = useContext<SiteType<typeof PAGES>>(SiteContext);

  try {
    const { params } = props.match;

    const post = parsePostContent(getPostFile(posts, params));
    const html = markdownToHTML(post.body);
    const postDate = getDate(+params.year, +params.month, +params.day);

    return (
      <React.Fragment>
        <article
          className="post"
          itemScope={true}
          itemType="http://schema.org/BlogPosting"
        >
          <header className="post-header">
            <h1 className="post-title" itemProp="name headline">
              {post.attributes.title}
            </h1>

            <p className="post-meta">
              <time dateTime={postDate.toJSON()} itemProp="datePublished">
                {getFormatedDate(postDate)}
              </time>
            </p>
          </header>

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>

        <hr />

        <Discuss url={props.match.url} />
      </React.Fragment>
    );
  } catch (error) {
    console.error(error);
    return <h1>error 404</h1>;
  }
};
