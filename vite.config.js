import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { params } from "@ampt/sdk";

process.env.VITE_AMPT_WS_URL = params("wss://super-code-wsvor.ampt.app");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "static",
  },
  server: {
    open: true,
    port: process.env.PORT || 3000,
  },
});
