import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ menuLinks }) => (
  <header>
    <div className="container">
      <div className="text-center text-5xl font-bold leading-none">
        Collecting Components
      </div>

      <nav>
        <ul className="list-reset flex justify-center my-4">
          {menuLinks.map(link => (
            <li key={link.name} className="mx-4">
              <Link to={link.link} className="text-red">
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
