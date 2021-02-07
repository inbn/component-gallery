import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import TableOfContents from '../components/TableOfContents';

const AboutPage = ({ data }) => (
  <Layout heroComponent={<Hero title="About" />}>
    <SEO title="About" description={data.mdx.frontmatter.description} />
    <div className="l-col-wrap">
      <div className="l-col l-col--sidebar border-b border-l">
        {data.mdx !== null && (
          <TableOfContents items={data.mdx.tableOfContents.items} />
        )}
      </div>
      {/* Main content */}
      <div className="l-col l-col--main pt-4 px-6 border-l">
        {data.mdx !== null && (
          <div className="body-text mb-4">
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </div>
        )}
      </div>
    </div>
  </Layout>
);

export default AboutPage;

export const query = graphql`
  {
    mdx: mdx(frontmatter: { slug: { eq: "about" } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
      }
      tableOfContents(maxDepth: 3)
    }
  }
`;
