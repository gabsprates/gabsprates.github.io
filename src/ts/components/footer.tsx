import React, { useContext } from "react";
import { SiteContext } from "../context/site";

export const Footer = () => {
  const site = useContext(SiteContext);

  const getSocial = () => {
    if (!site.social) return null;

    return (
      <React.Fragment>
        <li>
          <a
            href={`https://github.com/${site.social.github}`}
            title={`${site.metadata.title} no GitHub`}
            target="_blank"
          >
            github@{site.social.github}
          </a>
        </li>
        <li>
          <a
            href={`https://twitter.com/${site.social.twitter}`}
            title={`${site.metadata.title} no Twitter`}
            target="_blank"
          >
            twitter@{site.social.twitter}
          </a>
        </li>
        <li>
          <a
            href={`https://br.linkedin.com/in/${site.social.linkedin}`}
            title={`${site.metadata.title} no LinkedIn`}
            target="_blank"
          >
            linkedin@{site.social.linkedin}
          </a>
        </li>
      </React.Fragment>
    );
  };

  return (
    <footer className="site-footer">
      <div className="wrapper">
        <h2 className="footer-heading">{site.metadata.title}</h2>

        <div className="footer-col-wrapper">
          <div className="footer-col footer-col-1">
            <ul className="contact-list">
              {getSocial()}

              <li>
                <a href={site.url} title="Meu site" target="_blank">
                  {site.url.replace(/^https?:\/\//, "")}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-col-3">
            <p>{site.metadata.description}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
