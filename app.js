import React, { Component } from "react";
import ReactDom from "react-dom";
import MyRouter, {routes} from "./js/routes/AppRoute";

const c = document.createElement("div");
c.setAttribute("id", "root");
document.body.appendChild(c);
import {Router, Route} from 'react-router';

ReactDom.render(<MyRouter/>
, document.getElementById("root"));