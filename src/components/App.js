import React from 'react'
import { canUseDOM } from "exenv";
import { Provider } from 'react-redux'
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom'
import Header from "./Header"
import configStore from "../redux/store/configureStore";
import routes from "./routes";
import { REDUX_INIT_STATE } from '../config';
import { Layout } from 'antd';
const { Content } = Layout;
import "../styles/app.css";
// import "antd/dist/antd.css";

const RouteApp = (
  <Switch>
    <Layout>
      <Header/>
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        <div className="main-content">
          { routes.map(route => <Route key={ route.path } { ...route } />) }
        </div>
      </Content>
    </Layout>
  </Switch>
);

export default ({ server, location = "/", context = {}, store }) => {
  return (
    <div>
      <Provider store={store || configStore(canUseDOM && window[REDUX_INIT_STATE] || {})}>
        {
          server ?
            (
              <StaticRouter location={location} context={context}>
                {RouteApp}
              </StaticRouter>) :
            (
              <BrowserRouter>
                {RouteApp}
              </BrowserRouter>
            )
        }
      </Provider>
    </div>
  )
};




