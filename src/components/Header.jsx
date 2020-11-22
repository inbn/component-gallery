import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const SearchFormLazy = React.lazy(() => import('./SearchForm'));

const Header = ({ menuLinks, isHomepage }) => {
  const isSSR = typeof window === 'undefined';
  const SiteTitleTag = isHomepage ? 'h1' : 'div';

  return (
    <header className="flex flex-wrap sm:justify-between lg:items-center bg-white border-b px-4 py-2">
      <SiteTitleTag className="my-2">
        <Link to="/" className="header-logo">
          The Component Gallery
        </Link>
      </SiteTitleTag>

      <div className="site-search-container">
        {!isSSR && (
          <React.Suspense fallback={<div />}>
            <SearchFormLazy idPrefix="header" />
          </React.Suspense>
        )}
      </div>

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
  menuLinks: PropTypes.array,
  isHomepage: PropTypes.bool
};

Header.defaultProps = {
  menuLinks: [],
  isHomepage: false
};

export default Header;
