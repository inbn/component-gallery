import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';

const InputText = ({
  errors,
  onBlur,
  onChange,
  hintText,
  id,
  label,
  name,
  placeholder,
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
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      className={!!errors && !!touched && 'error'}
      aria-describedby={hintText && `${id}-hint`}
    />
  </div>
);

InputText.propTypes = {
  errors: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  hintText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

InputText.defaultProps = {
  errors: null,
  hintText: null,
  touched: false,
  placeholder: null,
};

export default InputText;
