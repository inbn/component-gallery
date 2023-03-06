import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon/Icon';

const PlatformFilter = ({ allPlatforms, selectedPlatforms, onClick }) => (
  <ul className="flex gap-2 mt-0 self-start">
    {allPlatforms.map((platform) => (
      <button
        type="button"
        key={platform}
        value={platform}
        className={classNames({
          'block border rounded-full p-2 z-10 transition-colors duration-200': true,
          'bg-transparent text-black dark:text-white hover:text-black hover:bg-grey-400 dark:hover:bg-grey-700':
            !selectedPlatforms.includes(platform),
          'bg-grey-700 dark:bg-grey-400 hover:bg-grey-500 dark:hover:bg-grey-600 text-white dark:text-black':
            selectedPlatforms.includes(platform),
        })}
        onClick={onClick}
        aria-pressed={selectedPlatforms.includes(platform) ? 'true' : 'false'}
      >
        <span className="sr-only">{platform}</span>
        <Icon
          name={platform.toLowerCase()}
          className="w-5 h-5"
          aria-hidden="true"
        />
      </button>
    ))}
  </ul>
);

PlatformFilter.propTypes = {
  allPlatforms: PropTypes.arrayOf(PropTypes.string),
  selectedPlatforms: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
};

PlatformFilter.defaultProps = {
  allPlatforms: [],
  selectedPlatforms: [],
};

export default PlatformFilter;
