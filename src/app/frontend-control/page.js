"use client";

import BlogCard from "@/components/BlogCard";
import Layout from "@/components/Layout/Layout";
import SearchBar from "@/components/SearchBar";
import { getAllPosts } from "@/redux/slices/postSlice";
import React, { useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

// Header Component
const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8 p-4">
      <h1 className="text-2xl font-bold">Edit Front view of you website</h1>
      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
        <FiDownload className="w-5 h-5" />
        <span>Download CSV</span>
      </button>
    </div>
  );
};

const FrontendControl = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading) {
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
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-h-[85vh] overflow-auto">
        <Header />
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {posts.map((post) => (
            <BlogCard
              key={post._id}
              title={post.title}
              description={post.description}
              imageUrls={post.imageUrls} // Add a default placeholder image
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FrontendControl;
