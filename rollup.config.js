import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-css-only";

export default {
  input: "main.js",
  // Fix Warning: 	(!) `this` has been rewritten to `undefined`
  // 				https://rollupjs.org/guide/en/#error-this-is-undefined
  context: "window",
  preserveEntrySignatures: false,
  output: {
    dir: "public",
    format: "esm",
  },
  plugins: [
    {
      resolveDynamicImport(specifier, importer) {
        const matches = !!importer.match(
          /@duetds\/date-picker\/dist.*\/index-/g
        );

        if (typeof specifier === "string" || !matches) return null;

        return this.resolve(
          "@duetds/date-picker/dist/esm/duet-date-picker.entry.js"
        );
      },
    },
    css({ output: "public/main.css" }),
    resolve(),
  ],
};
