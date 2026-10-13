import { fileURLToPath } from "node:url";
import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    globals: true,
  },
  resolve: {
    alias: {
      "~types": fileURLToPath(new URL("./types", import.meta.url)),
    },
  },
});
