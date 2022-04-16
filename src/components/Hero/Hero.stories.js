import React from 'react';
import Hero from './Hero';

export default {
  title: 'Hero',
  component: Hero,
};

const Template = (args) => <Hero {...args} />;

export const Default = Template.bind({});

Default.args = {
  byline: 'Component',
  title: 'Accordion',
  subtitle:
    'Other names: Collapsible sections, Arrow toggle, Expander, Disclosure, ShowyHideyThing',
  intro: `An accordion is a vertical stack of interactive headings used to toggle the display of further information; each item can be 'collapsed' with just a short label visible or 'expanded' to show the full content.`,
  image: (
    <img
      src="https://images.placeholders.dev/?width=512&height=384&text=Placeholder&bgColor=%23f7f6f6&textColor=%236d6e71"
      alt=""
      className="bg-white border-2 border-black dark:border-white shadow-block lg:max-w-xs"
      width={512}
      height={384}
    />
  ),
};
