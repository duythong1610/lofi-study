// store.js
import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./slides/playlistSlice";
import userReducer from "./slides/userSlice";
import settingsReducer from "./slides/settingsSlice";

const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});

export default store;
