import React from 'react';

const TableOfContents = ({ html }) => (
  <div className="">
    <h2 className="font-sans text-black text-lg leading-normal">
      Table of contents
    </h2>
    <div
      dangerouslySetInnerHTML={{
        __html: html
      }}
      className="table-of-contents"
    />
  </div>
);

export default TableOfContents;
