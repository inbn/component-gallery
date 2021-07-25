import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import DarkToggle from './DarkToggle';

const SearchFormLazy = React.lazy(() => import('./SearchForm'));

const Header = ({ menuLinks, isHomepage }) => {
  const isSSR = typeof window === 'undefined';
  const SiteTitleTag = isHomepage ? 'h1' : 'div';

  return (
    <header className="flex flex-wrap sm:justify-between lg:items-center bg-white dark:bg-black border-b px-4 sm:pr-16 py-2">
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

      <nav className="sm:pr-2 sm:pl-2 w-full md:w-auto">
        <ul className="flex flex-wrap justify-between sm:justify-start sm:-mx-4">
          {menuLinks.map((link) => (
            <li key={link.name} className="mx-1 sm:mx-4">
              <Link
                to={link.link}
                className="call-to-action call-to-action--small font-sans text-sm md:text-base italic whitespace-nowrap"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <DarkToggle />
    </header>
  );
};

Header.propTypes = {
  menuLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
    })
  ),
  isHomepage: PropTypes.bool,
};

Header.defaultProps = {
  menuLinks: [],
  isHomepage: false,
};

export default Header;
