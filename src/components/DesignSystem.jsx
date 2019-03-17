import React from 'react';

import PropTypes from 'prop-types';

const DesignSystem = ({ url, name, organisation, image }) => {
  return (
    <a
      href={url}
      target="blank"
      rel="noopener noreferrer"
      className="bg-white block h-full border-b-2 shadow hover:shadow-md hover:scale-105 transition"
    >
      <img src={image.length && image[0].url} alt="" className="block" />
      <div className="p-2 leading-tight">
        {name} {organisation !== null && `(${organisation})`}
      </div>
    </a>
  );
};

DesignSystem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  organisation: PropTypes.string,
  image: PropTypes.object
};

DesignSystem.defaultProps = {
  organisation: '',
  image: null
};

export default DesignSystem;
