import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderToString, renderToStaticMarkup } from "react-dom/server";

import { Stats } from "webpack";
import MemoryFileSystem from "memory-fs";
import { Request, Response } from "express";

import { Html, Body } from "./ts/html";
import { site } from "./../config/site";
import { SiteContext } from "./ts/context/site";
import { getCssFromChunk } from "./ts/lib/css";
import { Helmet } from "react-helmet";

interface ResponseWithWebpack extends Response {
  locals: {
    fs: MemoryFileSystem;
    webpackStats: Stats;
  };
}

export const renderer = async (req: Request, res: ResponseWithWebpack) => {
  const staticContext = {
    statusCode: 200,
  };

  const posts = (global as GlobalExtended).BLOG_POSTS;

  const styles = getCssFromChunk(
    res.locals.webpackStats.toJson().assetsByChunkName?.style
  );

  try {
    const WrapperApp = (
      <StaticRouter location={req.url} context={staticContext}>
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

    res.setHeader("Content-Type", "text/html");
    res.status(staticContext.statusCode);
    res.send(`<!DOCTYPE html>${html}`);
    res.end();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
