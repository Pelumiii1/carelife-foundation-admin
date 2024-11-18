import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const BlogCard = ({ imageUrls, title, description }) => {
  const baseUrl = "http://localhost:8000";
  const getDisplayImage = () => {
    if (imageUrls && imageUrls.length > 0) {
      const imageUrl = imageUrls[0].startsWith("/")
        ? `${baseUrl}${imageUrls[0]}`
        : `${baseUrl}/${imageUrls[0]}`;
      console.log(imageUrl);
      return imageUrl;
    }
    return "https://placehold.co/600x400?text=No+Image"; // Placeholder image
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={getDisplayImage()}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-[#003871] text-white px-6 py-2 rounded-lg">
            <FiEdit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button className="flex items-center gap-2 text-red-600 px-6 py-2 rounded-lg border border-red-600">
            <FiTrash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
