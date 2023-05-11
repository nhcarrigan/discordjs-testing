import { assert } from "chai";

import { MockRole } from "../../src/mocks/MockRole";

suite("Mock Role", () => {
  test("should instantiate", () => {
    const role = new MockRole();
    assert.exists(role);
    assert.instanceOf(role, MockRole);
  });
});
