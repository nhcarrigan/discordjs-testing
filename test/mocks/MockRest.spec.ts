import { assert } from "chai";

import { MockRest } from "../../src/mocks/MockRest";

suite("this is an example", () => {
  test("using assert", () => {
    assert.isDefined(MockRest);
  });
});
