import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isShowGreeting: localStorage.getItem("isShowGreeting") || true,
  },
  reducers: {
    showIsGreeting(state) {
      state.isShowGreeting = !state.isShowGreeting;
      localStorage.setItem("isShowGreeting", !state.isShowGreeting);
    },
  },
});

export const { showIsGreeting } = settingsSlice.actions;

export default settingsSlice.reducer;
