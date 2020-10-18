import React, { useContext } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Switch, Route } from "react-router-dom";
import { Post } from "./pages/post";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { HelmetData } from "react-helmet";
import { SiteContext } from "./context/site";
import { Podcast } from "./pages/podcast";

type PropsType = {
  body: string;
  helmet: HelmetData;
  styles: string[];
};

const POST_PATH =
  "/:year([0-9]{4})/:month([0-9]{2})/:day([0-9]{2})/:post([a-zA-Z0-9-_]+).html";

export const Html = (props: PropsType) => (
  <html lang="pt-br" {...props.helmet.htmlAttributes.toComponent()}>
    <head>
      <meta charSet="UTF-8" />
      {props.helmet.title.toComponent()}
      {props.helmet.meta.toComponent()}
      {props.helmet.link.toComponent()}
      {props.helmet.script.toComponent()}

      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#406b63" />
      {props.styles.map((path) => (
        <link key={path} rel="stylesheet" href={`/${path}`} />
      ))}
      <link type="image/x-icon" rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Gabriel Prates"
        href="http://gabrielprates.com/feed.xml"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
        rel="stylesheet"
      />
    </head>

    <body
      {...props.helmet.bodyAttributes.toComponent()}
      dangerouslySetInnerHTML={{ __html: props.body }}
    />
  </html>
);

export const Body = () => {
  const site = useContext(SiteContext);

  return (
    <React.Fragment>
      <Header />

      <div className="page-content">
        <main className="wrapper">
          <Switch>
            <Route path={site.pages.home} exact={true} component={Home} />
            <Route path={site.pages.about} exact={true} component={About} />
            <Route path={site.pages.projects} exact={true}>
              <h1>Projetos</h1>
              <p>Em contrução 👷‍♂️</p>
            </Route>
            <Route path={site.pages.podcast} exact={true} component={Podcast} />

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
    </React.Fragment>
  );
};
