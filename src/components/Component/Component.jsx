import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Component = ({
  slug,
  name,
  otherNames,
  description,
  examplesCount,
  cardTag,
  headingLevel
}) => {
  // The element type used for these elements are dynamic
  const CardTag = cardTag;
  const HeadingTag = headingLevel;

  return (
    <CardTag className="card">
      <Link
        to={`/components/${slug}/`}
        className="card__inner h-full block w-full p-6"
      >
        <div className="flex justify-between items-center">
          <HeadingTag className="h3">{name}</HeadingTag>
          <p className="font-sans text-grey-700 dark:text-grey-500 mt-0 ml-2">
            <strong className="font-medium">{examplesCount}</strong>&nbsp;
            <span className="text-xs">
              example{parseInt(examplesCount, 10) !== 1 && 's'}
            </span>
          </p>
        </div>
        {!!otherNames && (
          <p className="italic leading-tight mt-4 text-grey-700 dark:text-grey-500">
            Other names: {otherNames}
          </p>
        )}
        {!!description && (
          <div
            dangerouslySetInnerHTML={{
              __html: description
            }}
            className="body-text leading-tight font-small mt-4"
          />
        )}
      </Link>
    </CardTag>
  );
};

Component.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  otherNames: PropTypes.string,
  description: PropTypes.string,
  examplesCount: PropTypes.number,
  cardTag: PropTypes.string,
  headingLevel: PropTypes.string
};

Component.defaultProps = {
  otherNames: '',
  description: '',
  examplesCount: 0,
  cardTag: 'li',
  headingLevel: 'h2'
};

export default Component;
