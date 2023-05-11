import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockMessage } from "../../src/mocks/MockMessage";
import { MockUser } from "../../src/mocks/MockUser";

suite("Mock Message", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const message = new MockMessage({
      id: "1",
      content: "test",
      channel: new MockChannel({
        id: "1",
        name: "test",
        type: ChannelType.GuildText,
      }),
      author: new MockUser({
        id: "1",
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
