import get from 'lodash/get';

const sortItems = (items, { path, comparison, reverse }) => {
  const result = items.sort((a, b) => {
    // Parse the path (string) and use it to access the property that will
    // be used for comparison
    // Based on: https://stackoverflow.com/questions/6393943
    const aData = get(a, path);
    const bData = get(b, path);

    switch (comparison) {
      case 'text':
        const stringA = aData.toUpperCase();
        const stringB = bData.toUpperCase();
        if (stringA < stringB) {
          return -1;
        }
        if (stringA > stringB) {
          return 1;
        }

        // Strings are equal
        return 0;
      case 'number':
        return aData - bData;
      default:
        return true;
    }
  });
  if (reverse) {
    result.reverse();
  }

  return result;
};

export default sortItems;
