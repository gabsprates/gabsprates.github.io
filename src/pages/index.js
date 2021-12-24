import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data }) => {
  const posts = data?.allMarkdownRemark?.nodes || []

  return (
    <Layout>
      <SEO title="All posts" />

      <h1 class="page-heading">Posts</h1>

      <ul className="post-list">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <span className="post-meta">{post.frontmatter.date}</span>

              <h2>
                <Link to={post.fields.slug} title={title} className="post-link">
                  {title}
                </Link>
              </h2>

              <div
                itemProp="description"
                className="post-content"
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
              />

              <Link to={post.fields.slug} title={`Ler "${title}" por completo`}>
                Leia mais
              </Link>
            </li>
          )
        })}
      </ul>

      {/* TODO */}
      <p className="rss-subscribe">
        subscribe{" "}
        <Link href="/feed.xml" title="subscribe via RSS">
          via RSS
        </Link>
      </p>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "//content/_posts_//" } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
