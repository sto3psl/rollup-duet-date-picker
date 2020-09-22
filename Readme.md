# Bundling `@duetds/date-picker` with Rollup

Currently `@duetds/date-picker` does not work with Rollup (or I didn't get it to).
The problem appears to be a dynamic import statement with a template string:

```js
return import(`./${bundleId}.entry.js${""}`);
```

Rollup seems to ignore these imports: ["Dynamic imports on runtime are ignored by Rollup #2463"](https://github.com/rollup/rollup/issues/2463)

## Try it yourself

To see the errors, clone this repository, install dependencies, run `rollup` and look at the `index.html` in your browser.

```sh
# use your favourite package manager (pnpm, npm, yarn)
$ pnpm install

# bundle with rollup
$ pnpm start

# serve index.html
$ pnpm run serve
```

The browser console will show the following errors:

> - TypeError: error loading dynamically imported module
> - Loading module from `http://localhost:5000/duet-date-picker.entry.js` was blocked because of a disallowed MIME type (“text/html”).

This means, that Rollup did not bundle the file `duet-date-picker.entry.js` because it couldn't "guess" or resolve the dynamic import shown above.

All the `main.js` file is doing, is call `defineCustomElements`:

```js
// using the esm version for better error message in the browser
import { defineCustomElements } from "@duetds/date-picker/dist/esm/loader";

defineCustomElements(window);
```
