import { globalHistory } from '@reach/router';
import { useState } from 'react';
import {
  PartialLocation,
  QueryParamAdapterComponent,
  QueryParamAdapter,
} from 'use-query-params';
import { navigate } from 'gatsby';

export const GatsbyAdapter = ({ children }) => {
  const [adapter] = useState(() => ({
    get location() {
      return globalHistory.location;
    },
    push(location) {
      navigate(location.search || '?', { replace: false });
    },
    replace(location) {
      navigate(location.search || '?', { replace: true });
    },
  }));

  return children(adapter);
};
