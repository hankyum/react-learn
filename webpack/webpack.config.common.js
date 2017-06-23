import path from 'path';

export default {
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": [
              "es2015",
              "stage-0",
              "react"
            ],
            "plugins": [
              [
                "import",
                {
                  "style": "css",
                  "libraryName": "antd"
                }
              ],
              [
                "css-modules-transform"
              ]
            ]
          }
        }],
        exclude: /node_modules/
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      }, {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=8192'
      }, {
        // test: /\.css$/,
        // use: ExtractTextPlugin.extract({
        //   fallback: 'isomorphic-style-loader',
        //   use: [{
        //     loader: "css-loader",
        //     query: {
        //       modules: true
        //     }
        //   }]
        // })
      }
    ]
  },

  // ant需要
  resolve: {
    modules: ['node_modules', path.join(__dirname, './node_modules')],
    extensions: ['.web.js', '.js', '.json', '.jsx', '.css']
  }
};
