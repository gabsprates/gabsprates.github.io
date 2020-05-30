const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @const {webpack.Configuration} */
const config = {
  mode: "development",
  entry: {
    feed: path.resolve(__dirname, "./src/feed/index.tsx"),
    main: path.resolve(__dirname, "./src/renderer.tsx"),
    style: path.resolve(__dirname, "./src/scss/main.scss"),
  },
  target: "node",
  devtool: "inline-source-map",
  externals: [nodeExternals()],

  devServer: {
    contentBase: "./dist",
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(md|markdown)$/,
        use: "raw-loader",
      },
    ],
  },

  plugins: [new MiniCssExtractPlugin()],

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    libraryTarget: "commonjs2",
  },
};

module.exports = config;
