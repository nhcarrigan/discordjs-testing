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

  test("should have kickable property", () => {
    const member = new MockMember({
      user,
      guild,
    });
    assert.exists(member.kickable);
  });

  test("should have timeout property", () => {
    const member = new MockMember({
      user,
      guild,
    });
    assert.exists(member.timeout);
  });

  /**
   * Methods.
   */

  test("should be able to ban", () => {
    const member = new MockMember({
      user,
      guild,
    });
    member.ban("test").then((result) => assert.exists(result));
  });

  test("should be able to kick", () => {
    const member = new MockMember({
      user,
      guild,
    });
    member.kick();
  });

  test("should be able to timeout", () => {
    const member = new MockMember({
      user,
      guild,
    });
    member
      .timeout(1000)
      .then((result) => assert.equal(result.timeoutDuration, 1000));
  });
});
