import { assert } from "chai";
import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
} from "discord.js";

import { CommandDataHelper } from "../../src/helpers/CommandDataHelper";

const command = new SlashCommandBuilder().setName("hi").setDescription("hi");
const group = new SlashCommandSubcommandGroupBuilder()
  .setName("group")
  .setDescription("group");
const subcommand = new SlashCommandSubcommandBuilder()
  .setName("sub")
  .setDescription("sub");
const groupTwoSubs = new SlashCommandSubcommandGroupBuilder()
  .setName("group2")
  .setDescription("group2");
const subcommandTwo = new SlashCommandSubcommandBuilder()
  .setName("sub2")
  .setDescription("sub2")
  .addStringOption((option) =>
    option.setName("option").setDescription("option")
  );
const commandWithoutGroup = new SlashCommandBuilder()
  .setName("hello")
  .setDescription("hello");
const commandWithNothing = new SlashCommandBuilder()
  .setName("hi")
  .setDescription("hi");

commandWithoutGroup.addSubcommand(subcommand);
group.addSubcommand(subcommand);
groupTwoSubs.addSubcommand(subcommand);
groupTwoSubs.addSubcommand(subcommandTwo);
command.addSubcommandGroup(group);
command.addSubcommandGroup(groupTwoSubs);

suite("CommandDataHelper", () => {
  test("should instantiate", () => {
    const helper = new CommandDataHelper(command.toJSON());
    assert.exists(helper);
  });

  test("should get subcommand groups", () => {
    const helper = new CommandDataHelper(command.toJSON());
    assert.lengthOf(helper.subcommandGroups, 2);
    assert.deepEqual(helper.subcommandGroups[0], group.toJSON());
    assert.equal(helper.subcommandGroups[0].name, "group");
  });

  test("should get empty array when no subcommand groups", () => {
    const helper = new CommandDataHelper(commandWithoutGroup.toJSON());
    assert.lengthOf(helper.subcommandGroups, 0);
  });

  test("should handle broken subcommand groups", () => {
    const cmd = command.toJSON();
    // @ts-expect-error typing
    cmd.options?.forEach((o) => delete o.options);
    const helper = new CommandDataHelper(cmd);
    assert.lengthOf(helper.subcommandGroups, 2);
    assert.lengthOf(helper.subcommands, 0);
  });

  test("should get subcommands", () => {
    const helper = new CommandDataHelper(command.toJSON());
    assert.lengthOf(helper.subcommands, 2);
    assert.deepEqual(helper.subcommands[0], subcommand.toJSON());
    assert.equal(helper.subcommands[0].name, "sub");
    assert.deepEqual(helper.subcommands[1], subcommandTwo.toJSON());
    assert.equal(helper.subcommands[1].name, "sub2");
  });

  test("should get subcommands without groups", () => {
    const helper = new CommandDataHelper(commandWithoutGroup.toJSON());
    assert.lengthOf(helper.subcommands, 1);
    assert.deepEqual(helper.subcommands[0], subcommand.toJSON());
  });

  test("should get empty array when options property", () => {
    const cmd = commandWithNothing.toJSON();
    delete cmd.options;
    const helper = new CommandDataHelper(cmd);
    assert.lengthOf(helper.subcommands, 0);
    assert.lengthOf(helper.subcommandGroups, 0);
  });

  test("should get the data", () => {
    const helper = new CommandDataHelper(command.toJSON());
    const data = helper.data;
    assert.equal(data.name, "hi");
    assert.equal(data.description, "hi");
  });

  test("should get a specific subcommand group", () => {
    const helper = new CommandDataHelper(command.toJSON());
    const parsedGroup = helper.getSpecificGroup("group");
    assert.deepEqual(parsedGroup, group.toJSON());
  });

  test("should get a specific subcommand", () => {
    const helper = new CommandDataHelper(command.toJSON());
    const parsedSubcommand = helper.getSpecificSubcommand("sub");
    assert.deepEqual(parsedSubcommand, subcommand.toJSON());
  });

  test("should get all subcommands for specific group", () => {
    const helper = new CommandDataHelper(command.toJSON());
    const parsedSubcommands = helper.getSubcommandsForGroup("group2");
    assert.lengthOf(parsedSubcommands, 2);
    assert.deepEqual(parsedSubcommands[0], subcommand.toJSON());
    assert.deepEqual(parsedSubcommands[1], subcommandTwo.toJSON());
    const moreSubcommands = helper.getSubcommandsForGroup("group");
    assert.lengthOf(moreSubcommands, 1);
    assert.deepEqual(moreSubcommands[0], subcommand.toJSON());
  });

  test("should handle invalid group", () => {
    const helper = new CommandDataHelper(command.toJSON());
    const parsedSubcommands = helper.getSubcommandsForGroup("group3");
    assert.isArray(parsedSubcommands);
    assert.lengthOf(parsedSubcommands, 0);
  });

  test("should get option from a command", () => {
    const helper = new CommandDataHelper(command.toJSON());
    const option = helper.getCommandOption(0);
    assert.exists(option);
    assert.equal(option?.name, "group");
    assert.equal(option?.description, "group");
    const nullOption = helper.getCommandOption(3);
    assert.isNull(nullOption);
  });

  test("should get option from a subcommand", () => {
    const helper = new CommandDataHelper(command.toJSON());
    const option = helper.getSubcommandOption("sub2", 0);
    assert.exists(option);
    assert.equal(option?.name, "option");
    assert.equal(option?.description, "option");
    const nullOption = helper.getSubcommandOption("sub2", 1);
    assert.isNull(nullOption);
  });

  test("should handle broken options", () => {
    const helper = new CommandDataHelper(command.toJSON());
    // @ts-expect-error private access for testing
    const target = helper._subcommandGroups.find((g) => g.name === "group2");
    delete target?.options;
    const commands = helper.getSubcommandsForGroup("group2");
    assert.lengthOf(commands, 0);
  });

  test("should handle broken command", () => {
    const helper = new CommandDataHelper(command.toJSON());
    // @ts-expect-error private access for testing
    delete helper._command;
    const option = helper.getCommandOption(0);
    assert.isNull(option);
  });

  test("should handle bad option index", () => {
    const helper = new CommandDataHelper(command.toJSON());
    const option = helper.getCommandOption(100);
    assert.isNull(option);
    const helperNoSubs = new CommandDataHelper(commandWithNothing.toJSON());
    const optionNoSubs = helperNoSubs.getSubcommandOption("sub", 0);
    assert.isNull(optionNoSubs);
  });
});
