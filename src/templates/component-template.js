import React from 'react';
import { graphql } from 'gatsby';

import ComponentExample from '../components/ComponentExample';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default ({ data }) => (
  <Layout>
    <SEO
      title={
        data.airtable.data.Emoji
          ? `${data.airtable.data.Emoji} ${data.airtable.data.Name}`
          : data.airtable.data.Name
      }
    />
    <h1 className="border-b-2 px-2 -mx-2 pb-1">{data.airtable.data.Name}</h1>
    <div className="col-wrap -mx-4">
      <div className="col col--main px-4">
        {data.markdown !== null ? (
          <div
            dangerouslySetInnerHTML={{
              __html: data.markdown.html
            }}
            className="body-text mt-4"
          />
        ) : (
          data.airtable.data.Description && (
            <div
              dangerouslySetInnerHTML={{
                __html: data.airtable.data.Description.childMarkdownRemark.html
              }}
              className="body-text mt-4"
            />
          )
        )}
      </div>
      <div className="col col--sidebar mt-4 mb-2 px-4">
        {data.airtable.data.Other_names !== null && (
          <>
            <h2 className="border-t-2 border-b-2 pt-1 pb-1">Other names</h2>
            <ul className="mt-0 font-sans border-b-2 pt-1 pb-1">
              {data.airtable.data.Other_names.split(',').map(name => (
                <li>{name.trim()}</li>
              ))}
            </ul>
          </>
        )}
        {data.airtable.data.Examples !== null && (
          <>
            <h2 className="border-b-2 px-2 -mx-2 pb-1">
              {data.airtable.data.Examples_count} example
              {data.airtable.data.Examples_count !== 1 && 's'}
            </h2>
            <ul className="flex flex-wrap mt-2 -mx-4">
              {data.airtable.data.Examples.map((page, i) => (
                <li key={i} className="w-1/2 md:w-full p-2">
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
    </div>
  </Layout>
);

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
      }
    }
    markdown: markdownRemark(frontmatter: { slug: { eq: $Slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
