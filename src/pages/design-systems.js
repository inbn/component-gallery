import React, { useState } from 'react';
import { graphql } from 'gatsby';

import DesignSystem from '../components/DesignSystem';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const sortingOptions = [
  {
    label: 'Name (A–Z)',
    key: 'name',
    comparison: 'text',
    flip: false
  },
  {
    label: 'Name (Z-A)',
    key: 'name',
    comparison: 'text',
    flip: true
  },
  {
    label: '# of components (asc)',
    key: 'Component_examples_count',
    comparison: 'number',
    flip: false
  },
  {
    label: '# of components (desc)',
    key: 'Component_examples_count',
    comparison: 'number',
    flip: true
  }
];

const sortItems = (items, { key, comparison, flip }) => {
  const result = items.sort((a, b) => {
    switch (comparison) {
      case 'text':
        const stringA = a.node.data[key].toUpperCase();
        const stringB = b.node.data[key].toUpperCase();
        if (stringA < stringB) {
          return -1;
        }
        if (stringA > stringB) {
          return 1;
        }

        // strings must be equal
        return 0;
      case 'number':
        return a.node.data[key] - b.node.data[key];
      default:
        return true;
    }
  });
  if (flip) {
    result.reverse();
  }

  return result;
};

const DesignSystemsIndexPage = ({ data }) => {
  const [designSystems, setDesignSystems] = useState(data.allAirtable.edges);

  return (
    <Layout heroComponent={<Hero title="Design systems" />}>
      <SEO title="Design systems" />
      <div className="control-bar border-b px-6 bg-grey-200">
        <label htmlFor="sortOrder" className="mr-2 text-black font-sans">
          Order
        </label>
        <select
          id="sortOrder"
          className="border-t-0 border-b-0"
          onChange={event => {
            setDesignSystems(
              // .sort() mutates the array - use spread to create a new one
              sortItems([...designSystems], sortingOptions[event.target.value])
            );
          }}
        >
          {sortingOptions.map((option, i) => (
            <option value={i} key={i}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <ul className="grid border-l mt-0">
        {designSystems.map(
          (
            {
              node: {
                data: { url, name, organisation, image, features, color }
              }
            },
            i
          ) => {
            return (
              <li key={i}>
                <DesignSystem
                  name={name}
                  url={url}
                  organisation={organisation}
                  image={
                    image.localFiles.length > 0 ? image.localFiles[0] : null
                  }
                  features={features}
                  color={color}
                />
              </li>
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
                  fluid(
                    maxWidth: 608
                    maxHeight: 456
                    traceSVG: { background: "#fff", color: "#dae1e7" }
                  ) {
                    ...GatsbyImageSharpFluid
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            features: Features
            color: Colour_hex
            Component_examples_count
          }
        }
      }
    }
  }
`;
