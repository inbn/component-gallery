import React from 'react';
import { Link, graphql } from 'gatsby';

import Component from '../components/Component';
import Layout from '../components/Layout';
import ReadMoreLink from '../components/ReadMoreLink';
import SEO from '../components/SEO';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div className="w-full md:w-2/3 text-lg mx-auto">
      <p>
        <em>Collecting components</em> is the product of a continuing survey
        into the components that make up{' '}
        <Link to="/design-systems">design systems</Link>. It currently covers{' '}
        {data.allDesignSystems.totalCount} design systems and includes{' '}
        {data.allComponentExamples.totalCount} individual component examples.
        From these, I’ve identified {data.allComponents.totalCount} common web
        interface patterns.
      </p>
      <p>
        I’ve tried to give a basic description of these components as well a any
        alternate names. I’ve also given a complete list of examples found.
      </p>
    </div>
    <h2 className="mt-8 border-b-2 px-2 -mx-2 pb-1">
      Recently added components
    </h2>
    <ul className="list-reset flex flex-wrap mt-2 -mx-4">
      {data.recentComponents.edges.map(
        (
          {
            node: {
              data: { slug, name, description, otherNames, examplesCount }
            }
          },
          i
        ) => (
          <li key={i} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <Component
              slug={slug}
              name={name}
              description={
                description !== null && description.childMarkdownRemark.html
              }
              otherNames={otherNames}
              examplesCount={examplesCount}
              headingLevel="h3"
            />
          </li>
        )
      )}
    </ul>
    <div className="text-right">
      <ReadMoreLink to="/components" text="View all components" />
    </div>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  {
    allComponents: allAirtable(filter: { table: { eq: "Components" } }) {
      totalCount
    }
    allComponentExamples: allAirtable(
      filter: { table: { eq: "Component examples" } }
    ) {
      totalCount
    }
    allDesignSystems: allAirtable(filter: { table: { eq: "Design systems" } }) {
      totalCount
    }
    recentComponents: allAirtable(
      filter: { table: { eq: "Components" } }
      sort: { fields: [data___Date_added], order: DESC }
      limit: 3
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
        }
      }
    }
  }
`;
