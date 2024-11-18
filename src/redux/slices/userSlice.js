// userSlice.js
import { baseUrl } from "@/utils/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${baseUrl}/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;
