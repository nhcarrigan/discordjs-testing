import { assert } from "chai";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChannelType,
} from "discord.js";

import { MockAttachment } from "../../src/mocks/MockAttachment";
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

  test("should return undefined on missing optional string option", () => {
    const options = new MockCommandOptions();
    const target = options.getString("test");
    assert.isUndefined(target);
  });

  test("should throw on missing required string option", () => {
    const options = new MockCommandOptions();
    let errorMessage = "";
    try {
      options.getString("test", true);
    } catch (error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, "Could not find required string option test");
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

  test("should return undefined on missing optional boolean option", () => {
    const options = new MockCommandOptions();
    const target = options.getBoolean("test");
    assert.isUndefined(target);
  });

  test("should throw on missing required boolean option", () => {
    const options = new MockCommandOptions();
    let errorMessage = "";
    try {
      options.getBoolean("test", true);
    } catch (error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, "Could not find required boolean option test");
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

  test("should return undefined on missing optional number option", () => {
    const options = new MockCommandOptions();
    const target = options.getNumber("test");
    assert.isUndefined(target);
  });

  test("should throw on missing required number option", () => {
    const options = new MockCommandOptions();
    let errorMessage = "";
    try {
      options.getNumber("test", true);
    } catch (error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, "Could not find required number option test");
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

  test("should return undefined on missing optional user option", () => {
    const options = new MockCommandOptions();
    const target = options.getUser("test");
    assert.isUndefined(target);
  });

  test("should throw on missing required user option", () => {
    const options = new MockCommandOptions();
    let errorMessage = "";
    try {
      options.getUser("test", true);
    } catch (error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, "Could not find required user option test");
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

  test("should return undefined on missing optional channel option", () => {
    const options = new MockCommandOptions();
    const target = options.getChannel("test");
    assert.isUndefined(target);
  });

  test("should throw on missing required channel option", () => {
    const options = new MockCommandOptions();
    let errorMessage = "";
    try {
      options.getChannel("test", true);
    } catch (error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, "Could not find required channel option test");
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

  test("should return undefined on missing optional role option", () => {
    const options = new MockCommandOptions();
    const target = options.getRole("test");
    assert.isUndefined(target);
  });

  test("should throw on missing required role option", () => {
    const options = new MockCommandOptions();
    let errorMessage = "";
    try {
      options.getRole("test", true);
    } catch (error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, "Could not find required role option test");
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

  test("should return undefined on missing optional mentionable option", () => {
    const options = new MockCommandOptions();
    const target = options.getMentionable("test");
    assert.isUndefined(target);
  });

  test("should throw on missing required mentionable option", () => {
    const options = new MockCommandOptions();
    let errorMessage = "";
    try {
      options.getMentionable("test", true);
    } catch (error) {
      errorMessage = error.message;
    }
    assert.equal(
      errorMessage,
      "Could not find required mentionable option test"
    );
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

  test("should return undefined on missing optional integer option", () => {
    const options = new MockCommandOptions();
    const target = options.getInteger("test");
    assert.isUndefined(target);
  });

  test("should throw on missing required integer option", () => {
    const options = new MockCommandOptions();
    let errorMessage = "";
    try {
      options.getInteger("test", true);
    } catch (error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, "Could not find required integer option test");
  });

  test("should be able to get attachment options", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: new MockAttachment({
        name: "test",
        description: "test",
      }),
      type: ApplicationCommandOptionType.Attachment,
    });
    const target = options.getAttachment("test");
    assert.equal(target?.name, "test");
  });

  test("should return undefined on missing optional attachment option", () => {
    const options = new MockCommandOptions();
    const target = options.getAttachment("test");
    assert.isUndefined(target);
  });

  test("should throw on missing required attachment option", () => {
    const options = new MockCommandOptions();
    let errorMessage = "";
    try {
      options.getAttachment("test", true);
    } catch (error) {
      errorMessage = error.message;
    }
    assert.equal(
      errorMessage,
      "Could not find required attachment option test"
    );
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

  test("should return undefined on missing optional message option", () => {
    const options = new MockCommandOptions();
    const target = options.getMessage("test");
    assert.isUndefined(target);
  });

  test("should throw on missing required message option", () => {
    const options = new MockCommandOptions();
    let errorMessage = "";
    try {
      options.getMessage("test", true);
    } catch (error) {
      errorMessage = error.message;
    }
    assert.equal(errorMessage, "Could not find required message option test");
  });

  test("should be able to get subcommand through options", () => {
    const options = new MockCommandOptions();
    options.addOption({
      name: "test",
      value: "test",
      type: ApplicationCommandOptionType.Subcommand,
    });
    const target = options.getSubcommand();
    assert.equal(target, "test");
  });

  test("should return undefined on missing subcommand", () => {
    const options = new MockCommandOptions();
    const target = options.getSubcommand();
    assert.isUndefined(target);
  });
});
