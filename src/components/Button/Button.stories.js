import React from 'react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Click me!',
  type: 'button',
};
