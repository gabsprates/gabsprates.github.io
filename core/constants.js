const path = require("path");

const dist = path.resolve(__dirname, "../dist");
const posts = path.resolve(__dirname, "../posts");

const bundles = {
  feed: path.resolve(dist, "feed"),
  main: path.resolve(dist, "main"),
};

module.exports = {
  paths: {
    dist,
    posts,
    bundles,
  },
};
