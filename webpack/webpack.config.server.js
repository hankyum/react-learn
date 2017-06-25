import path from 'path';
import webpackMerge from 'webpack-merge';
import commonConfig from './webpack.config.common';
import NodeExternals from 'webpack-node-externals';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'; // eslint-disable-line no-unused-vars

export default webpackMerge(commonConfig, {
  name: 'server',

  entry: {
    server: ['./src/server.js'],
  },

  context: path.resolve(__dirname, '../'),

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../build'),
    libraryTarget: 'commonjs2'
  },

  target: 'node', // in order to ignore built-in modules like path, fs, etc.

  module: {
    rules: [{
      test: /\.css$/,
      use: ['isomorphic-style-loader', 'css-loader']
    }]
  },

  externals: [
    './assets.json',
    NodeExternals({
      whitelist: [
        /\.(css|less|scss|sss)$/i,
      ],
    }),
    NodeExternals({
      whitelist: [/^redux\/(store|modules)/]
    })
  ], // in order to ignore all modules in node_modules folder

  node: {
    __dirname: false
  },

  plugins: [
    // new BundleAnalyzerPlugin() // Uncomment this line to analyze the size of your bundle
  ]
});
