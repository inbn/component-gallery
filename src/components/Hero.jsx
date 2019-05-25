import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ byline, title, subtitle }) => (
  <div className="border-b-2 px-2 -mx-2 pt-4 pb-8">
    {byline !== '' && <p className="text-grey-700 font-sans mb-4">{byline}</p>}
    <h1 className="mt-0">{title}</h1>
    {subtitle !== '' && <p>{subtitle}</p>}
  </div>
);

Hero.propTypes = {
  byline: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

Hero.defaultProps = {
  byline: '',
  subtitle: ''
};

export default Hero;
