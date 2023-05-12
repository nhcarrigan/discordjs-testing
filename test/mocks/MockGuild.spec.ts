import { assert } from "chai";

import { MockChannelManager } from "../../src/mocks/MockChannelManager";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMemberManager } from "../../src/mocks/MockMemberManager";
import { MockRoleManager } from "../../src/mocks/MockRoleManager";

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
});
