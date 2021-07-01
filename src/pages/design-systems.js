import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'beautiful-react-hooks';
import { graphql } from 'gatsby';

import CheckboxButton from '../components/CheckboxButton/CheckboxButton';
import DesignSystem from '../components/DesignSystem/DesignSystem';
import Filter from '../components/Filter/Filter';
import Icon from '../components/Icon/Icon';
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

const TechnologyFilters = ({
  allTechnologies,
  selectedTechnologies,
  handleSelect,
}) => (
  <>
    {allTechnologies.map(({ node: { data: { name, count }, id } }) => (
      <CheckboxButton
        key={id}
        name={name}
        count={count}
        label={name}
        id={name}
        value={name}
        checked={selectedTechnologies.includes(name)}
        onChange={(event) => handleSelect(event.target.value)}
      />
    ))}
  </>
);

const DesignSystemsIndexPage = ({ data }) => {
  const [designSystems, setDesignSystems] = useState(data.designSystems.edges);
  const allTechnologies = data.technologies.edges;
  const [sortOrder, setSortOrder] = useState(sortingOptions[0]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const accordionPanelRef = useRef();
  const isLarge = useMediaQuery('(min-width: 768px)');

  const handleSelect = (technology) => {
    const isSelected = selectedTechnologies.includes(technology);
    // If the option has already been selected, we remove it from the array.
    // Otherwise, we add it.
    const newSelection = isSelected
      ? selectedTechnologies.filter((currentTech) => currentTech !== technology)
      : [...selectedTechnologies, technology];
    setSelectedTechnologies(newSelection);
  };

  // Use effect sortOrder
  useEffect(() => {
    setDesignSystems(
      // .sort() mutates the array - use spread to create a new one
      sortItems([...designSystems], sortOrder)
    );
  }, [sortOrder]);

  // Use effect selectedTechnologies
  useEffect(() => {
    let filteredDesignSystems = data.designSystems.edges;

    if (selectedTechnologies.length > 0) {
      filteredDesignSystems = data.designSystems.edges.reduce(
        (accumulator, currentValue) => {
          if (currentValue.node.data.technologies) {
            const designSystemTechnologies = currentValue.node.data.technologies.reduce(
              (accumulator, currentValue) => [
                ...accumulator,
                currentValue.data.name,
              ],
              []
            );

            const sharedTechnologies = designSystemTechnologies.filter(
              (designSystemTech) =>
                selectedTechnologies.includes(designSystemTech)
            );

            if (sharedTechnologies.length > 0) {
              return [...accumulator, currentValue];
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
  }, [selectedTechnologies]);
  // Use effect selectedFeatures

  useEffect(() => {
    if (accordionPanelRef.current) {
      const accordionPanelHeight = accordionPanelRef.current.scrollHeight;
      if (filtersExpanded) {
        accordionPanelRef.current.style.maxHeight = `${accordionPanelHeight}px`;
      } else {
        accordionPanelRef.current.style.maxHeight = 0;
      }
    }
  }, [filtersExpanded]);

  return (
    <Layout heroComponent={<Hero title="Design systems" />} isArticle={false}>
      <SEO title="Design systems" />
      <div className="control-bar flex items-center border-b py-2 px-6 bg-grey-200 dark:bg-grey-800">
        {isLarge ? (
          <>
            {/* <Filter label="Features" /> */}
            <Filter label="Technology">
              <TechnologyFilters
                {...{ allTechnologies, selectedTechnologies, handleSelect }}
              />
            </Filter>
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
          </>
        ) : (
          <div className="accordion">
            <button
              type="button"
              className="flex font-sans py-1"
              aria-expanded={filtersExpanded}
              onClick={() => setFiltersExpanded(!filtersExpanded)}
            >
              <h2 className="font-sans text-base">Filter and Sort</h2>
              <Icon
                name="chevronDown"
                className="w-4 h-4 ml-2 text-black dark:text-white"
              />
            </button>
            <div className="accordion__panel" ref={accordionPanelRef}>
              <div className="py-2 flex flex-col">
                <h3 className="text-base font-bold py-2">Technology</h3>
                <div>
                  <TechnologyFilters
                    {...{ allTechnologies, selectedTechnologies, handleSelect }}
                  />
                </div>

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
          </div>
        )}
      </div>
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
                },
                id,
              },
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
                technologies={
                  technologies &&
                  technologies.reduce(
                    (accumulator, currentValue) => [
                      ...accumulator,
                      currentValue.data.name,
                    ],
                    []
                  )
                }
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
            technologies: Tech {
              data {
                name: Name
              }
            }
            color: Colour_hex
            Component_examples_count
            Last_reviewed
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
