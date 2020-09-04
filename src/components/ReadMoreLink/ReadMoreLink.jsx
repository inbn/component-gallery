import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Icon from '../Icon/Icon';

const ReadMoreLink = ({ to, text }) => (
  <Link to={to} className="call-to-action">
    {text}{' '}
    <Icon
      name="arrowRight"
      className="svg-icon transform -skew-x-6 w-6"
      aria-hidden="true"
    />
  </Link>
);

ReadMoreLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default ReadMoreLink;
