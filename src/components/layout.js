import React from "react"
import Header from "./header"
import { useStaticQuery, graphql } from "gatsby"
import Footer from "./footer"

const Layout = ({ children }) => {
  const data = useStaticQuery(query)

  console.log({ data })

  const title = data?.site?.siteMetadata?.title
  const social = data?.site?.siteMetadata?.social

  return (
    <>
      <Header title={title} avatar={data?.avatar?.childImageSharp?.fixed} />

      <div className="page-content">
        <main className="wrapper">{children}</main>
      </div>

      <Footer
        title={title}
        social={social}
        siteUrl={data?.site?.siteMetadata?.siteUrl}
        description={data?.site?.siteMetadata?.description}
      />
    </>
  )
}

const query = graphql`
  query {
    avatar: file(absolutePath: { regex: "/perfil-small.jpg/" }) {
      childImageSharp {
        fixed(width: 40, height: 40, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }

    site {
      siteMetadata {
        title
        siteUrl
        description
        social {
          github
          twitter
          linkedin
        }
      }
    }
  }
`

export default Layout
