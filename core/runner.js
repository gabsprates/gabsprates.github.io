const path = require("path");
const { paths } = require("./constants");
const { loadPosts } = require("./posts");
const fs = require("fs-extra");

const copyAssets = async () => {
  const publicAssets = path.resolve(paths.public, "assets");
  await fs.copy(paths.assets, publicAssets, {
    overwrite: true,
    recursive: true,
  });
};

const copyFavicon = async () => {
  const favicon = "favicon.ico";
  const faviconSrc = path.resolve(paths.rootPath, favicon);
  const faviconDest = path.resolve(paths.public, favicon);
  await fs.copy(faviconSrc, faviconDest, { overwrite: true });
};

/**
 * @param {string[]} styles
 */
const copyStyle = async (styles) => {
  styles
    .filter((path) => /\.css$/.test(path))
    .forEach(async (style) => {
      const distStyle = path.resolve(paths.dist, style);
      const publicStyle = path.resolve(paths.public, style);

      await fs.copy(distStyle, publicStyle, {
        overwrite: true,
        recursive: true,
      });
    });
};

/**
 * @param {Error} err
 * @param {webpack.Stats} stats
 */
const runner = async (err, stats) => {
  if (err || stats.hasErrors()) {
    throw err || stats.compilation.errors;
  }

  try {
    const { assetsByChunkName } = stats.toJson();

    const { site, renderer, getPostLink, pathToPostParams } = require(paths
      .bundles.main);
    const { feed } = require(paths.bundles.feed);
    const posts = loadPosts();

    /**
     * @param {string[]} links
     * @param {boolean} withIndexHTML
     */
    const generatePages = async (links, withIndexHTML) => {
      links.forEach(async (url) => {
        const result = await renderer({
          url,
          site,
          posts,
          stats,
        });

        const html = `<!DOCTYPE html>${result.html}`;
        const pathsToResolve = [paths.public, url.substr(1)];
        if (withIndexHTML) pathsToResolve.push("index.html");
        const outputPath = path.resolve(...pathsToResolve);

        await fs.outputFile(outputPath, html);
      });
    };

    const generateFeed = async () => {
      const content = feed(posts);
      await fs.outputFile(path.resolve(paths.public, "feed.xml"), content);
    };

    await copyStyle((assetsByChunkName && assetsByChunkName.style) || []);
    await copyAssets();
    await copyFavicon();

    const postLinks = Object.keys(posts).map((post) =>
      getPostLink(pathToPostParams(post))
    );

    // generate posts
    await generatePages(postLinks);

    // generate pages
    await generatePages(Object.values(site.pages), true);

    await generateFeed();

    console.log("deu bom 👍");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports.runner = runner;
