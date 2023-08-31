import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMember } from "../../src/mocks/MockMember";
import { MockMessage } from "../../src/mocks/MockMessage";
import { MockUser } from "../../src/mocks/MockUser";

const guild = new MockGuild({ name: "test" });
const user = new MockUser({
  username: "test",
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  bot: true,
  discriminator: 1,
  system: false,
});
const member = new MockMember({
  user,
  guild,
});

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

  const propCheck = new MockMessage({
    content: "test",
    embeds: [{ title: "hi", description: "hello" }],
    attachments: [
      {
        url: "https://cdn.nhcarrigan.com/profile.png",
        id: "1",
        filename: "profile.png",
        size: 10,
        proxy_url: "https://cdn.nhcarrigan.com/profile.png",
      },
    ],
    channel: new MockChannel({
      name: "test",
      type: ChannelType.GuildText,
      guild: guild,
    }),
    author: user,
    guild,
    member,
  });

  /**
   * Properties.
   */
  test("should have id property", () => {
    assert.exists(propCheck.id);
  });

  test("should have author property", () => {
    assert.exists(propCheck.author);
    assert.instanceOf(propCheck.author, MockUser);
    assert.deepEqual(propCheck.author, user);
  });

  test("should have channelId property", () => {
    assert.exists(propCheck.channelId);
  });

  test("should have channel property", () => {
    assert.exists(propCheck.channel);
    assert.instanceOf(propCheck.channel, MockChannel);
  });

  test("should have guildId property", () => {
    assert.exists(propCheck.guildId);
    assert.equal(propCheck.guildId, guild.id);
  });

  test("should have guild property", () => {
    assert.exists(propCheck.guild);
    assert.instanceOf(propCheck.guild, MockGuild);
    assert.deepEqual(propCheck.guild, guild);
  });

  test("should have content property", () => {
    assert.exists(propCheck.content);
    assert.equal(propCheck.content, "test");
  });

  test("should have embeds property", () => {
    assert.exists(propCheck.embeds);
    assert.isArray(propCheck.embeds);
    assert.deepEqual(propCheck.embeds, [{ title: "hi", description: "hello" }]);
  });

  test("should have attachments property", () => {
    assert.exists(propCheck.attachments);
    assert.isArray(propCheck.attachments);
    assert.deepEqual(propCheck.attachments, [
      {
        url: "https://cdn.nhcarrigan.com/profile.png",
        id: "1",
        filename: "profile.png",
        size: 10,
        proxy_url: "https://cdn.nhcarrigan.com/profile.png",
      },
    ]);
  });

  test("should have deleted property", () => {
    assert.exists(propCheck.deleted);
    assert.isFalse(propCheck.deleted);
  });

  test("should have member property", () => {
    assert.exists(propCheck.member);
    assert.instanceOf(propCheck.member, MockMember);
    assert.deepEqual(propCheck.member, member);
  });

  /**
   * Methods.
   */
  test("should be able to edit a message", async () => {
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
    await message.edit("new content");
    assert.equal(message.content, "new content");
  });

  test("should be able to edit a message with options", async () => {
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
    await message.edit({
      content: "yucky",
      embeds: [{ title: "hi", description: "hello" }],
      files: [
        {
          url: "https://cdn.nhcarrigan.com/profile.png",
          id: "1",
          filename: "profile.png",
          size: 10,
          proxy_url: "https://cdn.nhcarrigan.com/profile.png",
        },
      ],
    });
    assert.equal(message.content, "yucky");
    assert.deepEqual(message.embeds, [{ title: "hi", description: "hello" }]);
    assert.deepEqual(message.attachments, [
      {
        url: "https://cdn.nhcarrigan.com/profile.png",
        id: "1",
        filename: "profile.png",
        size: 10,
        proxy_url: "https://cdn.nhcarrigan.com/profile.png",
      },
    ]);
  });

  test("should be able to edit with no options", async () => {
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
    await message.edit({});
    assert.equal(message.content, "test");
    assert.isUndefined(message.embeds);
    assert.isUndefined(message.attachments);
  });

  test("should be able to delete a message", async () => {
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
    await message.delete();
    assert.isTrue(message.deleted);
  });

  test("should be able to reply to a message", async () => {
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
    const reply = await message.reply("reply");
    assert.equal(reply.content, "reply");
  });
});
