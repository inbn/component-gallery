import React from 'react';
import Textarea from './Textarea';

export default {
  title: 'Textarea',
  component: Textarea,
  argTypes: {
    onChange: { action: 'clicked' },
  },
};

const Template = (args) => <Textarea {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'Your message',
  id: 'message',
};
