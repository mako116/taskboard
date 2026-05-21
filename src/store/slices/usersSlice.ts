import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../api";
import type { ApiUser } from "../../types/types";
import { USER_LIST } from "@/utility/urlConfig";
// import { apiClient, ApiUser } from "../api";

interface UsersState {
  byId: Record<number, ApiUser>;
  allIds: number[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  USER_LIST,
  async (_: void, { rejectWithValue }) => {
    try {
      return await apiClient.fetchUsers();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed");
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.byId = {};
        state.allIds = [];
        action.payload.forEach((u) => {
          state.byId[u.id] = u;
          state.allIds.push(u.id);
        });
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to load users";
      });
  },
});

export default usersSlice.reducer;
