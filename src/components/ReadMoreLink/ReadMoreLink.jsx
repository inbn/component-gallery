import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';

const ReadMoreLink = ({ children, to, className }) => (
  <Link
    to={to}
    className={classNames('call-to-action', !!className && className)}
  >
    {children}{' '}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 162.348 162.348"
      className="svg-icon -skew-x-5"
      aria-hidden="true"
    >
      <g>
        <path d="M23.421 50.523a2.985 2.985 0 0 0-4.219 0 2.985 2.985 0 0 0 0 4.219l26.433 26.427-26.433 26.439a2.985 2.985 0 0 0 0 4.219 2.971 2.971 0 0 0 2.112.871c.764 0 1.533-.292 2.112-.871l30.652-30.658-30.657-30.646z" />
        <path d="M5.097 50.523c-1.164-1.164-3.055-1.164-4.219 0s-1.164 3.055 0 4.219L27.3 81.169.873 107.608a2.98 2.98 0 1 0 2.112 5.09c.758 0 1.528-.292 2.112-.871l30.646-30.658L5.097 50.523zM160.242 83.269l2.106-2.1-30.652-30.646a2.985 2.985 0 0 0-4.219 0 2.996 2.996 0 0 0 0 4.219l23.456 23.45H70.321c-.269 0-.507.09-.752.149L41.752 50.523a2.985 2.985 0 0 0-4.219 0 2.985 2.985 0 0 0 0 4.219l26.433 26.427-26.433 26.439a2.985 2.985 0 0 0 0 4.219 2.995 2.995 0 0 0 4.224 0l27.806-27.824c.245.066.489.155.758.155h80.6l-23.438 23.45a2.996 2.996 0 0 0 0 4.219c.591.585 1.354.871 2.112.871s1.528-.292 2.112-.871l28.51-28.528a.095.095 0 0 0 .025-.03z" />
      </g>
    </svg>
  </Link>
);

ReadMoreLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ReadMoreLink.defaultProps = {
  className: null,
};

export default ReadMoreLink;
