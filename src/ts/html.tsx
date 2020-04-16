import React from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Switch, Route } from "react-router-dom";
import { PAGES } from "../../config/pages";
import { Post } from "./pages/post";

type PropsType = {
  styles: string[];
};

const POST_PATH =
  "/:year([0-9]{4})/:month([0-9]{2})/:day([0-9]{2})/:post([a-zA-Z0-9-_]+).html";

export const Html = (props: PropsType) => (
  <html lang="pt-br">
    <head>
      <meta charSet="UTF-8" />
      {/* @TODO seo (title + metatags + json-ld) */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#406b63" />
      {props.styles.map((path) => (
        <link key={path} rel="stylesheet" href={`/${path}`} />
      ))}
      <link type="image/x-icon" rel="shortcut icon" href="/favicon.ico" />

      {/* @TODO feed rss */}

      <link
        href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
        rel="stylesheet"
      />
    </head>
    <body>
      <Header />

      <div className="page-content">
        <main className="wrapper">
          <Switch>
            <Route path={PAGES.home} exact={true}>
              <h1>
                ########################## posts #########################
              </h1>
            </Route>
            <Route path={PAGES.about} exact={true}>
              <h1>
                ########################## sobre mim #########################
              </h1>
            </Route>
            <Route path={PAGES.projects} exact={true}>
              <h1>
                ########################## projetos #########################
              </h1>
            </Route>

            <Route path={POST_PATH} exact={true} component={Post} />

            <Route>
              <h1>not found</h1>
            </Route>
          </Switch>
        </main>
      </div>

      <Footer />

      <script
        id="dsq-count-scr"
        src="//gabsprates.disqus.com/count.js"
        async={true}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-92988633-1', 'auto');
ga('send', 'pageview');`,
        }}
      />
    </body>
  </html>
);
