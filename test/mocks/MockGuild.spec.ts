import { assert } from "chai";

import { MockChannelManager } from "../../src/mocks/MockChannelManager";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMember } from "../../src/mocks/MockMember";
import { MockMemberManager } from "../../src/mocks/MockMemberManager";
import { MockRoleManager } from "../../src/mocks/MockRoleManager";
import { MockUser } from "../../src/mocks/MockUser";

suite("Mock Guild", () => {
  /**
   * Instantiation.
   */

  test("should instantiate", () => {
    const guild = new MockGuild({
      name: "test",
    });
    assert.exists(guild);
    assert.instanceOf(guild, MockGuild);
  });

  /**
   * Properties.
   */

  test("should have id property", () => {
    const guild = new MockGuild({
      name: "test",
    });
    assert.exists(guild.id);
  });

  test("should have name property", () => {
    const guild = new MockGuild({
      name: "test",
    });
    assert.exists(guild.name);
    assert.equal(guild.name, "test");
  });

  test("should have members property", () => {
    const guild = new MockGuild({
      name: "test",
    });
    assert.exists(guild.members);
    assert.instanceOf(guild.members, MockMemberManager);
  });

  test("should have channels property", () => {
    const guild = new MockGuild({
      name: "test",
    });
    assert.exists(guild.channels);
    assert.instanceOf(guild.channels, MockChannelManager);
  });

  test("should have roles property", () => {
    const guild = new MockGuild({
      name: "test",
    });
    assert.exists(guild.roles);
    assert.instanceOf(guild.roles, MockRoleManager);
  });

  /**
   * Methods.
   */
  test("should be able to fetch guild", async () => {
    const guild = new MockGuild({
      name: "test",
    });
    const target = await guild.fetch();
    assert.exists(target);
    assert.deepEqual(target, guild);
  });

  test("should be able to add a ban to the guild", async () => {
    const guild = new MockGuild({
      name: "test",
    });
    const user = new MockUser({
      username: "test",
      discriminator: 1,
      avatar: "no",
      bot: false,
      system: false,
    });
    const member = new MockMember({
      guild,
      user,
    });
    const result = await guild.ban({
      guild,
      member,
      reason: "test",
    });
    assert.exists(result);
    assert.deepEqual(result.user, user);
    assert.equal(result.reason, "test");
  });
});
