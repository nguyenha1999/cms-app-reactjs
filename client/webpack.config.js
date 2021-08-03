const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

const fs = require("fs")
const directoryPath = path.resolve("public")


const handleDir = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject("Unable to scan directory: " + err)
      }
      resolve(files)
    })
  })
}


module.exports = async (env, agrv) => {

  const isDev = agrv.mode === "development"
  const isAnalyze = env && env.analyze
  const dirs = await handleDir()

  const copyPluginPatterns = dirs
    .filter(dir => dir !== "index.html")
    .map(dir => {
      return {
        from: dir,
        to: "public",
        context: path.resolve("public")
      }
    })


  const basePlugins = [
    new Dotenv(),


    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),


    new CopyWebpackPlugin({
      patterns: copyPluginPatterns
    }),


    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "static/css/[name].[contenthash:6].css"
    }),

    new webpack.ProvidePlugin({
      "React": "react",
    }),

    new ErrorOverlayPlugin(),

    new webpack.ProgressPlugin()
  ]

  let prodPlugins = [
    ...basePlugins,
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      test: /\.(css|js|html|svg)$/
    })
  ]

  if (isAnalyze) {
    prodPlugins = [...prodPlugins, new BundleAnalyzerPlugin()]
  }


  return {
    entry: "./src/index.js",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: ["ts-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.(s[ac]ss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { sourceMap: isDev ? true : false }
            },
            {
              loader: "sass-loader",
              options: { sourceMap: isDev ? true : false }
            }
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: isDev ? "[path][name].[ext]" : "static/fonts/[name].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2|wav|mp3|icon)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: isDev
                  ? "[path][name].[ext]"
                  : "static/media/[name].[contenthash:6].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2|wav|mp3|icon)$/i,
          use: {
            loader: 'url-loader',
          },
        },
      ]
    },

    output: {
      path: path.resolve("build"),
      publicPath: "/",
      filename: "static/js/main.[contenthash:6].js",
      environment: {
        arrowFunction: false,
        bigIntLiteral: false,
        const: false,
        destructuring: false,
        dynamicImport: false,
        forOf: false,
        module: false
      }
    },

    devtool: isDev ? "source-map" : false,

    devServer: {
      contentBase: "public",
      port: 3001,
      hot: true,
      watchContentBase: true,
      historyApiFallback: true,
      open: true,
      overlay: true
    },

    plugins: isDev ? basePlugins : prodPlugins,

    performance: {
      maxEntrypointSize: 800000
    }
  }
}