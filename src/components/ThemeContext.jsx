import React from 'react';

import { COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP } from '../constants';

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = React.useState(undefined);

  React.useEffect(() => {
    const root = window.document.documentElement;
    console.log(root);
    // Store theme in a CSS custom property
    // Helmet removes the class before we get the chance to check it here
    const initialColorValue = root.style.getPropertyValue(
      INITIAL_COLOR_MODE_CSS_PROP
    );

    console.log({ initialColorValue });

    rawSetColorMode(initialColorValue);
  }, []);

  const contextValue = React.useMemo(() => {
    function setColorMode(newValue) {
      localStorage.setItem(COLOR_MODE_KEY, newValue);

      rawSetColorMode(newValue);
    }

    return {
      colorMode,
      setColorMode
    };
  }, [colorMode, rawSetColorMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
