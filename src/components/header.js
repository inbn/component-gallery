import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ menuLinks }) => (
  <header className="py-4">
    <div className="container lg:flex lg:justify-between">
      <div className="text-5xl font-bold text-center lg:text-left leading-none lg:whitespace-no-wrap">
        Collecting Components
      </div>

      <nav>
        <ul className="list-reset flex justify-center my-4 -mx-4">
          {menuLinks.map(link => (
            <li key={link.name} className="mx-4">
              <Link to={link.link} className="whitespace-no-wrap">
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
