const sortItems = (items, { key, comparison, flip }) => {
  const result = items.sort((a, b) => {
    switch (comparison) {
      case 'text':
        const stringA = a.node.data[key].toUpperCase();
        const stringB = b.node.data[key].toUpperCase();
        if (stringA < stringB) {
          return -1;
        }
        if (stringA > stringB) {
          return 1;
        }

        // strings must be equal
        return 0;
      case 'number':
        return a.node.data[key] - b.node.data[key];
      default:
        return true;
    }
  });
  if (flip) {
    result.reverse();
  }

  return result;
};

export default sortItems;
