import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';

const Textarea = ({
  errors,
  onChange,
  hintText,
  id,
  label,
  name,
  rows,
  touched,
  value,
  required,
}) => (
  <div className={classNames('field-group', { error: !!errors && !!touched })}>
    <label htmlFor={id}>
      {label}
      {!!required && (
        <span className="font-bold">
          *<span className="sr-only">(required)</span>
        </span>
      )}
    </label>
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
    <textarea
      name={name}
      id={id}
      rows={rows}
      value={value}
      onChange={onChange}
      className={errors && touched ? 'error' : ''}
      aria-describedby={hintText && `${id}-hint`}
    />
  </div>
);

Textarea.propTypes = {
  errors: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hintText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  value: PropTypes.string.isRequired,
  rows: PropTypes.number,
  required: PropTypes.bool,
};

Textarea.defaultProps = {
  errors: null,
  hintText: null,
  touched: false,
  rows: 5,
  required: false,
};

export default Textarea;
