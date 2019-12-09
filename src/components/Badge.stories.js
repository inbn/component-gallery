import React from 'react';
import { storiesOf } from '@storybook/react';

import '../css/style.css';

import Badge from './Badge';

storiesOf(`Badge`, module)
  .add(`Text only`, () => <Badge text="Hi, I’m a Badge" />)
  .add(`With icon`, () => <Badge text="Accessibility" displayIcon />);
