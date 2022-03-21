/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, type, onClick, className }) => (
  <button type={type} onClick={onClick} className={className}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  className: undefined,
};

export default Button;
