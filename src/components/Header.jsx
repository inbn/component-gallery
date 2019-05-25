import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle, menuLinks }) => (
  <header className="py-4">
    <div className="container xl:flex xl:justify-between xl:items-center">
      <Link
        to="/"
        className="table text-4xl text-teal-700 font-bold font-sans leading-none sm:mx-auto border-0 xl:text-left xl:whitespace-no-wrap xl:mx-0"
      >
        {siteTitle}
      </Link>

      <nav>
        <ul className="flex flex-wrap sm:justify-center -mx-4 my-2">
          {menuLinks.map(link => (
            <li key={link.name} className="mx-4 my-2">
              <Link
                to={link.link}
                className="whitespace-no-wrap font-sans xlg:text-sm border-0"
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
