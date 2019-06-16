import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './Header';
import Hero from './Hero';
import '../css/style.css';

const Layout = ({ children, title, byline, subtitle, readtime }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            menuLinks {
              name
              link
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Header
          siteTitle={data.site.siteMetadata.title}
          menuLinks={data.site.siteMetadata.menuLinks}
        />
        {title !== null && (
          <Hero
            title={title}
            byline={byline}
            subtitle={subtitle}
            readtime={readtime}
          />
        )}
        <div className="bg-grey-100 pt-4">
          <div className="container">
            <main>{children}</main>
            <footer className="py-4">
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </div>
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

Layout.defaultProps = {
  title: null
};

export default Layout;
