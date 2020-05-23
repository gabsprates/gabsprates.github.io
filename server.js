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

const PORT = 4000;

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

devMiddleware.waitUntilValid((webpackStats) => {
  const stats = webpackStats.toJson();

  process.env.MODULE_MAIN_PATH = path.resolve(
    stats.outputPath,
    stats.assetsByChunkName.main
  );

  if (process.env.BUILD_STATIC) generateStatic();
});

app.use("/assets", express.static("./assets"));

app.use("/favicon.ico", express.static("./assets/favicon.ico"));

app.get("/*", (req, res) => {
  try {
    delete require.cache[require.resolve(process.env.MODULE_MAIN_PATH)];
    const { renderer } = require(process.env.MODULE_MAIN_PATH);

    return renderer(req, res);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send("internal server error");
  }
});

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  console.log(`Server running at http://localhost:${PORT}`);
});

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
