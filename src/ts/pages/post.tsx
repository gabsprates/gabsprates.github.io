import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PAGES } from "../../../config/pages";
import { SiteContext } from "../context/site";
import { getPostFile, parsePostContent } from "../lib/post";
import { getDate, getFormatedDate } from "../lib/date";
import { Discuss } from "../components/discuss";

export const Post = (props: RouteComponentProps<PostURLParams>) => {
  const { posts } = useContext<SiteType<typeof PAGES>>(SiteContext);

  try {
    const { params } = props.match;

    const post = parsePostContent(getPostFile(posts, params));
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
            dangerouslySetInnerHTML={{ __html: post.html }}
          ></div>
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
