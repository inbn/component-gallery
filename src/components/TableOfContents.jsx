import React from 'react';

const TableOfContents = ({ html }) => (
  <div className="body-text">
    <h2 className="font-sans text-black text-base leading-normal mb-2">
      Table of contents
    </h2>
    <div
      dangerouslySetInnerHTML={{
        __html: html
      }}
      className="md:text-sm"
    />
  </div>
);

export default TableOfContents;
