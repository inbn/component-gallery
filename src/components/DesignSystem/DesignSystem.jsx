import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

import Badge from '../Badge/Badge';

const DesignSystem = ({
  url,
  name,
  organisation,
  image,
  imageFadeIn,
  imageLoading,
  features,
  color,
  cardTag,
  headingLevel
}) => {
  // The element type used for these elements are dynamic
  const CardTag = cardTag;
  const HeadingTag = headingLevel;

  return (
    <CardTag
      className="card card--design-system"
      style={{ '--shadow-color': color }}
    >
      <a
        href={url}
        target="blank"
        rel="noopener noreferrer"
        className="card__inner p-6 h-full flex flex-col"
      >
        {image && (
          <Img
            fluid={{
              ...image.childImageSharp.fluid,
              sizes: '(max-width: 544px) calc(100vw - 3rem), 492px'
            }}
            backgroundColor={color}
            className="border"
            loading={imageLoading}
            fadeIn={imageFadeIn}
          />
        )}
        <HeadingTag className="h3 mt-0 pt-6 pb-1 font-bold">{name}</HeadingTag>
        {organisation && (
          <p className="italic leading-tight mt-0 pb-2 text-grey-700 dark:text-grey-500">
            {organisation}
          </p>
        )}
        {features && features.length > 0 && (
          <ul className="mt-auto -mr-2 -ml-1 pt-6 flex flex-wrap">
            {features.map(feature => (
              <Badge key={feature} text={feature} tag="li" displayIcon />
            ))}
          </ul>
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
  imageFadeIn: PropTypes.bool,
  imageLoading: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  cardTag: PropTypes.string,
  headingLevel: PropTypes.string
};

DesignSystem.defaultProps = {
  organisation: '',
  image: null,
  imageLoading: 'lazy',
  imageFadeIn: true,
  features: null,
  color: '#fff',
  cardTag: 'li',
  headingLevel: 'h2'
};

export default DesignSystem;
