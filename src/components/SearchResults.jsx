import React from 'react';

const SearchResults = ({ query, results }) => (
  <section aria-label="Search results for all posts">
    {!!results.length && query && (
      <p
        className="search-results-count sr-only"
        id="search-results-count"
        aria-live="polite"
        aria-atomic="true"
      >
        Found {results.length} results for "{query}"
      </p>
    )}

    {!!results.length && (
      <ol className="search-results-list">
        {results.map(({ table, name, url, description, otherNames }) => (
          <li key={name}>
            {table && (
              <p className="font-sans mb-2 uppercase text-grey-700 text-xs inline-block">
                {table === 'Components' ? 'Component' : 'Design System'}
              </p>
            )}
            <h3 className="mt-0">
              <a href={url}>{name}</a>
            </h3>
            {otherNames && <p>Other names: {otherNames}</p>}
            {description && <p>{description}</p>}
          </li>
        ))}
      </ol>
    )}
  </section>
);

export default SearchResults;
