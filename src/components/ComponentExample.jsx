import React from 'react';
import PropTypes from 'prop-types';

import Badge from './Badge';

const ComponentExample = ({
  url,
  componentName,
  designSystem,
  features,
  color
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="card h-full flex flex-col w-full p-6"
    style={{ '--hover-shadow-color': color }}
  >
    <h3 className="h4">{componentName}</h3>
    <p className="italic leading-tight text-sm mt-2 text-grey-700">
      {designSystem}
    </p>
    {features && features.length > 0 && (
      <div className="mt-auto">
        <ul className="-mr-2 -mb-2 pt-4 pb-1 flex flex-wrap">
          {features.map(feature => (
            <Badge key={feature} text={feature} displayIcon />
          ))}
        </ul>
      </div>
    )}
  </a>
);

ComponentExample.propTypes = {
  url: PropTypes.string,
  componentName: PropTypes.string,
  designSystem: PropTypes.string,
  features: PropTypes.array,
  color: PropTypes.string
};

ComponentExample.defaultProps = {
  url: '',
  componentName: '',
  designSystem: '',
  features: [],
  color: '#fff'
};

export default ComponentExample;
