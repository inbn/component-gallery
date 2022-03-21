import React from 'react';
import Component from './ReadMoreLink';

export default {
  title: 'ReadMoreLink',
  component: Component,
};

const Template = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  to: 'https://example.com',
  children: 'Read more',
};
