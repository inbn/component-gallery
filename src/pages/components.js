import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Component from '../components/Component/Component';
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
    optionLabel: 'Example count',
    path: 'node.data.examplesCount',
    comparison: 'number',
    reverse: true
  }
];

const ComponentsIndexPage = ({ data }) => {
  const [components, setComponents] = useState(data.allAirtable.edges);
  return (
    <Layout heroComponent={<Hero title="Components" />} isArticle={false}>
      <SEO title="Components" />
      <div className="control-bar border-b py-2 px-6 bg-grey-200 dark:bg-grey-800">
        <Select
          id="sort-order"
          label="Sort by"
          defaultValue="0"
          onChange={event => {
            setComponents(
              // .sort() mutates the array - use spread to create a new one
              sortItems([...components], sortingOptions[event.target.value])
            );
          }}
          options={sortingOptions}
          useIndexAsValue
        />
      </div>
      <ul className="grid border-l mt-0">
        {components.map(
          ({
            node: {
              data: { slug, name, description, otherNames, examplesCount },
              id
            }
          }) => (
            <Component
              key={id}
              slug={slug}
              name={name}
              description={
                description !== null && description.childMarkdownRemark.html
              }
              otherNames={otherNames}
              examplesCount={examplesCount}
            />
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
