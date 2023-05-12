import { assert } from "chai";

import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMember } from "../../src/mocks/MockMember";
import { MockMemberManager } from "../../src/mocks/MockMemberManager";
import { MockUser } from "../../src/mocks/MockUser";

const guild = new MockGuild({ name: "test" });
const user = new MockUser({
  username: "test",
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  bot: false,
  discriminator: 1,
  system: false,
});

suite("Mock Member Manager", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const manager = new MockMemberManager(guild);
    assert.exists(manager);
    assert.instanceOf(manager, MockMemberManager);
  });

  /**
   * Properties.
   */

  test("should have a cache property", () => {
    const manager = new MockMemberManager(guild);
    assert.exists(manager.cache);
    assert.equal(manager.cache.size, 0);
  });

  /**
   * Methods.
   */

  test("should be able to add a member", () => {
    const manager = new MockMemberManager(guild);
    manager.add(user);
    assert.equal(manager.cache.size, 1);
  });

  test("should be able to fetch a member", async () => {
    const manager = new MockMemberManager(guild);
    const member = new MockMember({ user, guild });
    manager.add(user);
    const result = await manager.fetch(user.id);
    assert.deepEqual(result, member);
  });

  test("should be able to fetch all members", async () => {
    const manager = new MockMemberManager(guild);
    manager.add(user);
    const result = await manager.fetch();
    assert.equal(result.size, 1);
  });
});
