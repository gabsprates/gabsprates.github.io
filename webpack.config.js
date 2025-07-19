const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { paths } = require("./core/constants");

/** @const {webpack.Configuration} */
const config = {
  mode: "development",
  entry: {
    feed: path.resolve(__dirname, "./src/feed/index.tsx"),
    main: path.resolve(__dirname, "./src/renderer.tsx"),
    style: path.resolve(__dirname, "./src/scss/main.scss"),
  },
  target: "node",
  devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
  externals: [nodeExternals()],

  devServer: {
    static: paths.dist,
  },

  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    extensions: [".ts", ".tsx", ".mjs", ".js", ".json", ".scss"],
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(mjs|jsx?)$/,
        use: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", { loader: "ts-loader" }],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                style: "compressed",
              },
            },
          },
        ],
      },
      {
        test: /\.(md|markdown)$/,
        use: "raw-loader",
      },
    ],
  },

  plugins: [new MiniCssExtractPlugin()],

  output: {
    path: paths.dist,
    publicPath: "/",
    libraryTarget: "commonjs2",
  },
};

module.exports = config;
