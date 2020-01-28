module.exports = [
  {
    mode: "production",
    entry: "./public/electron.ts",
    target: "electron-main",
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /public/,
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.development.json"
          }
        }
      ]
    },
    output: {
      path: __dirname + "/public",
      filename: "electron.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    node: {
      __dirname: false // Webpack replaces __dirname with /
    }
  }
];
