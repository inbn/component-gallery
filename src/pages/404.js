import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import SEO from '../components/SEO';

const NotFoundPage = () => (
  <Layout heroComponent={<Hero title="404" />} isArticle={false}>
    <SEO title="404: Not found" />
    <div className="col-wrap">
      {/* Main content */}
      <div className="col col--main pt-4 px-6">
        <div className="body-text mb-4">
          <p>It looks like you’ve hit a route that doesn’t exist.</p>
          <p>
            You can use the main navigation links above, visit the{' '}
            <Link to="/">homepage</Link>, or try using the search form below:
          </p>
        </div>
        <div className="mt-4 mb-8 mx-auto max-w-xl">
          <SearchForm idPrefix="404" />
        </div>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;
