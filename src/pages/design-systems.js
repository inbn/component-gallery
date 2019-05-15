import React from 'react';
import { graphql } from 'gatsby';

import DesignSystem from '../components/DesignSystem';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const DesignSystemsIndexPage = ({ data }) => (
  <Layout>
    <SEO title="Design systems" />
    <h1 className="border-b-2 px-2 -mx-2 pb-1">Design systems</h1>
    <ul className="flex flex-wrap mt-2 -mx-4">
      {data.allAirtable.edges.map(
        (
          {
            node: {
              data: { url, name, organisation, image, features, color }
            }
          },
          i
        ) => (
          <li key={i} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <DesignSystem
              name={name}
              url={url}
              organisation={organisation}
              image={image.localFiles.length > 0 ? image.localFiles[0] : null}
              features={features}
              color={color}
            />
          </li>
        )
      )}
    </ul>
  </Layout>
);

export default DesignSystemsIndexPage;

// query airtable for the Name, Organisation and URL of each record,
// filtering for only records in the Design systems table.
export const query = graphql`
  {
    allAirtable(
      filter: {
        table: { eq: "Design systems" }
        data: { Publish: { eq: true } }
      }
      sort: { fields: [data___Name], order: ASC }
    ) {
      edges {
        node {
          data {
            name: Name
            organisation: Organisation
            url: URL
            image: Image {
              localFiles {
                childImageSharp {
                  fluid(maxWidth: 608, maxHeight: 456) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            features: Features
            color: Colour_hex
          }
        }
      }
    }
  }
`;
