import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockInteractionMessage } from "../../src/mocks/MockInteractionMessage";
import { MockUser } from "../../src/mocks/MockUser";

const guild = new MockGuild({
  name: "test",
});

suite("Mock Interaction Message", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const message = new MockInteractionMessage({
      content: "test",
      channel: new MockChannel({
        name: "test",
        type: ChannelType.GuildText,
        guild: guild,
      }),
      author: new MockUser({
        username: "test",
        avatar: "https://cdn.nhcarrigan.com/profile.png",
        bot: true,
        discriminator: 1,
        system: false,
      }),
    });
    assert.exists(message);
    assert.instanceOf(message, MockInteractionMessage);
  });

  /**
   * Properties.
   */

  test("should have ephemeral property", () => {
    const message = new MockInteractionMessage({
      content: "test",
      channel: new MockChannel({
        name: "test",
        type: ChannelType.GuildText,
        guild: guild,
      }),
      author: new MockUser({
        username: "test",
        avatar: "https://cdn.nhcarrigan.com/profile.png",
        bot: true,
        discriminator: 1,
        system: false,
      }),
    });
    assert.exists(message.ephemeral);
    assert.isFalse(message.ephemeral);
  });

  /**
   * Methods.
   */
});
