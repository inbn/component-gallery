import React from 'react';

const TableOfContents = ({ html }) => (
  <div className="sticky top-0 pt-2 px-6 pb-4 overflow-y-auto max-h-screen">
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
