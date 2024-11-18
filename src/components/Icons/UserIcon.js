import React from "react";

const UserIcon = ({ color = "#667085", width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 19.5452V17.5452C17 16.4843 16.5786 15.4669 15.8284 14.7167C15.0783 13.9666 14.0609 13.5452 13 13.5452H5C3.93913 13.5452 2.92172 13.9666 2.17157 14.7167C1.42143 15.4669 1 16.4843 1 17.5452V19.5452M23 19.5452V17.5452C22.9993 16.6589 22.7044 15.7979 22.1614 15.0975C21.6184 14.397 20.8581 13.8967 20 13.6752M16 1.67517C16.8604 1.89547 17.623 2.39587 18.1676 3.09748C18.7122 3.79909 19.0078 4.662 19.0078 5.55017C19.0078 6.43834 18.7122 7.30125 18.1676 8.00286C17.623 8.70446 16.8604 9.20487 16 9.42517M13 5.54517C13 7.7543 11.2091 9.54517 9 9.54517C6.79086 9.54517 5 7.7543 5 5.54517C5 3.33603 6.79086 1.54517 9 1.54517C11.2091 1.54517 13 3.33603 13 5.54517Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserIcon;