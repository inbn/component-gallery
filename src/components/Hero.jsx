import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ byline, title, subtitle }) => (
  <>
    <div className="my-8 lg:my-12">
      <div className="container">
        {byline !== '' && (
          <p className="font-sans mb-4 uppercase bg-white text-black font-bold text-xs inline-block px-2 py-1 border-2 border-black shadow-block-grey-800">
            {byline}
          </p>
        )}
        <div className="mt-0 text-5xl italic bg-white text-black border-2 border-black p-3 table shadow-block-grey-800">
          <h1 className="tracking-tighter">{title}</h1>
          {subtitle !== null && (
            <p className="mt-0 mb-2 pl-4 text-lg font-sans">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  </>
);

Hero.propTypes = {
  byline: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

Hero.defaultProps = {
  byline: '',
  subtitle: null
};

export default Hero;
