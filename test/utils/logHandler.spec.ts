import { assert } from "chai";

import { logHandler } from "../../src/utils/logHandler";

suite("this is an example", () => {
  test("using assert", () => {
    assert.isDefined(logHandler);
  });
});
