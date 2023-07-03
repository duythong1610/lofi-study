import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isShowGreeting: JSON.parse(localStorage.getItem("isShowGreeting")),
    isShowOptions: JSON.parse(localStorage.getItem("isShowOptions")),
  },
  reducers: {
    showIsGreeting(state) {
      state.isShowGreeting = !state.isShowGreeting;
      localStorage.setItem("isShowGreeting", state.isShowGreeting);
    },

    showIsOptions(state) {
      state.isShowOptions = !state.isShowOptions;
      localStorage.setItem("isShowOptions", state.isShowOptions);
    },
  },
});

export const { showIsGreeting, showIsOptions } = settingsSlice.actions;

export default settingsSlice.reducer;
