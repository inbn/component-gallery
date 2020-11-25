import React from 'react';
import Component from './Badge';

export default {
  title: 'Badge',
  component: Component
};

const Template = args => <Component {...args} />;

export const TextOnly = Template.bind({});
TextOnly.storyName = 'Text only';
TextOnly.args = {
  text: 'Hi, I’m a Badge'
};

export const WithIcon = Template.bind({});
WithIcon.storyName = 'With icon';
WithIcon.args = {
  text: 'Accessibility',
  displayIcon: true
};
