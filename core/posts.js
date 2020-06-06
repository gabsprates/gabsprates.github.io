const fs = require("fs");
const path = require("path");

const {
  paths: { posts },
} = require("./constants");

const loadPosts = () =>
  fs.readdirSync(posts, { encoding: "utf-8" }).reduce((prev, post) => {
    prev[post] = path.resolve(posts, post);
    return prev;
  }, {});

module.exports = {
  loadPosts,
};
