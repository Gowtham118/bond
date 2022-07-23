import React from "react";

function ContentWrapper(props) {
  const {
    children,
    label,
    rightLabel,
    rightLabelOnClick,
    rightLabelClassName,
    overrideSmallScreenStyle,
  } = props;

  function handleRightLabelClick(e) {
    e?.preventDefault();
    e?.stopPropagation();
    rightLabelOnClick?.();
  }

  const RightLabel = (
    <p className={`mt-1 mb-2 text-sm font-semibold tracking-wide ${rightLabelClassName}`}>
      {rightLabel}
    </p>
  );
  return (
    <div
      className={`p-1 rounded-2xl ${
        overrideSmallScreenStyle ? "bg-black-900" : "bg-black-800 md:bg-black-900"
      }`}>
      <div className='flex items-center justify-between mx-3'>
        <p className='mt-1 mb-2 text-sm font-semibold tracking-wide capitalize text-grey-500'>
          {label}
        </p>
        {rightLabelOnClick && <button onClick={handleRightLabelClick}>{RightLabel}</button>}
        {!rightLabelOnClick && RightLabel}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default ContentWrapper;
