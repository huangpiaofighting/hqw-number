const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const config = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    libraryTarget: 'umd',  //发布组件专用
    library: 'HTool',
    path: path.resolve(__dirname, "../lib")
  },
    devtool: "inline-source-map",
//   devtool: "cheap-module-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
    stats: {
      colors: true
    }
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src/")
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/, // jsx/js文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          // loader 是 babel
          loader: "babel-loader",
          options: {
            // babel 转义的配置选项
            babelrc: false,
            presets: [
              // 添加 preset-react
              [require.resolve("@babel/preset-env"), { modules: false }],
              require.resolve("@babel/preset-react")
            ],      
            plugins: [
              require.resolve("@babel/plugin-transform-runtime"),
              require.resolve("@babel/plugin-proposal-class-properties"),
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          //   {
          //     loader: "style-loader"
          //   },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "hqw_[name]_[hash:base64:5]",
                namedExport: false
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
module.exports = config;
