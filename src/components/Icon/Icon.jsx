import React from 'react';

import chevronDown from '../../svg/chevron-down.svg';
import clipboardList from '../../svg/clipboard-list-solid.svg';
import code from '../../svg/code-solid.svg';
import comment from '../../svg/comment-solid.svg';
import exclamationTriangle from '../../svg/exclamation-triangle-solid.svg';
import figma from '../../svg/figma.svg';
import flask from '../../svg/flask-solid.svg';
import github from '../../svg/github.svg';
import gitlab from '../../svg/gitlab.svg';
import moon from '../../svg/moon.svg';
import openSource from '../../svg/open-source.svg';
import storybook from '../../svg/storybook.svg';
import sun from '../../svg/sun.svg';
import universalAccess from '../../svg/universal-access-solid.svg';

const Icon = ({ name, ...rest }) => {
  const icons = {
    chevronDown,
    clipboardList,
    code,
    comment,
    exclamationTriangle,
    figma,
    flask,
    github,
    gitlab,
    moon,
    openSource,
    storybook,
    sun,
    universalAccess,
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
