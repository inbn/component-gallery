import React from 'react';
import PropTypes from 'prop-types';

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
    className="card h-full block w-full p-2 border-b-2 hover:text-grey-800 hover:shadow-md hover:scale-105 transition"
    style={{ borderBottomColor: color }}
  >
    <h3 className="h4">{componentName}</h3>
    <p className="italic leading-tight text-sm mt-1 text-grey-700">
      {designSystem}
    </p>
    {features && features.length > 0 && (
      <ul className="pt-2 mt-auto -mr-2 -mb-2">
        {features.map(feature => (
          <li key={feature} className="tag">
            {feature}
          </li>
        ))}
      </ul>
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
