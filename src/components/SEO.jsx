import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import { ThemeContext } from './ThemeContext';

import twitterCardImage from '../images/twitter_card_image.png';

function SEO({ description, lang, meta, keywords, title, favicon }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `);
  const metaDescription = description || site.siteMetadata.description;
  const { colorMode } = React.useContext(ThemeContext);

  return (
    <Helmet
      htmlAttributes={{
        lang,
        class: colorMode === 'dark' ? 'dark' : '',
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={[{ rel: 'shortcut icon', type: 'image/png', href: favicon }]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `og:image`,
          content: `${site.siteMetadata.siteUrl}${twitterCardImage}`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: `${site.siteMetadata.siteUrl}${twitterCardImage}`,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  );
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  favicon: PropTypes.string,
};

SEO.defaultProps = {
  description: null,
  lang: `en`,
  meta: [],
  keywords: [],
  favicon: '/icons/icon-48x48.png',
};

export default SEO;
