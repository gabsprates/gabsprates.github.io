import React from "react"

const socialShapes = {
  github: {
    url: (username: string) => `https://github.com/${username}`,
    title: (title: string) => `${title} no GitHub`,
    content: (username: string) => `${username}@github`,
  },
  twitter: {
    url: (username: string) => `https://twitter.com/${username}`,
    title: (title: string) => `${title} no Twitter`,
    content: (username: string) => `${username}@twitter`,
  },
  linkedin: {
    url: (username: string) => `https://br.linkedin.com/in/${username}`,
    title: (title: string) => `${title} no LinkedIn`,
    content: (username: string) => `${username}@linkedin`,
  },
}

export const Footer = ({ title, social, siteUrl, description }) => {
  return (
    <footer className="site-footer">
      <div className="wrapper">
        <h2 className="footer-heading">{title}</h2>

        <div className="footer-col-wrapper">
          <div className="footer-col footer-col-1">
            <ul className="contact-list">
              {Object.keys(social).map(network => (
                <li key={network}>
                  <a
                    href={socialShapes[network].url(social[network])}
                    title={socialShapes[network].title(title)}
                    target="_blank"
                  >
                    {socialShapes[network].content(social[network])}
                  </a>
                </li>
              ))}

              <li>
                <a href={siteUrl} title="Meu site" target="_blank">
                  {siteUrl.replace(/^https?\:\/\//, "")}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-col-3">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
