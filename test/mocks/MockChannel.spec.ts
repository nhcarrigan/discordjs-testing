import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMessageManager } from "../../src/mocks/MockMessageManager";
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

  test("should have name property", () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    assert.equal(channel.name, "test");
  });

  test("should have guild property", () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    assert.deepEqual(channel.guild, guild);
  });

  test("should have messages property", () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    assert.exists(channel.messages);
    assert.instanceOf(channel.messages, MockMessageManager);
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

  test("should be able to check if DM based", async () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.DM,
    });
    assert.isTrue(channel.isDMBased());
  });

  test("should be able to check if not DM based", async () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    assert.isFalse(channel.isDMBased());
  });

  test("should be able to test if text based", () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    assert.isTrue(channel.isTextBased());
  });

  test("should be able to test if not text based", () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildCategory,
      guild: guild,
    });
    assert.isFalse(channel.isTextBased());
  });

  test("should be able to check if thread", () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.PublicThread,
      guild: guild,
    });
    assert.isTrue(channel.isThread());
  });

  test("should be able to test if not thread", () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    assert.isFalse(channel.isThread());
  });

  test("should be able to fetch webhooks", async () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    const result = await channel.fetchWebhooks();
    assert.deepEqual(result, []);
  });

  test("should be able to create a webhook", async () => {
    const channel = new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    });
    await channel.createWebhook({ name: "test" });
    const result = await channel.fetchWebhooks();
    assert.equal(result.length, 1);
  });
});
