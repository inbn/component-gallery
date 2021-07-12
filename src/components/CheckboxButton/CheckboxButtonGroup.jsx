import React from 'react';
import PropTypes from 'prop-types';
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

CheckboxButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  showCounts: PropTypes.bool,
};

CheckboxButtonGroup.defaultProps = {
  selectedOptions: [],
  showCounts: true,
};

export default CheckboxButtonGroup;
