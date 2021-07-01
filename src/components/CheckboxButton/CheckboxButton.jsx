import PropTypes from 'prop-types';
import React from 'react';

const CheckboxButton = ({
  name,
  label,
  id,
  value,
  checked,
  count,
  onChange,
}) => {
  return (
    <div className="checkbox-button">
      <input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        className="checkbox-button__input"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="checkbox-button__label">
        {label}
        {count !== null && (
          <span className="checkbox-button__count">({count})</span>
        )}
      </label>
    </div>
  );
};

CheckboxButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  count: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

CheckboxButton.defaultProps = {
  count: null,
};

export default CheckboxButton;
