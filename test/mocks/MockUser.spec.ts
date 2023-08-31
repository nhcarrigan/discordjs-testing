import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockUser } from "../../src/mocks/MockUser";

const guild = new MockGuild({ name: "test" });
const channel = new MockChannel({
  name: "test",
  type: ChannelType.GuildText,
  guild: guild,
});

suite("Mock User", () => {
  test("should instantiate", () => {
    /**
     * Instantiation.
     */
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.exists(user);
    assert.instanceOf(user, MockUser);
  });

  /**
   * Properties.
   */

  test("should have id property", () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.exists(user.id);
    assert.isString(user.id);
  });

  test("should have username property", () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.exists(user.username);
    assert.equal(user.username, "test");
  });

  test("should have tag property", () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.exists(user.tag);
    assert.equal(user.tag, "test#0001");
  });

  test("should have discriminator property", () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.exists(user.discriminator);
    assert.equal(user.discriminator, "0001");
  });

  test("should have avatar property", () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.exists(user.avatar);
    assert.equal(user.avatar, "https://cdn.nhcarrigan.com/profile.png");
  });

  test("should have bot property", () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.exists(user.bot);
    assert.isFalse(user.bot);
  });

  test("should have system property", () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.exists(user.system);
    assert.isFalse(user.system);
  });

  test("should have dms property", () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.exists(user.dms);
    assert.isArray(user.dms);
    assert.lengthOf(user.dms, 0);
  });

  /**
   * Methods.
   */

  test("should be able to fetch user", async () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    const fetched = await user.fetch();
    assert.deepEqual(fetched, user);
  });

  test("should be able to display avatar URL", () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.equal(
      user.displayAvatarURL(),
      "https://cdn.nhcarrigan.com/profile.png"
    );
  });

  test("should be able to send direct message", async () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    const msg = await user.send({ content: "test", author: user, channel });
    assert.equal(msg.content, "test");
    assert.lengthOf(user.dms, 1);
  });
});
