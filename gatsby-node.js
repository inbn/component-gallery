/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

function createJSON(pageData) {
  const pathSuffix = pageData.context.currentPage;
  const dir = 'public/paginationJson/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const filePath = `${dir}index${pathSuffix}.json`;
  const dataToSave = JSON.stringify(pageData.context.pageDesignSystems);
  fs.writeFile(filePath, dataToSave, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}

exports.createPages = ({ graphql, actions }) => {
  // createPage is a built in action,
  // available to all gatsby-node exports
  const { createPage, createRedirect } = actions;

  return new Promise(async resolve => {
    // COMPONENTS
    // we need the table name (e.g. "Sections")
    // as well as the unique path for each Page/Section.
    const componentsQueryResult = await graphql(`
      {
        allAirtable(filter: { table: { eq: "Components" } }) {
          edges {
            node {
              table
              data {
                Slug
                Publish
                Other_names
              }
            }
          }
        }
      }
    `);
    // For each path, create page and choose a template.
    // values in context Object are available in that page's query
    componentsQueryResult.data.allAirtable.edges.forEach(({ node }) => {
      let template;
      let pathPrefix;
      switch (node.table) {
        case 'Components':
          template = `./src/templates/component-template.js`;
          pathPrefix = 'components/';
          break;
        default:
          template = '';
          pathPrefix = '';
      }

      if (template && pathPrefix && node.data.Publish === true) {
        createPage({
          path: `${pathPrefix}${node.data.Slug}`,
          component: path.resolve(template),
          context: {
            Slug: node.data.Slug
          }
        });

        // Create a redirect away from all the other names to the canonical
        // version of the page
        if (
          node.table === 'Components' &&
          node.data.Other_names !== null &&
          node.data.Other_names.length > 0
        ) {
          const otherNames = node.data.Other_names.split(',');

          otherNames.forEach(otherName => {
            const slugifiedOtherName = slugify(otherName.trim(), {
              replacement: '-',
              lower: true
            });

            if (slugifiedOtherName.length > 0) {
              /* eslint-disable */
              console.log(
                `Creating redirect from /${pathPrefix}${slugifiedOtherName}/ to /${pathPrefix}${node.data.Slug}/`
              );
              /* eslint-enable */
              createRedirect({
                fromPath: `/${pathPrefix}${slugifiedOtherName}/`,
                toPath: `/${pathPrefix}${node.data.Slug}/`,
                isPermanent: false
              });
            }
          });
        }
      }
    });

    // DESIGN SYSTEMS
    // Note 'GatsbyImageSharpFluid_noBase64' doesn't work here so we need to
    // specify the fields we want manually
    // See https://theleakycauldronblog.com/blog/problems-with-gatsby-image-and-their-workarounds
    const designSystemsQueryResult = await graphql(`
      {
        allAirtable(
          filter: { table: { eq: "Design systems" } }
          sort: { fields: [data___Slug], order: ASC }
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
                      fluid(
                        maxWidth: 492
                        maxHeight: 369
                        srcSetBreakpoints: [360, 500, 720, 1000]
                      ) {
                        src
                        srcSet
                        aspectRatio
                        sizes
                      }
                    }
                  }
                }
                features: Features
                color: Colour_hex
                Component_examples_count
              }
              id
            }
          }
        }
      }
    `);

    const designSystemsPerPage = 12;
    const designSystems = designSystemsQueryResult.data.allAirtable.edges;
    const countPages = Math.ceil(designSystems.length / designSystemsPerPage);

    for (let currentPage = 1; currentPage <= countPages; currentPage += 1) {
      // To create paths "/", "/2", "/3"…
      const pathSuffix = currentPage > 1 ? currentPage : '';

      /* Collect designSystems needed for this page. */
      const startIndexInclusive = designSystemsPerPage * (currentPage - 1);
      const endIndexExclusive = startIndexInclusive + designSystemsPerPage;
      const pageDesignSystems = designSystems.slice(
        startIndexInclusive,
        endIndexExclusive
      );

      const pathPrefix = `design-systems/`;

      /* Combine all data needed to construct this page. */
      const pageData = {
        path: `${pathPrefix}${pathSuffix}`,
        component: path.resolve(`./src/templates/design-systems-template.js`),
        context: {
          /* If you need to pass additional data, you can pass it inside this context object. */
          pageDesignSystems,
          pathPrefix,
          currentPage,
          countPages
        }
      };

      /* Create normal pages (for pagination) and corresponding JSON (for infinite scroll). */
      createJSON(pageData);
      createPage(pageData);
    }
    console.log(`\nCreated ${countPages} pages of paginated content.`);

    resolve();
  });
};
