import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
export const { loadUser, logoutUser } = userSlice.actions;
