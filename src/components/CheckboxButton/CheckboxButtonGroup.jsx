import React from 'react';
import slugify from 'slugify';

import CheckboxButton from './CheckboxButton';

const CheckboxButtonGroup = ({
  name,
  options,
  selectedOptions,
  onChange,
  showCounts,
}) => (
  <>
    {options.map(({ node: { data: { name: optionName, count }, id } }) => (
      <CheckboxButton
        key={id}
        name={name}
        count={showCounts ? count : null}
        label={optionName}
        id={slugify(`${name}_${optionName}`)}
        value={optionName}
        checked={selectedOptions.includes(optionName)}
        onChange={(event) => onChange(event.target.value)}
      />
    ))}
  </>
);

export default CheckboxButtonGroup;
