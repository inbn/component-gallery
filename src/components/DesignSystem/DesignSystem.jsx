import React, { useRef } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';

import Badge from '../Badge/Badge';
import Icon from '../Icon/Icon';

const DesignSystem = ({
  url,
  name,
  organisation,
  image,
  imageLoading,
  features,
  technologies,
  color,
  cardTag,
  headingLevel,
  links,
}) => {
  // The element type used for these elements are dynamic
  const CardTag = cardTag;
  const HeadingTag = headingLevel;

  const linkRef = useRef();
  const onCardClick = () => {
    const noTextSelected = !window.getSelection().toString();

    if (noTextSelected && linkRef.current) {
      linkRef.current.click();
    }
  };

  const onPlatformLinkClick = (event) => {
    event.stopPropagation();
  };

  return (
    <CardTag
      className="card card--design-system card--link"
      style={{ '--shadow-color': color }}
      onClick={onCardClick}
    >
      <div className="card__inner p-6 h-full flex flex-col">
        {image && (
          <GatsbyImage
            image={image.childImageSharp?.gatsbyImageData}
            backgroundColor={color}
            className="border"
            loading={imageLoading}
            alt=""
          />
        )}
        <div className="flex gap-2 justify-between pt-4">
          <div>
            <HeadingTag className="h3 mt-0 pb-1 font-bold">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                ref={linkRef}
              >
                {name}
              </a>
            </HeadingTag>
            {organisation && (
              <p className="italic leading-tight mt-0 pb-1 text-grey-700 dark:text-grey-500">
                {organisation}
              </p>
            )}
          </div>
          {links && links.length > 0 && (
            <ul className="flex gap-2 mt-0 self-start">
              {links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border dark:border-grey-300 text-black dark:text-white rounded-full p-2 z-20 bg-transparent hover:bg-grey-400 dark:hover:bg-grey-700 transition-colors duration-200"
                  onClick={onPlatformLinkClick}
                >
                  <span className="sr-only">
                    {name} on {link.platform}
                  </span>
                  <Icon
                    name={link.platform}
                    className="w-5 h-5"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </ul>
          )}
        </div>
        {((features && features.length > 0) ||
          (technologies && technologies.length)) && (
          <div className="mt-auto">
            {technologies && technologies.length > 0 && (
              <div className="pt-6">
                <p className="uppercase text-xs font-sans font-bold tracking-wide text-grey-700 dark:text-grey-300">
                  Tech
                </p>
                <ul className="mt-0 -mr-2 -ml-1 flex flex-wrap">
                  {technologies.map((technology) => (
                    <Badge
                      key={technology}
                      text={technology}
                      tag="li"
                      displayIcon
                    />
                  ))}
                </ul>
              </div>
            )}
            {features && features.length > 0 && (
              <div className="pt-6">
                <p className="uppercase text-xs font-sans font-bold tracking-wide text-grey-700 dark:text-grey-300">
                  Features
                </p>
                <ul className="mt-0 -mr-2 -ml-1 flex flex-wrap">
                  {features.map((feature) => (
                    <Badge key={feature} text={feature} tag="li" displayIcon />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </CardTag>
  );
};

DesignSystem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  organisation: PropTypes.string,
  image: PropTypes.object,
  imageLoading: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
  technologies: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  cardTag: PropTypes.string,
  headingLevel: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

DesignSystem.defaultProps = {
  organisation: '',
  image: null,
  imageLoading: 'lazy',
  features: [],
  technologies: [],
  color: '#fff',
  cardTag: 'li',
  headingLevel: 'h2',
  links: [],
};

export default DesignSystem;
