import React from 'react';
import { storiesOf } from '@storybook/react';

import '../css/style.css';

import ComponentExample from './ComponentExample';

storiesOf(`ComponentExample`, module).add(`Default`, () => (
  <ComponentExample
    cardTag="div"
    url="#"
    componentName="Button"
    designSystemName="Example Design System"
    designSystemOrganisation="ExampleCorp"
    features={['Feature 1', 'Feature 2']}
  />
));
