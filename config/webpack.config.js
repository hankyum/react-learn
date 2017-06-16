import path from "path";
import webpack from "webpack";
const dist = path.resolve(__dirname, "/static/");

export default {
  name: "client",
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './src/client.js'
  ],
  output: {
    filename: 'bundle.js',
    path: dist,
    publicPath: "/static/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          'css-loader?modules'
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: 'url?limit=8192'
      }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../server')
    ],
    extensions: ['.js', '.json', '.jsx', '.css']
  }
};