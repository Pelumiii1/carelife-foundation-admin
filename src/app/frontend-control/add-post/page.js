"use client";
import Layout from "@/components/Layout/Layout";
import React, { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import copyright from "../../../../public/copyright.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createPost } from "@/redux/slices/postSlice";

const AddPost = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);
  const [previewImages, setPreviewImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      const isValidType = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ].includes(file.type);
      const isValidSize = file.size <= 5000000; // 5MB

      if (!isValidType) toast.error(`${file.name} is not a valid image type`);
      if (!isValidSize) toast.error(`${file.name} is too large (max 5MB)`);

      return isValidType && isValidSize;
    });

    // Create preview URLs
    const newPreviewImages = validFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPreviewImages([...previewImages, ...newPreviewImages]);
    setFormData({
      ...formData,
      images: [...formData.images, ...validFiles],
    });
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previewImages[index].url);
    setPreviewImages(previewImages.filter((_, i) => i !== index));
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Title is required");
    }

    if (!formData.description.trim()) {
      return toast.error("Description is required");
    }

    try {
      const result = await dispatch(createPost(formData)).unwrap();
      toast.success(result.message || "Post created successfully");

      // Clear form and previews
      setFormData({
        title: "",
        link: "",
        description: "",
        images: [],
      });
      previewImages.forEach((image) => URL.revokeObjectURL(image.url));
      setPreviewImages([]);
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "Failed to create post";
      toast.error(errorMessage);
    }
  };
  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[50vw] p-6 rounded-lg h-[85vh] overflow-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Blog Post</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter Title"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Link</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Enter Link"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter Description"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Upload Image</label>
          <div className="border-dashed border-2 rounded-lg p-4 flex flex-col items-center justify-center text-blue-600 cursor-pointer">
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="text-center items-center flex flex-col justify-center"
            >
              <div className="bg-[#D3E9FF] border-[9px] border-[#A7D2FF] p-2 rounded-full">
                <FiUploadCloud color="#003871" size={26} />
              </div>

              <p className="mt-2 text-[#0064C9]">
                Click to upload image
                <span className="text-[#637D92]">{` or drag and drop`}</span>
              </p>
              <p className="text-sm text-[#637D92]">
                SVG, PNG, JPG, or GIF (max. 800x400px)
              </p>
            </label>
          </div>

          {/* Image Previews */}
          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {previewImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <FiX size={16} />
                  </button>
                  <p className="text-xs mt-1 truncate">{image.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-[#003871]"
          } text-white rounded-lg py-2 mt-4 transition-colors`}
        >
          {loading ? "Saving..." : "Save User"}
        </button>
      </form>
      <div className="flex gap-2 justify-end text-[16px] font-[400] text-[#0A0A0B]">
        <Image src={copyright} alt="" width={20} height={20} />
        <p>2024 Carelife Foundation. All rights Reserved</p>
      </div>
    </Layout>
  );
};

export default AddPost;
