const path = require("path");

const dist = path.resolve(__dirname, "../dist");
const posts = path.resolve(__dirname, "../posts");
const assets = path.resolve(__dirname, "../assets");
const public = path.resolve(__dirname, "../docs");
const rootPath = path.resolve(__dirname, "../");

const bundles = {
  feed: path.resolve(dist, "feed"),
  main: path.resolve(dist, "main"),
};

module.exports = {
  paths: {
    dist,
    posts,
    assets,
    public,
    bundles,
    rootPath,
  },
};
