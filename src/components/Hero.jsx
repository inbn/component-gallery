import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ byline, title, subtitle, date, readtime }) => (
  <div className="my-8 lg:my-12">
    <div className="container">
      {byline !== '' && (
        <p className="font-sans mb-4 uppercase bg-white text-grey-800 text-xs inline-block px-2 py-1 border-2 border-black shadow-block-teal-800">
          {byline}
        </p>
      )}
      <div className="mt-0 text-5xl italic bg-white text-black border-2 border-black p-3 table shadow-block-teal-800">
        <h1 className="tracking-tighter">{title}</h1>
        {subtitle !== null && (
          <p className="mt-0 mb-2 pl-4 text-lg font-sans">{subtitle}</p>
        )}
      </div>
      {(subtitle !== '' || readtime !== '') && (
        <div className="flex flex-wrap mt-4 justify-end">
          {readtime !== null && (
            <p className="mt-0 font-sans text-sm uppercase text-grey-800 bg-grey-100 px-2 py-1 border-2 border-black shadow-block-teal-800">
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
  subtitle: null,
  readtime: null,
  date: null
};

export default Hero;
