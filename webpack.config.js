const webpack = require("webpack");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const path = require("path");

const plugins = [
  new webpack.DefinePlugin({
    DEBUG: JSON.stringify(true),
  }),
  new WebpackBuildNotifierPlugin({
    title: "Time Logger Build",
  }),
];

module.exports = {
  mode: "development",
  watch: true,
  entry: {
    index: ["./web/bootstrap.js"],
  },
  output: {
    path: path.join(__dirname, ".tmp"),
    publicPath: "/",
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins,
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
  },
};
