import { defineConfig } from "@tanstack/react-start/config"
import { cloudflare } from "unenv"
import tsConfigPaths from "vite-tsconfig-paths"
import nitroCloudflareBindings from "nitro-cloudflare-dev"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  tsr: {
    appDirectory: "src",
  },
  server: {
    preset: "cloudflare-module",
    unenv: cloudflare,
    modules: [nitroCloudflareBindings],
  },
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
})
