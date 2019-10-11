import React from 'react';
import { storiesOf } from '@storybook/react';

import '../css/style.css';

import ReadMoreLink from './ReadMoreLink';

storiesOf(`ReadMoreLink`, module).add(`default`, () => (
  <ReadMoreLink to="https://example.com" text="Read more" />
));
