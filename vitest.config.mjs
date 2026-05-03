import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["test/**/*.test.js"],
    coverage: {
      provider: "v8",
      include: ["games/**/*.js", "games/**/*.mjs"],
      exclude: ["js/app.js"],
      reporter: ["text", "lcov"],
      thresholds: {
        statements: 75,
        branches: 80,
        functions: 80,
        lines: 70,
      },
    },
  },
});
