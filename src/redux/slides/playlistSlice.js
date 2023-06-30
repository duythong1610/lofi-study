// playlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTracks = createAsyncThunk(
  "playlist/fetchTracks",
  async () => {
    // Gọi API để lấy danh sách bài hát
    const response = await fetch("../music.json");
    const data = await response.json();
    return data;
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    tracks: [],
    currentTrackIndex: 0,
    isPlaying: false,
    loading: false,
    error: null,
  },
  reducers: {
    playTrack(state) {
      state.isPlaying = true;
      // Gọi hàm phát nhạc
    },
    pauseTrack(state) {
      state.isPlaying = false;
      // Gọi hàm tạm dừng nhạc
    },
    nextTrack(state) {
      state.currentTrackIndex =
        (state.currentTrackIndex + 1) % state.tracks.length;
      // Gọi hàm chuyển sang bài tiếp theo
    },
    prevTrack(state) {
      state.currentTrackIndex =
        (state.currentTrackIndex - 1 + state.tracks.length) %
        state.tracks.length;
      // Gọi hàm chuyển sang bài trước đó
    },
    selectTrack(state, action) {
      state.currentTrackIndex = action.payload;
      state.isPlaying = true;
      // Gọi hàm phát nhạc với bài được chọn
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { playTrack, pauseTrack, nextTrack, prevTrack, selectTrack } =
  playlistSlice.actions;

export default playlistSlice.reducer;
