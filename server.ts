import path from "path";
import express from "express";
import { paths } from "./core/constants";

const app = express();

app.use(function loadPostsMiddleware(_req, res, next) {
  res.$POSTS = require("./core/posts").loadPosts();
  next();
});

app.use("/assets", express.static(paths.assets));
app.use(
  "/favicon.ico",
  express.static(path.resolve(paths.assets, "favicon.ico"))
);
app.use("/style.css", express.static(path.resolve(paths.public, "style.css")));

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
      stats: {
        toJson() {
          return {
            assetsByChunkName: { style: ["style.css"] },
          };
        },
      },
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

const PORT = 4000;

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  console.log(`\n\n🥳 - Server running at http://localhost:${PORT}`);
});
