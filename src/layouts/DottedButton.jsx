import React from 'react'

const DottedButton = ({ children, className = "", ...rest }) => {
    return (
      <button
        className={
          `flex items-center justify-center py-4 w-full font-bold text-xl tracking-wide capitalize ` +
          `box-border border-dashed border-black-800 border-2 rounded-xl text-center text-grey-400 ${className} ` +
          `focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white`
        }
        {...rest}
      >
        {children}
      </button>
    );
  };

  export default DottedButton;