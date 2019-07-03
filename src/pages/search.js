import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';

const Search = ({ data, location }) => {
  const [results, setResults] = useState([]);
  const searchQuery =
    new URLSearchParams(location.search).get('keywords') || '';

  useEffect(() => {
    if (searchQuery && window.__LUNR__) {
      const debouncedSearch = debounce(async () => {
        const lunr = await window.__LUNR__.__loaded;
        const refs = lunr.en.index.search(searchQuery);
        const posts = refs.map(({ ref }) => lunr.en.store[ref]);

        setResults(posts);
      }, 500);

      debouncedSearch();
    }

    if (!searchQuery) setResults([]);
  }, [location.search]);

  return (
    <Layout location={location} title="Search">
      <SearchForm query={searchQuery} />
      <SearchResults query={searchQuery} results={results} />
    </Layout>
  );
};

export default Search;
