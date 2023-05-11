import { assert } from "chai";

import { MockBan } from "../../src/mocks/MockBan";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockUser } from "../../src/mocks/MockUser";

const guild = new MockGuild({ id: "1", name: "test" });
const user = new MockUser({
  id: "1",
  username: "test",
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  bot: false,
  discriminator: 1,
  system: false,
});

suite("Mock Ban", () => {
  /**
   * Instantiation.
   */

  test("should instantiate", () => {
    const ban = new MockBan({ guild, user, reason: "stimky" });
    assert.exists(ban);
    assert.instanceOf(ban, MockBan);
  });

  /**
   * Properties.
   */

  test("should have guild property", () => {
    const ban = new MockBan({ guild, user, reason: "stimky" });
    assert.deepEqual(ban.guild, guild);
  });

  test("should have user property", () => {
    const ban = new MockBan({ guild, user, reason: "stimky" });
    assert.deepEqual(ban.user, user);
  });

  test("should have reason property", () => {
    const ban = new MockBan({ guild, user, reason: "stimky" });
    assert.equal(ban.reason, "stimky");
  });

  /**
   * Methods.
   */
});
