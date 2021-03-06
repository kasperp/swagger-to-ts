import path from "path";
import prettier from "prettier";
import { swaggerVersion } from "./utils";
import { OpenAPI3, SwaggerToTSOptions } from "./types";
import v3 from "./v3";

export const WARNING_MESSAGE = `/**
* This file was auto-generated by swagger-to-ts.
* Do not make direct changes to the file.
*/


`;

export default function swaggerToTS(
  schema: OpenAPI3,
  options?: SwaggerToTSOptions
): string {
  // generate types for V2 and V3
  const version = swaggerVersion(schema);
  let output = `${WARNING_MESSAGE}`;
  switch (version) {
    case 3: {
      output = output.concat(v3(schema as OpenAPI3, options));
      break;
    }
    default:
      console.error(`❌ only OpenAPI3 is supported `);
  }

  // Prettify output
  let prettierOptions: prettier.Options = { parser: "typescript" };
  if (options && options.prettierConfig) {
    try {
      const userOptions = prettier.resolveConfig.sync(
        path.resolve(process.cwd(), options.prettierConfig)
      );
      prettierOptions = {
        ...prettierOptions,
        ...userOptions,
      };
    } catch (err) {
      console.error(`❌ ${err}`);
    }
  }
  return prettier.format(output, prettierOptions);
}
