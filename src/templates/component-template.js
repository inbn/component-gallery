import React from 'react';
import { graphql } from 'gatsby';

import ComponentExample from '../components/ComponentExample';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default ({ data }) => {
  const layout = data.markdown !== null ? 'multi-col' : 'single-col';

  return (
    <Layout>
      <SEO
        title={
          data.airtable.data.Emoji
            ? `${data.airtable.data.Emoji} ${data.airtable.data.Name}`
            : data.airtable.data.Name
        }
      />
      <Hero
        byline="Component"
        title={data.airtable.data.Name}
        subtitle={
          data.airtable.data.Other_names !== null &&
          `Other names: ${data.airtable.data.Other_names}`
        }
        readtime={
          data.markdown !== null && data.markdown.fields.readingTime.text
        }
        date={data.airtable.data.Date_updated}
      />
      <div className="col-wrap -mx-4">
        <div
          className={`col col--${
            layout === 'multi-col' ? 'sidebar' : 'main'
          } mt-4 mb-2 px-4`}
        >
          {/* Component description */}
          {data.airtable.data.Description && (
            <div
              dangerouslySetInnerHTML={{
                __html: data.airtable.data.Description.childMarkdownRemark.html
              }}
              className={`body-text${
                data.markdown !== null ? ' lg:hidden' : ''
              }`}
            />
          )}
          {/* Table of contents */}
          {data.markdown !== null && (
            <>
              <h2 className="border-b-2 px-2 -mx-2 pb-1 lg:mt-0">
                In this article
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.markdown.tableOfContents
                }}
                className="body-text mt-2"
              />
            </>
          )}
          {/* Examples */}
          {data.airtable.data.Examples !== null && (
            <>
              <h2 id="examples" className="border-b-2 px-2 -mx-2 pb-1">
                {data.airtable.data.Examples_count} example
                {data.airtable.data.Examples_count !== 1 && 's'}
              </h2>
              <ul className="flex flex-wrap mt-2 -mx-4">
                {data.airtable.data.Examples.map((page, i) => (
                  <li
                    key={i}
                    className={`p-2 w-full sm:w-1/2 md:w-1/3 ${
                      layout === 'multi-col' ? 'lg:w-full' : 'lg:w-1/4'
                    }`}
                  >
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
        </div>
        {/* Main content */}
        {data.markdown !== null && (
          <div className="col col--main px-4">
            <div
              dangerouslySetInnerHTML={{
                __html: data.markdown.html
              }}
              className="body-text mt-4"
            />
          </div>
        )}
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
