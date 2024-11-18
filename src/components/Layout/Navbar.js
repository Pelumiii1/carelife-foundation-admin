"use client";
import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="h-[15vh] text-white p-5 flex items-center">
      <div>
        {user && (
          <h1 className="text-[#101828] text-[30px] font-[500]">
            Welcome Back,
            <span className="capitalize">{user.firstName}</span>
          </h1>
        )}
        <p className="text-[#667085] text-[14px] font-[400]">
          Your current summary and activity.
        </p>
      </div>
    </div>
  );
};

export default Navbar;
