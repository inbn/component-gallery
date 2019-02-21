import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Design systems</h1>
    <ul>
      {data.allAirtable.edges.map((edge, i) => (
        <li key={i}>
          <a href={edge.node.data.URL} target="blank" rel="noopener noreferrer">
            {edge.node.data.Name}{' '}
            {edge.node.data.Organisation !== null &&
              `(${edge.node.data.Organisation})`}
          </a>
        </li>
      ))}
    </ul>
  </Layout>
);

export default IndexPage;

// query airtable for the Name, Organisaton and URL of each record,
// filtering for only records in the Design systems table.
export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "Design systems" } }) {
      edges {
        node {
          data {
            Name
            Organisation
            URL
          }
        }
      }
    }
  }
`;