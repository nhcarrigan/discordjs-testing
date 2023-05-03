import { readFileSync, readdirSync } from "fs";
import { join } from "path";

import { assert } from "chai";

suite("All expected modules should be exported", () => {
  const fileContent = readFileSync(
    join(process.cwd(), "src", "index.ts"),
    "utf-8"
  );
  test("Helper modules", () => {
    const helpers = readdirSync(join(process.cwd(), "src", "helpers"));
    for (const helper of helpers) {
      const fileName = helper.replace(".ts", "");
      assert.include(
        fileContent.toString(),
        `import { ${fileName} } from "./helpers/${fileName}";`,
        `Missing import for ${helper} module.`
      );
      assert.lengthOf(
        fileContent.match(new RegExp(fileName, "g")) || [],
        3,
        `Missing export for ${helper} module.`
      );
    }
  });
  test("Mock modules", () => {
    const mocks = readdirSync(join(process.cwd(), "src", "mocks"));
    for (const mock of mocks) {
      const fileName = mock.replace(".ts", "");
      assert.include(
        fileContent.toString(),
        `import { ${fileName} } from "./mocks/${fileName}";`,
        `Missing import for ${mock} module.`
      );
      assert.lengthOf(
        fileContent.match(new RegExp(fileName, "g")) || [],
        3,
        `Missing export for ${mock} module.`
      );
    }
  });
});
