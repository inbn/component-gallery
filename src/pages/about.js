import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import SEO from '../components/SEO';

const AboutPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Hero title="About" />
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
