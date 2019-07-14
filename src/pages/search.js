import React, { useCallback, useEffect, useState } from 'react';
import { navigate, graphql } from 'gatsby';
import { Index } from 'elasticlunr';
import debounce from 'lodash.debounce';
import useEventListener from '../hooks/use-event-listener';
import Layout from '../components/Layout';
// import SearchForm from '../components/SearchForm';
// import SearchResults from '../components/SearchResults';

const Search = ({ data, location }) => {
  const [searchIndex, setSearchIndex] = useState(null);
  const [results, setResults] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const searchQuery =
    new URLSearchParams(location.search).get('keywords') || '';

  useEffect(() => {
    if (searchQuery) {
      const debouncedSearch = debounce(async () => {
        const index = searchIndex || Index.load(data.siteSearchIndex.index);
        setSearchIndex(index);
        const posts = index
          .search(searchQuery, { expand: true })
          // Map over each ID and return the full document
          .map(({ ref }) => index.documentStore.getDoc(ref));
        setResults(posts);
      }, 500);

      debouncedSearch();
    } else {
      setResults([]);
    }

    if (!searchQuery) setResults([]);
  }, [location.search]);

  const keyUpHandler = useCallback(event => {
    console.log(event.key);
    if (event.target.id !== 'search-input') {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        setSelectedItemIndex(
          selectedItemIndex > 0 ? selectedItemIndex - 1 : results.length - 1
        );
        break;

      case 'ArrowDown':
        setSelectedItemIndex(
          selectedItemIndex < results.length - 1 ? selectedItemIndex + 1 : 0
        );
        break;

      case 'Enter':
        if (results.length) {
          const selectedResult = results[selectedItemIndex];

          if (selectedResult.table === 'Components') {
            navigate(results[selectedItemIndex].url);
          } else {
            window.location.href = results[selectedItemIndex].url;
          }
        }
        break;
      // Escape clear input, reset selectedItemIndex

      default:
    }
  });

  // Add event listener using our hook
  useEventListener('keyup', keyUpHandler);

  return (
    <Layout location={location} title="Search">
      {!!results.length && searchQuery && (
        <p
          className="search-results-count sr-only"
          id="search-results-count"
          aria-live="polite"
          aria-atomic="true"
        >
          Found {results.length} results for "{searchQuery}"
        </p>
      )}
      <label htmlFor="search-input" className="sr-only">
        Search this site
      </label>
      <div
        role="combobox"
        aria-expanded={!!results.length}
        aria-owns="search-results-listbox"
        aria-haspopup="listbox"
      >
        <input
          type="search"
          id="search-input"
          aria-autocomplete="list"
          aria-controls="search-results-listbox"
          aria-activedescendant={
            results.length ? `result-item-${selectedItemIndex}` : ''
          }
          onChange={e =>
            navigate(`/search?keywords=${encodeURIComponent(e.target.value)}`)
          }
          value={searchQuery}
        />
      </div>
      {!!results.length && (
        <ol
          id="search-results-listbox"
          className="site-search__results-list"
          role="listbox"
        >
          {results.map(({ table, name, url, description, otherNames }, i) => (
            <li
              key={name}
              id={`result-item-${i}`}
              role="option"
              aria-selected={i === selectedItemIndex}
              className="site-search__result"
              onClick={() => navigate(url)}
              onMouseOver={() => setSelectedItemIndex(i)}
            >
              {table && (
                <p className="font-sans mb-2 uppercase text-grey-700 text-xs inline-block">
                  {table === 'Components' ? 'Component' : 'Design System'}
                </p>
              )}
              <h3 className="mt-0">{name}</h3>
              {otherNames && <p>Other names: {otherNames}</p>}
              {description && <p>{description}</p>}
            </li>
          ))}
        </ol>
      )}
    </Layout>
  );
};

export default Search;

export const query = graphql`
  {
    siteSearchIndex {
      index
    }
  }
`;
