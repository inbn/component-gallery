require(`dotenv`).config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  siteMetadata: {
    title: `The Component Gallery`,
    description: `The Component Gallery is a collection of components from the best Design Systems.`,
    author: `@gatsbyjs`,
    menuLinks: [
      // {
      //   name: 'Home',
      //   link: '/'
      // },
      {
        name: 'Components',
        link: '/components'
      },
      {
        name: 'Design systems',
        link: '/design-systems'
      },
      {
        name: 'About',
        link: '/about'
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
        name: `The Component Gallery`,
        short_name: `Components`,
        start_url: `/`,
        background_color: `#4dc0b5`, // colors.teal.500
        theme_color: `#4dc0b5`, // colors.teal.500
        display: `minimal-ui`,
        icon: `src/images/favicon.png` // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
    // Catch local links (e.g. in markdown) and turn them into gatsby <Link>s
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-abbr',
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 820,
              linkImagesToOriginal: false,
              quality: 80,
              showCaptions: true
            }
          },
          `gatsby-remark-reading-time`,
          `gatsby-remark-autolink-headers`
        ]
      }
    },
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
            tableLinks: [`Component examples`],
            mapping: { Image: `fileNode` }
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
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID
      }
    }
  ]
};
