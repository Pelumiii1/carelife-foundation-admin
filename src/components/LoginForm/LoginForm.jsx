"use client";
import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${baseUrl}/auth/login`, formData);
      toast.success(response.data.message || "Login successful");
      const { user, token } = response.data;
      dispatch(login({ token: token, user: user }));
      sessionStorage.setItem("user", JSON.stringify(user));
      router.push(`/overview`);
    } catch (error) {
      toast.error(
        error.response.data.message || "An error occures, try agin later"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid space-y-1">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="text"
          placeholder="Enter your email"
          className="placeholder:text-[#637D92] text-[16px] font-[400] border border-[#7991A4] rounded-[8px] p-3 py-2 outline-none"
        />
      </div>
      <div className="grid space-y-1">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          type="password"
          placeholder="Enter your password"
          className="placeholder:text-[#637D92] text-[16px] font-[400] border border-[#7991A4] rounded-[8px] p-3 py-2 outline-none"
        />
      </div>
      <div className="flex gap-2 items-center">
        <input type="checkbox" />
        <p className="text-[#323F49] text-[14px] font-[400]">
          Remember for 30 days
        </p>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`${
          isLoading ? "opacity-50" : ""
        } bg-[#003871] rounded-[8px] text-white w-full h-[44px]`}
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
