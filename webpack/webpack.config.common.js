import path from 'path';

export default {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=8192'
      }
    ]
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../src/styles'),
      path.resolve(__dirname, '../server')
    ],

    extensions: ['.js', '.json', '.jsx', '.css']
  }
};
