import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  proxy: {
    "/socket.io": {
      target: "https://socket-server-ay7s.onrender.com",
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  },
});
