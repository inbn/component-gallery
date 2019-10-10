import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Component from '../components/Component';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import sortItems from '../utils/sortItems';

const sortingOptions = [
  {
    label: 'Name (A–Z)',
    path: 'node.data.name',
    comparison: 'text',
    flip: false
  },
  {
    label: 'Name (Z-A)',
    path: 'node.data.name',
    comparison: 'text',
    flip: true
  },
  {
    label: '№ of examples (asc)',
    path: 'node.data.examplesCount',
    comparison: 'number',
    flip: false
  },
  {
    label: '№ of examples (desc)',
    path: 'node.data.examplesCount',
    comparison: 'number',
    flip: true
  }
];

const ComponentsIndexPage = ({ data }) => {
  const [components, setComponents] = useState(data.allAirtable.edges);
  return (
    <Layout heroComponent={<Hero title="Components" />}>
      <SEO title="Components" />
      <div className="control-bar border-b py-2 px-6 bg-grey-200">
        <label
          htmlFor="sortOrder"
          className="mr-2 text-grey-800 text-sm font-sans font-bold"
        >
          Sort by
        </label>
        <select
          id="sortOrder"
          className=""
          onChange={event => {
            setComponents(
              // .sort() mutates the array - use spread to create a new one
              sortItems([...components], sortingOptions[event.target.value])
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
        {components.map(
          ({
            node: {
              data: { slug, name, description, otherNames, examplesCount },
              id
            }
          }) => (
            <li key={id} className="">
              <Component
                slug={slug}
                name={name}
                description={
                  description !== null && description.childMarkdownRemark.html
                }
                otherNames={otherNames}
                examplesCount={examplesCount}
              />
            </li>
          )
        )}
      </ul>
    </Layout>
  );
};

export default ComponentsIndexPage;

// query airtable for properties of each record,
// filtering for only published records in the Components table.
export const query = graphql`
  {
    allAirtable(
      filter: { table: { eq: "Components" }, data: { Publish: { eq: true } } }
      sort: { fields: [data___Name], order: ASC }
    ) {
      edges {
        node {
          data {
            name: Name
            description: Description {
              childMarkdownRemark {
                html
              }
            }
            slug: Slug
            otherNames: Other_names
            examplesCount: Examples_count
          }
          id
        }
      }
    }
  }
`;
