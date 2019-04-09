import React from 'react';

import PropTypes from 'prop-types';

const DesignSystem = ({
  url,
  name,
  organisation,
  image,
  features,
  headingLevel
}) => {
  // Heading level needs to be dynamic
  const HeadingTag = headingLevel;

  return (
    <a
      href={url}
      target="blank"
      rel="noopener noreferrer"
      className="bg-white block h-full border-b-2 shadow flex flex-col hover:shadow-md hover:scale-105 transition"
    >
      <img src={image.length && image[0].url} alt="" className="block" />
      <HeadingTag className="h3 mt-0 p-2">{name} {organisation !== null && `(${organisation})`}</HeadingTag>
      {features && features.length > 0 && (
        <ul className="p-2 mt-auto -mr-2 -mb-2">
          {features.map(feature => (
            <li key={feature} className="tag">
              {feature}
            </li>
          ))}
        </ul>
      )}
    </a>
  );
};

DesignSystem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  organisation: PropTypes.string,
  image: PropTypes.arrayOf(PropTypes.object),
  features: PropTypes.arrayOf(PropTypes.string),
  headingLevel: PropTypes.string
};

DesignSystem.defaultProps = {
  organisation: '',
  image: null,
  features: null,
  headingLevel: 'h2'
};

export default DesignSystem;
