const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config");
const compiler = webpack(config);

const PORT = 4000;

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    writeToDisk: true,
    serverSideRender: true,
  })
);

app.get("/favicon.ico", (req, res) => {
  res.send("tem favicon.ico");
});

app.get("/*", (req, res) => {
  /** @const {webpack.Stats} */
  const stats = res.locals.webpackStats.toJson();

  try {
    const modulePath = path.resolve(
      stats.outputPath,
      stats.assetsByChunkName.main
    );

    delete require.cache[require.resolve(modulePath)];
    const { renderer } = require(modulePath);

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
