import React from 'react';

const TableOfContents = ({ html }) => (
  <>
    <h2 className="font-sans text-black text-base leading-normal mb-2 pt-2 pl-2">
      Table of contents
    </h2>
    <div
      dangerouslySetInnerHTML={{
        __html: html
      }}
      className="body-text md:text-sm"
    />
  </>
);

export default TableOfContents;
