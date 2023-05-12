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

  test("should be able to fetch a role", async () => {
    const manager = new MockRoleManager(guild);
    const role = manager.create({ name: "test" });
    const result = await manager.fetch(role.id);
    assert.equal(result?.name, "test");
  });

  test("should be able to fetch all roles", async () => {
    const manager = new MockRoleManager(guild);
    manager.create({ name: "test" });
    manager.create({ name: "test2" });
    const result = await manager.fetch();
    assert.equal(result.size, 2);
  });
});
