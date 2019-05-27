import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ byline, title, subtitle, readtime }) => (
  <div className="border-b-2 px-2 -mx-2 pt-4 pb-4">
    {byline !== '' && <p className="text-grey-700 font-sans mb-2">{byline}</p>}
    <h1 className="mt-0">{title}</h1>
    {subtitle !== '' && <p>{subtitle}</p>}
    {readtime !== '' && <p className="mt-0">{readtime}</p>}
  </div>
);

Hero.propTypes = {
  byline: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  readtime: PropTypes.string
};

Hero.defaultProps = {
  byline: '',
  subtitle: '',
  readtime: ''
};

export default Hero;
