import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle, menuLinks }) => (
  <header>
    <div className="lg:flex lg:justify-between lg:items-center bg-grey-100">
      <Link to="/" className="header-logo">
        Component Gallery
      </Link>

      <nav className="px-6">
        <ul className="flex flex-wrap sm:justify-center -mx-4">
          {menuLinks.map(link => (
            <li key={link.name} className="mx-4 my-2">
              <Link
                to={link.link}
                className="call-to-action whitespace-no-wrap font-sans text-teal-600 border-0"
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
