import React from 'react';
import { Grid } from '../../../.storybook/decorators';
import Filter from './Filter';

export default {
  title: 'Filter',
  component: Filter,
  decorators: [Grid],
};

const Template = (args) => <Filter {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: <p>Children</p>,
};
