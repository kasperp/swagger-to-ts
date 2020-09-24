[![version(scoped)](https://img.shields.io/npm/v/@manifoldco/swagger-to-ts.svg)](https://www.npmjs.com/package/@manifoldco/swagger-to-ts)
[![codecov](https://codecov.io/gh/manifoldco/swagger-to-ts/branch/master/graph/badge.svg)](https://codecov.io/gh/manifoldco/swagger-to-ts)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fmanifoldco%2Fswagger-to-ts%2Fbadge&style=flat)](https://actions-badge.atrox.dev/manifoldco/swagger-to-ts/goto)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-18-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# 📘️ swagger-to-ts

🚀 Convert [OpenAPI 3.0][openapi3] schemas to TypeScript interfaces using Node.js.

💅 The output is prettified with [Prettier][prettier] (and can be customized!).

👉 Works for both local and remote resources (filesystem and HTTP).

View examples:

- [Stripe, OpenAPI 2.0](./examples/stripe-openapi2.ts)
- [Stripe, OpenAPI 3.0](./examples/stripe-openapi3.ts)

## Usage

### CLI

#### 🗄️ Reading specs from file system

```bash
npx @manifoldco/swagger-to-ts schema.yaml --output schema.ts

# 🤞 Loading spec from tests/v2/specs/stripe.yaml…
# 🚀 schema.yaml -> schema.ts [250ms]
```

#### ☁️ Reading specs from remote resource

```bash
npx @manifoldco/swagger-to-ts https://petstore.swagger.io/v2/swagger.json --output petstore.ts

# 🤞 Loading spec from https://petstore.swagger.io/v2/swagger.json…
# 🚀 https://petstore.swagger.io/v2/swagger.json -> petstore.ts [650ms]
```

_Thanks to @psmyrdek for this feature!_

#### Generating multiple schemas

In your `package.json`, for each schema you’d like to transform add one `generate:specs:[name]` npm-script. Then combine them all into one `generate:specs` script, like so:

```json
"scripts": {
  "generate:specs": "npm run generate:specs:one && npm run generate:specs:two && npm run generate:specs:three",
  "generate:specs:one": "npx @manifoldco/swagger-to-ts one.yaml -o one.ts",
  "generate:specs:two": "npx @manifoldco/swagger-to-ts two.yaml -o two.ts",
  "generate:specs:three": "npx @manifoldco/swagger-to-ts three.yaml -o three.ts"
}
```

You can even specify unique options per-spec, if needed. To generate them all together, run:

```bash
npm run generate:specs
```

Rinse and repeat for more specs.

For anything more complicated, or for generating specs dynamically, you can also use the [Node API](#node).

#### CLI Options

| Option                         | Alias | Default  | Description                                                      |
| :----------------------------- | :---- | :------: | :--------------------------------------------------------------- |
| `--output [location]`          | `-o`  | (stdout) | Where should the output file be saved?                           |
| `--prettier-config [location]` |       |          | (optional) Path to your custom Prettier configuration for output |

### Node

```bash
npm i --save-dev @manifoldco/swagger-to-ts
```

```js
const { readFileSync } = require("fs");
const swaggerToTS = require("@manifoldco/swagger-to-ts");

const input = JSON.parse(readFileSync("spec.json", "utf8")); // Input can be any JS object (OpenAPI format)
const output = swaggerToTS(input); // Outputs TypeScript defs as a string (to be parsed, or written to a file)
```

The Node API is a bit more flexible: it will only take a JS object as input (OpenAPI format), and
return a string of TS definitions. This lets you pull from any source (a Swagger server, local
files, etc.), and similarly lets you parse, post-process, and save the output anywhere.

If your specs are in YAML, you’ll have to convert them to JS objects using a library such as
[js-yaml][js-yaml]. If you’re batching large folders of specs, [glob][glob] may also come in handy.

#### PropertyMapper

In order to allow more control over how properties are parsed, and to specifically handle
`x-something`-properties, the `propertyMapper` option may be specified as the optional 2nd
parameter.

This is a function that, if specified, is called for each property and allows you to change how
swagger-to-ts handles parsing of Swagger files.

An example on how to use the `x-nullable` property to control if a property is optional:

```js
const getNullable = (d: { [key: string]: any }): boolean => {
  const nullable = d["x-nullable"];
  if (typeof nullable === "boolean") {
    return nullable;
  }
  return true;
};

const output = swaggerToTS(swagger, {
  propertyMapper: (swaggerDefinition, property): Property => ({
    ...property,
    optional: getNullable(swaggerDefinition),
  }),
});
```

_Thanks to @atlefren for this feature!_

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

This is a fork of https://github.com/manifoldco/swagger-to-ts that generates a more opinionated and specialized output.
