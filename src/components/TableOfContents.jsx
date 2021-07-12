import React from 'react';

const TableOfContentsItem = ({ item }) => {
  const nestedItems = (item.items || []).map((nestedItem) => (
    <TableOfContentsItem item={nestedItem} key={nestedItem.title} />
  ));

  return (
    <li key={item.title}>
      <a href={item.url}>{item.title}</a>
      {nestedItems.length > 0 && <ul>{nestedItems}</ul>}
    </li>
  );
};

const TableOfContents = ({ items }) => (
  <div className="sticky top-0 pt-2 px-6 pb-4 overflow-y-auto max-h-screen">
    <h2 className="font-sans text-black text-lg leading-normal">
      Table of contents
    </h2>
    <ul className="table-of-contents">
      {items.map((item) => (
        <TableOfContentsItem item={item} key={item.title} />
      ))}
    </ul>
  </div>
);

export default TableOfContents;
