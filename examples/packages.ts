/**
 * This file was auto-generated by swagger-to-ts.
 * Do not make direct changes to the file.
 */

export type Error = {
  /**
   * The error type.
   */
  type?: string;
  /**
   * The error message.
   */
  message?: string;
};
export type PackageResponse = {
  /**
   * The `packagePath` from the request, or the latest versioned path of the package if no version was specified.
   */
  packagePath?: string;
  /**
   * The product IDs contained in the package.
   */
  products?: Product[];
  /**
   * The languages contained in the package.
   */
  languages?: Language[];
};
export type ProductResponse = {
  /**
   * The ID of the requested product.
   */
  id?: string;
  /**
   * The `packagePath` from the request, or the latest versioned path of
   * the package if no version was specified.
   */
  packagePath?: string;
  /**
   * The collection of variables. Each variable has a `type` which determines
   * the properties available on the object.
   */
  variables?: Variable[];
};
export type Variable = {
  /**
   * The variable type.
   */
  type?: "string" | "number" | "boolean" | "datetime";
  /**
   * The variable ID.
   */
  id?: string;
};
export type BooleanVariable = Variable;
export type StringVariable = Variable & {
  /**
   * A collection of strings representing the values that
   * can be assigned to the variable during configuration.
   */
  definedValues?: string[];
  /**
   * Indicates whether multiple values can be assigned to the variable
   * simultaneously during configuration.
   */
  multiValued?: boolean;
};
export type NumberVariable = Variable & {
  /**
   * Minimum value the number can be set to during configuration.
   * This property is a string to support a higher precision than
   * JavaScript allows.
   */
  minValue: string;
  /**
   * Maximum value the number can be set to during configuration.
   * This property is a string to support a higher precision than
   * JavaScript allows.
   */
  maxValue: string;
  /**
   * The number of decimal places supported.
   */
  scale: number;
};
export type DateTimeVariable = Variable & {
  /**
   * Minimum value the date can be set to during configuration.
   * Follows the ISO 8601 format.
   */
  minValue: string;
  /**
   * Maximum value the date can be set to during configuration.
   * Follows the ISO 8601 format.
   */
  maxValue: string;
};
export type Product = {
  /**
   * The product ID.
   */
  id?: string;
};
export type Language = {
  /**
   * The language ID. Typically, this is an ISO 639-1 language code,
   * though this is not enforced. For example, `EN` for English.
   */
  id?: string;
  /**
   * The language name. For example, `English`.
   */
  name?: string;
  /**
   * Indicates whether this is the default language.
   */
  default?: boolean;
  /**
   * The ID of the fallback language used when translations are missing.
   */
  fallback?: string;
};

export function isStringVariable(t: Variable): t is StringVariable {
  return t.type === "string";
}
export function isNumberVariable(t: Variable): t is NumberVariable {
  return t.type === "number";
}
export function isBooleanVariable(t: Variable): t is BooleanVariable {
  return t.type === "boolean";
}
export function isDateTimeVariable(t: Variable): t is DateTimeVariable {
  return t.type === "datetime";
}