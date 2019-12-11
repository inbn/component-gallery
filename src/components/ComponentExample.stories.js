import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import '../css/style.css';

import ComponentExample from './ComponentExample';

storiesOf(`ComponentExample`, module)
  .addDecorator(withSmartKnobs())
  .addDecorator(withKnobs())
  .add(`Default`, () => (
    <ComponentExample
      cardTag="div"
      url="#"
      componentName="Button"
      designSystemName="Example Design System"
      designSystemOrganisation="ExampleCorp"
      features={['Feature 1', 'Feature 2']}
    />
  ));
