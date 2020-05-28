import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import ComponentExample from '../components/ComponentExample/ComponentExample';
import Component from '../components/Component/Component';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import TableOfContents from '../components/TableOfContents';

import sortItems from '../utils/sortItems';

const sortingOptions = [
  {
    label: 'Design system',
    path: 'data.Design_system[0].data.Name',
    comparison: 'text',
    flip: false
  },
  {
    label: 'Component name',
    path: 'data.Name',
    comparison: 'text',
    flip: false
  }
];

export default ({ data }) => {
  // Use the first sorting option as the default
  const [examples, setExamples] = useState(
    sortItems([...data.airtable.data.Examples], sortingOptions[0])
  );

  let tocItems = null;
  let readtime = null;

  if (data.mdx !== null && data.mdx.tableOfContents.items.length > 0) {
    // Insert 'examples' as the first item in the table of contents
    tocItems = [
      {
        url: '#examples',
        title: 'Examples'
      },
      ...data.mdx.tableOfContents.items,
      ...(data.airtable.data.relatedComponents !== null
        ? [
            {
              url: '#related-components',
              title: 'Related components'
            }
          ]
        : [])
    ];

    readtime = `${data.mdx.timeToRead} minute read`;
  }

  return (
    <Layout
      heroComponent={
        <Hero
          byline="Component"
          title={data.airtable.data.Name}
          subtitle={
            data.airtable.data.Other_names !== null
              ? `Other names: ${data.airtable.data.Other_names}`
              : null
          }
          intro={
            data.airtable.data.Description !== null
              ? data.airtable.data.Description.childMarkdownRemark.html
              : null
          }
        />
      }
    >
      <SEO
        title={
          data.airtable.data.Emoji
            ? `${data.airtable.data.Emoji} ${data.airtable.data.Name}`
            : data.airtable.data.Name
        }
        description={
          data.airtable.data.Description !== null &&
          data.airtable.data.Description.childMarkdownRemark.excerpt
        }
      />
      <div className="col-wrap">
        {/* Sidebar */}
        {tocItems !== null && (
          <div className="col col--sidebar border-b border-l">
            <div className="font-sans py-2 px-6 border-b bg-white text-black text-sm block">
              {/* Last updated date */}
              <p className="">Updated {data.airtable.data.Date_updated}</p>
              {/* Read time */}
              {readtime !== null && <p className="mt-0">{readtime}</p>}
            </div>
            {/* Table of contents */}
            <TableOfContents items={tocItems} />
          </div>
        )}
        {/* Main content */}
        <div className="col col--main pt-4 border-l">
          {/* Examples */}
          {data.airtable.data.Examples !== null && (
            <>
              <h2 id="examples" className="px-6">
                {data.airtable.data.Examples_count} example
                {data.airtable.data.Examples_count !== 1 && 's'}
              </h2>
              <div className="control-bar py-2 px-6 bg-grey-200 mt-4 border-t">
                <label
                  htmlFor="sortOrder"
                  className="text-grey-800 text-sm font-sans font-bold"
                >
                  <span className="mr-2">Sort by</span>
                  <select
                    id="sortOrder"
                    className=""
                    onChange={event => {
                      setExamples(
                        // .sort() mutates the array - use spread to create a new one
                        sortItems(
                          [...examples],
                          sortingOptions[event.target.value]
                        )
                      );
                    }}
                  >
                    {sortingOptions.map((option, i) => (
                      <option value={i} key={i}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <ul className="grid border-t mt-0">
                {examples.map(({ data: { URL, Name, Design_system } }, i) => (
                  <ComponentExample
                    key={i}
                    url={URL}
                    componentName={Name}
                    designSystemName={Design_system[0].data.Name}
                    designSystemOrganisation={
                      Design_system[0].data.Organisation
                    }
                    features={Design_system[0].data.Features}
                    color={Design_system[0].data.Colour_hex}
                  />
                ))}
              </ul>
            </>
          )}

          {data.mdx !== null && (
            <div className="body-text p-6">
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </div>
          )}

          {data.airtable.data.relatedComponents !== null && (
            <>
              <div
                style={{ ...(data.mdx !== null ? { maxWidth: '76ch' } : {}) }}
                className="mx-auto px-6 py-4"
              >
                <h2 id="related-components" className="mt-0">
                  Related components
                </h2>
              </div>
              <div className="border-t">
                <ul className="grid mt-0">
                  {data.airtable.data.relatedComponents.map(
                    ({
                      data: {
                        slug,
                        name,
                        description,
                        otherNames,
                        examplesCount
                      },
                      id
                    }) => (
                      <Component
                        key={id}
                        slug={slug}
                        name={name}
                        description={
                          description !== null &&
                          description.childMarkdownRemark.html
                        }
                        otherNames={otherNames}
                        examplesCount={examplesCount}
                      />
                    )
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query GetPage($Slug: String!) {
    airtable: airtable(
      table: { eq: "Components" }
      data: { Slug: { eq: $Slug }, Publish: { eq: true } }
    ) {
      data {
        Name
        Slug
        Description {
          childMarkdownRemark {
            html
            excerpt(pruneLength: 200)
          }
        }
        Other_names
        Examples {
          data {
            Name
            URL
            Design_system {
              data {
                Name
                Organisation
                Colour_hex
                Features
              }
            }
          }
        }
        Examples_count
        Emoji
        Date_updated(formatString: "MMMM Do, YYYY")
        relatedComponents: Related_components {
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
    mdx: mdx(frontmatter: { slug: { eq: $Slug } }) {
      body
      frontmatter {
        title
        path
        date(formatString: "MMMM DD, YYYY")
      }
      tableOfContents(maxDepth: 3)
      timeToRead
    }
  }
`;
