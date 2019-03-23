import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default ({ data }) => (
  <Layout>
    <SEO title={data.airtable.data.Name} />
    <h1 className="border-b-2 pb-1">{data.airtable.data.Name}</h1>
    <div className="flex flex-wrap -mx-4">
      <div className="w-full md:w-2/3 px-4">
        {data.markdown !== null ? (
          <div
            dangerouslySetInnerHTML={{
              __html: data.markdown.html
            }}
            className="mt-4"
          />
        ) : (
          data.airtable.data.Description && (
            <div
              dangerouslySetInnerHTML={{
                __html: data.airtable.data.Description.childMarkdownRemark.html
              }}
              className="mt-4"
            />
          )
        )}
      </div>
      <div className="w-full md:w-1/3 mt-4 mb-2 px-4">
        {data.airtable.data.Other_names !== null && (
          <>
            <h2 className="border-t-2 border-b-2 pt-1 pb-1">Other names</h2>
            <ul className="list-none pl-0 mt-0 font-sans border-b-2 pt-1 pb-1">
              {data.airtable.data.Other_names.split(',').map(name => (
                <li>{name.trim()}</li>
              ))}
            </ul>
          </>
        )}
        {data.airtable.data.Examples !== null && (
          <>
            <h2 className="border-b-2 pb-1">
              {data.airtable.data.Examples_count} example
              {data.airtable.data.Examples_count !== 1 && 's'}
            </h2>
            <ul className="mt-2">
              {data.airtable.data.Examples.map((page, i) => (
                <li key={i}>
                  <a
                    href={page.data.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {page.data.Name} — {page.data.Design_system[0].data.Name}
                  </a>
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
              }
            }
          }
        }
        Examples_count
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
