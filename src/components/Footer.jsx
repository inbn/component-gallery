import React from 'react';
import { Link } from 'gatsby';

const Footer = () => (
  <footer className="footer">
    <p className="pr-6 whitespace-no-wrap">
      © {new Date().getFullYear()} <wbr />
      Iain Bean
    </p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      className="hidden sm:block"
      aria-hidden="true"
    >
      <g filter="url(#filter0_d)">
        <circle cx="14" cy="14" r="11" fill="#F8FAFC" />
        <circle cx="14" cy="14" r="10.5" stroke="#DAE1E7" />
      </g>
      <defs>
        <filter
          id="filter0_d"
          width="26"
          height="26"
          x="3"
          y="3"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="4" dy="4" />
          <feColorMatrix values="0 0 0 0 0.854902 0 0 0 0 0.882353 0 0 0 0 0.905882 0 0 0 1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
    <ul className="mt-0 pl-6 flex">
      <li className="mr-4">
        <Link to="/colophon" className="link">
          Colophon
        </Link>
      </li>
      <li>
        <Link to="/changelog" className="link">
          Changelog
        </Link>
      </li>
    </ul>
  </footer>
);

export default Footer;
