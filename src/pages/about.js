import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';

const AboutPage = ({ data }) => (
  <Layout heroComponent={<Hero title="About" />}>
    <SEO title="About" description={data.markdown.frontmatter.description} />
    <div className="col-wrap -mx-2 mt-4 bg-grey-100">
      <div className="col col--sidebar p-2">
        {/* Table of contents */}
        <h2 className="font-sans mb-2 uppercase bg-grey-100 text-grey-700 text-xs pt-1 pl-2">
          Table of contents
        </h2>
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdown.tableOfContents
          }}
          className="body-text md:text-sm"
        />
      </div>
      <div className="col col--main p-2">
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdown.html
          }}
          className="body-text"
        />
      </div>
      {/* Main content */}
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
