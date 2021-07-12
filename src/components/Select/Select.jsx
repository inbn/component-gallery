import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  name,
  id,
  label,
  onChange,
  defaultValue,
  options,
  useIndexAsValue,
}) => (
  <label
    htmlFor={id}
    className="text-grey-800 dark:text-grey-200 font-sans font-bold md:text-sm"
  >
    <span className="mr-2">{label}</span>
    <select name={name} id={id} defaultValue={defaultValue} onChange={onChange}>
      {options.map(({ optionLabel, value }, i) => (
        <option value={useIndexAsValue ? i : value} key={optionLabel}>
          {optionLabel}
        </option>
      ))}
    </select>
  </label>
);

Select.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.object),
  useIndexAsValue: PropTypes.bool,
};

Select.defaultProps = {
  name: '',
  onChange: () => {},
  defaultValue: '',
  options: [],
  useIndexAsValue: false,
};

export default Select;
