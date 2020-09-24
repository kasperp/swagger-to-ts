import { OpenAPI3SchemaObject } from "./OpenAPI3";

export * from "./OpenAPI3";

export interface Property {
  interfaceType: string;
  optional: boolean;
  description?: string;
}

export interface SwaggerToTSOptions {
  /** (optional) Path to Prettier config */
  prettierConfig?: string;
  /** (optional) Function to iterate over every schema object before transforming to TypeScript */
  propertyMapper?: (
    schemaObject: OpenAPI3SchemaObject,
    property: Property
  ) => Property;
}
