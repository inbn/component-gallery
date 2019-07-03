import React from 'react';
import PropTypes from 'prop-types';

const Featured = ({ byline, title }) => (
  <div className="my-4 lg:my-12">
    <div className="container">
      {byline !== '' && (
        <p className="font-sans mb-2 uppercase bg-grey-100 text-grey-700 text-xs inline-block pt-1 px-2">
          {byline}
        </p>
      )}
      <div className="mt-0 text-teal-800 italic bg-red-100 pt-3 px-2 table shadow-block-teal-800">
        {title}
      </div>
    </div>
  </div>
);

Featured.propTypes = {
  byline: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  date: PropTypes.string
};

Featured.defaultProps = {
  byline: '',
  subtitle: '',
  date: null
};

export default Featured;
