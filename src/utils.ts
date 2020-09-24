import { OpenAPI3 } from "./types";

export function comment(text: string): string {
  return `/**
  * ${text.trim().replace("\n+$", "").replace(/\n/g, "\n  * ")}
  */
`;
}

/** shim for Object.fromEntries() for Node < 13 */
export function fromEntries(entries: [string, any][]): object {
  return entries.reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
}

export function typeName(name: string) {
  return name.replace(/\./g, "_");
}

/** Return type of node (works for v2 or v3, as there are no conflicting types) */
type SchemaObjectType =
  | "anyOf"
  | "array"
  | "boolean"
  | "enum"
  | "number"
  | "object"
  | "oneOf"
  | "ref"
  | "string";
export function nodeType(obj: any): SchemaObjectType | undefined {
  if (!obj || typeof obj !== "object") {
    return undefined;
  }

  if (obj["$ref"]) {
    return "ref";
  }

  // enum
  if (Array.isArray(obj.enum)) {
    return "enum";
  }

  // boolean
  if (obj.type === "boolean") {
    return "boolean";
  }

  // string
  if (
    ["binary", "byte", "date", "dateTime", "password", "string"].includes(
      obj.type
    )
  ) {
    return "string";
  }

  // number
  if (["double", "float", "integer", "number"].includes(obj.type)) {
    return "number";
  }

  // anyOf
  if (Array.isArray(obj.anyOf)) {
    return "anyOf";
  }

  // oneOf
  if (Array.isArray(obj.oneOf)) {
    return "oneOf";
  }

  // array
  if (obj.type === "array" || obj.items) {
    return "array";
  }

  // return object by default
  return "object";
}

/** Return OpenAPI version from definition */
export function swaggerVersion(definition: OpenAPI3): 2 | 3 {
  // OpenAPI 3
  const { openapi } = definition as OpenAPI3;
  if (openapi && parseInt(openapi, 10) === 3) {
    return 3;
  }

  // OpenAPI 2
  if (openapi && parseInt(openapi, 10) === 2) {
    return 2;
  }

  throw new Error(
    `🚏 version missing from schema; specify whether this is OpenAPI v3 or v2 https://swagger.io/specification`
  );
}

/** Convert $ref to TS ref */
export function transformRef(ref: string): string {
  const parts = ref.replace(/^#\//, "").split("/");
  // return `${parts[0]}["${parts.slice(1).join('"]["')}"]`;
  return parts[parts.length - 1];
}

/** Convert T into T[]; */
export function tsArrayOf(type: string): string {
  return `(${type})[]`;
}

/** Convert array of types into [T, A, B, ...] */
export function tsTupleOf(types: string[]): string {
  return `[${types.join(", ")}]`;
}

/** Convert T, U into T & U; */
export function tsIntersectionOf(types: string[]): string {
  return `(${types.join(") & (")})`;
}

/** Convert T into Partial<T> */
export function tsPartial(type: string): string {
  return `Partial<${type}>`;
}

/** Convert [X, Y, Z] into X | Y | Z */
export function tsUnionOf(types: string[]): string {
  return `(${types.join(") | (")})`;
}
