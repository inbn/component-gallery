import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import TableOfContents from '../components/TableOfContents';

const AboutPage = ({ data }) => (
  <Layout heroComponent={<Hero title="About" />}>
    <SEO title="About" description={data.markdown.frontmatter.description} />
    <div className="col-wrap">
      <div className="col col--sidebar border-b border-l">
        {/* Table of contents */}
        <TableOfContents html={data.markdown.tableOfContents} />
      </div>
      {/* Main content */}
      <div className="col col--main pt-4 px-6 border-l">
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

export default AboutPage;

export const query = graphql`
  {
    markdown: markdownRemark(frontmatter: { slug: { eq: "about" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
      }
      tableOfContents(pathToSlugField: "frontmatter.path", maxDepth: 3)
    }
  }
`;
