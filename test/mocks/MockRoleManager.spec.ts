import { assert } from "chai";

import { MockGuild } from "../../src/mocks/MockGuild";
import { MockRoleManager } from "../../src/mocks/MockRoleManager";

const guild = new MockGuild({ name: "test" });

suite("Mock Role Manager", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const manager = new MockRoleManager(guild);
    assert.exists(manager);
    assert.instanceOf(manager, MockRoleManager);
  });

  /**
   * Properties.
   */

  test("should have a cache property", () => {
    const manager = new MockRoleManager(guild);
    assert.exists(manager.cache);
    assert.equal(manager.cache.size, 0);
  });

  /**
   * Methods.
   */

  test("should be able to add a role", () => {
    const manager = new MockRoleManager(guild);
    manager.create({ name: "test" });
    assert.equal(manager.cache.size, 1);
  });

  test("should be able to fetch a role", () => {
    const manager = new MockRoleManager(guild);
    manager.create({ name: "test" });
    manager.fetch("test").then((result) => assert.equal(result?.name, "test"));
  });

  test("should be able to fetch all roles", () => {
    const manager = new MockRoleManager(guild);
    manager.create({ name: "test" });
    manager.fetch().then((result) => assert.equal(result.size, 1));
  });
});
