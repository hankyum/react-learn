import path from 'path';
import webpackMerge from 'webpack-merge';
import commonConfig from './webpack.config.common';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'; // eslint-disable-line no-unused-vars
import ExtractTextPlugin from "extract-text-webpack-plugin";
import AssetsPlugin from 'assets-webpack-plugin';

export default webpackMerge(commonConfig, {
  name: 'client',
  devtool: 'source-map',
  target: 'web',
  context: path.resolve(__dirname, '../src'),

  entry: {
    client: [
      './client.js'
    ]
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // Extract Text Plugin not work with external style antd.
        // test: /\.less$/,
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'less-loader']
        // })
      }
    ]
  },

  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../build/public'),
    publicPath: '/'
  },

  plugins: [
    // new BundleAnalyzerPlugin(), // Uncomment this line to analyze the size of your bundle
    // new ExtractTextPlugin("style.css"),

    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.json',
      prettyPrint: true,
    }),

    // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
    // https://webpack.js.org/plugins/commons-chunk-plugin/
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: module => /node_modules/.test(module.resource),
    // }),
  ]


});
