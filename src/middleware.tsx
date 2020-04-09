import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Request, Response } from "express";

import { App } from "./index";

export const renderer = async (req: Request, res: Response) => {
  const staticContext = {
    statusCode: 200,
  };

  try {
    const WrapperApp = (
      <StaticRouter location={req.url} context={staticContext}>
        <App />
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
