import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle, menuLinks }) => (
  <header className="py-4">
    <div className="container xl:flex xl:justify-between">
      <Link
        to="/"
        className="table text-5xl text-teal font-bold font-sans leading-none mx-auto border-0 xl:text-left xl:whitespace-no-wrap xl:mx-0"
      >
        {siteTitle}
      </Link>

      <nav>
        <ul className="flex flex-wrap justify-center -mx-4 my-2">
          {menuLinks.map(link => (
            <li key={link.name} className="mx-4 my-2">
              <Link to={link.link} className="whitespace-no-wrap font-sans">
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
