import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import SearchForm from './SearchForm';

const Header = ({ siteTitle, menuLinks, isHomepage }) => {
  const SiteTitleTag = isHomepage ? 'h1' : 'div';
  return (
    <header className="flex flex-wrap sm:justify-between lg:items-center bg-white border-b p-4">
      <SiteTitleTag className="my-2">
        <Link to="/" className="header-logo">
          The Component Gallery
        </Link>
      </SiteTitleTag>

      <SearchForm idPrefix="header" />

      <nav className="sm:pr-2">
        <ul className="flex flex-wrap -mx-2 sm:-mx-4">
          {menuLinks.map(link => (
            <li key={link.name} className="mx-2 sm:mx-4 my-2">
              <Link
                to={link.link}
                className="call-to-action whitespace-no-wrap"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  menuLinks: PropTypes.array,
  isHomepage: PropTypes.bool
};

Header.defaultProps = {
  siteTitle: ``,
  menuLinks: [],
  isHomepage: false
};

export default Header;
