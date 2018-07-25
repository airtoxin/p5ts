const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "production",
  entry: "./src/index.ts",
  plugins: [new HtmlWebpackPlugin()]
};

module.exports = config;
