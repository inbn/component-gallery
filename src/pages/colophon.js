import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';

const ColophonPage = ({ data }) => (
  <Layout heroComponent={<Hero title="Colophon" />}>
    <SEO title="Colophon" description={data.markdown.frontmatter.description} />
    <div className="col-wrap -mx-6">
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

export default ColophonPage;

export const query = graphql`
  {
    markdown: markdownRemark(frontmatter: { slug: { eq: "colophon" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
      }
    }
  }
`;
