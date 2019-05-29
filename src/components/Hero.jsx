import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ byline, title, subtitle, date, readtime }) => (
  <div className="border-t-2 border-b-2 sm:border-t-0 px-2 -mx-2 pt-4 pb-4">
    {byline !== '' && <p className="text-grey-700 font-sans mb-2">{byline}</p>}
    <h1 className="mt-0">{title}</h1>
    {(subtitle !== '' || readtime !== '') && (
      <div className="flex flex-wrap mt-2 text-grey-700 italic justify-between">
        {subtitle !== '' && <p className="pr-8">{subtitle}</p>}
        {readtime !== '' && (
          <p className="mt-0 text-right self-end">
            {date !== null && `Last updated: ${date} |`} {readtime}
          </p>
        )}
      </div>
    )}
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
