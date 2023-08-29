import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

import {
  AttachmentOptionParameters,
  BooleanOptionParameters,
  ChannelOptionParameters,
  IntegerOptionParameters,
  MentionableOptionParameters,
  MessageOptionParameters,
  NumberOptionParameters,
  OptionParameters,
  RoleOptionParameters,
  StringOptionParameters,
  UserOptionParameters,
} from "../interfaces/OptionParameters";

import { MockAttachment } from "./MockAttachment";
import { MockChannel } from "./MockChannel";
import { MockMessage } from "./MockMessage";
import { MockRole } from "./MockRole";
import { MockUser } from "./MockUser";

/**
 * Mocks a discord.js ApplicationCommandOption.
 *
 * @class
 */
export class MockCommandOptions {
  private _data: OptionParameters[];

  /**
   * @public
   */
  constructor() {
    this._data = [];
  }

  /**
   * @type {OptionParameters[]}
   * @package
   * @readonly
   */
  public get data(): OptionParameters[] {
    return this._data;
  }

  /**
   * Adds an option.
   *
   * @param {OptionParameters} option The option to add.
   * @package
   */
  public addOption(option: OptionParameters) {
    this._data.push(option);
  }

  /**
   * Mock for the getUser method.
   * Gets a user option.
   *
   * @param {string} name The name of the option to get.
   * @param {boolean} required Whether the option is required.
   * @returns {MockUser | undefined} The option value if found, undefined otherwise.
   * @public
   */
  public getUser(name: string, required?: boolean): MockUser | undefined {
    const result = this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.User
    ) as UserOptionParameters | undefined;
    if (!result && required) {
      throw new Error(`Could not find required user option ${name}`);
    }
    return result?.value;
  }

  /**
   * Mock for the getString method.
   * Gets a string option.
   *
   * @param {string} name The name of the option to get.
   * @param {boolean} required Whether the option is required.
   * @returns {string | undefined} The option value if found, undefined otherwise.
   * @public
   */
  public getString(name: string, required?: boolean): string | undefined {
    const result = this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.String
    ) as StringOptionParameters | undefined;
    if (!result && required) {
      throw new Error(`Could not find required string option ${name}`);
    }
    return result?.value;
  }

  /**
   * Mock for the getInteger method.
   * Gets an integer option.
   *
   * @param {string} name The name of the option to get.
   * @param {boolean} required Whether the option is required.
   * @returns {number | undefined} The option value if found, undefined otherwise.
   * @public
   */
  public getInteger(name: string, required?: boolean): number | undefined {
    const result = this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.Integer
    ) as IntegerOptionParameters | undefined;
    if (!result && required) {
      throw new Error(`Could not find required integer option ${name}`);
    }
    return result?.value;
  }

  /**
   * Mock for the getBoolean method.
   * Gets a boolean option.
   *
   * @param {string} name The name of the option to get.
   * @param {boolean} required Whether the option is required.
   * @returns {boolean | undefined} The option value if found, undefined otherwise.
   * @public
   */
  public getBoolean(name: string, required?: boolean): boolean | undefined {
    const result = this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.Boolean
    ) as BooleanOptionParameters | undefined;
    if (!result && required) {
      throw new Error(`Could not find required user option ${name}`);
    }
    return result?.value;
  }

  /**
   * Mock for the getChannel method.
   * Gets a channel option.
   *
   * @param {string} name The name of the option to get.
   * @param {boolean} required Whether the option is required.
   * @returns {MockChannel | undefined} The option value if found, undefined otherwise.
   * @public
   */
  public getChannel(name: string, required?: boolean): MockChannel | undefined {
    const result = this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.Channel
    ) as ChannelOptionParameters | undefined;
    if (!result && required) {
      throw new Error(`Could not find required channel option ${name}`);
    }
    return result?.value;
  }

  /**
   * Mock for the getRole method.
   * Gets a role option.
   *
   * @param {string} name The name of the option to get.
   * @param {boolean} required Whether the option is required.
   * @returns {MockRole | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getRole(name: string, required?: boolean): MockRole | undefined {
    const result = this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.Role
    ) as RoleOptionParameters | undefined;
    if (!result && required) {
      throw new Error(`Could not find required role option ${name}`);
    }
    return result?.value;
  }

  /**
   * Mock for the getMentionable method.
   * Gets a mentionable option.
   *
   * @param {string} name The name of the option to get.
   * @param {boolean} required Whether the option is required.
   * @returns {MockRole | MockUser | MockChannel | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getMentionable(
    name: string,
    required?: boolean
  ): MockRole | MockUser | MockChannel | undefined {
    const result = this._data.find(
      (opt) =>
        opt.name === name &&
        opt.type === ApplicationCommandOptionType.Mentionable
    ) as MentionableOptionParameters | undefined;
    if (!result && required) {
      throw new Error(`Could not find required mentionable option ${name}`);
    }
    return result?.value;
  }

  /**
   * Mock for the getNumber method.
   * Gets a number option.
   *
   * @param {string} name The name of the option to get.
   * @param {boolean} required Whether the option is required.
   * @returns {number | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getNumber(name: string, required?: boolean): number | undefined {
    const result = this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.Number
    ) as NumberOptionParameters | undefined;
    if (!result && required) {
      throw new Error(`Could not find required user option ${name}`);
    }
    return result?.value;
  }

  /**
   * Mock for the getAttachment method.
   * Gets an attachment option.
   *
   * @param {string} name The name of the option to get.
   * @param {boolean} required Whether the option is required.
   * @returns {MockAttachment | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getAttachment(
    name: string,
    required?: boolean
  ): MockAttachment | undefined {
    const result = this._data.find(
      (opt) =>
        opt.name === name &&
        opt.type === ApplicationCommandOptionType.Attachment
    ) as AttachmentOptionParameters | undefined;
    if (!result && required) {
      throw new Error(`Could not find required user option ${name}`);
    }
    return result?.value;
  }

  /**
   * Mock for the getMessage method.
   * Gets a message option.
   *
   * @param {string} name The name of the option to get.
   * @param {boolean} required Whether the option is required.
   * @returns {MockMessage | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getMessage(name: string, required?: boolean): MockMessage | undefined {
    const result = this._data.find(
      (opt) => opt.name === name && opt.type === ApplicationCommandType.Message
    ) as MessageOptionParameters | undefined;
    if (!result && required) {
      throw new Error(`Could not find required user option ${name}`);
    }
    return result?.value;
  }

  /**
   * Mock for the getSubcommand method.
   * Gets a subcommand.
   *
   * @returns {string | undefined} The subcommand name if found, undefined otherwise.
   */
  public getSubcommand(): string | undefined {
    const result = this._data.find(
      (opt) => opt.type === ApplicationCommandOptionType.Subcommand
    );
    return result?.value as string;
  }
}
