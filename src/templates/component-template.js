import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Component from '../components/Component/Component';
import ComponentExample from '../components/ComponentExample/ComponentExample';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Select from '../components/Select/Select';
import SEO from '../components/SEO';
import TableOfContents from '../components/TableOfContents';

import sortItems from '../utils/sortItems';

const sortingOptions = [
  {
    optionLabel: 'Design system',
    path: 'data.designSystem[0].data.Name',
    comparison: 'text',
    reverse: false,
  },
  {
    optionLabel: 'Component name',
    path: 'data.Name',
    comparison: 'text',
    reverse: false,
  },
];

const ComponentTemplate = ({ data }) => {
  // Use the first sorting option as the default
  const [sortOrder, setSortOrder] = useState(sortingOptions[0]);
  const [examples, setExamples] = useState(
    sortItems([...data.component.data.Examples], sortingOptions[0])
  );

  useEffect(() => {
    setExamples(
      // .sort() mutates the array - use spread to create a new one
      sortItems([...examples], sortOrder)
    );
  }, [sortOrder]);

  let tocItems = null;
  let readtime = null;

  if (data.mdx !== null && data.mdx.tableOfContents.items.length > 0) {
    // Insert 'examples' as the first item in the table of contents
    tocItems = [
      {
        url: '#examples',
        title: 'Examples',
      },
      ...data.mdx.tableOfContents.items,
      ...(data.component.data.relatedComponents !== null
        ? [
            {
              url: '#related-components',
              title: 'Related components',
            },
          ]
        : []),
    ];

    readtime = `${data.mdx.timeToRead} minute read`;
  }

  return (
    <Layout
      heroComponent={
        <Hero
          byline="Component"
          title={data.component.data.Name}
          subtitle={
            data.component.data.Other_names !== null
              ? `Other names: ${data.component.data.Other_names}`
              : null
          }
          intro={
            data.component.data.Description !== null
              ? data.component.data.Description.childMarkdownRemark.html
              : null
          }
        />
      }
    >
      <SEO
        title={
          data.component.data.Emoji
            ? `${data.component.data.Emoji} ${data.component.data.Name}`
            : data.component.data.Name
        }
        description={
          data.component.data.Description !== null &&
          data.component.data.Description.childMarkdownRemark.excerpt
        }
      />
      <div className="l-col-wrap">
        {/* Sidebar */}
        {tocItems !== null && (
          <div className="l-col l-col--sidebar border-b border-l">
            <div className="font-sans py-2 px-6 border-b bg-white dark:bg-black text-black dark:text-white text-sm block">
              {/* Last updated date */}
              <p className="">Updated {data.component.data.Date_updated}</p>
              {/* Read time */}
              {readtime !== null && <p className="mt-0">{readtime}</p>}
            </div>
            {/* Table of contents */}
            <TableOfContents items={tocItems} />
          </div>
        )}
        {/* Main content */}
        <div className="l-col l-col--main pt-4 border-l">
          {/* Examples */}
          {data.component.data.Examples !== null && (
            <>
              <h2 id="examples" className="px-6">
                {data.component.data.Examples_count} example
                {data.component.data.Examples_count !== 1 && 's'}
              </h2>
              <div className="control-bar py-2 px-6 bg-grey-200 dark:bg-grey-800 mt-4 border-t">
                <Select
                  id="sort-order"
                  label="Sort by"
                  defaultValue="0"
                  onChange={(event) => {
                    setSortOrder(sortingOptions[event.target.value]);
                  }}
                  options={sortingOptions}
                  useIndexAsValue
                />
              </div>
              <ul className="l-grid border-t mt-0">
                {examples.map(({ data: { URL, Name, designSystem } }, i) => (
                  <ComponentExample
                    key={i}
                    url={URL}
                    componentName={Name}
                    designSystemName={designSystem[0].data.Name}
                    designSystemOrganisation={designSystem[0].data.Organisation}
                    technologies={designSystem[0].data.technologies}
                    features={designSystem[0].data.features}
                    color={designSystem[0].data.Colour_hex}
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

          {data.component.data.relatedComponents !== null && (
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
                <ul className="l-grid mt-0">
                  {data.component.data.relatedComponents.map(
                    ({
                      data: {
                        slug,
                        name,
                        description,
                        otherNames,
                        examplesCount,
                      },
                      id,
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

export default ComponentTemplate;

export const query = graphql`
  query GetPage($Slug: String!) {
    component: airtable(
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
            designSystem: Design_system {
              data {
                Name
                Organisation
                Colour_hex
                features: Features_lookup
                technologies: Tech_lookup
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
    features: allAirtable(
      filter: {
        table: { eq: "Design system features" }
        data: { Show_on_component: { eq: true } }
      }
      sort: { fields: [data___Name], order: ASC }
    ) {
      edges {
        node {
          data {
            name: Name
            count: Design_systems_count
          }
          id
        }
      }
    }
    technologies: allAirtable(
      filter: { table: { eq: "Design system tech" } }
      sort: { fields: [data___Name], order: ASC }
    ) {
      edges {
        node {
          data {
            name: Name
            count: Design_systems_count
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
