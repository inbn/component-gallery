import React from 'react';
import { storiesOf } from '@storybook/react';

import '../css/style.css';

import DesignSystem from './DesignSystem';

storiesOf(`DesignSystem`, module).add(`default`, () => (
  <DesignSystem
    name="Example Design System"
    url="https://example.com"
    color="#000"
    features={['Feature 1', 'Feature 2']}
    organisation="Example Organisation"
  />
));
