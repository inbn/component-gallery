import React from 'react';
import { graphql } from 'gatsby';

import ComponentExample from '../components/ComponentExample';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default ({ data }) => {
  return (
    <Layout
      byline="Component"
      title={data.airtable.data.Name}
      subtitle={
        data.airtable.data.Other_names !== null &&
        `Other names: ${data.airtable.data.Other_names}`
      }
      readtime={data.markdown !== null && data.markdown.fields.readingTime.text}
      date={data.airtable.data.Date_updated}
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
      {/* Examples */}
      {data.airtable.data.Examples !== null && (
        <>
          <h2
            id="examples"
            className="bg-squiggle-blue-400 bg-repeat-x bg-bottom px-2 -mx-2 pb-4"
          >
            {data.airtable.data.Examples_count} example
            {data.airtable.data.Examples_count !== 1 && 's'}
          </h2>
          <ul className="flex flex-wrap mt-2 -mx-4">
            {data.airtable.data.Examples.map((page, i) => (
              <li key={i} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <ComponentExample
                  key={i}
                  url={page.data.URL}
                  componentName={page.data.Name}
                  designSystem={page.data.Design_system[0].data.Name}
                  features={page.data.Design_system[0].data.Features}
                  color={page.data.Design_system[0].data.Colour_hex}
                />
              </li>
            ))}
          </ul>
        </>
      )}
      <hr className="bg-squiggle-blue-400 mt-2" />
      {data.markdown !== null && (
        <div className="col-wrap -mx-2 mt-4 bg-grey-100">
          <div className="col col--sidebar p-2">
            {/* Table of contents */}
            <h2 className="font-sans mb-2 uppercase bg-grey-100 text-grey-700 text-xs pt-1 pl-2">
              Table of contents
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: data.markdown.tableOfContents
              }}
              className="body-text md:text-sm"
            />
          </div>
          {/* Main content */}

          <div className="col col--main p-2">
            <div
              dangerouslySetInnerHTML={{
                __html: data.markdown.html
              }}
              className="body-text"
            />
          </div>
        </div>
      )}
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
            excerpt
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
      }
    }
    markdown: markdownRemark(frontmatter: { slug: { eq: $Slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
      fields {
        readingTime {
          text
        }
      }
      tableOfContents(pathToSlugField: "frontmatter.path", maxDepth: 3)
    }
  }
`;
