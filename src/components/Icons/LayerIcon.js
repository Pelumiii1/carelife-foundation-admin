import React from "react";

const LayerIcon = ({ color = "#667085", width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 16.5452L11 21.5452L21 16.5452M1 11.5452L11 16.5452L21 11.5452M11 1.54517L1 6.54517L11 11.5452L21 6.54517L11 1.54517Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LayerIcon;
