import Link from "next/link";
import React from "react";
import { FiPlus, FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="flex justify-between items-center mb-8 px-4">
      <div className="relative flex-1 max-w-xl">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Link
        href={`/frontend-control/add-post`}
        className="ml-4 flex items-center gap-2 bg-[#003871] text-white px-4 py-2 rounded-lg "
      >
        <FiPlus className="w-5 h-5" />
        <span>Add New</span>
      </Link>
    </div>
  );
};

export default SearchBar;
