const fs = require("fs");
const path = require("path");
const http = require("http");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config");
const compiler = webpack(config);
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  writeToDisk: true,
  serverSideRender: true,
});

const loadPostsMiddleware = (_req, res, next) => {
  res.$POSTS = fs
    .readdirSync("./posts", { encoding: "utf-8" })
    .reduce((prev, post) => {
      prev[post] = path.resolve(__dirname, "posts", post);
      return prev;
    }, {});

  next();
};

app.use(loadPostsMiddleware);

app.use(devMiddleware);

app.use("/assets", express.static("./assets"));

app.use("/favicon.ico", express.static("./assets/favicon.ico"));

app.get("/feed.xml", (req, res) => {
  try {
    delete require.cache[require.resolve("./dist/feed")];
    const { feed } = require("./dist/feed");

    res.type("application/xml");
    res.send(feed(res.$POSTS));
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send("internal server error");
  }
});

app.get("/*", async (req, res) => {
  try {
    delete require.cache[require.resolve("./dist/main")];
    const { site, renderer } = require("./dist/main");

    const result = await renderer({
      url: req.url,
      site,
      posts: res.$POSTS,
      stats: res.locals.webpackStats,
    });

    if (result.error) throw result.error;

    res.setHeader("Content-Type", "text/html");
    res.send(`<!DOCTYPE html>${result.html}`);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send("internal server error");
  }
});

devMiddleware.waitUntilValid((webpackStats) => {
  const PORT = 4000;

  app.listen(PORT, (err) => {
    if (err) return console.error(err);
    console.log(`\n\n🥳 - Server running at http://localhost:${PORT}`);
  });

  if (process.env.BUILD_STATIC) generateStatic();
});

// ---------------------------------------------------------------------------------------------------

const generateStatic = () => {
  // @TODO: do this right
  const { PAGES } = require("./config/pages");

  console.log("generating pages:");
  Object.keys(PAGES).forEach((page) => {
    console.log("- ", page);
    http.get(`http://localhost:4000${PAGES[page]}`, (res) => {
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          console.log(rawData);
        } catch (e) {
          console.error(e.message);
        }
      });
    });
  });
};
