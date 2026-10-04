import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api/tmdb-proxy": {
          target: "https://api.themoviedb.org",
          changeOrigin: true,
          headers: { Authorization: `Bearer ${env.TMDB_TOKEN}` },
          rewrite: (path) => {
            const url = new URL(path, "http://localhost");
            const tmdbPath = url.searchParams.get("path") ?? "";
            url.searchParams.delete("path");
            return `/3${tmdbPath}${url.search}`;
          },
        },
      },
    },
  };
});
