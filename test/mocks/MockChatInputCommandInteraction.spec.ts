import { assert } from "chai";
import { ChannelType, EmbedBuilder } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockChatInputCommandInteraction } from "../../src/mocks/MockChatInputCommandInteraction";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMember } from "../../src/mocks/MockMember";
import { MockUser } from "../../src/mocks/MockUser";

const baseInteractionOpts = {
  commandName: "test",
  guild: new MockGuild({
    id: "1",
    name: "test",
  }),
  member: new MockMember({
    id: "1",
    guild: new MockGuild({
      id: "1",
      name: "test",
    }),
    user: new MockUser({
      id: "1",
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    }),
  }),
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
  bot: new MockUser({
    id: "1",
    username: "test",
    avatar: "https://cdn.nhcarrigan.com/profile.png",
    bot: true,
    discriminator: 1,
    system: false,
  }),
};

suite("Mock Chat Input Command Interaction", () => {
  /**
   * Instantiation.
   */

  test("should instantiate", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.exists(interaction);
    assert.instanceOf(interaction, MockChatInputCommandInteraction);
  });

  /**
   * Properties.
   */

  test("should have command name property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.equal(interaction.commandName, "test");
  });

  test("should have subcommand group name property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.isNull(interaction.subcommandGroupName);
    const withSubcommandGroup = new MockChatInputCommandInteraction({
      ...baseInteractionOpts,
      subcommandGroupName: "test",
    });
    assert.equal(withSubcommandGroup.subcommandGroupName, "test");
  });

  test("should have subcommand name property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.isNull(interaction.subcommandName);
    const withSubcommand = new MockChatInputCommandInteraction({
      ...baseInteractionOpts,
      subcommandName: "test",
    });
    assert.equal(withSubcommand.subcommandName, "test");
  });

  test("should have guild property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.deepEqual(interaction.guild, baseInteractionOpts.guild);
  });

  test("should have member property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.deepEqual(interaction.member, baseInteractionOpts.member);
  });

  test("should have user property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.deepEqual(interaction.user, baseInteractionOpts.user);
  });

  test("should have ephemeral property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.isFalse(interaction.ephemeral);
  });

  test("should have deferred property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.isFalse(interaction.deferred);
  });

  /**
   * Methods.
   */

  test("should be able to defer reply", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    interaction.deferReply();
    assert.isTrue(interaction.deferred);
  });

  test("should be able to defer reply as ephemeral", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    interaction.deferReply({ ephemeral: true });
    assert.isTrue(interaction.deferred);
    assert.isTrue(interaction.ephemeral);
  });

  test("should not be able to defer twice", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    interaction.deferReply();
    assert.throws(interaction.deferReply);
  });

  test("should be able to reply with string", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    interaction.reply("test");
    const reply = interaction.replies[0];
    assert.equal(reply.content, "test");
  });

  test("should be able to reply with options object", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    interaction.reply({
      content: "test",
      ephemeral: true,
      embeds: [new EmbedBuilder().setTitle("hi").setDescription("hi")],
    });
    const reply = interaction.replies[0];
    assert.equal(reply.content, "test");
    assert.isTrue(reply.ephemeral);
    assert.equal(reply.embeds?.length, 1);
  });

  test("should not be able to reply after deferred", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    interaction.deferReply();
    assert.throws(() => interaction.reply("test"));
  });

  test("should not be able to reply twice", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    interaction.reply("test");
    assert.throws(() => interaction.reply("test"));
  });

  test("should be able to edit reply", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    interaction.reply("test");
    interaction.editReply("test2");
    assert.equal(interaction.replies[0].content, "test2");
  });

  test("should not be able to edit reply before replying", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.throws(() => interaction.editReply("test"));
  });

  test("should be able to get options by type", () => {
    assert.fail();
  });
});
