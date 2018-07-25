const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "production",
  entry: "./src/index.ts",
  externals: ["p5"],
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "src/index.html"
    }),
    new CopyWebpackPlugin([
      "node_modules/p5/lib/p5.min.js"
    ]),
  ],
  resolve: {
    extensions: [".ts", ".js"]
  }
};

module.exports = config;
