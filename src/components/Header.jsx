import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle, menuLinks, isHomepage }) => {
  const SiteTitleTag = isHomepage ? 'h1' : 'div';
  return (
    <header>
      <div className="lg:flex lg:justify-between lg:items-center bg-white border-b p-4">
        <SiteTitleTag>
          <Link to="/" className="header-logo">
            The Component Gallery
          </Link>
        </SiteTitleTag>

        <nav className="sm:pr-2">
          <ul className="flex flex-wrap sm:justify-center -mx-2 sm:-mx-4">
            {menuLinks.map(link => (
              <li key={link.name} className="mx-2 sm:mx-4">
                <Link
                  to={link.link}
                  className="call-to-action whitespace-no-wrap mt-2 lg:mt-0"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
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
