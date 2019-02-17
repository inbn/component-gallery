import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

import SEO from '../components/seo';

export default ({ data }) => (
  <Layout>
    <SEO title={data.airtable.data.Name} />
    <h3>{data.airtable.data.Name}</h3>
    {data.airtable.data.Other_names !== null && (
      <>
        <h4>Other names</h4>
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
        <h4>Examples</h4>
        <ul>
          {data.airtable.data.Examples.map((page, i) => (
            <li key={i}>
              <a href={page.data.URL}>{page.data.URL}</a>
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
            URL
          }
        }
      }
    }
  }
`;
