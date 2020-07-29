import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

import Badge from '../Badge/Badge';

const DesignSystem = ({
  url,
  name,
  organisation,
  image,
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
        target="blank"
        rel="noopener noreferrer"
        className="card__inner p-6 block h-full flex flex-col"
      >
        {image && (
          <Img
            fluid={{
              ...image.childImageSharp.fluid,
              sizes: '(max-width: 544px) calc(100vw - 3rem), 492px'
            }}
            backgroundColor={color}
            className="border"
          />
        )}
        <HeadingTag className="h3 mt-0 pt-6 pb-1 font-bold">{name}</HeadingTag>
        {organisation && (
          <p className="italic leading-tight mt-0 pb-2 text-grey-700">
            {organisation}
          </p>
        )}
        {features && features.length > 0 && (
          <div className="mt-auto">
            <ul className="-mr-2 -ml-1 pt-6 flex flex-wrap">
              {features.map(feature => (
                <Badge key={feature} text={feature} tag="li" displayIcon />
              ))}
            </ul>
          </div>
        )}
      </a>
    </CardTag>
  );
};

DesignSystem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  organisation: PropTypes.string,
  image: PropTypes.object,
  features: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  cardTag: PropTypes.string,
  headingLevel: PropTypes.string
};

DesignSystem.defaultProps = {
  organisation: '',
  image: null,
  features: null,
  color: '#fff',
  cardTag: 'li',
  headingLevel: 'h2'
};

export default DesignSystem;
