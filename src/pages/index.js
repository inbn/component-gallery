import React from 'react';
import { Link, graphql } from 'gatsby';

import Component from '../components/component';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div className="w-full md:w-2/3">
      <p>
        <em>Collecting components</em> is the product of a continuing survey
        into which components make up{' '}
        <Link to="/design-systems">design systems</Link>. So far, I’ve covered{' '}
        {data.allDesignSystems.totalCount} design systems and{' '}
        {data.allComponentExamples.totalCount} individual component examples.
        From these, I’ve identified {data.allComponents.totalCount} common web
        interface patterns; and provided each with a description, some alternate
        names, and a list of examples.
      </p>
      <p />
    </div>
    <h2 className="mt-4">Recently added components</h2>
    <ul className="list-reset flex flex-wrap mt-4 -mx-4">
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
            />
          </li>
        )
      )}
    </ul>
    <div className="text-right italic">
      <Link to="/components">View all components >>></Link>
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
