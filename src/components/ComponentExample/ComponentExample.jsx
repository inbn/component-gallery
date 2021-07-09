import React from 'react';
import PropTypes from 'prop-types';

import Badge from '../Badge/Badge';

const ComponentExample = ({
  url,
  componentName,
  designSystemName,
  designSystemOrganisation,
  features,
  technologies,
  color,
  cardTag,
  headingLevel,
}) => {
  // The element type used for these elements are dynamic
  const CardTag = cardTag;
  const HeadingTag = headingLevel;

  return (
    <CardTag className="card" style={{ '--shadow-color': color }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="card__inner h-full flex flex-col w-full p-6"
      >
        <p className="leading-none text-base uppercase tracking-wider font-sans text-grey-800 dark:text-grey-300">
          {componentName}
        </p>
        <div className="mt-auto pt-6">
          <HeadingTag className="h5 mt-0 pb-1 font-bold">
            {designSystemName}
          </HeadingTag>
          {designSystemOrganisation && (
            <p className="italic leading-tight mt-0 pb-2 text-grey-700 dark:text-grey-500">
              {designSystemOrganisation}
            </p>
          )}
          {technologies && technologies.length > 0 && (
            <ul className="mt-2 -mr-2 -ml-1 flex flex-wrap">
              {technologies.map((technology) => (
                <Badge
                  key={technology}
                  text={technology}
                  tag="li"
                  displayIcon
                />
              ))}
            </ul>
          )}
          {features && features.length > 0 && (
            <ul className="-mr-2 -mb-2 -ml-1 pb-1 flex flex-wrap">
              {features.map((feature) => (
                <Badge key={feature} text={feature} tag="li" displayIcon />
              ))}
            </ul>
          )}
        </div>
      </a>
    </CardTag>
  );
};

ComponentExample.propTypes = {
  url: PropTypes.string,
  componentName: PropTypes.string,
  designSystemName: PropTypes.string,
  designSystemOrganisation: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
  technologies: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  cardTag: PropTypes.string,
  headingLevel: PropTypes.string,
};

ComponentExample.defaultProps = {
  url: '',
  componentName: '',
  designSystemName: '',
  designSystemOrganisation: '',
  features: [],
  technologies: [],
  color: '#000',
  cardTag: 'li',
  headingLevel: 'h3',
};

export default ComponentExample;
