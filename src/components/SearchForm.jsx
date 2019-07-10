import React from 'react';
import { navigate } from 'gatsby';

const SearchForm = ({ query }) => (
  <form role="search" method="GET">
    <label htmlFor="search-input" className="sr-only">
      Search this site
    </label>
    <input
      type="search"
      id="search-input"
      name="keywords"
      aria-controls="search-results-count"
      onChange={e =>
        navigate(`/search?keywords=${encodeURIComponent(e.target.value)}`)
      }
      value={query}
    />
    {/* <button type="submit">Submit</button> */}
  </form>
);

export default SearchForm;
