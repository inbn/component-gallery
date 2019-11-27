import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { navigate, graphql, useStaticQuery } from 'gatsby';
import { Index } from 'elasticlunr';
import useKey from '@rooks/use-key';

const SearchForm = ({ idPrefix }) => {
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
    // Inside click
    if (node.current.contains(e.target)) {
      setOpen(true);
      return;
    }
    // Outside click
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
    // @TODO look at debouncing the search
    const index = searchIndex || Index.load(data.siteSearchIndex.index);
    setSearchIndex(index);
    const posts = index
      .search(searchQuery, { expand: true })
      // Map over each ID and return the full document
      .map(({ ref }) => index.documentStore.getDoc(ref));
    setResults(posts);
    if (posts.length > 0) {
      setOpen(true);
      setSelectedItemIndex(0);
    }

    if (!searchQuery) setResults([]);
  }, [data.siteSearchIndex.index, searchIndex, searchQuery]);

  const keyPressed = event => {
    if (event.target.id !== `${idPrefix}__search-input`) {
      return;
    }

    // console.log('event code:', event.code);
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

      // Close the results and reset selectedItemIndex
      case 'Escape':
        setOpen(false);
        setSelectedItemIndex(-1);
        break;

      case 'Tab':
        setOpen(false);
        break;

      default:
    }
  };

  useKey(['ArrowUp', 'ArrowDown', 'Enter', 'Escape', 'Tab'], keyPressed);

  return (
    <div ref={node} className="site-search">
      {!!results.length && searchQuery && (
        <p
          className="search-results-count sr-only"
          id={`${idPrefix}__search-results-count`}
          aria-live="polite"
          aria-atomic="true"
        >
          Found {results.length} results for “{searchQuery}”
        </p>
      )}
      <label htmlFor={`${idPrefix}__search-input`} className="sr-only">
        Search this site
      </label>
      <div
        role="combobox"
        aria-expanded={open && !!results.length}
        aria-owns={`${idPrefix}__search-results-listbox`}
        aria-haspopup="listbox"
      >
        <input
          type="text"
          id={`${idPrefix}__search-input`}
          className="site-search__input"
          placeholder="Search components and design systems"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={`${idPrefix}__search-results-listbox`}
          aria-activedescendant={
            open && !!results.length ? `result-item-${selectedItemIndex}` : ''
          }
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>

      <ol
        id={`${idPrefix}__search-results-listbox`}
        className="site-search__results-list"
        role="listbox"
        hidden={!open || !results.length}
      >
        {results.map(({ table, name, url, otherNames }, i) => (
          <li
            key={name}
            id={`${idPrefix}__result-item-${i}`}
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
              <p className="font-sans mb-2 uppercase text-black font-bold text-xs block">
                {table === 'Components' ? 'Component' : 'Design System'}
              </p>
            )}
            <h3 className="mt-0 leading-tight">{name}</h3>
            {otherNames && (
              <p className="italic leading-tight mt-2 text-sm text-grey-700">
                Other names: {otherNames}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

SearchForm.propTypes = {
  idPrefix: PropTypes.string
};

SearchForm.defaultProps = {
  idPrefix: ``
};

export default SearchForm;
