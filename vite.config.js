import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { ngrok } from "vite-plugin-ngrok";

export default defineConfig({
  plugins: [
    react(),
    ngrok("2d0ajkYt3S41bN0cVIuQbYB9F0N_59bfdCUmqD92d32BCgihh"),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
