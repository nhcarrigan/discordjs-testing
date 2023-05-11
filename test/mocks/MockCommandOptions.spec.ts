import { assert } from "chai";

import { MockCommandOptions } from "../../src/mocks/MockCommandOptions";

suite("Mock Command Options", () => {
  test("should instantiate", () => {
    const options = new MockCommandOptions();
    assert.exists(options);
    assert.instanceOf(options, MockCommandOptions);
  });
});
