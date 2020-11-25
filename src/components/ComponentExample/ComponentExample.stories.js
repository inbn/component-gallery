import React from 'react';
import { Grid } from '../../../.storybook/decorators';
import Component from './ComponentExample';

export default {
  title: 'ComponentExample',
  component: Component,
  decorators: [Grid]
};

const Template = args => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  cardTag: 'div',
  url: '#',
  componentName: 'Button',
  designSystemName: 'Example Design System',
  designSystemOrganisation: 'ExampleCorp',
  features: ['Feature 1', 'Feature 2']
};
