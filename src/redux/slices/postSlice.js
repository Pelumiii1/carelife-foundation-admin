import { baseUrl } from "@/utils/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${baseUrl}/post/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      // Create FormData object
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("description", postData.description);
      if (postData.link) formData.append("link", postData.link);

      // Append each image file
      if (postData.images && postData.images.length > 0) {
        postData.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const response = await axios.post(
        `${baseUrl}/post/create-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.allPosts;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload.data);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
