import { assert } from "chai";

import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMember } from "../../src/mocks/MockMember";
import { MockRoleManager } from "../../src/mocks/MockRoleManager";
import { MockUser } from "../../src/mocks/MockUser";

const user = new MockUser({
  username: "test",
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  bot: false,
  discriminator: 1,
  system: false,
});
const guild = new MockGuild({
  name: "test",
});

suite("Mock Member", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const member = new MockMember({
      user,
      guild,
    });
    assert.exists(member);
    assert.instanceOf(member, MockMember);
  });

  /**
   * Properties.
   */

  test("should have id property", () => {
    const member = new MockMember({
      user,
      guild,
    });
    assert.exists(member.id);
    assert.equal(member.id, user.id);
  });

  test("should have guild property", () => {
    const member = new MockMember({
      user,
      guild,
    });
    assert.exists(member.guild);
    assert.deepEqual(member.guild, guild);
  });

  test("should have roles property", () => {
    const member = new MockMember({
      user,
      guild,
    });
    assert.exists(member.roles);
    assert.instanceOf(member.roles, MockRoleManager);
  });

  test("should have permissions property", () => {
    const member = new MockMember({
      user,
      guild,
    });
    assert.exists(member.permissions);
    assert.instanceOf(member.roles, MockRoleManager);
  });

  test("should have bannable property", () => {
    const member = new MockMember({
      user,
      guild,
    });
    assert.exists(member.bannable);
  });

  test("should be able to set bannable", () => {
    const member = new MockMember({
      user,
      guild,
    });
    member.bannable = true;
    assert.isTrue(member.bannable);
  });

  test("should have kickable property", () => {
    const member = new MockMember({
      user,
      guild,
    });
    assert.exists(member.kickable);
  });

  test("should be able to set kickable", () => {
    const member = new MockMember({
      user,
      guild,
    });
    member.kickable = true;
    assert.isTrue(member.kickable);
  });

  test("should have timeoutDuration property", () => {
    const member = new MockMember({
      user,
      guild,
    });
    assert.exists(member.timeoutDuration);
  });

  /**
   * Methods.
   */

  test("should be able to ban", async () => {
    const member = new MockMember({
      user,
      guild,
    });
    const result = await member.ban("test");
    assert.exists(result);
  });

  test("should be able to kick", async () => {
    const member = new MockMember({
      user,
      guild,
    });
    const result = await member.kick();
    assert.exists(result);
  });

  test("should be able to timeout", async () => {
    const member = new MockMember({
      user,
      guild,
    });
    const result = await member.timeout(1000);
    assert.equal(result.timeoutDuration, 1000);
  });
});
