import { defineConfig } from "tsup"

export default defineConfig({
  format: ["cjs"],
  entry: ["src"],
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
})
