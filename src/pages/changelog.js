import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';

const ChangelogPage = ({ data }) => (
  <Layout heroComponent={<Hero title="Changelog" />}>
    <SEO title="Changelog" />
    <div className="col-wrap">
      {/* Main content */}
      <div className="col col--main pt-4 px-6">
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdown.html
          }}
          className="body-text mb-4"
        />
      </div>
    </div>
  </Layout>
);

export default ChangelogPage;

export const query = graphql`
  {
    markdown: markdownRemark(frontmatter: { slug: { eq: "changelog" } }) {
      html
    }
  }
`;
