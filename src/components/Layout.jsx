import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './Header';
import Footer from './Footer';
import '../css/style.css';

const Layout = ({ children, heroComponent, isHomepage }) => (
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
      <div className="flex flex-col min-h-screen">
        <Header
          siteTitle={data.site.siteMetadata.title}
          menuLinks={data.site.siteMetadata.menuLinks}
          isHomepage={isHomepage}
        />
        {!!heroComponent && heroComponent}
        <div className="bg-white border-t flex-grow">
          <div className="">
            <main>{children}</main>
          </div>
          <Footer />
        </div>
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isHomepage: PropTypes.bool
};

Layout.defaultProps = {
  isHomepage: false
};

export default Layout;
