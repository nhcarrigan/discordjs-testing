import { assert } from "chai";

import { MockGuild } from "../../src/mocks/MockGuild";
import { MockRole } from "../../src/mocks/MockRole";

const guild = new MockGuild({ name: "test" });

suite("Mock Role", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const role = new MockRole({ name: "hi", guild });
    assert.exists(role);
    assert.instanceOf(role, MockRole);
  });

  /**
   * Properties.
   */

  /**
   * Methods.
   */
});
