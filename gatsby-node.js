/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const slugify = require('slugify');

exports.createPages = ({ graphql, actions }) => {
  // createPage is a built in action,
  // available to all gatsby-node exports
  const { createPage, createRedirect } = actions;
  return new Promise(async resolve => {
    // we need the table name (e.g. "Sections")
    // as well as the unique path for each Page/Section.
    const result = await graphql(`
      {
        allAirtable {
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
    result.data.allAirtable.edges.forEach(({ node }) => {
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
              console.log(
                `Creating redirect from /${pathPrefix}${slugifiedOtherName} to /${pathPrefix}${node.data.Slug}`
              );
              createRedirect({
                fromPath: `/${pathPrefix}${slugifiedOtherName}`,
                toPath: `/${pathPrefix}${node.data.Slug}`,
                isPermanent: false
              });
            }
          });
        }
      }
    });
    resolve();
  });
};
