import { swaggerVersion } from "../../src/utils";

describe("swaggerVersion", () => {
  it("v3", () => {
    expect(swaggerVersion({ openapi: "3.0.1" } as any)).toBe(3);
  });
  it("errs", () => {
    expect(() => swaggerVersion({} as any)).toThrow();
  });
});
