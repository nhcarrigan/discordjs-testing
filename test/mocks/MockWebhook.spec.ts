import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockUser } from "../../src/mocks/MockUser";
import { MockWebhook } from "../../src/mocks/MockWebhook";

const guild = new MockGuild({ name: "test" });

suite("Mock Webhook", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const webhook = new MockWebhook({
      user: new MockUser({
        username: "test",
        avatar: "https://cdn.nhcarrigan.com/profile.png",
        bot: false,
        discriminator: 1,
        system: false,
      }),
      channel: new MockChannel({
        name: "test",
        type: ChannelType.GuildText,
        guild: guild,
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

  test("should be able to send message", async () => {
    const webhook = new MockWebhook({
      user: new MockUser({
        username: "test",
        avatar: "https://cdn.nhcarrigan.com/profile.png",
        bot: false,
        discriminator: 1,
        system: false,
      }),
      channel: new MockChannel({
        name: "test",
        type: ChannelType.GuildText,
        guild: guild,
      }),
    });

    const msg = await webhook.send({ content: "test" });
    assert.equal(msg.content, "test");
  });
});
