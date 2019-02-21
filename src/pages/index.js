import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Components</h1>
    <ul>
      {data.allAirtable.edges.map((edge, i) => (
        <li key={i}>
          <Link to={`components/${edge.node.data.Slug}`} key={i}>
            {edge.node.data.Name}
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

export default IndexPage;

// query airtable for the Title and Path of each record,
// filtering for only records in the Sections table.
export const query = graphql`
  {
    allAirtable(
      filter: { table: { eq: "Components" } }
      sort: { fields: [data___Name], order: ASC }
    ) {
      edges {
        node {
          data {
            Name
            Slug
          }
        }
      }
    }
  }
`;
