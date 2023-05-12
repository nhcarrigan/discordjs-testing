import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannelManager } from "../../src/mocks/MockChannelManager";
import { MockGuild } from "../../src/mocks/MockGuild";

const guild = new MockGuild({ name: "test" });

suite("Mock Channel Manager", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const channels = new MockChannelManager(guild);
    assert.exists(channels);
    assert.instanceOf(channels, MockChannelManager);
  });

  /**
   * Properties.
   */

  test("should have a cache property", () => {
    const channels = new MockChannelManager(guild);
    assert.exists(channels.cache);
    assert.equal(channels.cache.size, 0);
  });

  /**
   * Methods.
   */

  test("should be able to fetch channels", () => {
    const channels = new MockChannelManager(guild);
    channels.fetch().then((result) => assert.exists(result));
  });

  test("should be able to create a channel", () => {
    const channels = new MockChannelManager(guild);
    channels.create({
      name: "test",
      type: ChannelType.GuildText,
    });
    assert.equal(channels.cache.size, 1);
  });

  test("should be able to remove a channel", () => {
    const channels = new MockChannelManager(guild);
    channels
      .create({
        name: "test",
        type: ChannelType.GuildText,
      })
      .then((channel) => {
        channels.delete(channel.id);
        assert.equal(channels.cache.size, 0);
      });
  });
});
