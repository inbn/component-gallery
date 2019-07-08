import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { Index } from 'elasticlunr';
import debounce from 'lodash.debounce';
import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';

const Search = ({ data, location }) => {
  const [searchIndex, setSearchIndex] = useState(null);
  const [results, setResults] = useState([]);
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

export const query = graphql`
  {
    siteSearchIndex {
      index
    }
  }
`;
