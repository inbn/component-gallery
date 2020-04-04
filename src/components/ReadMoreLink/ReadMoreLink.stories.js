import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import ReadMoreLink from './ReadMoreLink';

storiesOf(`ReadMoreLink`, module)
  .addDecorator(withSmartKnobs())
  .addDecorator(withKnobs())
  .add(`Default`, () => (
    <ReadMoreLink to="https://example.com" text="Read more" />
  ));
