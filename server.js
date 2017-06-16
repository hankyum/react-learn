const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const config = require('./webpack.config')
const path = require("path");

const app = express()
const compiler = webpack(config)
const port = process.env.NODE_PORT || 3000

app.set('views', path.join(__dirname, './dist'));
app.set('view engine', 'ejs');

app.use(webpackDevMiddleware(compiler))
// NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')))
app.use(webpackHotServerMiddleware(compiler))

app.listen(port, () => console.log(`=== Go to http://localhost:${port} ===`))
