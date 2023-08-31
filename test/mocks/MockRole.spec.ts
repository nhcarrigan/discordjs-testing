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
  test("should have id property", () => {
    const role = new MockRole({ name: "hi", guild });
    assert.exists(role.id);
    assert.isString(role.id);
  });

  test("should have name property", () => {
    const role = new MockRole({ name: "hi", guild });
    assert.exists(role.name);
    assert.strictEqual(role.name, "hi");
  });

  test("should have guild property", () => {
    const role = new MockRole({ name: "hi", guild });
    assert.exists(role.guild);
    assert.deepEqual(role.guild, guild);
  });

  /**
   * Methods.
   */
});
