// store.js
import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./slides/playlistSlice";
import userReducer from "./slides/userSlice";

const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    user: userReducer,
  },
});

export default store;
