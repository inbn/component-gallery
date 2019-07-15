import React from 'react';

import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';

const Search = () => {
  return (
    <Layout location={location} title="Search">
      <SearchForm />
    </Layout>
  );
};

export default Search;
