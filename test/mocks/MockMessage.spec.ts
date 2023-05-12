import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMessage } from "../../src/mocks/MockMessage";
import { MockUser } from "../../src/mocks/MockUser";

const guild = new MockGuild({ name: "test" });

suite("Mock Message", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const message = new MockMessage({
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
    assert.instanceOf(message, MockMessage);
  });

  /**
   * Properties.
   */

  /**
   * Methods.
   */
});
