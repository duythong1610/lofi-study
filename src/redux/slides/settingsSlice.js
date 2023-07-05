import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isShowGreeting: JSON.parse(localStorage.getItem("isShowGreeting")) ?? true,
    isShowOptions: JSON.parse(localStorage.getItem("isShowOptions")) ?? true,
    isShowClock: JSON.parse(localStorage.getItem("isShowClock")) ?? true,
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
    showIsClock(state) {
      state.isShowClock = !state.isShowClock;
      localStorage.setItem("isShowClock", state.isShowClock);
    },
  },
});

export const { showIsGreeting, showIsOptions, showIsClock } =
  settingsSlice.actions;

export default settingsSlice.reducer;
