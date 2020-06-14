const path = require("path");

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
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
};
