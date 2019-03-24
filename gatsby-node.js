/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  // createPage is a built in action,
  // available to all gatsby-node exports
  const { createPage } = actions;
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

      if (template && pathPrefix && node.data.Publish === 1) {
        createPage({
          path: `${pathPrefix}${node.data.Slug}`,
          component: path.resolve(template),
          context: {
            Slug: node.data.Slug
          }
        });
      }
    });
    resolve();
  });
};
