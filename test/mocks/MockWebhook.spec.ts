import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockUser } from "../../src/mocks/MockUser";
import { MockWebhook } from "../../src/mocks/MockWebhook";

suite("Mock Webhook", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const webhook = new MockWebhook({
      user: new MockUser({
        id: "1",
        username: "test",
        avatar: "https://cdn.nhcarrigan.com/profile.png",
        bot: false,
        discriminator: 1,
        system: false,
      }),
      channel: new MockChannel({
        id: "1",
        name: "test",
        type: ChannelType.GuildText,
      }),
    });
    assert.exists(webhook);
    assert.instanceOf(webhook, MockWebhook);
  });

  /**
   * Properties.
   */

  /**
   * Methods.
   */

  test("should be able to send message", () => {
    assert.fail();
  });
});
