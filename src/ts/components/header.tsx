import React, { useContext } from "react";
import { SiteContext } from "../context/site";

export const Header = () => {
  const site = useContext(SiteContext);

  const navLinks = [
    {
      url: site.pages.about,
      label: "Sobre mim",
    },
    // {
    //   url: PAGES.projects,
    //   label: "Projetos",
    // },
    {
      url: "https://slides.com/gabsprates",
      label: "Talks",
      external: true,
    },
  ];

  return (
    <header className="site-header">
      <div className="wrapper">
        <a className="site-title" href="/" title={site.metadata.title}>
          {site.metadata.logo ? (
            <img
              alt={site.metadata.title}
              src={site.metadata.logo}
              className="site-title__image"
            />
          ) : null}

          {site.metadata.title}
        </a>

        <nav className="site-nav">
          <button className="menu-icon">
            <span />
            <span />
            <span />
          </button>

          <div className="trigger">
            {navLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                title={link.label}
                target={link.external ? "_blank" : void 0}
                className="page-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};
