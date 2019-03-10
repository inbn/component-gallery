import React from 'react';
import { Link } from 'gatsby';

const Component = ({ slug, name, otherNames, description, examplesCount }) => (
  <Link
    to={`components/${slug}`}
    className="component-card bg-white text-grey-darkest no-underline h-full block w-full p-2 border-b-2 shadow hover:shadow-md hover:scale-105"
  >
    <div className="flex justify-between items-center">
      <h2>{name}</h2>
      <p className="font-sans text-grey-darker">
        <strong>{examplesCount}</strong>{' '}
        <span className="text-xs">
          example
          {parseInt(examplesCount, 10) !== 1 && 's'}
        </span>
      </p>
    </div>
    {otherNames && (
      <p className="italic leading-tight mt-2">Other names: {otherNames}</p>
    )}
    {description && (
      <div
        dangerouslySetInnerHTML={{
          __html: description
        }}
        className="leading-tight mt-2"
      />
    )}
  </Link>
);

export default Component;
