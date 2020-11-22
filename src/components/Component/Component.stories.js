import React from 'react';
import Component from './Component';
import { Grid } from '../../../.storybook/decorators';

export default {
  title: 'Component',
  component: Component,
  decorators: [Grid]
};

const Template = args => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: 'Accordion',
  otherNames:
    'Collapsible sections, Arrow toggle, Expander, Disclosure, ShowyHideyThing',
  cardTag: 'div',
  slug: 'accordion',
  examplesCount: 28,
  description:
    "An accordion is a vertical stack of interactive headings used to toggle the display of further information; each item can be 'collapsed', with just a short label visible; or 'expanded' to show the complete content."
};
