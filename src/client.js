import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import { AppContainer } from 'react-hot-loader'

const rootElement = document.querySelector('#app');

const render = Component => {
  ReactDom.render(
    <AppContainer>
      <Component location={document.location.pathname}/>
    </AppContainer>,
    rootElement
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
