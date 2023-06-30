// store.js
import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./slides/playlistSlice";

const store = configureStore({
  reducer: {
    playlist: playlistReducer,
  },
});

export default store;
