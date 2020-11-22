import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import Select from './Select';

storiesOf(`Select`, module)
  .addDecorator(withSmartKnobs())
  .addDecorator(withKnobs())
  .add(`Default`, () => (
    <Select
      id="sort-order"
      label="Sort by"
      defaultValue="0"
      onChange={() => []}
      options={[
        {
          optionLabel: 'Option 1',
          value: '1'
        },
        {
          optionLabel: 'Option 2',
          value: '2'
        }
      ]}
      useIndexAsValue
    />
  ));
