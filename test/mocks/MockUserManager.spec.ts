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

  test("should be able to fetch a user", () => {
    const manager = new MockUserManager(guild);
    manager
      .add({
        username: "test",
        avatar: "https://cdn.nhcarrigan.com/profile.png",
        bot: false,
        discriminator: 1,
        system: false,
      })
      .then((user) => {
        manager.fetch(user.id).then((result) => assert.deepEqual(result, user));
      });
  });

  test("should be able to fetch all user", () => {
    const manager = new MockUserManager(guild);
    manager
      .add({
        username: "test",
        avatar: "https://cdn.nhcarrigan.com/profile.png",
        bot: false,
        discriminator: 1,
        system: false,
      })
      .then(() => {
        manager.fetch().then((result) => assert.equal(result.size, 1));
      });
  });
});
