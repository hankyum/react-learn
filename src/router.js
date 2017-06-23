/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import Router from 'universal-router';
import App from "./components/App";

export default new Router(App, {
  resolveRoute(context, params) {
    return <App context={context} {...params}/>;
  },
});
