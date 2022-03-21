import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Form from '../components/Form/Form';

const ContributePage = ({ data }) => (
  <Layout heroComponent={<Hero title="Contribute" />}>
    <SEO title="Contribute" description={data.mdx.frontmatter.description} />
    <div className="l-col-wrap">
      {/* Main content */}
      <div className="l-col l-col--main pt-4 px-6">
        <div className="body-text mb-4">
          {data.mdx !== null && <MDXRenderer>{data.mdx.body}</MDXRenderer>}
          <h2>Contact form</h2>
          <Form />
        </div>
      </div>
    </div>
  </Layout>
);

export default ContributePage;

export const query = graphql`
  {
    mdx: mdx(frontmatter: { slug: { eq: "contribute" } }) {
      body
      frontmatter {
        description
      }
    }
  }
`;
