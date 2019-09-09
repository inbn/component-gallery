import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from './Header';
import '../css/style.css';

const Layout = ({ children, heroComponent }) => (
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
        {!!heroComponent && heroComponent}
        <div className="bg-grey-100 pt-4">
          <div className="container">
            <main>{children}</main>
            <footer className="pt-8 pb-6 text-grey-700 flex justify-center items-center">
              <p className="pr-6 italic font-sans text-teal-800">
                © {new Date().getFullYear()} Iain Bean
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
              >
                <g filter="url(#filter0_d)">
                  <circle cx="14" cy="14" r="11" fill="#F8FAFC" />
                  <circle cx="14" cy="14" r="10.5" stroke="#DAE1E7" />
                </g>
                <defs>
                  <filter
                    id="filter0_d"
                    width="26"
                    height="26"
                    x="3"
                    y="3"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dx="4" dy="4" />
                    <feColorMatrix values="0 0 0 0 0.854902 0 0 0 0 0.882353 0 0 0 0 0.905882 0 0 0 1 0" />
                    <feBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <p className="mt-0 pl-4">
                <Link to="colophon" className="call-to-action">
                  Colophon
                </Link>
              </p>
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
