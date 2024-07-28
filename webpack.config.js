const path = require("path");
const html = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    factories: "./src/factories.js",
    main: "./src/index.js",
    gui: "./src/gui.js",
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundled.js",
  },
  devServer: {
    static: { directory: path.resolve(__dirname, "dist") },
    port: 5000,
  },
  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.{png|jpg|jpeg}$/i, type: "asset/resource" },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  plugins: [new html({ template: "./src/index.html" })],
};
