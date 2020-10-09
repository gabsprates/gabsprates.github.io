import { graphql, Link } from "gatsby"
import React from "react"
import Image, { GatsbyImageFixedProps } from "gatsby-image"

type HeaderProps = {
  title: string
  avatar?: GatsbyImageFixedProps["fixed"]
}

export const Header = ({ title, avatar }: HeaderProps) => {
  const navLinks = [
    {
      url: "/about/",
      label: "Sobre mim",
    },
    {
      url: "/projects/",
      label: "Projetos",
    },
    {
      url: "/podcast/",
      label: "Posdcast",
    },
    {
      url: "https://slides.com/gabsprates",
      label: "Talks",
      external: true,
    },
  ]

  return (
    <header className="site-header">
      <div className="wrapper">
        <Link to="/" title={title} className="site-title">
          {avatar && (
            <Image
              fixed={avatar}
              alt={title || ``}
              className="site-title__image"
              imgStyle={{
                width: "100%",
                height: "100%",
              }}
            />
          )}

          {title}
        </Link>

        <nav className="site-nav">
          <button className="menu-icon">
            <span />
            <span />
            <span />
          </button>

          <div className="trigger">
            {navLinks.map(link =>
              link.external ? (
                <a
                  key={link.url}
                  href={link.url}
                  title={link.label}
                  target={"_blank"}
                  className="page-link"
                >
                  {link.label}
                </a>
              ) : (
                <Link to={link.url} key={link.url} className="page-link">
                  {link.label}
                </Link>
              )
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
