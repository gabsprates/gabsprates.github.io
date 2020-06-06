import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { Stats } from "webpack";
import { Html, Body } from "./ts/html";
import { SiteContext } from "./ts/context/site";
import { getCssFromChunk } from "./ts/lib/css";
import { Helmet } from "react-helmet";

type RendererProps = {
  url: string;
  site: SiteConfig;
  posts: BlogPosts;
  stats: Stats;
};

export const renderer = async ({ url, site, posts, stats }: RendererProps) => {
  const styles = getCssFromChunk(stats.toJson().assetsByChunkName?.style);

  try {
    const WrapperApp = (
      <StaticRouter location={url}>
        <SiteContext.Provider value={{ ...site, posts }}>
          <Body />
        </SiteContext.Provider>
      </StaticRouter>
    );

    const content = renderToString(WrapperApp);
    const helmet = Helmet.renderStatic();

    const html = renderToStaticMarkup(
      <Html body={content} helmet={helmet} styles={styles} />
    );

    return { html };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export { site } from "../config/site";
export { getPostLink, pathToPostParams } from "./ts/lib/post";
