import React, { useState } from 'react';
import { graphql } from 'gatsby';

import DesignSystem from '../components/DesignSystem/DesignSystem';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Select from '../components/Select/Select';
import SEO from '../components/SEO';

import sortItems from '../utils/sortItems';

const sortingOptions = [
  {
    optionLabel: 'Name',
    path: 'node.data.name',
    comparison: 'text',
    reverse: false
  },
  {
    optionLabel: 'Component count',
    path: 'node.data.Component_examples_count',
    comparison: 'number',
    reverse: true
  }
];

const DesignSystemsIndexPage = ({ data }) => {
  const [designSystems, setDesignSystems] = useState(data.allAirtable.edges);

  return (
    <Layout heroComponent={<Hero title="Design systems" />} isArticle={false}>
      <SEO title="Design systems" />
      <div className="control-bar border-b py-2 px-6 bg-grey-200">
        <Select
          id="sort-order"
          label="Sort by"
          defaultValue="0"
          onChange={event => {
            setDesignSystems(
              // .sort() mutates the array - use spread to create a new one
              sortItems([...designSystems], sortingOptions[event.target.value])
            );
          }}
          options={sortingOptions}
          useIndexAsValue
        />
      </div>
      <ul className="grid border-l mt-0">
        {designSystems.map(
          ({
            node: {
              data: { url, name, organisation, image, features, color },
              id
            }
          }) => {
            return (
              <DesignSystem
                key={id}
                name={name}
                url={url}
                organisation={organisation}
                image={
                  image.localFiles && image.localFiles.length > 0
                    ? image.localFiles[0]
                    : null
                }
                features={features}
                color={color}
              />
            );
          }
        )}
      </ul>
    </Layout>
  );
};

export default DesignSystemsIndexPage;

// query airtable for the properties of each record,
// filtering for only Published records in the Design systems table.
export const query = graphql`
  {
    allAirtable(
      filter: { table: { eq: "Design systems" } }
      sort: { fields: [data___Slug], order: ASC }
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
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
            features: Features
            color: Colour_hex
            Component_examples_count
          }
          id
        }
      }
    }
  }
`;
