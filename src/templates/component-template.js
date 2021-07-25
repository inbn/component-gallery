import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { useMediaQuery } from 'beautiful-react-hooks';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useQueryParam, ArrayParam, withDefault } from 'use-query-params';

import Accordion from '../components/Accordion/Accordion';
import CheckboxButtonGroup from '../components/CheckboxButton/CheckboxButtonGroup';
import Component from '../components/Component/Component';
import ComponentExample from '../components/ComponentExample/ComponentExample';
import Filter from '../components/Filter/Filter';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Select from '../components/Select/Select';
import SEO from '../components/SEO';
import TableOfContents from '../components/TableOfContents';

import useIsClient from '../hooks/use-is-client';
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
  const allTechnologies = data.technologies.edges;
  const allFeatures = data.features.edges;
  // Use the first sorting option as the default
  const [examples, setExamples] = useState(
    sortItems([...data.component.data.Examples], sortingOptions[0])
  );
  const [sortOrder, setSortOrder] = useState(sortingOptions[0]);
  const [selectedTechnologies, setSelectedTechnologies] = useQueryParam(
    'tech',
    withDefault(ArrayParam, [])
  );
  const [selectedFeatures, setSelectedFeatures] = useQueryParam(
    'features',
    withDefault(ArrayParam, [])
  );
  const isLarge = useMediaQuery(
    `(min-width: ${
      data.mdx !== null && data.mdx.tableOfContents.items.length > 0 !== null
        ? '1024'
        : '768'
    }px)`
  );
  const { isClient, key } = useIsClient();

  const handleTechnologySelect = (technology) => {
    const isSelected = selectedTechnologies.includes(technology);
    // If the option has already been selected, we remove it from the array.
    // Otherwise, we add it.
    const newSelection = isSelected
      ? selectedTechnologies.filter((currentTech) => currentTech !== technology)
      : [...selectedTechnologies, technology];
    setSelectedTechnologies(newSelection);
  };

  const handleFeatureSelect = (feature) => {
    const isSelected = selectedFeatures.includes(feature);
    // If the option has already been selected, we remove it from the array.
    // Otherwise, we add it.
    const newSelection = isSelected
      ? selectedFeatures.filter((currentFeature) => currentFeature !== feature)
      : [...selectedFeatures, feature];
    setSelectedFeatures(newSelection);
  };

  const handleClearFilters = () => {
    setSelectedTechnologies([]);
    setSelectedFeatures([]);
  };

  // Use effect sortOrder
  useEffect(() => {
    setExamples(
      // .sort() mutates the array - use spread to create a new one
      sortItems([...examples], sortOrder)
    );
  }, [sortOrder]);

  // Use effect selectedTechnologies selectedFeatures
  useEffect(() => {
    let filteredComponentExamples = data.component.data.Examples;

    if (selectedTechnologies.length > 0 || selectedFeatures.length > 0) {
      // Loop through all design systems
      filteredComponentExamples = data.component.data.Examples.reduce(
        (accumulator, currentValue) => {
          if (
            currentValue.data.designSystem[0].data.technologies ||
            currentValue.data.designSystem[0].data.features
          ) {
            const designSystemTechnologies =
              currentValue.data.designSystem[0].data.technologies || [];
            const designSystemFeatures =
              currentValue.data.designSystem[0].data.features || [];

            // Get an array of all technologies which match the current selection
            const sharedTechnologies = designSystemTechnologies.filter(
              (designSystemTech) =>
                selectedTechnologies.includes(designSystemTech)
            );

            // Get an array of all features which match the current selection
            const sharedFeatures = designSystemFeatures.filter(
              (designSystemFeature) =>
                selectedFeatures.includes(designSystemFeature)
            );

            // Only include in filteredComponentExamples if it matches all criteria
            if (
              sharedTechnologies.length === selectedTechnologies.length &&
              sharedFeatures.length === selectedFeatures.length
            ) {
              return [...accumulator, currentValue];
            }
          }

          return accumulator;
        },
        []
      );
    }

    setExamples(
      // .sort() mutates the array - use spread to create a new one
      sortItems([...filteredComponentExamples], sortOrder)
    );
  }, [selectedFeatures, selectedTechnologies]);

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
              <p>Updated {data.component.data.Date_updated}</p>
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
                {(selectedTechnologies.length > 0 ||
                  selectedFeatures.length > 0) && (
                  <span className="text-grey-700">
                    &nbsp;({examples.length} shown)
                  </span>
                )}
              </h2>
              <div className="control-bar flex items-center py-2 px-6 min-h-12 bg-grey-200 dark:bg-grey-800 mt-4 border-t">
                {isClient &&
                  (isLarge ? (
                    <>
                      <Filter label="Technology">
                        <CheckboxButtonGroup
                          name="tech"
                          options={allTechnologies}
                          selectedOptions={selectedTechnologies}
                          onChange={handleTechnologySelect}
                          showCounts={false}
                        />
                      </Filter>
                      <Filter label="Features">
                        <CheckboxButtonGroup
                          name="features"
                          options={allFeatures}
                          selectedOptions={selectedFeatures}
                          onChange={handleFeatureSelect}
                          showCounts={false}
                        />
                      </Filter>
                      {(selectedTechnologies.length > 0 ||
                        selectedFeatures.length > 0) && (
                        <button
                          type="button"
                          className="font-sans font-bold text-sm border border-black dark:border-white rounded-full px-2"
                          onClick={handleClearFilters}
                        >
                          Clear filters
                        </button>
                      )}
                      <div className="ml-auto">
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
                    </>
                  ) : (
                    <Accordion title="Filter and sort">
                      <div className="py-2 flex flex-col">
                        <h3 className="text-base font-bold py-2 text-grey-800 dark:text-grey-200">
                          Technology
                        </h3>
                        <div>
                          <CheckboxButtonGroup
                            name="tech"
                            options={allTechnologies}
                            selectedOptions={selectedTechnologies}
                            onChange={handleTechnologySelect}
                            showCounts={false}
                          />
                        </div>
                        <h3 className="text-base font-bold py-2 mt-3 text-grey-800 dark:text-grey-200">
                          Features
                        </h3>
                        <div>
                          <CheckboxButtonGroup
                            name="features"
                            options={allFeatures}
                            selectedOptions={selectedFeatures}
                            onChange={handleFeatureSelect}
                            showCounts={false}
                          />
                        </div>
                        <div className="mt-3">
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
                      </div>
                    </Accordion>
                  ))}
              </div>
              {examples.length > 0 ? (
                <ul className="l-grid border-t mt-0">
                  {examples.map(({ data: { URL, Name, designSystem } }) => (
                    <ComponentExample
                      key={URL}
                      url={URL}
                      componentName={Name}
                      designSystemName={designSystem[0].data.Name}
                      designSystemOrganisation={
                        designSystem[0].data.Organisation
                      }
                      technologies={designSystem[0].data.technologies}
                      features={designSystem[0].data.features}
                      color={designSystem[0].data.Colour_hex}
                    />
                  ))}
                </ul>
              ) : (
                <div className="px-6 py-4 font-sans border-t">No results</div>
              )}
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
