import React from 'react';

import CheckboxButton from './CheckboxButton';

const CheckboxButtonGroup = ({ options, selectedOptions, onChange }) => (
  <>
    {options.map(({ node: { data: { name, count }, id } }) => (
      <CheckboxButton
        key={id}
        name={name}
        count={count}
        label={name}
        id={name}
        value={name}
        checked={selectedOptions.includes(name)}
        onChange={(event) => onChange(event.target.value)}
      />
    ))}
  </>
);

export default CheckboxButtonGroup;
