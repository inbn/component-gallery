import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({ data }) => (
  <Layout>
    <h3>{data.airtable.data.Title}</h3>
    <main
      dangerouslySetInnerHTML={{
        __html: data.airtable.data.Body.childMarkdownRemark.html,
      }}
    />
    {data.airtable.data.Pages.map((page, i) => (
      <Link to={page.data.Path} key={i}>
        <h4>{page.data.Title}</h4>
      </Link>
    ))}
  </Layout>
)

export const query = graphql`
  query GetSection($Path: String!) {
    airtable(table: { eq: "Sections" }, data: { Path: { eq: $Path } }) {
      data {
        Title
        Body {
          childMarkdownRemark {
            html
          }
        }
        Pages {
          data {
            Title
            Path
          }
        }
      }
    }
  }
`
