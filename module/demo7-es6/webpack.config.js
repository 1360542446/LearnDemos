const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    publicPath: 'dist/'
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool:'source-map',
  mode:'development'
};
