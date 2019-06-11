import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ byline, title, subtitle, date, readtime }) => (
  <div className="p-2 -mx-2">
    <div className="container">
      {byline !== '' && <p className="font-sans mb-2">{byline}</p>}
      <h1 className="mt-0 text-grey-800">{title}</h1>
      {(subtitle !== '' || readtime !== '') && (
        <div className="flex flex-wrap mt-2 italic justify-between">
          {subtitle !== '' && <p className="pr-8 text-grey-700">{subtitle}</p>}
          {readtime !== '' && (
            <p className="mt-0 text-right self-end text-grey-700">
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
