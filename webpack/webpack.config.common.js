import path from 'path';

export default {
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      }, {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=8192'
      }
    ]
  },

  // ant需要
  resolve: {
    modules: ['node_modules', path.join(__dirname, './node_modules')],
    extensions: ['.web.js', '.js', '.json', '.jsx', '.css']
  }
};
