import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Component = ({
  slug,
  name,
  otherNames,
  description,
  examplesCount,
  headingLevel
}) => {
  // Heading level needs to be dynamic
  const HeadingTag = headingLevel;

  return (
    <Link to={`components/${slug}`} className="card h-full block w-full p-2">
      <div className="flex justify-between items-center">
        <HeadingTag className="h3">{name}</HeadingTag>
        <p className="font-sans text-grey-700 mt-0 ml-2">
          <strong>{examplesCount}</strong>&nbsp;
          <span className="text-xs">
            example{parseInt(examplesCount, 10) !== 1 && 's'}
          </span>
        </p>
      </div>
      {otherNames && (
        <p className="italic leading-tight mt-2 text-grey-700">
          Other names: {otherNames}
        </p>
      )}
      {description && (
        <div
          dangerouslySetInnerHTML={{
            __html: description
          }}
          className="leading-tight font-small mt-2"
        />
      )}
    </Link>
  );
};

Component.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  otherNames: PropTypes.string,
  description: PropTypes.string,
  examplesCount: PropTypes.number,
  headingLevel: PropTypes.string
};

Component.defaultProps = {
  otherNames: '',
  description: '',
  examplesCount: 0,
  headingLevel: 'h2'
};

export default Component;
