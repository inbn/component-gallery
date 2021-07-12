import React from 'react';
import CheckboxButton from './CheckboxButton';

export default {
  title: 'CheckboxButton',
  component: CheckboxButton,
  argTypes: { onChange: { action: 'clicked' } },
};

const Template = (args) => <CheckboxButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: 'react',
  id: 'react',
  label: 'React',
  count: 39,
  value: 1,
};
