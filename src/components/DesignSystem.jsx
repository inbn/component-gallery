import React from 'react';
import Img from 'gatsby-image';

import PropTypes from 'prop-types';

const DesignSystem = ({
  url,
  name,
  organisation,
  image,
  features,
  headingLevel,
  color
}) => {
  // Heading level needs to be dynamic
  const HeadingTag = headingLevel;

  return (
    <a
      href={url}
      target="blank"
      rel="noopener noreferrer"
      className="card p-6 block h-full flex flex-col"
      style={{ '--hover-shadow-color': color }}
    >
      {/* <img src={image.length && image[0].url} alt="" className="block" /> */}
      {image && <Img fluid={image.childImageSharp.fluid} className="border" />}
      <HeadingTag className="h3 mt-0 pt-6 pb-1 font-bold">{name}</HeadingTag>
      {organisation && (
        <p className="italic leading-tight mt-0 pb-2 text-grey-700">
          {organisation}
        </p>
      )}
      {features && features.length > 0 && (
        <div className="mt-auto">
          <ul className="-mr-2 pt-6 flex flex-wrap">
            {features.map(feature => (
              <li key={feature} className="badge">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </a>
  );
};

DesignSystem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  organisation: PropTypes.string,
  image: PropTypes.object,
  features: PropTypes.arrayOf(PropTypes.string),
  headingLevel: PropTypes.string,
  color: PropTypes.string
};

DesignSystem.defaultProps = {
  organisation: '',
  image: null,
  features: null,
  headingLevel: 'h2',
  color: '#fff'
};

export default DesignSystem;
