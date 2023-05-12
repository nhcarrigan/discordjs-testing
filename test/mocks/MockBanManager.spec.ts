import { assert } from "chai";

import { MockBanManager } from "../../src/mocks/MockBanManager";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMember } from "../../src/mocks/MockMember";
import { MockUser } from "../../src/mocks/MockUser";

const guild = new MockGuild({ name: "test" });
const user = new MockUser({
  username: "test",
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  bot: false,
  discriminator: 1,
  system: false,
});
const member = new MockMember({
  user,
  guild,
});

suite("Mock Ban Manager", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const bans = new MockBanManager(guild);
    assert.exists(bans);
    assert.instanceOf(bans, MockBanManager);
  });

  /**
   * Properties.
   */

  test("should have a cache property", () => {
    const bans = new MockBanManager(guild);
    assert.exists(bans.cache);
    assert.equal(bans.cache.size, 0);
  });

  /**
   * Methods.
   */

  test("should be able to fetch bans", () => {
    const bans = new MockBanManager(guild);
    bans.fetch().then((result) => assert.exists(result));
  });

  test("should be able to create a ban", () => {
    const bans = new MockBanManager(guild);
    bans.create(member, { reason: "stimky" });
    assert.equal(bans.cache.size, 1);
  });

  test("should be able to remove a ban", () => {
    const bans = new MockBanManager(guild);
    bans.create(member, { reason: "stimky" });
    bans.remove(member);
    assert.equal(bans.cache.size, 0);
  });
});
