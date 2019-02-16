import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

import SEO from "../components/seo"

export default ({ data }) => (
  <Layout>
    <SEO title={data.airtable.data.Title} />
    <Link to={data.airtable.data.Section[0].data.Path}>
      <h6>{data.airtable.data.Section[0].data.Title}</h6>
    </Link>
    <h3>{data.airtable.data.Title}</h3>
    <main
      dangerouslySetInnerHTML={{
        __html: data.airtable.data.Body.childMarkdownRemark.html,
      }}
    />
  </Layout>
)

export const query = graphql`
  query GetPage($Path: String!) {
    airtable(table: { eq: "Pages" }, data: { Path: { eq: $Path } }) {
      data {
        Title
        Body {
          childMarkdownRemark {
            html
          }
        }
        Section {
          data {
            Title
            Path
          }
        }
      }
    }
  }
`
