import React from 'react';

import {
  FaCode,
  FaFlask,
  FaUniversalAccess,
  FaClipboardList,
  FaExclamationTriangle
} from 'react-icons/fa';

const Badge = ({ text, displayIcon }) => {
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
      default:
        Icon = '';
    }
  }
  return (
    <li className="badge">
      {Icon && <Icon className="badge__icon" />}
      {text}
    </li>
  );
};

export default Badge;
