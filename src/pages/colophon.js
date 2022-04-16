import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero/Hero';

const ColophonPage = ({ data }) => (
  <Layout heroComponent={<Hero title="Colophon" />}>
    <SEO title="Colophon" description={data.mdx.frontmatter.description} />
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

export default ColophonPage;

export const query = graphql`
  {
    mdx: mdx(frontmatter: { slug: { eq: "colophon" } }) {
      body
      frontmatter {
        description
      }
    }
  }
`;
