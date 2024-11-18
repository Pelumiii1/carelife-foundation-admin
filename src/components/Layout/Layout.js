"use client";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem("user"));
    if (savedUser) {
      dispatch(setUser(savedUser));
    } else {
      router.push(`/login`);
    }
  }, [dispatch, router]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
