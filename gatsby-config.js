require(`dotenv`).config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  siteMetadata: {
    title: `The Component Gallery`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    menuLinks: [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'Components',
        link: '/components'
      },
      {
        name: 'Design systems',
        link: '/design-systems'
      }
    ]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
    // Catch local links (e.g. in markdown) and turn them into gatsby <Link>s
    'gatsby-plugin-catch-links',
    'gatsby-transformer-remark',
    // Load all data related to taxonomies, categories etc from the airtable
    // base, apiKey and baseId are loaded from the env
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Components`,
            tableView: `Name A-Z`,
            mapping: { Description: `text/markdown` },
            tableLinks: [
              `Commonly contains`,
              `Categories`,
              `HTML element`,
              `Examples`
            ]
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Component categories`,
            // tableView: `All`,
            tableLinks: [`Components`]
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `HTML elements`,
            // tableView: `All`,
            tableLinks: [`Components`]
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Design systems`,
            tableView: `All`,
            tableLinks: [`Component examples`]
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Component examples`,
            tableView: `Design system A-Z`,
            tableLinks: [`Design system`, `Type of component`]
          }
        ]
      }
    },
    // We'll load any long-form content from markdown files in addition to
    // the content loaded from airtable
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: 'content'
      }
    },
    `gatsby-plugin-postcss`,
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/css/style.css']
      }
    }
  ]
};
