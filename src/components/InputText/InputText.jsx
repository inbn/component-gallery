import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';

const InputText = ({
  errors,
  handleBlur,
  onChange,
  hintText,
  id,
  label,
  name,
  touched,
  value,
}) => (
  <div className={classNames('field-group', { error: !!errors && !!touched })}>
    <label htmlFor={id}>{label}</label>
    {hintText && (
      <p className="hint-text" id={`${id}-hint`}>
        {hintText}
      </p>
    )}
    {errors && touched && (
      <div className="font-sans text-red-600">
        <Icon
          name="exclamationTriangle"
          className="inline w-3 h-3 align-baseline"
          aria-hidden="true"
        />{' '}
        {errors}
      </div>
    )}
    <input
      name={name}
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      className={!!errors && !!touched && 'error'}
      aria-describedby={hintText && `${id}-hint`}
    />
  </div>
);

InputText.propTypes = {
  errors: PropTypes.string,
  handleBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  hintText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  value: PropTypes.string.isRequired,
  // required: PropTypes.bool,
};

InputText.defaultProps = {
  errors: null,
  hintText: null,
  touched: false,
};

export default InputText;
