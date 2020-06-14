const path = require("path");
const GasWebpackPlugin = require("gas-webpack-plugin");
  
module.exports = {
  entry: "./src/sample.ts",
  output: {
    filename: "sample.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new GasWebpackPlugin()],
};
