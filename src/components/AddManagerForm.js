"use client";
import { baseUrl } from "@/utils/constants";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const AddManagerForm = () => {
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    type: "admin",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);

      return;
    }
    try {
      const res = await axios.post(
        `${baseUrl}/auth/signup`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          type: formData.type,
          password: formData.password,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res?.data?.message ?? "User created successfully");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        type: "admin",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.message ?? "An error occured, try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="border border-[#92A5B5] rounded-[20px] w-[50vw] p-5 space-y-3">
        <div className="grid space-y-1">
          <label className="text-[14px] font-[400]">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter name"
            autoComplete="off"
            className="bg-transparent border border-[#92A5B5] p-2 rounded-[8px]"
          />
        </div>
        <div className="grid space-y-1">
          <label className="text-[14px] font-[400]">Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Enter name"
            autoComplete="off"
            className="bg-transparent border border-[#92A5B5] p-2 rounded-[8px]"
          />
        </div>
        <div className="grid space-y-1">
          <label className="text-[14px] font-[400]">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            className="bg-transparent border border-[#92A5B5] p-2 rounded-[8px]"
          />
        </div>
        <div className="grid space-y-1">
          <label className="text-[14px] font-[400]">Type</label>
          <select
            className="bg-transparent border border-[#92A5B5] p-2 rounded-[8px]"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="super admin">Super Admin</option>
          </select>
        </div>
        <div className="grid space-y-1">
          <label className="text-[14px] font-[400]">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            autoComplete="off"
            className="bg-transparent border border-[#92A5B5] p-2 rounded-[8px]"
          />
        </div>
        <div className="grid space-y-1">
          <label className="text-[14px] font-[400]">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Enter password"
            autoComplete="off"
            className="bg-transparent border border-[#92A5B5] p-2 rounded-[8px]"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`${
              isLoading ? "opacity-50" : ""
            } bg-[#003871] text-white rounded-[10px] py-3 w-[40vw] mt-3`}
          >
            {isLoading ? "Saving..." : "Save User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddManagerForm;
