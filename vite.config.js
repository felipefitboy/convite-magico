import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  return {
    base:
      command === "build"
        ? "/festa-da-nayla/"
        : "/convite-magico/",
  };
});