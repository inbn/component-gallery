import React, { useEffect, useRef, useState } from 'react';
import { navigate, graphql, useStaticQuery } from 'gatsby';
import { Index } from 'elasticlunr';
import useKey from '@rooks/use-key';

const SearchForm = () => {
  const node = useRef();
  const selectedItemRef = useRef();
  const [open, setOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState(null);
  const [results, setResults] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');

  const data = useStaticQuery(graphql`
    query {
      siteSearchIndex {
        index
      }
    }
  `);

  const handleClickOutside = e => {
    // console.log('clicking anywhere');
    if (node.current.contains(e.target)) {
      setOpen(true);
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    // if (searchQuery) {
    // const debouncedSearch = debounce(async () => {
    const index = searchIndex || Index.load(data.siteSearchIndex.index);
    setSearchIndex(index);
    const posts = index
      .search(searchQuery, { expand: true })
      // Map over each ID and return the full document
      .map(({ ref }) => index.documentStore.getDoc(ref));
    setResults(posts);
    if (posts.length > 0) {
      setOpen(true);
      // console.log('setSelectedItemIndex');
      setSelectedItemIndex(0);
    }

    if (!searchQuery) setResults([]);
  }, [data.siteSearchIndex.index, searchIndex, searchQuery]);

  const keyPressed = event => {
    if (event.target.id !== 'search-input') {
      return;
    }

    // console.log(event.code);
    // console.log('results: ', results);
    // console.log('selectedItemIndex: ', selectedItemIndex);

    switch (event.code) {
      case 'ArrowUp':
        event.preventDefault();
        setSelectedItemIndex(prevSelectedItemIndex =>
          prevSelectedItemIndex > -1
            ? prevSelectedItemIndex - 1
            : results.length - 1
        );
        if (selectedItemRef.current) {
          selectedItemRef.current.scrollIntoView(false);
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        setSelectedItemIndex(prevSelectedItemIndex =>
          prevSelectedItemIndex < results.length - 1
            ? prevSelectedItemIndex + 1
            : 0
        );
        if (selectedItemRef.current) {
          selectedItemRef.current.scrollIntoView(false);
        }
        break;

      case 'Enter':
        if (results.length) {
          const selectedResult = results[selectedItemIndex];
          if (selectedResult) {
            // Go to the result URL
            if (selectedResult.table === 'Components') {
              navigate(results[selectedItemIndex].url);
            } else {
              window.location.href = results[selectedItemIndex].url;
            }
          }
        }
        break;
      // Escape clear input, reset selectedItemIndex
      case 'Esc':
        setOpen(false);
        setResults([]);
        setSelectedItemIndex(-1);
        break;

      case 'Tab':
        setOpen(false);
        break;
      default:
    }
  };

  useKey(['ArrowUp', 'ArrowDown', 'Enter', 'Esc', 'Tab'], keyPressed);

  return (
    <div ref={node} className="site-search">
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
        aria-expanded={open && !!results.length}
        aria-owns="search-results-listbox"
        aria-haspopup="listbox"
      >
        <input
          type="search"
          id="search-input"
          className="site-search__input"
          placeholder="Search components and design systems"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="search-results-listbox"
          aria-activedescendant={
            open && !!results.length ? `result-item-${selectedItemIndex}` : ''
          }
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
      {open && !!results.length && (
        <ol
          id="search-results-listbox"
          className="site-search__results-list"
          role="listbox"
        >
          {results.map(({ table, name, url, otherNames }, i) => (
            <li
              key={name}
              id={`result-item-${i}`}
              role="option"
              aria-selected={i === selectedItemIndex}
              ref={i === selectedItemIndex ? selectedItemRef : null}
              className="site-search__result"
              onClick={() => {
                if (table === 'Components') {
                  navigate(url);
                } else {
                  window.location.href = url;
                }
              }}
              onMouseOver={() => setSelectedItemIndex(i)}
            >
              {table && (
                <p className="font-sans mb-2 uppercase text-grey-700 text-xs block">
                  {table === 'Components' ? 'Component' : 'Design System'}
                </p>
              )}
              <h3 className="mt-0">{name}</h3>
              {otherNames && <p className="mt-1">Other names: {otherNames}</p>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default SearchForm;
