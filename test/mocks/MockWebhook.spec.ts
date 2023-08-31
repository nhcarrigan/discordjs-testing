import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMessageManager } from "../../src/mocks/MockMessageManager";
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

  test("should have messages property", () => {
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
    assert.exists(webhook.messages);
    assert.instanceOf(webhook.messages, MockMessageManager);
  });

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

    const msg = await webhook.send({
      content: "test",
    });
    assert.equal(msg.content, "test");
    assert.equal(msg.author.username, "test");
    assert.equal(msg.author.avatar, "https://cdn.nhcarrigan.com/profile.png");
  });

  test("should be able to send message with options", async () => {
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

    const msg = await webhook.send({
      content: "test",
      username: "Hi",
      avatarURL: "hello",
    });
    assert.equal(msg.content, "test");
    assert.equal(msg.author.username, "Hi");
    assert.equal(msg.author.avatar, "hello");
  });

  test("should be able to typecast", () => {
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
    const cast = webhook.typeCast();
    assert.deepEqual(cast as never, webhook as never);
  });
});
