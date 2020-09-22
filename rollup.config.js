import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "main.js",
  // Fix Warning: 	(!) `this` has been rewritten to `undefined`
  // 				https://rollupjs.org/guide/en/#error-this-is-undefined
  context: "window",
  output: {
    dir: "public",
    format: "esm",
  },
  plugins: [resolve()],
};
