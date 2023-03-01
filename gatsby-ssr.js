/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';
import Terser from 'terser';
import { QueryParamProvider } from 'use-query-params';

import { COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP } from './src/constants';

import App from './src/components/App';

import { GatsbyAdapter } from './src/utils/adaptor';

function setColorsByTheme() {
  const colorModeKey = '🔑';
  const colorModeCssProp = '⚡️';

  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const prefersDarkFromMQ = mql.matches;
  const persistedPreference = localStorage.getItem(colorModeKey);

  let colorMode = 'light';

  const hasUsedToggle = typeof persistedPreference === 'string';

  if (hasUsedToggle) {
    colorMode = persistedPreference;
  } else {
    colorMode = prefersDarkFromMQ ? 'dark' : 'light';
  }

  const root = document.documentElement;
  if (colorMode === 'dark') root.classList.add('dark');
  root.style.setProperty(colorModeCssProp, colorMode);
}

const ThemeHydrationScriptTag = () => {
  const boundFn = String(setColorsByTheme)
    .replace('🔑', COLOR_MODE_KEY)
    .replace('⚡️', INITIAL_COLOR_MODE_CSS_PROP);

  const calledFunction = `(${boundFn})()`;

  // calledFunction = Terser.minify(calledFunction).code;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ThemeHydrationScriptTag />);
};

export const wrapPageElement = ({ element, props }) => (
  <QueryParamProvider
    adapter={GatsbyAdapter}
    options={{ enableBatching: true }}
  >
    <App {...props}>{element}</App>
  </QueryParamProvider>
);
