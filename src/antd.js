import React from "react";
import ReactDom from "react-dom";
import APP from "./components/App";

ReactDom.render(<APP/>, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept();
}