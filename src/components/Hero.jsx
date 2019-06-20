import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ byline, title, subtitle, date, readtime }) => (
  <div className="my-4 lg:my-12">
    <div className="container">
      {byline !== '' && (
        <p className="font-sans mb-2 uppercase bg-grey-100 text-grey-700 text-xs inline-block pt-1 px-2">
          {byline}
        </p>
      )}
      <h1 className="mt-0 text-teal-800 italic bg-red-100 pt-3 px-2 table shadow-block-teal-800">
        {title}
      </h1>
      {(subtitle !== '' || readtime !== '') && (
        <div className="flex flex-wrap mt-4 italic justify-between">
          {subtitle !== '' && (
            <p className="text-grey-700 bg-grey-100 p-2">{subtitle}</p>
          )}
          {readtime !== '' && (
            <p className="mt-0 text-right self-end text-grey-700 bg-grey-100 p-2">
              {date !== null && `Last updated: ${date} •`} {readtime}
            </p>
          )}
        </div>
      )}
    </div>
  </div>
);

Hero.propTypes = {
  byline: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  readtime: PropTypes.string,
  date: PropTypes.string
};

Hero.defaultProps = {
  byline: '',
  subtitle: '',
  readtime: '',
  date: null
};

export default Hero;
