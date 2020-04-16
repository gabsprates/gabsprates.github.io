import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";

import { Stats } from "webpack";
import MemoryFileSystem from "memory-fs";
import { Request, Response } from "express";

import { Html } from "./ts/html";
import { site } from "./../config/site";
import { SiteContext } from "./ts/context/site";
import { getCssFromChunk } from "./ts/lib/css";

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
          <Html styles={styles} />
        </SiteContext.Provider>
      </StaticRouter>
    );

    const html = renderToString(WrapperApp);

    res.setHeader("Content-Type", "text/html");
    res.status(staticContext.statusCode);
    res.send(`<!DOCTYPE html>${html}`);
    res.end();
  } catch {
    process.exit(1);
  }
};
