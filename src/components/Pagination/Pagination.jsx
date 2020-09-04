import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import Icon from '../Icon/Icon';

function selectRelevantPageLinks(currentPage, countPages) {
  const visiblePageNumbers = [];
  if (countPages <= 10) {
    /* If there are not too much, show everything. */
    for (let i = 1; i <= countPages; i += 1) {
      visiblePageNumbers.push(i);
    }
  } else {
    /* Always show beginning, end, current, and around current. */
    if (currentPage <= 5) {
      /* If beginning and current are not too far, we don't want to "dot dot" between them. */
      for (let i = 1; i < currentPage; i += 1) {
        visiblePageNumbers.push(i);
      }
    } else {
      visiblePageNumbers.push(1);
      visiblePageNumbers.push(currentPage - 2);
      visiblePageNumbers.push(currentPage - 1);
    }
    visiblePageNumbers.push(currentPage);
    if (currentPage >= countPages - 4) {
      /* If current and end are not too far, we don't want to "dot dot" between them. */
      for (let i = currentPage + 1; i < countPages; i += 1) {
        visiblePageNumbers.push(i);
      }
    } else {
      visiblePageNumbers.push(currentPage + 1);
      visiblePageNumbers.push(currentPage + 2);
    }
    if (currentPage !== countPages) {
      visiblePageNumbers.push(countPages);
    }
  }
  return visiblePageNumbers;
}

const Pagination = ({ pathPrefix, currentPage, countPages }) => {
  const isFirst = currentPage === 1 || !currentPage;
  const isLast = currentPage === countPages;
  const prevPage = `/${pathPrefix}${
    currentPage - 1 > 1 ? currentPage - 1 : ''
  }`;
  const nextPage = `/${pathPrefix}${currentPage + 1}`;

  const visiblePageNumbers = selectRelevantPageLinks(currentPage, countPages);

  return (
    <nav
      className={`pagination${isFirst ? ' pagination--first-page' : ''}${
        isLast ? ' pagination--last-page' : ''
      }`}
      aria-label="Pagination"
    >
      {/* "Prev" arrow */}
      {!isFirst && (
        <Link to={prevPage} rel="prev" aria-label="Next page" className="mr-2">
          <Icon
            name="arrowLeft"
            className="svg-icon transform -skew-x-6 w-6"
            aria-hidden="true"
          />
        </Link>
      )}

      {/* Numbered page links. */}
      {countPages > 1 && (
        <ul className="flex mt-0">
          {visiblePageNumbers.map(num => {
            return (
              <li key={`page-${num}`} className="flex w-12 text-center">
                <Link
                  to={`/${pathPrefix}${num === 1 ? '' : num}`}
                  className={`w-full h-12 flex justify-center items-center text-center font-sans ${
                    num === currentPage ? 'border-l border-r' : 'italic'
                  }`}
                >
                  {num}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {/* "Next" arrow */}
      {!isLast && (
        <Link to={nextPage} rel="next" aria-label="Next page" className="ml-2">
          <Icon
            name="arrowRight"
            className="svg-icon transform -skew-x-6 w-6"
            aria-hidden="true"
          />
        </Link>
      )}
    </nav>
  );
};

Pagination.propTypes = {
  pathPrefix: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  countPages: PropTypes.number.isRequired
};

export default Pagination;
