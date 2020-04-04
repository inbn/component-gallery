import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import Badge from './Badge';

storiesOf(`Badge`, module)
  .addDecorator(withSmartKnobs())
  .addDecorator(withKnobs())
  .add(`Text only`, () => <Badge text="Hi, I’m a Badge" />)
  .add(`With icon`, () => <Badge text="Accessibility" displayIcon />);
