import  express from 'express';
import  webpack from 'webpack';
import  webpackDevMiddleware from 'webpack-dev-middleware';
import  webpackHotMiddleware from 'webpack-hot-middleware';
import  webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import  config from './webpack.config';
import  path from 'path';
import browserSync from 'browser-sync';

const server = express();

const complier = webpack(config);
const clientCompiler = complier.compilers.find(compiler => compiler.name === 'client');
const serverCompiler = complier.compilers.find(compiler => compiler.name === 'server');

server.set('views', path.join(__dirname, '../dist'));
server.set('view engine', 'ejs');

server.use(webpackDevMiddleware(clientCompiler));
// NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
server.use(webpackHotMiddleware(clientCompiler));
server.use(webpackHotServerMiddleware(complier));

require('../dist/server').default;

// Launch the development server with Browsersync and HMR
new Promise((resolve, reject) => browserSync.create().init({
  // https://www.browsersync.io/docs/options
  server: 'src/server.js',
  middleware: [server],
  open: !process.argv.includes('--silent'),
  ...isDebug ? {} : { notify: false, ui: false },
}, (error, bs) => (error ? reject(error) : resolve(bs))));