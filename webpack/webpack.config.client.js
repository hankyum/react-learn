import webpack from 'webpack';
import path from 'path';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackMerge from 'webpack-merge';
import commonConfig from './webpack.config.common';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'; // eslint-disable-line no-unused-vars
import ExtractTextPlugin from "extract-text-webpack-plugin";
const cssExtract =  new ExtractTextPlugin("style.css");

export default webpackMerge(commonConfig, {
  name: 'client',
  devtool: 'source-map',
  target: 'web',
  context: path.resolve(__dirname, '../src'),

  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './client.js'
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssExtract.extract({
          fallback: 'style-loader',
          use: ["css-loader"]
        })
      }
    ]
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new BundleAnalyzerPlugin(), // Uncomment this line to analyze the size of your bundle
    new HtmlWebpackHarddiskPlugin(),
    cssExtract,
    new HtmlWebpackPlugin({
      title: 'Server Side Rendering of React Redux v15',
      appMountId: 'react-root',
      appMountContent: '<%- html %>',
      window: {
        __PRELOADED_STATE__: '<%- reduxState %>'
      },
      template: 'assets/templates/index.ejs',
      filename: 'index.ejs',
      style: 'style.css',
      inject: false,
      mobile: true,
      alwaysWriteToDisk: true,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      }
    })
  ]
});
