import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.ASTRO_SITE_URL ?? "https://gabrielgaroz.com",
  base: process.env.ASTRO_SITE_BASE_PATH ?? "/",
  output: "static",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
