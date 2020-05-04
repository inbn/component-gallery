import React from 'react';
import PropTypes from 'prop-types';

import {
  FaCode,
  FaFlask,
  FaUniversalAccess,
  FaClipboardList,
  FaExclamationTriangle,
  FaComment
} from 'react-icons/fa';

const Badge = ({ text, displayIcon, tag }) => {
  const Tag = tag;
  let Icon;

  if (displayIcon) {
    switch (text) {
      case 'Accessibility':
        Icon = FaUniversalAccess;
        break;
      case 'Accessibility issues':
        Icon = FaExclamationTriangle;
        break;
      case 'Usage guidelines':
        Icon = FaClipboardList;
        break;
      case 'Code examples':
        Icon = FaCode;
        break;
      case 'Research':
        Icon = FaFlask;
        break;
      case 'Tone of voice':
        Icon = FaComment;
        break;
      default:
        Icon = '';
    }
  }
  return (
    <Tag className="badge">
      {Icon && <Icon className="badge__icon" />}
      {text}
    </Tag>
  );
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  displayIcon: PropTypes.bool,
  tag: PropTypes.string
};

Badge.defaultProps = {
  displayIcon: false,
  tag: 'span'
};

export default Badge;
