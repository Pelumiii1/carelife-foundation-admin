import React from "react";

const HomeIcon = ({ color = "#667085", width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 22.5452V12.5452H15V22.5452M3 9.54517L12 2.54517L21 9.54517V20.5452C21 21.0756 20.7893 21.5843 20.4142 21.9594C20.0391 22.3345 19.5304 22.5452 19 22.5452H5C4.46957 22.5452 3.96086 22.3345 3.58579 21.9594C3.21071 21.5843 3 21.0756 3 20.5452V9.54517Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
