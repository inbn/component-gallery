import React, { useEffect, useState } from 'react';

import { COLOR_MODE_KEY } from '../constants';

const DarkToggle = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [colorMode, setColorMode] = useState(null);

  useEffect(() => {
    if (!isLoaded) {
      setColorMode(
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      );
      setIsLoaded(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    colorMode === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
    localStorage.setItem(COLOR_MODE_KEY, colorMode);
  }, [colorMode]);

  if (!colorMode) {
    return null;
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={colorMode === 'dark'}
        onChange={e => {
          setColorMode(e.target.checked ? 'dark' : 'light');
        }}
      />{' '}
      Dark
    </label>
  );
};

export default DarkToggle;
