require("babel-register");

import  express from 'express';
import  webpack from 'webpack';
import  webpackDevMiddleware from 'webpack-dev-middleware';
import  webpackHotMiddleware from 'webpack-hot-middleware';
import  webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import  config from './webpack.config';
import  path from 'path';

const  app = express();
const  compiler = webpack(config);
const  port = process.env.NODE_PORT || 3000;

app.set('views', path.join(__dirname, './dist'));
app.set('view engine', 'ejs');

app.use(webpackDevMiddleware(compiler));
// NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

app.listen(port, () => console.log(`=== Go to http://localhost:${port} ===`))
