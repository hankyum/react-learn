import express from "express";
//var ReactDom = require("react-dom/server");
//var Router = require("react-router");
//var routes = require("./js/routes/AppRoute");

var server = express();

server.use(function(req, res) {
  console.log("hello");
});

server.listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});