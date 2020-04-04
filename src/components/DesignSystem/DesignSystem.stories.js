import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import DesignSystem from './DesignSystem';

storiesOf(`DesignSystem`, module)
  .addDecorator(withSmartKnobs({ ignoreProps: ['image'] }))
  .addDecorator(withKnobs())
  .add(`Default`, () => (
    <div className="grid">
      <DesignSystem
        cardTag="div"
        name="Example Design System"
        url="https://example.com"
        color="#000"
        features={['Feature 1', 'Feature 2']}
        organisation="Example Organisation"
        image={{
          childImageSharp: {
            fluid: {
              base64:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAAEElEQVR42mP8/58BDBgxGABi7gX+XyMkHgAAAABJRU5ErkJggg==',
              aspectRatio: 1.3333333333333333,
              src: 'https://fakeimg.pl/608x456/',
              srcSet:
                'https://fakeimg.pl/152x114/ 152w,\nhttps://fakeimg.pl/304x228/ 304w,\nhttps://fakeimg.pl/608x456/ 608w,\nhttps://fakeimg.pl/912x684/ 912w,\nhttps://fakeimg.pl/1200x900/ 1200w',
              sizes: '(max-width: 608px) 100vw, 608px',
              tracedSVG:
                "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='608'%20height='456'%3e%3crect%20width='100%25'%20height='100%25'%20fill='white'/%3e%3c/svg%3e"
            }
          }
        }}
      />
    </div>
  ));
