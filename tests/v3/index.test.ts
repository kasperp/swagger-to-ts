import fs from "fs";
import path from "path";
import { execSync } from "child_process";

describe("cli", () => {
  ["petstore", "manifold", "stripe"].forEach((file) => {
    it(`reads ${file} spec (v3) from file`, () => {
      if (!fs.existsSync(path.resolve(__dirname, "generated"))) {
        fs.mkdirSync(path.resolve(__dirname, "generated"));
      }
      execSync(
        `node ../../pkg/bin/cli.js specs/${file}.yaml -o generated/${file}.ts`,
        {
          cwd: path.resolve(__dirname),
        }
      );
      expect(
        fs.readFileSync(path.resolve(__dirname, `expected/${file}.ts`), "utf8")
      ).toBe(
        fs.readFileSync(path.resolve(__dirname, `generated/${file}.ts`), "utf8")
      );
    });
  });
});
