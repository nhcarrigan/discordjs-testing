import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";

suite("Mock Channel", () => {
  /**
   * Instantiation.
   */

  test("should instantiate", () => {
    const channel = new MockChannel({
      id: "1",
      name: "test",
      type: ChannelType.GuildText,
    });
    assert.exists(channel);
    assert.instanceOf(channel, MockChannel);
  });

  /**
   * Properties.
   */

  test("should have id property", () => {
    const channel = new MockChannel({
      id: "1",
      name: "test",
      type: ChannelType.GuildText,
    });
    assert.equal(channel.id, "1");
  });

  test("should have type property", () => {
    assert.fail();
  });

  /**
   * Methods.
   */

  test("should be able to send a message", () => {
    assert.fail();
  });
});
