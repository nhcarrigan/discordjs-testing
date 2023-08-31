import { assert } from "chai";

import { MockGuild } from "../../src/mocks/MockGuild";
import { MockUserManager } from "../../src/mocks/MockUserManager";

const guild = new MockGuild({ name: "test" });

suite("Mock User Manager", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const manager = new MockUserManager(guild);
    assert.exists(manager);
    assert.instanceOf(manager, MockUserManager);
  });

  /**
   * Properties.
   */

  test("should have a cache property", () => {
    const manager = new MockUserManager(guild);
    assert.exists(manager.cache);
    assert.equal(manager.cache.size, 0);
  });

  /**
   * Methods.
   */

  test("should be able to add a user", async () => {
    const manager = new MockUserManager(guild);
    await manager.add({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.equal(manager.cache.size, 1);
    assert.equal(manager.cache.first()?.username, "test");
  });

  test("should be able to fetch a user", async () => {
    const manager = new MockUserManager(guild);
    const user = await manager.add({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    const result = await manager.fetch(user.id);
    assert.deepEqual(result, user);
  });

  test("should be able to fetch all user", async () => {
    const manager = new MockUserManager(guild);
    await manager.add({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    const result = await manager.fetch();
    assert.equal(result.size, 1);
  });

  test("should get null if user does not exist", async () => {
    const manager = new MockUserManager(guild);
    const result = await manager.fetch("123");
    assert.isNull(result);
  });

  test("should be able to remove a user", () => {
    const manager = new MockUserManager(guild);
    manager.add({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    manager.remove(manager.cache.first()?.id || "");
    assert.equal(manager.cache.size, 0);
  });
});
