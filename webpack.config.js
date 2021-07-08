const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "production",
  entry: "./src/index.ts",
  externals: ["p5", "ccapture.js"],
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "src/index.html",
    }),
    new CopyWebpackPlugin([
      "node_modules/p5/lib/p5.min.js",
      "node_modules/gif.js/dist/gif.js",
      "node_modules/gif.js/dist/gif.worker.js",
      "node_modules/ccapture.js/build/CCapture.all.min.js",
    ]),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};

module.exports = config;
