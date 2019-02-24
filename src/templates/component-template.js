import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

import SEO from '../components/seo';

export default ({ data }) => (
  <Layout>
    <SEO title={data.airtable.data.Name} />
    <h1>{data.airtable.data.Name}</h1>
    {data.airtable.data.Other_names !== null && (
      <>
        <h2>Other names</h2>
        <p>{data.airtable.data.Other_names}</p>
      </>
    )}
    {data.airtable.data.Description !== null && (
      <main
        dangerouslySetInnerHTML={{
          __html: data.airtable.data.Description.childMarkdownRemark.html
        }}
      />
    )}
    {data.airtable.data.Examples !== null && (
      <>
        <h2>Examples</h2>
        <ul>
          {data.airtable.data.Examples.map((page, i) => (
            <li key={i}>
              <a href={page.data.URL} target="_blank" rel="noopener noreferrer">
                {page.data.Design_system[0].data.Name}
              </a>
            </li>
          ))}
        </ul>
      </>
    )}
  </Layout>
);

export const query = graphql`
  query GetPage($Slug: String!) {
    airtable(table: { eq: "Components" }, data: { Slug: { eq: $Slug } }) {
      data {
        Name
        Slug
        Description {
          childMarkdownRemark {
            html
          }
        }
        Other_names
        Examples {
          data {
            Name
            URL
            Design_system {
              data {
                Name
                Organisation
              }
            }
          }
        }
      }
    }
  }
`;
