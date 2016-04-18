/**
 * Created by hguo on 4/14/16.
 */
import Express from "express";
import path from "path";
import compression from "compression";
import Promise from "bluebird";
import webpackDevServer from "./webpack-server";
import serverRender from "./serverSideRender";

const server = Express();

server.use(compression());
server.use(Express.static(path.join(__dirname, 'dist')));
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use((req, res, next) => {
  console.log("hello from es6 server code");
  next();
});

serverRender(server);

server.get("/", (req, res) => {
  res.render("index", {
    scriptSrcs: [
      "http://localhost:3001/static/bundle.js"
    ],
    reduxState: "",
    html: ""
  });
});

server.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
  webpackDevServer();
});
