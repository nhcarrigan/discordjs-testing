import { assert } from "chai";

import { MockGuild } from "../../src/mocks/MockGuild";

suite("Mock Guild", () => {
  test("should instantiate", () => {
    /**
     * Instantiation.
     */

    const guild = new MockGuild({
      id: "1",
      name: "test",
    });
    assert.exists(guild);
    assert.instanceOf(guild, MockGuild);
  });

  /**
   * Properties.
   */

  test("should have members property", () => {
    assert.fail();
  });

  test("should have channels property", () => {
    assert.fail();
  });

  test("should have roles property", () => {
    assert.fail();
  });

  /**
   * Methods.
   */

  test("should be able to create a channel", () => {
    assert.fail();
  });
});
