import React, { useState } from 'react';
import { graphql } from 'gatsby';

import ComponentExample from '../components/ComponentExample';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import TableOfContents from '../components/TableOfContents';

import sortItems from '../utils/sortItems';

const sortingOptions = [
  {
    label: 'Design system (A-Z)',
    path: 'data.Design_system[0].data.Name',
    comparison: 'text',
    flip: false
  },
  {
    label: 'Design system (Z-A)',
    path: 'data.Design_system[0].data.Name',
    comparison: 'text',
    flip: true
  },
  {
    label: 'Name (A–Z)',
    path: 'data.Name',
    comparison: 'text',
    flip: false
  },
  {
    label: 'Name (Z-A)',
    path: 'data.Name',
    comparison: 'text',
    flip: true
  }
];

export default ({ data }) => {
  // Use the first sorting option as the default
  const [examples, setExamples] = useState(
    sortItems([...data.airtable.data.Examples], sortingOptions[0])
  );

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
          intro={
            data.airtable.data.Description !== null
              ? data.airtable.data.Description.childMarkdownRemark.html
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
          <div className="col col--sidebar border-b border-l">
            <div className="font-sans py-2 px-6 border-b bg-white text-black text-sm block">
              {/* Last updated date */}
              <p className="">Updated {data.airtable.data.Date_updated}</p>
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
              <div className="control-bar py-2 px-6 bg-grey-200 mt-4 border-t">
                <label
                  htmlFor="sortOrder"
                  className="text-grey-800 text-sm font-sans font-bold"
                >
                  <span className="mr-2">Sort by</span>
                  <select
                    id="sortOrder"
                    className=""
                    onChange={event => {
                      setExamples(
                        // .sort() mutates the array - use spread to create a new one
                        sortItems(
                          [...examples],
                          sortingOptions[event.target.value]
                        )
                      );
                    }}
                  >
                    {sortingOptions.map((option, i) => (
                      <option value={i} key={i}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <ul className="grid border-t mt-0">
                {examples.map(({ data: { URL, Name, Design_system } }, i) => (
                  <ComponentExample
                    key={i}
                    url={URL}
                    componentName={Name}
                    designSystemName={Design_system[0].data.Name}
                    designSystemOrganisation={
                      Design_system[0].data.Organisation
                    }
                    features={Design_system[0].data.Features}
                    color={Design_system[0].data.Colour_hex}
                  />
                ))}
              </ul>
            </>
          )}
          {data.markdown !== null && (
            <div
              dangerouslySetInnerHTML={{
                __html: data.markdown.html
              }}
              className="body-text p-6"
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
