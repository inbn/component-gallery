import React from 'react';
import PropTypes from 'prop-types';

import Badge from './Badge';

const ComponentExample = ({
  url,
  componentName,
  designSystem,
  features,
  color,
  cardTag,
  headingLevel
}) => {
  // The element type used for these elements are dynamic
  const CardTag = cardTag;
  const HeadingTag = headingLevel;

  return (
    <CardTag className="card" style={{ '--background-color': color }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="card__inner h-full flex flex-col w-full p-6"
      >
        <HeadingTag className="h4">{componentName}</HeadingTag>
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
    </CardTag>
  );
};

ComponentExample.propTypes = {
  url: PropTypes.string,
  componentName: PropTypes.string,
  designSystem: PropTypes.string,
  features: PropTypes.array,
  color: PropTypes.string,
  cardTag: PropTypes.string,
  headingLevel: PropTypes.string
};

ComponentExample.defaultProps = {
  url: '',
  componentName: '',
  designSystem: '',
  features: [],
  color: '#fff',
  cardTag: 'li',
  headingLevel: 'h3'
};

export default ComponentExample;
