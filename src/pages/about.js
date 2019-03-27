import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const AboutPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1 className="border-b-2 px-2 -mx-2 pb-1">About</h1>
    <div
      className="body-text w-full md:w-2/3 mt-4"
      dangerouslySetInnerHTML={{
        __html: data.markdown.html
      }}
    />
  </Layout>
);

export default AboutPage;

export const query = graphql`
  {
    markdown: markdownRemark(frontmatter: { slug: { eq: "about" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
