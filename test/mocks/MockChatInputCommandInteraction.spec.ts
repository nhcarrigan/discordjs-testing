import { assert } from "chai";
import { ChannelType, EmbedBuilder, ModalBuilder } from "discord.js";

import { ChatInputCommandInteractionParameters } from "../../src/interfaces/ChatInputCommandInteractionParameters";
import { MockChannel } from "../../src/mocks/MockChannel";
import { MockChatInputCommandInteraction } from "../../src/mocks/MockChatInputCommandInteraction";
import { MockCommandOptions } from "../../src/mocks/MockCommandOptions";
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

const baseInteractionOpts: ChatInputCommandInteractionParameters = {
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

  test("should instantiate with options", () => {
    const interaction = new MockChatInputCommandInteraction({
      ...baseInteractionOpts,
      options: [
        {
          name: "test",
          value: "test",
          type: 3,
        },
      ],
    });
    assert.exists(interaction);
    assert.instanceOf(interaction, MockChatInputCommandInteraction);
    assert.instanceOf(interaction.options, MockCommandOptions);
  });

  test("should default to null guild", () => {
    const withoutGuild = { ...baseInteractionOpts };
    delete withoutGuild.guild;
    const interaction = new MockChatInputCommandInteraction(withoutGuild);
    assert.isNull(interaction.guild);
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

  test("should have replies property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.exists(interaction.replies);
    assert.equal(interaction.replies.length, 0);
  });

  test("should have options property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.exists(interaction.options);
  });

  test("should have modal property", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    assert.property(interaction, "modal");
    assert.isNull(interaction.modal);
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

  test("should be able to show modal", async () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    const modal = new ModalBuilder();
    await interaction.showModal(modal);
    assert.deepEqual(interaction.modal, modal);
  });

  test("should not be able to show modal after deferred", async () => {
    let errMessage = "";
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    await interaction.deferReply();
    const modal = new ModalBuilder();
    await interaction
      .showModal(modal)
      .catch((err) => (errMessage = err.message));
    assert.equal(errMessage, "Interaction already deferred or replied.");
  });

  test("should not be able to show modal after reply", async () => {
    let errMessage = "";
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    await interaction.reply("hi");
    const modal = new ModalBuilder();
    await interaction
      .showModal(modal)
      .catch((err) => (errMessage = err.message));
    assert.equal(errMessage, "Interaction already deferred or replied.");
  });

  test("should not be able to show modal twice", async () => {
    let errMessage = "";
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    const modal = new ModalBuilder();
    await interaction.showModal(modal);
    await interaction
      .showModal(modal)
      .catch((err) => (errMessage = err.message));
    assert.equal(errMessage, "Interaction already deferred or replied.");
  });

  test("should be able to typecast", () => {
    const interaction = new MockChatInputCommandInteraction(
      baseInteractionOpts
    );
    const cast = interaction.typeCast();
    assert.exists(cast);
  });
});
