import React from 'react';
import InputText from './InputText';

export default {
  title: 'InputText',
  component: InputText,
  argTypes: {
    onBlur: { action: 'clicked' },
    onChange: { action: 'clicked' },
  },
};

const Template = (args) => <InputText {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'Your name',
  id: 'name',
};
