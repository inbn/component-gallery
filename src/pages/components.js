import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Component from '../components/Component/Component';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import ReadMoreLink from '../components/ReadMoreLink/ReadMoreLink';
import Select from '../components/Select/Select';
import SEO from '../components/SEO';

import useIsClient from '../hooks/use-is-client';
import sortItems from '../utils/sortItems';

const sortingOptions = [
  {
    optionLabel: 'Name',
    path: 'node.data.name',
    comparison: 'text',
    reverse: false,
  },
  {
    optionLabel: 'Example count',
    path: 'node.data.examplesCount',
    comparison: 'number',
    reverse: true,
  },
];

const ComponentsIndexPage = ({ data }) => {
  const [components, setComponents] = useState(data.allAirtable.edges);
  const { isClient, key } = useIsClient();

  return (
    <Layout heroComponent={<Hero title="Components" />} isArticle={false}>
      <SEO title="Components" />
      <div className="control-bar flex md:justify-end border-b py-2 px-6 min-h-12 bg-grey-200 dark:bg-grey-800">
        {isClient && (
          <Select
            id="sort-order"
            label="Sort by"
            defaultValue="0"
            onChange={(event) => {
              setComponents(
                // .sort() mutates the array - use spread to create a new one
                sortItems([...components], sortingOptions[event.target.value])
              );
            }}
            options={sortingOptions}
            useIndexAsValue
          />
        )}
      </div>
      <ul className="l-grid border-l mt-0">
        {components.map(
          ({
            node: {
              data: {
                slug,
                name,
                description,
                otherNames,
                examplesCount,
                image,
              },
              id,
            },
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
              imageURL={
                image?.localFiles &&
                image.localFiles.length > 0 &&
                image.localFiles[0].publicURL
              }
            />
          )
        )}
        <li className="card">
          <div className="card__inner p-6 h-full flex flex-col">
            <h2>Is there a component missing?</h2>
            <ReadMoreLink to="/contribute" className="mt-auto ml-auto">
              Let me know
            </ReadMoreLink>
          </div>
        </li>
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
            image: Image {
              localFiles {
                publicURL
              }
            }
          }
          id
        }
      }
    }
  }
`;
