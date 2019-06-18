import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle, menuLinks }) => (
  <header>
    <div className="lg:flex lg:justify-between lg:items-center bg-grey-100">
      <Link
        to="/"
        className="table text-4xl font-light italic text-teal-800 font-sans bg-red-100 uppercase leading-none pt-2 px-6 sm:px-2 hover:text-teal-500 sm:mx-auto border-0 lg:text-left lg:whitespace-no-wrap lg:mx-0"
      >
        {siteTitle}
      </Link>

      <nav className="px-6">
        <ul className="flex flex-wrap sm:justify-center -mx-4">
          {menuLinks.map(link => (
            <li key={link.name} className="mx-4 my-2">
              <Link
                to={link.link}
                className="call-to-action whitespace-no-wrap font-sans text-indigo-500 border-0"
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
