/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import fetch from 'isomorphic-fetch';

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch({ baseUrl, cookie, method = "GET" }) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: method, // handy with GraphQL backends
    // mode: baseUrlUrl ? 'cors' : 'same-origin',
    // credentials: baseUrl ? 'include' : 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : null),
    },
  };

  return (url, options) => ((url.startsWith('/graphql') || url.startsWith('/api')) ?
    fetch(`${baseUrl}${url}`, {
      ...defaults,
      ...options,
      headers: {
        ...defaults.headers,
        ...(options && options.headers),
      },
    }) : fetch(url, options));
}

export const get = createFetch({ baseUrl: "http://localhost:8001" });
export const post = createFetch({ baseUrl: "http://localhost:8001", method: "POST"});
export const put = createFetch({ baseUrl: "http://localhost:8001", method: "PUT"});
export const del = createFetch({ baseUrl: "http://localhost:8001", method: "DELETE"});
export default get;
