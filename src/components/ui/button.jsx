import React from "react";

export function Button({ className, variant, asChild, children, ...props }) {
  const baseStyle = "inline-flex items-center justify-center transition-all duration-300 font-semibold rounded-xl h-11 px-6 text-sm cursor-pointer";
  
  if (asChild) {
    return React.cloneElement(children, {
      className: `${baseStyle} ${className || ""}`,
      ...props
    });
  }
  
  return (
    <button className={`${baseStyle} ${className || ""}`} {...props}>
      {children}
    </button>
  );
}
