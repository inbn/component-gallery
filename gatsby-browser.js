/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react';

import App from './src/components/App';

require('./src/css/prism-theme.css');

export const wrapRootElement = ({ element }) => <App>{element}</App>;

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
