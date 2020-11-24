import React from 'react';

import clipboardList from '../../svg/clipboard-list-solid.svg';
import code from '../../svg/code-solid.svg';
import comment from '../../svg/comment-solid.svg';
import exclamationTriangle from '../../svg/exclamation-triangle-solid.svg';
import flask from '../../svg/flask-solid.svg';
import universalAccess from '../../svg/universal-access-solid.svg';
import sun from '../../svg/sun.svg';
import moon from '../../svg/moon.svg';

const Icon = ({ name, ...rest }) => {
  const icons = {
    clipboardList,
    code,
    comment,
    exclamationTriangle,
    flask,
    universalAccess,
    sun,
    moon
  };
  const { viewBox = null, url = null } = icons[name];

  return (
    viewBox &&
    url && (
      <svg {...{ viewBox, ...rest }}>
        <use xlinkHref={url} />
      </svg>
    )
  );
};

export default Icon;
