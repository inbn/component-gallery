import React from 'react';
import Component from './DesignSystem';
import { Grid } from '../../../.storybook/decorators';

export default {
  title: 'DesignSystem',
  component: Component,
  decorators: [Grid],
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
  cardTag: 'div',
  name: 'Example Design System',
  url: 'https://example.com',
  color: '#000',
  features: ['Feature 1', 'Feature 2'],
  organisation: 'Example Organisation',
  image: {
    childImageSharp: {
      gatsbyImageData: {
        layout: 'constrained',
        images: {
          fallback: {
            src: 'https://fakeimg.pl/608x456/',
            srcSet:
              'https://fakeimg.pl/608x456/ 360w,\nhttps://fakeimg.pl/608x456/ 492w,\nhttps://fakeimg.pl/608x456/ 500w,\nhttps://fakeimg.pl/608x456/ 720w,\nhttps://fakeimg.pl/608x456/ 1000w',
            sizes: '(min-width: 492px) 492px, 100vw',
          },
          sources: [
            {
              srcSet:
                'https://fakeimg.pl/608x456/ 360w,\nhttps://fakeimg.pl/608x456/ 492w,\nhttps://fakeimg.pl/608x456/ 500w,\nhttps://fakeimg.pl/608x456/ 720w,\nhttps://fakeimg.pl/608x456/ 1000w',
              type: 'image/webp',
              sizes: '(min-width: 492px) 492px, 100vw',
            },
          ],
        },
        width: 492,
        height: 369,
      },
    },
  },
};
