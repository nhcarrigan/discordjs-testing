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

  test("should be able to send a message", async () => {
    const manager = new MockMessageManager(channel);
    await manager.send("hi", user);
    assert.equal(manager.cache.size, 1);
    assert.equal(manager.cache.first()?.content, "hi");
  });

  test("should be able to fetch a message", async () => {
    const manager = new MockMessageManager(channel);
    const result = await manager.send("hi", user);
    const message = await manager.fetch(result.id);
    assert.equal(message?.content, "hi");
  });

  test("should be able to fetch all messages", async () => {
    const manager = new MockMessageManager(channel);
    await manager.send("hi", user);
    await manager.send("hello", user);
    const result = await manager.fetch();
    assert.equal(result.size, 2);
  });
});
