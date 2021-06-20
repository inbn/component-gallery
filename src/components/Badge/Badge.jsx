import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const Badge = ({ text, displayIcon, tag }) => {
  const Tag = tag;
  let badgeIcon;

  if (displayIcon) {
    switch (text) {
      case 'Accessibility':
        badgeIcon = 'universalAccess';
        break;
      case 'Accessibility issues':
        badgeIcon = 'exclamationTriangle';
        break;
      case 'Usage guidelines':
        badgeIcon = 'clipboardList';
        break;
      case 'Code examples':
        badgeIcon = 'code';
        break;
      case 'Research':
        badgeIcon = 'flask';
        break;
      case 'Tone of voice':
        badgeIcon = 'comment';
        break;
      case 'Open source':
        badgeIcon = 'openSource';
        break;
      default:
        badgeIcon = '';
    }
  }
  return (
    <Tag className="badge">
      {badgeIcon && (
        <Icon name={badgeIcon} className="badge__icon" aria-hidden="true" />
      )}
      {text}
    </Tag>
  );
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  displayIcon: PropTypes.bool,
  tag: PropTypes.string,
};

Badge.defaultProps = {
  displayIcon: false,
  tag: 'span',
};

export default Badge;
