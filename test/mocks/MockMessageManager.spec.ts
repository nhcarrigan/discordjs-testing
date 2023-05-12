import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMessageManager } from "../../src/mocks/MockMessageManager";
import { MockUser } from "../../src/mocks/MockUser";

const guild = new MockGuild({ name: "test" });
const channel = new MockChannel({
  name: "test",
  type: ChannelType.GuildText,
  guild: guild,
});
const user = new MockUser({
  username: "test",
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  bot: false,
  discriminator: 1,
  system: false,
});

suite("Mock Message Manager", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const manager = new MockMessageManager(channel);
    assert.exists(manager);
    assert.instanceOf(manager, MockMessageManager);
  });

  /**
   * Properties.
   */

  test("should have a cache property", () => {
    const manager = new MockMessageManager(channel);
    assert.exists(manager.cache);
    assert.equal(manager.cache.size, 0);
  });

  /**
   * Methods.
   */

  test("should be able to send a message", () => {
    const manager = new MockMessageManager(channel);
    manager.send("hi", user).then((msg) => {
      assert.equal(msg.content, "hi");
    });
  });

  test("should be able to fetch a message", () => {
    const manager = new MockMessageManager(channel);
    manager.send("hi", user).then((msg) => {
      manager.fetch(msg.id).then((message) => {
        assert.equal(message?.content, "hi");
      });
    });
  });

  test("should be able to fetch all messages", () => {
    const manager = new MockMessageManager(channel);
    manager.send("hi", user).then(() => {
      manager.fetch().then((messages) => {
        assert.equal(messages.size, 1);
      });
    });
  });
});
