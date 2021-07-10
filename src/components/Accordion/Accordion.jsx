import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const Accordion = ({ title, children }) => {
  const accordionPanelRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (accordionPanelRef.current) {
      const accordionPanelHeight = accordionPanelRef.current.scrollHeight;
      if (isOpen) {
        accordionPanelRef.current.style.maxHeight = `${accordionPanelHeight}px`;
      } else {
        accordionPanelRef.current.style.maxHeight = 0;
      }
    }
  }, [isOpen]);

  return (
    <div className="accordion">
      <button
        type="button"
        className="flex font-sans py-1"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-sans text-base">{title}</h2>
        <Icon
          name="chevronDown"
          className="w-4 h-4 ml-2 text-black dark:text-white"
        />
      </button>
      <div className="accordion__panel" ref={accordionPanelRef}>
        {children}
      </div>
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
