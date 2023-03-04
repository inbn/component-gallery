import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useKey from '@rooks/use-key';

import Icon from '../Icon/Icon';

const Filter = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(undefined);
  const buttonRef = useRef(undefined);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDropdownClick =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      const isButtonClick =
        buttonRef.current && buttonRef.current.contains(event.target);

      if (isDropdownClick || isButtonClick) {
        // If the ref is not defined or the user clicked on the menu, we don’t do anything.
        return;
      }

      // Otherwise we close the menu.
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [dropdownRef, buttonRef]);

  const keyPressed = (event) => {
    switch (event.code) {
      case 'Escape':
        setIsOpen(false);
        break;

      default:
    }
  };

  useKey(['Escape'], keyPressed);

  return (
    <div>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup
        aria-expanded={isOpen}
        className="border rounded-full px-2 font-sans flex items-center relative font-bold md:text-sm"
      >
        {label}
        <Icon
          name="chevronDown"
          className="w-4 h-4 ml-2 text-black dark:text-white"
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="bg-white dark:bg-grey-800 border rounded-xl p-2 mt-2 mr-2 absolute z-20 shadow-block max-w-md"
        >
          {children}
        </div>
      )}
    </div>
  );
};

Filter.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Filter.defaultProps = {
  label: 'Filter',
};

export default Filter;
