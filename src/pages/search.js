import React from 'react';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import SEO from '../components/SEO';

const Search = () => {
  return (
    <Layout title="Search" heroComponent={<Hero title="Search" />}>
      <SEO title="Search" />
      <div className="col-wrap">
        {/* Main content */}
        <div className="col col--main py-4 px-6">
          <SearchForm />
        </div>
      </div>
    </Layout>
  );
};

export default Search;
