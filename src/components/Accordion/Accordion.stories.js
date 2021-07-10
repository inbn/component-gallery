import React from 'react';
import Accordion from './Accordion';

export default {
  title: 'Accordion',
  component: Accordion,
  argTypes: { onChange: { action: 'clicked' } },
};

const Template = (args) => <Accordion {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Filter and sort',
  children: <div>Accordion content here</div>,
};
