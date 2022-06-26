const path = require("path");
const deps = require("./package.json").dependencies;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
// const webpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  output: { publicPath: "http://localhost:3000/", filename: "index.bundle.js" },
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /bootstrap\.js$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "public"),
    },

    hot: true,
    historyApiFallback: { index: "index.html" },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // new webpackPwaManifest(),
    new ModuleFederationPlugin({
      name: "container",

      remotes: {
        app1: "app1@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,

          requiredVersion: deps["react-dom"],
        },
        // react: { singleton: true, requiredVersion: deps.react },
        // "react-dom": {
        //   singleton: true,

        //   requiredVersion: deps["react-dom"],
        // },
      },
    }),
  ],
};
