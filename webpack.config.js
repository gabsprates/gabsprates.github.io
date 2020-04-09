const path = require("path");
const nodeExternals = require("webpack-node-externals");

/** @const {webpack.Configuration} */
const config = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/middleware.tsx"),
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
        use: [
          "style-loader",
          {
            loader: "typings-for-css-modules-loader",
            options: {
              modules: true,
              namedExport: true,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    libraryTarget: "commonjs2",
  },
};

module.exports = config;
