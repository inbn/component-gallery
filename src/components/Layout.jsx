import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';
import Footer from './Footer';
import '../css/style.css';

const Layout = ({ children, heroComponent, isHomepage, isArticle }) => {
  const data = useStaticQuery(graphql`
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
  `);

  const WrapElement = isArticle ? 'article' : 'div';
  return (
    <div className="flex flex-col min-h-screen">
      <Header
        siteTitle={data.site.siteMetadata.title}
        menuLinks={data.site.siteMetadata.menuLinks}
        isHomepage={isHomepage}
      />
      <WrapElement>
        {!!heroComponent && heroComponent}
        <main className="bg-white dark:bg-black border-t flex-grow">
          {children}
        </main>
      </WrapElement>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isHomepage: PropTypes.bool,
  isArticle: PropTypes.bool,
};

Layout.defaultProps = {
  isHomepage: false,
  isArticle: true,
};

export default Layout;
