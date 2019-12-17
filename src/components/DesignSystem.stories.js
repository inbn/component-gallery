import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import '../css/style.css';

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
      />
    </div>
  ));
