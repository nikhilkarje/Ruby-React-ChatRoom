const path = require("path");

module.exports = {
  mode: "production",

  entry: {
    new: "./src/index.tsx",
    room: "./src/room.tsx",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    modules: [path.resolve("./src"), path.resolve("./node_modules")],
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules|backend/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "backend/public/static"),
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM"
  // }
};
