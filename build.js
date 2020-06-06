const webpack = require("webpack");
const config = require("./webpack.config");
const { runner } = require("./core/runner");

const compiler = webpack(config, runner);
