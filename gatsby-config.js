require(`dotenv`).config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  siteMetadata: {
    siteUrl: `https://component.gallery`,
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
        background_color: `#f8fafc`, // colors.grey.100
        theme_color: `#f8fafc`, // colors.grey.100
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
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in src/layouts/index.js
              // right after importing the prism color scheme:
              //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: true
            }
          }
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
            tableView: `Name A-Z`,
            tableLinks: [`Component examples`],
            mapping: { Image: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Component examples`,
            tableView: `Published only`,
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
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index. If store === true value will be stored in index file.
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
          `name`,
          `otherNames`,
          `description`,
          `url`,
          `table`
          // { name: 'name', store: true, attributes: { boost: 100 } },
          // { name: 'otherNames', store: true, attributes: { boost: 50 } },
          // { name: 'description', store: true },
          // { name: 'url', store: true },
          // { name: 'table', store: true }
        ],
        resolvers: {
          Airtable: {
            name: node => node.data.Name,
            otherNames: node => node.data.Other_names,
            description: node => node.data.Description,
            url: node =>
              node.table === 'Components'
                ? `/components/${node.data.Slug}`
                : node.data.URL,
            table: node => node.table
          }
        },
        // A function for filtering nodes. () => true by default
        filter: node =>
          ['Components', 'Design systems'].includes(node.table) &&
          node.data.Publish === true,

        filename: 'search_index.json'
      }
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cache`,
    // This should always go last
    `gatsby-plugin-meta-redirect`
  ]
};
