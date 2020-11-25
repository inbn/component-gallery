import React from 'react';
import Component from './Select';

export default {
  title: 'Select',
  component: Component
};

const Template = args => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: 'sort-order',
  label: 'Sort by',
  defaultValue: '0',
  onChange: () => {},
  options: [
    {
      optionLabel: 'Option 1',
      value: '1'
    },
    {
      optionLabel: 'Option 2',
      value: '2'
    }
  ],
  useIndexAsValue: true
};
