import React from 'react';
import { graphql } from 'gatsby';

import ComponentExample from '../components/ComponentExample';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import TableOfContents from '../components/TableOfContents';

export default ({ data }) => {
  let tocHtml = null;
  let readtime = null;

  if (data.markdown !== null) {
    // Insert 'examples' as the first item in the table of contents
    tocHtml = data.markdown.tableOfContents;
    // Add just after the opening '<ul>'
    tocHtml = `${tocHtml.substring(0, 4)}<li>
    <a href="#examples">Examples</a>
  </li>${tocHtml.substring(4)}`;
    readtime = data.markdown.fields.readingTime.text;
  }

  return (
    <Layout
      heroComponent={
        <Hero
          byline="Component"
          title={data.airtable.data.Name}
          subtitle={
            data.airtable.data.Other_names !== null
              ? `Other names: ${data.airtable.data.Other_names}`
              : null
          }
        />
      }
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
      <div className="col-wrap">
        {/* Sidebar */}
        {tocHtml !== null && (
          <div className="col col--sidebar pt-4 px-6 border-l">
            <div className="font-sans mb-4 bg-white text-black text-sm block">
              {/* Last updated date */}
              <p className="">Updated: {data.airtable.data.Date_updated}</p>
              {/* Read time */}
              {readtime !== null && <p className="mt-0">{readtime}</p>}
            </div>
            {/* Table of contents */}
            <TableOfContents html={tocHtml} />
          </div>
        )}
        {/* Main content */}
        <div className="col col--main pt-4 border-l">
          {/* Examples */}
          {data.airtable.data.Examples !== null && (
            <>
              <h2 id="examples" className="px-6">
                {data.airtable.data.Examples_count} example
                {data.airtable.data.Examples_count !== 1 && 's'}
              </h2>
              <ul className="grid mt-4 border-t">
                {data.airtable.data.Examples.map((page, i) => (
                  <li key={i}>
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
          {data.markdown !== null && (
            <div
              id="description"
              dangerouslySetInnerHTML={{
                __html: data.markdown.html
              }}
              className="body-text py-4 px-6"
            />
          )}
        </div>
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
            excerpt(pruneLength: 200)
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
