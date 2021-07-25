import React from 'react';
import { Link } from 'gatsby';

const Footer = () => (
  <footer className="footer">
    <p className="footer__content footer__content--left whitespace-nowrap">
      © {new Date().getFullYear()} <wbr />
      Iain Bean
    </p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      className="footer__icon"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="11" fill="#DAE1E7" />
      <circle cx="14" cy="14" r="10.5" fill="#F8FAFC" stroke="#DAE1E7" />
    </svg>
    <ul className="footer__content footer__content--right flex">
      <li className="mr-4">
        <Link to="/colophon/" className="link">
          Colophon
        </Link>
      </li>
      <li>
        <Link to="/changelog/" className="link">
          Changelog
        </Link>
      </li>
    </ul>
  </footer>
);

export default Footer;
