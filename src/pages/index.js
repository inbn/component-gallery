import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Components</h1>
    {data.allAirtable.edges.map((edge, i) => (
      <Link to={`components/${edge.node.data.Slug}`} key={i}>
        <h3>{edge.node.data.Name}</h3>
      </Link>
    ))}
  </Layout>
);

export default IndexPage;

// query airtable for the Title and Path of each record,
// filtering for only records in the Sections table.
export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "Components" } }) {
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
