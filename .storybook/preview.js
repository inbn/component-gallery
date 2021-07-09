import 'loki/configure-react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import Helmet from 'react-helmet';

import '../src/css/style.css';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      // Full list of icons in node_modules/@storybook/components/dist/icon/icons.js
      // icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
    },
  },
};

const withThemeProvider = (Story, context) => {
  return (
    <>
      <Helmet htmlAttributes={{ class: context.globals.theme }} />
      <Story {...context} />
    </>
  );
};

export const decorators = [withThemeProvider];

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';

// Fix for error when importing Link from gatsby
// https://github.com/gatsbyjs/gatsby/issues/10668
global.__BASE_PATH__ = '';

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};
// configure(loadStories, module);
