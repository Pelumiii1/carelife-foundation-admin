"use client";
import Layout from "@/components/Layout/Layout";
import { fetchUsers } from "@/redux/slices/userSlice";
import React, { useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const ManageAdminstrator = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="w-full p-6 text-center text-red-500">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Managers List</h2>
          <button className="bg-gray-100 border border-gray-300 p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>{" "}
            Download CSV
          </button>
        </div>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100  text-[12px] text-[#4A5E6D]">
              <th className="border-b w-[4rem] py-2 px-3 text-left">User ID</th>
              <th className="border-b py-2 text-left px-3">First name</th>
              <th className="border-b py-2 text-left px-3">Last Name</th>
              <th className="border-b py-2 text-left px-3">Email</th>
              <th className="border-b py-2 text-left px-3">Type</th>
              <th className="border-b py-2 text-left px-3">Status</th>
              <th className="border-b py-2 text-left px-3">Created At</th>
              <th className="border-b py-2 text-left px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-[14px] text-[#4A5E6D]">
                <td className="border-b py-2 px-3">{user._id}</td>
                <td className="border-b py-2 px-3">{user.firstName}</td>
                <td className="border-b py-2 px-3">{user.lastName}</td>
                <td className="border-b py-2 px-3">{user.email}</td>
                <td className="border-b py-2 px-3 capitalize">{user.type}</td>
                <td className="border-b py-2 px-3 text-green-500">active</td>
                <td className="border-b py-2 px-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">
                    <FiEdit2 className="inline-block" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 className="inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ManageAdminstrator;
