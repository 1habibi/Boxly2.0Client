import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { ngrok } from "vite-plugin-ngrok";

export default defineConfig({
  plugins: [react(), ngrok("EXAMPLE")],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
