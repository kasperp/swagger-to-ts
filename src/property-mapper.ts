import { OpenAPI3SchemaObject, SwaggerToTSOptions } from "./types";
import { fromEntries } from "./utils";

export default function propertyMapper<T = any>(
  schema: T,
  transform: SwaggerToTSOptions["propertyMapper"]
): T {
  if (!transform) {
    return schema;
  }

  return JSON.parse(JSON.stringify(schema), (_, node: OpenAPI3SchemaObject) => {
    // if no properties, skip
    if (!node.properties) {
      return node;
    }

    // map over properties, transforming if needed
    node.properties = fromEntries(
      Object.entries(node.properties).map(([key, val]) => {
        const schemaObject = val as OpenAPI3SchemaObject;

        const property = transform(schemaObject, {
          interfaceType: schemaObject.type as string,
          optional:
            !Array.isArray(node.required) || node.required.includes(key),
          description: schemaObject.description,
        });

        // update requirements
        if (property.optional) {
          if (Array.isArray(node.required)) {
            node.required = node.required.filter((r) => r !== key);
          }
        } else {
          node.required = [...(node.required || []), key];
        }

        // transform node from mapper
        return [
          key,
          {
            ...val,
            type: property.interfaceType,
            description: property.description,
          },
        ];
      })
    ) as OpenAPI3SchemaObject["properties"];

    return node; // return by default
  });
}
