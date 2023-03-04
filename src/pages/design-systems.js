import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useMediaQuery } from 'beautiful-react-hooks';
import { graphql } from 'gatsby';
import { useQueryParam, ArrayParam, withDefault } from 'use-query-params';

import Accordion from '../components/Accordion/Accordion';
import CheckboxButtonGroup from '../components/CheckboxButton/CheckboxButtonGroup';
import DesignSystem from '../components/DesignSystem/DesignSystem';
import Filter from '../components/Filter/Filter';
import Hero from '../components/Hero/Hero';
import Icon from '../components/Icon/Icon';
import Layout from '../components/Layout';
import ReadMoreLink from '../components/ReadMoreLink/ReadMoreLink';
import Select from '../components/Select/Select';
import SEO from '../components/SEO';

import useIsClient from '../hooks/use-is-client';
import sortItems from '../utils/sortItems';

const sortingOptions = [
  {
    optionLabel: 'Date',
    path: 'node.data.Last_reviewed',
    comparison: 'text',
    reverse: true,
  },
  {
    optionLabel: 'Name',
    path: 'node.data.name',
    comparison: 'text',
    reverse: false,
  },
  {
    optionLabel: 'Component count',
    path: 'node.data.Component_examples_count',
    comparison: 'number',
    reverse: true,
  },
];

const DesignSystemsIndexPage = ({ data }) => {
  const allTechnologies = data.technologies.edges;
  const allFeatures = data.features.edges;
  const allPlatforms = ['GitHub', 'Storybook', 'Figma'];
  const [designSystems, setDesignSystems] = useState(data.designSystems.edges);
  const [sortOrder, setSortOrder] = useState(sortingOptions[0]);
  const [selectedTechnologies, setSelectedTechnologies] = useQueryParam(
    'tech',
    withDefault(ArrayParam, [])
  );
  const [selectedFeatures, setSelectedFeatures] = useQueryParam(
    'features',
    withDefault(ArrayParam, [])
  );
  const [selectedPlatforms, setSelectedPlatforms] = useQueryParam(
    'platforms',
    withDefault(ArrayParam, [])
  );
  const { isClient, key } = useIsClient();
  const isLarge = useMediaQuery('(min-width: 768px)');

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

  const handlePlatformSelect = (platform) => {
    const isSelected = selectedPlatforms.includes(platform);
    // If the option has already been selected, we remove it from the array.
    // Otherwise, we add it.
    const newSelection = isSelected
      ? selectedPlatforms.filter(
          (currentPlatform) => currentPlatform !== platform
        )
      : [...selectedPlatforms, platform];
    setSelectedPlatforms(newSelection);
  };

  const handleClearFilters = () => {
    setSelectedTechnologies([]);
    setSelectedFeatures([]);
    setSelectedPlatforms([]);
  };

  // Use effect sortOrder
  useEffect(() => {
    setDesignSystems(
      // .sort() mutates the array - use spread to create a new one
      sortItems([...designSystems], sortOrder)
    );
  }, [sortOrder]);

  // Use effect selectedTechnologies selectedFeatures
  useEffect(() => {
    let filteredDesignSystems = data.designSystems.edges;

    if (
      selectedTechnologies.length > 0 ||
      selectedFeatures.length > 0 ||
      selectedPlatforms.length > 0
    ) {
      // Loop through all design systems
      filteredDesignSystems = data.designSystems.edges.reduce(
        (accumulator, currentDesignSystem) => {
          if (
            currentDesignSystem.node.data.technologies ||
            currentDesignSystem.node.data.features ||
            currentDesignSystem.node.data.figmaUrl ||
            currentDesignSystem.node.data.storybookUrl ||
            currentDesignSystem.node.data.githubUrl
          ) {
            const designSystemTechnologies =
              currentDesignSystem.node.data.technologies || [];
            const designSystemFeatures =
              currentDesignSystem.node.data.features || [];
            const designSystemPlatforms = [
              ...(currentDesignSystem.node.data.figmaUrl ? ['Figma'] : []),
              ...(currentDesignSystem.node.data.storybookUrl
                ? ['Storybook']
                : []),
              ...(currentDesignSystem.node.data.githubUrl ? ['GitHub'] : []),
            ];

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

            const sharedPlatforms = designSystemPlatforms.filter(
              (designSystemPlatform) =>
                selectedPlatforms.includes(designSystemPlatform)
            );

            // Only include in filteredDesignSystems if it matches all criteria
            if (
              sharedTechnologies.length === selectedTechnologies.length &&
              sharedFeatures.length === selectedFeatures.length &&
              sharedPlatforms.length === selectedPlatforms.length
            ) {
              return [...accumulator, currentDesignSystem];
            }
          }

          return accumulator;
        },
        []
      );
    }

    setDesignSystems(
      // .sort() mutates the array - use spread to create a new one
      sortItems([...filteredDesignSystems], sortOrder)
    );
  }, [selectedFeatures, selectedTechnologies, selectedPlatforms]);

  return (
    <Layout heroComponent={<Hero title="Design systems" />} isArticle={false}>
      <SEO title="Design systems" />
      <div className="control-bar flex items-center gap-3 border-b py-2 px-6 min-h-12 bg-grey-200 dark:bg-grey-800">
        {isClient &&
          (isLarge ? (
            <>
              <p className="text-grey-800 dark:text-grey-200 font-sans font-bold md:text-sm">
                Filter
              </p>
              <div>
                <ul className="flex gap-2 mt-0 self-start">
                  {allPlatforms.map((platform) => (
                    <button
                      type="button"
                      key={platform}
                      className={classNames({
                        'block border text-black dark:text-white rounded-full p-2 z-10 bg-transparent hover:bg-grey-400 dark:hover:bg-grey-700 transition-colors duration-200': true,
                        'bg-grey-700 text-white':
                          selectedPlatforms.includes(platform),
                      })}
                      onClick={() => handlePlatformSelect(platform)}
                      aria-pressed={
                        selectedPlatforms.includes(platform) ? 'true' : 'false'
                      }
                    >
                      <span className="sr-only">{platform}</span>
                      <Icon
                        name={platform.toLowerCase()}
                        className="w-5 h-5"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </ul>
              </div>
              <Filter label="Technology">
                <CheckboxButtonGroup
                  name="tech"
                  options={allTechnologies}
                  selectedOptions={selectedTechnologies}
                  onChange={handleTechnologySelect}
                />
              </Filter>
              <Filter label="Features">
                <CheckboxButtonGroup
                  name="features"
                  options={allFeatures}
                  selectedOptions={selectedFeatures}
                  onChange={handleFeatureSelect}
                />
              </Filter>

              {(selectedTechnologies.length > 0 ||
                selectedFeatures.length > 0 ||
                selectedPlatforms.length > 0) && (
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
      {designSystems.length > 0 ? (
        <ul className="l-grid border-l mt-0">
          {designSystems.map(
            (
              {
                node: {
                  data: {
                    url,
                    name,
                    organisation,
                    image,
                    features,
                    technologies,
                    color,
                    githubUrl,
                    storybookUrl,
                    figmaUrl,
                  },
                  id,
                },
              },
              index
            ) => (
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
                features={features}
                technologies={technologies}
                color={color}
                links={[
                  ...(figmaUrl
                    ? [
                        {
                          url: figmaUrl,
                          platform: 'figma',
                        },
                      ]
                    : []),
                  ...(githubUrl
                    ? [
                        {
                          url: githubUrl,
                          platform: 'github',
                        },
                      ]
                    : []),
                  ...(storybookUrl
                    ? [
                        {
                          url: storybookUrl,
                          platform: 'storybook',
                        },
                      ]
                    : []),
                ]}
              />
            )
          )}
          <li className="card">
            <div className="card__inner p-6 h-full flex flex-col">
              <h2>Is your favourite design system missing?</h2>
              <ReadMoreLink to="/contribute" className="mt-auto ml-auto">
                Let me know
              </ReadMoreLink>
            </div>
          </li>
        </ul>
      ) : (
        <div className="px-6 py-4 font-sans">No results</div>
      )}
    </Layout>
  );
};

export default DesignSystemsIndexPage;

// query airtable for the properties of each record,
// filtering for only Published records in the Design systems table.
export const query = graphql`
  {
    designSystems: allAirtable(
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
                  gatsbyImageData(
                    width: 492
                    height: 369
                    breakpoints: [360, 500, 720, 1000]
                    placeholder: NONE
                  )
                }
              }
            }
            features: Features_lookup
            figmaUrl: Figma_URL
            storybookUrl: Storybook_URL
            githubUrl: GitHub_URL
            technologies: Tech_lookup
            color: Colour_hex
            Component_examples_count
            Last_reviewed
          }
          id
        }
      }
    }
    features: allAirtable(
      filter: { table: { eq: "Design system features" } }
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
  }
`;
