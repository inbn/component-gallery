import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle, menuLinks }) => (
  <header>
    <div className="lg:flex lg:justify-between lg:items-center bg-white border-b p-2">
      <Link to="/" className="header-logo">
        The Component Gallery
      </Link>

      <nav className="md:px-6">
        <ul className="flex flex-wrap justify-center -mx-2 sm:-mx-4">
          {menuLinks.map(link => (
            <li key={link.name} className="mx-2 sm:mx-4">
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
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
