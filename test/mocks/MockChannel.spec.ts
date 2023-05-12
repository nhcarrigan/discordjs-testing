import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockUser } from "../../src/mocks/MockUser";

const guild = new MockGuild({ name: "test" });
const user = new MockUser({
  username: "test",
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  bot: false,
  discriminator: 1,
  system: false,
});

suite("Mock Channel", () => {
  /**
   * Instantiation.
   */

  test("should instantiate", () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    assert.exists(channel);
    assert.instanceOf(channel, MockChannel);
  });

  /**
   * Properties.
   */

  test("should have id property", () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    assert.exists(channel.id);
  });

  test("should have type property", () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    assert.equal(channel.type, ChannelType.GuildText);
  });

  /**
   * Methods.
   */

  test("should be able to send a message", async () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    const result = await channel.send("test", user);
    assert.equal(result.content, "test");
  });
});
