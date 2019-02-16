import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Table of Contents</h1>
    {data.allAirtable.edges.map((edge, i) => (
      <Link to={edge.node.data.Path} key={i}>
        <h3>{edge.node.data.Title}</h3>
      </Link>
    ))}
  </Layout>
)

export default IndexPage

// query airtable for the Title and Path of each record,
// filtering for only records in the Sections table.
export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "Sections" } }) {
      edges {
        node {
          data {
            Title
            Path
          }
        }
      }
    }
  }
`
