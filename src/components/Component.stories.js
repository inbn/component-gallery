import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import '../css/style.css';

import Component from './Component';

storiesOf(`Component`, module)
  .addDecorator(withSmartKnobs())
  .addDecorator(withKnobs())
  .add(`Default`, () => (
    <Component
      name="Accordion"
      otherNames="Collapsible sections, Arrow toggle, Expander, Disclosure, ShowyHideyThing"
      cardTag="div"
      slug="accordion"
      examplesCount={28}
      description="An accordion is a vertical stack of interactive headings used to toggle the display of further information; each item can be 'collapsed', with just a short label visible; or 'expanded' to show the complete content."
    />
  ));
