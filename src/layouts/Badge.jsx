import React from "react";

function Badge({ text, className = "" }) {
  return (
    <div
      className={`font-bold text-xs px-2 py-[2px] h-fit w-fit self-center rounded-[4px] ${className}`}>
      {text}
    </div>
  );
}

export default Badge;
