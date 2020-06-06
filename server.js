const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const { paths } = require("./core/constants");

const app = express();
const config = require("./webpack.config");
const compiler = webpack(config);
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  writeToDisk: true,
  serverSideRender: true,
});

const loadPostsMiddleware = (_req, res, next) => {
  res.$POSTS = require("./core/posts").loadPosts();
  next();
};

app.use(loadPostsMiddleware);
app.use(devMiddleware);

app.use("/assets", express.static(paths.assets));
app.use(
  "/favicon.ico",
  express.static(path.resolve(paths.assets, "favicon.ico"))
);

app.get("/feed.xml", (req, res) => {
  try {
    delete require.cache[require.resolve(paths.bundles.feed)];
    const { feed } = require(paths.bundles.feed);

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
    delete require.cache[require.resolve(paths.bundles.main)];
    const { site, renderer } = require(paths.bundles.main);

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
});
