import { configure } from '@storybook/react';
import 'loki/configure-react';
import { action } from '@storybook/addon-actions';

import '../src/css/style.css';

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module);

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {}
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';

// Fix for error when importing Link from gatsby
// https://github.com/gatsbyjs/gatsby/issues/10668
global.__BASE_PATH__ = '';

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
};
// configure(loadStories, module);
