import { assert } from "chai";
import { ChannelType, EmbedBuilder } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockChatInputCommandInteraction } from "../../src/mocks/MockChatInputCommandInteraction";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMember } from "../../src/mocks/MockMember";
import { MockUser } from "../../src/mocks/MockUser";

const guild = new MockGuild({
  name: "test",
});
const user = new MockUser({
  username: "test",
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  bot: false,
  discriminator: 1,
  system: false,
});
const member = new MockMember({
  guild,
  user,
});
const channel = new MockChannel({
  name: "test",
  type: ChannelType.GuildText,
  guild: guild,
});

const baseInteractionOpts = {
  commandName: "test",
  guild,
  member,
  user,
  channel,
  bot: new MockUser({
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

  test("should have options property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.exists(interaction.options);
  });

  /**
   * Methods.
   */

  test("should be able to defer reply", async () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    await interaction.deferReply();
    assert.isTrue(interaction.deferred);
  });

  test("should be able to defer reply as ephemeral", async () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    await interaction.deferReply({ ephemeral: true });
    assert.isTrue(interaction.deferred);
    assert.isTrue(interaction.ephemeral);
  });

  test("should not be able to defer twice", async () => {
    let errorMsg = "";
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    await interaction.deferReply();
    await interaction.deferReply().catch((err) => {
      errorMsg = err.message;
    });
    assert.equal(errorMsg, "Interaction already deferred.");
  });

  test("should be able to reply with string", async () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    await interaction.reply("test");
    const reply = interaction.replies[0];
    assert.equal(reply.content, "test");
  });

  test("should be able to reply with options object", async () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    await interaction.reply({
      content: "test",
      ephemeral: true,
      embeds: [new EmbedBuilder().setTitle("hi").setDescription("hi")],
    });
    const reply = interaction.replies[0];
    assert.equal(reply.content, "test");
    assert.isTrue(reply.ephemeral);
    assert.equal(reply.embeds?.length, 1);
  });

  test("should not be able to reply after deferred", async () => {
    let errMessage = "";
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    await interaction.deferReply();
    await interaction.reply("hi").catch((err) => (errMessage = err.message));
    assert.equal(errMessage, "Interaction already deferred or replied.");
  });

  test("should not be able to reply twice", async () => {
    let errMessage = "";
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    await interaction.reply("test");
    await interaction.reply("hi").catch((err) => (errMessage = err.message));
    assert.equal(errMessage, "Interaction already deferred or replied.");
  });

  test("should be able to edit reply", async () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    await interaction.reply("test");
    await interaction.editReply("test2");
    assert.equal(interaction.replies[0].content, "test2");
  });

  test("should not be able to edit reply before replying", async () => {
    let errMessage = "";
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    await interaction
      .editReply("test")
      .catch((err) => (errMessage = err.message));
    assert.equal(errMessage, "Interaction has not been deferred or replied.");
  });
});
