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
    optionLabel: 'Date',
    path: 'node.data.Last_reviewed',
    comparison: 'text',
    reverse: true
  },
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
      <div className="control-bar border-b py-2 px-6 bg-grey-200 dark:bg-grey-800">
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
          (
            {
              node: {
                data: { url, name, organisation, image, features, color },
                id
              }
            },
            index
          ) => {
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
                imageLoading={index === 0 ? 'eager' : 'lazy'}
                imageFadeIn={index !== 0}
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
      sort: { fields: [data___Last_reviewed], order: DESC }
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
                  fluid(
                    maxWidth: 492
                    maxHeight: 369
                    srcSetBreakpoints: [360, 500, 720, 1000]
                  ) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
            features: Features
            color: Colour_hex
            Component_examples_count
            Last_reviewed
          }
          id
        }
      }
    }
  }
`;
