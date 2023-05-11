import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";

suite("Mock Channel", () => {
  test("should instantiate", () => {
    const channel = new MockChannel({
      id: "1",
      name: "test",
      type: ChannelType.GuildText,
    });
    assert.exists(channel);
    assert.instanceOf(channel, MockChannel);
  });

  test("should get ID", () => {
    const channel = new MockChannel({
      id: "1",
      name: "test",
      type: ChannelType.GuildText,
    });
    assert.equal(channel.id, "1");
  });
});
