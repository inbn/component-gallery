import React from 'react';
import { graphql } from 'gatsby';

import Component from '../components/Component';
import Layout from '../components/Layout';
import ReadMoreLink from '../components/ReadMoreLink';
import SEO from '../components/SEO';
import SearchForm from '../components/SearchForm';

const IndexPage = ({ data }) => (
  <Layout
    heroComponent={
      <>
        <div className="my-8 lg:my-12 mx-6">
          <div className="-mx-4 lg:flex">
            <div
              className="bg-white border-2 border-black font-sans text-grey-800 shadow-block-grey-800 body-text text-xl p-6 lg:w-1/2 mx-4"
              dangerouslySetInnerHTML={{
                __html: data.markdown.html
              }}
            />
            <div className="lg:w-1/2 flex flex-col justify-center mx-4 mt-8 lg:mt-0">
              <SearchForm />
            </div>
          </div>
        </div>
      </>
    }
  >
    <SEO title="Home" />
    <h2 className="px-6 py-4 border-l">Recently updated components</h2>
    <ul className="grid border-t border-l mt-0">
      {data.recentComponents.edges.map(
        (
          {
            node: {
              data: { slug, name, description, otherNames, examplesCount }
            }
          },
          i
        ) => (
          <li key={i}>
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
    <div className="text-right px-6 py-4 border-l">
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
      filter: {
        table: { eq: "Components" }
        data: { Publish: { eq: true }, Date_updated: { ne: null } }
      }
      sort: { fields: [data___Date_updated], order: DESC }
      limit: 6
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
    markdown: markdownRemark(frontmatter: { slug: { eq: "homepage" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
