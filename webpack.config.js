import path from "path";
import webpack from "webpack";
import WebpackErrorNotificationPlugin from "webpack-error-notification";

const host = process.env.HOST || "localhost";
const port = (process.env.PORT + 1) || 3001;
const dist = path.resolve(__dirname, "/static/");

export default {
  /* entry: {
   dev: [
   "webpack-dev-server/client?http://" + host + ":" + port,
   'webpack/hot/only-dev-server'
   ],
   app: './app',
   vendor: [
   'react',
   'react-router',
   'redux',
   'react-dom',
   'bluebird',
   'history'
   ]
   }*/
  entry: [
    "webpack-dev-server/client?http://" + host + ":" + port,
    'webpack/hot/only-dev-server',
    './app.js'
  ],
  output: {
    filename: 'bundle.js',
    path: dist,
    publicPath: "/static/"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'vendor',
    //  filname: 'vendor.js'
    //}),
    //new webpack.DefinePlugin({
    //  "process.env": {
    //    NODE_ENV: JSON.stringify("development"),
    //    BROWSER: JSON.stringify(true)
    //  }
    //}),
    new WebpackErrorNotificationPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee']
  }
};