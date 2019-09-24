import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ byline, title, subtitle, intro }) => (
  <div className="my-8 lg:my-12 px-6">
    {byline !== '' && (
      <p className="font-sans mb-4 uppercase bg-white text-black font-bold text-xs inline-block px-2 py-1 border-2 border-black shadow-block-grey-800">
        {byline}
      </p>
    )}
    <h1 className="text-5xl sm:text-6xl text-black font-bold mt-0">{title}</h1>
    {subtitle !== null && <p className="mt-2 text-lg italic">{subtitle}</p>}
    {intro !== null && (
      <div
        className="mt-2 text-lg body-text ml-0"
        dangerouslySetInnerHTML={{
          __html: intro
        }}
      />
    )}
  </div>
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
