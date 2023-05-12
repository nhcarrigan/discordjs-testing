import { assert } from "chai";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChannelType,
} from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockCommandOptions } from "../../src/mocks/MockCommandOptions";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMessage } from "../../src/mocks/MockMessage";
import { MockRole } from "../../src/mocks/MockRole";
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
const channel = new MockChannel({
  name: "test",
  type: ChannelType.GuildText,
  guild: guild,
});
const role = new MockRole({
  name: "test",
  guild,
});
const message = new MockMessage({
  content: "test",
  channel: channel,
  author: user,
});

suite("Mock Command Options", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const options = new MockCommandOptions();
    assert.exists(options);
    assert.instanceOf(options, MockCommandOptions);
  });

  /**
   * Properties.
   */

  test("should have data property", () => {
    const options = new MockCommandOptions();
    assert.exists(options.data);
    assert.deepEqual(options.data, []);
  });

  /**
   * Methods.
   */

  test("should be able to add an option", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: "test",
      type: ApplicationCommandOptionType.String,
    });
    assert.lengthOf(options.data, 1);
  });

  test("should be able to get string options", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: "testVal",
      type: ApplicationCommandOptionType.String,
    });
    const target = options.getString("test");
    assert.equal(target, "testVal");
  });

  test("should be able to get boolean options", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: true,
      type: ApplicationCommandOptionType.Boolean,
    });
    const target = options.getBoolean("test");
    assert.isTrue(target);
  });

  test("should be able to get number options", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: -10,
      type: ApplicationCommandOptionType.Number,
    });
    const target = options.getNumber("test");
    assert.strictEqual(target, -10);
  });

  test("should be able to get user options", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: user,
      type: ApplicationCommandOptionType.User,
    });
    const target = options.getUser("test");
    assert.deepEqual(target, user);
  });

  test("should be able to get channel options", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: channel,
      type: ApplicationCommandOptionType.Channel,
    });
    const target = options.getChannel("test");
    assert.deepEqual(target, channel);
  });

  test("should be able to get role options", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: role,
      type: ApplicationCommandOptionType.Role,
    });
    const target = options.getRole("test");
    assert.deepEqual(target, role);
  });

  test("should be able to get mentionable options", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: user,
      type: ApplicationCommandOptionType.Mentionable,
    });
    const target = options.getMentionable("test");
    assert.deepEqual(target, user);
  });

  test("should be able to get integer options", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: 10,
      type: ApplicationCommandOptionType.Integer,
    });
    const target = options.getInteger("test");
    assert.strictEqual(target, 10);
  });

  // this is for context commands
  test("should be able to get message options", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: message,
      type: ApplicationCommandType.Message,
    });
    const target = options.getMessage("test");
    assert.deepEqual(target, message);
  });
});
