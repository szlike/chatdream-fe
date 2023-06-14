import path  from "path"
import webpack from "webpack"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      }
    ]
  },
  resolve: { 
    extensions: [".*", ".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    // contentBase
    static : {
      directory : path.join(__dirname, "public/")
    },
    port: 3000,
    // publicPath
    devMiddleware:{
        publicPath: "https://localhost:3000/dist/",
    },
    watchFiles: ['src/**/*'],
    // hotOnly
    hot: "only",
  },
  devtool : 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()]
};