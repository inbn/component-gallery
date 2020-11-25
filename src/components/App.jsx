import React from 'react';

import { ThemeProvider } from './ThemeContext';

function App({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default App;
