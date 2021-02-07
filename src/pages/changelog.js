import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';

const ChangelogPage = ({ data }) => (
  <Layout heroComponent={<Hero title="Changelog" />}>
    <SEO title="Changelog" />
    <div className="l-col-wrap">
      {/* Main content */}
      <div className="l-col l-col--main pt-4 px-6">
        {data.mdx !== null && (
          <div className="body-text mb-4">
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </div>
        )}
      </div>
    </div>
  </Layout>
);

export default ChangelogPage;

export const query = graphql`
  {
    mdx: mdx(frontmatter: { slug: { eq: "changelog" } }) {
      body
    }
  }
`;
