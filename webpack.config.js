const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "src/script.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: "LineModal",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "production",
}