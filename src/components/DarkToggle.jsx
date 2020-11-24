import React from 'react';
import { ThemeContext } from './ThemeContext';
import Icon from './Icon/Icon';

const DarkToggle = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  if (!colorMode) {
    return null;
  }

  return (
    <button
      type="button"
      className="rounded-full bg-grey-200 dark:bg-grey-800 p-3 focus:outline-none absolute top-0 right-0 mt-4 mr-4"
      aria-label={`Enable dark mode (currently ${
        colorMode === 'dark' ? 'on' : 'off'
      })`}
      aria-pressed={colorMode === 'dark'}
      onClick={() => {
        setColorMode(colorMode === 'light' ? 'dark' : 'light');
      }}
    >
      <Icon
        name={colorMode === 'light' ? 'moon' : 'sun'}
        className="w-4 h-4"
        aria-hidden="true"
      />
    </button>
  );
};

export default DarkToggle;
