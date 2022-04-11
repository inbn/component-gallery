import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Component from '../components/Component/Component';
import DesignSystem from '../components/DesignSystem/DesignSystem';
import Layout from '../components/Layout';
import ReadMoreLink from '../components/ReadMoreLink/ReadMoreLink';
import SEO from '../components/SEO';

const IndexPage = ({ data }) => (
  <Layout
    heroComponent={
      <div className="my-8 lg:my-12 mx-6">
        <div className="-mx-4 lg:flex">
          <div className="bg-white dark:bg-black border-2 border-black dark:border-white font-sans text-grey-800 dark:text-grey-100 shadow-block body-text text-xl p-6 max-w-xl mx-4">
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </div>
        </div>
      </div>
    }
    isHomepage
    isArticle={false}
  >
    <SEO title="Home" />
    <div className="flex flex-col sm:flex-row-reverse">
      <h2 className="px-6 py-4 sm:pt-6 text-base uppercase tracking-widest sm:dir-sideways-tb sm:leading-none">
        Recently updated components
      </h2>
      <ul className="l-grid border-t sm:border-t-0 border-l mt-0 sm:flex-1">
        {data.recentComponents.edges.map(
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
              headingLevel="h3"
              imageURL={
                image?.localFiles &&
                image.localFiles.length > 0 &&
                image.localFiles[0].publicURL
              }
            />
          )
        )}
      </ul>
    </div>
    <div className="text-right px-6 py-4 border-l">
      <ReadMoreLink to="/components">View all components</ReadMoreLink>
    </div>
    <div className="flex flex-col sm:flex-row-reverse sm:border-t">
      <h2 className="px-6 py-4 sm:pt-6 text-base uppercase tracking-widest sm:dir-sideways-tb sm:leading-none">
        Recently updated Design Systems
      </h2>
      <ul className="l-grid border-t sm:border-t-0 border-l mt-0 sm:flex-1">
        {data.recentDesignSystems.edges.map(
          ({
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
          }) => (
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
              features={features}
              technologies={technologies}
              color={color}
            />
          )
        )}
      </ul>
    </div>
    <div className="text-right px-6 py-4 border-l">
      <ReadMoreLink to="/design-systems">View all Design Systems</ReadMoreLink>
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
      limit: 8
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
    recentDesignSystems: allAirtable(
      filter: {
        table: { eq: "Design systems" }
        data: { Publish: { eq: true } }
      }
      sort: { fields: [data___Last_reviewed], order: DESC }
      limit: 8
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
            technologies: Tech_lookup
            color: Colour_hex
            Component_examples_count
          }
          id
        }
      }
    }
    mdx: mdx(frontmatter: { slug: { eq: "homepage" } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
