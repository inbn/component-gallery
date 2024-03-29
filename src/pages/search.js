import React from 'react';

import Layout from '../components/Layout';
import Hero from '../components/Hero/Hero';
import SearchForm from '../components/SearchForm';
import SEO from '../components/SEO';

const Search = () => (
  <Layout
    title="Search"
    heroComponent={<Hero title="Search" />}
    isArticle={false}
  >
    <SEO title="Search" />
    <div className="l-col-wrap">
      {/* Main content */}
      <div className="l-col l-col--main py-4 px-6">
        <SearchForm idPrefix="search" />
      </div>
    </div>
  </Layout>
);

export default Search;
