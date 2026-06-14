import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // The CSS minifier collapses the `backdrop-filter` / `-webkit-backdrop-filter`
    // pair down to a single prefixed declaration, which breaks the glass blur in
    // browsers that only accept the unprefixed property (e.g. Firefox). Skipping
    // CSS minification keeps both declarations exactly as authored. JS is still
    // minified, and gzip keeps the CSS payload tiny.
    cssMinify: false,
  },
});
