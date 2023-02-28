/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react';
import { QueryParamProvider } from 'use-query-params';

import App from './src/components/App';

import { GatsbyAdapter } from './src/utils/adaptor';

require('./src/css/prism-theme.css');

export const wrapPageElement = ({ element }) => (
  <QueryParamProvider
    adapter={GatsbyAdapter}
    options={{ enableBatching: true }}
  >
    {element}
  </QueryParamProvider>
);

// TODO remove this if gatsby-plugin-use-query-params is updated
// See: https://github.com/alexluong/gatsby-packages/issues/33
export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  // hack to override `shouldUpdateScroll` behavior to bypass useQueryParams in product-checkout
  if (
    location.search.includes('features=') ||
    location.search.includes('tech=')
  ) {
    return false;
  }
  const currentPosition = getSavedScrollPosition(location);
  return currentPosition || [0, 0];
};
