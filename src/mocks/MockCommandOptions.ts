import { ApplicationCommandOptionType } from "discord.js";

import { OptionParameters } from "../interfaces/OptionParameters";

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
   * Adds an option.
   *
   * @param {OptionParameters} option The option to add.
   * @public
   */
  public addOption(option: OptionParameters) {
    this._data.push(option);
  }

  /**
   * Mock for the getUser method.
   * Gets a user option.
   *
   * @param {string} name The name of the option to get.
   * @returns {OptionParameters | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getUser(name: string) {
    return this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.User
    );
  }

  /**
   * Mock for the getString method.
   * Gets a string option.
   *
   * @param {string} name The name of the option to get.
   * @returns {OptionParameters | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getString(name: string) {
    return this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.String
    );
  }

  /**
   * Mock for the getInteger method.
   * Gets an integer option.
   *
   * @param {string} name The name of the option to get.
   * @returns {OptionParameters | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getInteger(name: string) {
    return this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.Integer
    );
  }

  /**
   * Mock for the getBoolean method.
   * Gets a boolean option.
   *
   * @param {string} name The name of the option to get.
   * @returns {OptionParameters | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getBoolean(name: string) {
    return this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.Boolean
    );
  }

  /**
   * Mock for the getChannel method.
   * Gets a channel option.
   *
   * @param {string} name The name of the option to get.
   * @returns {OptionParameters | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getChannel(name: string) {
    return this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.Channel
    );
  }

  /**
   * Mock for the getRole method.
   * Gets a role option.
   *
   * @param {string} name The name of the option to get.
   * @returns {OptionParameters | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getRole(name: string) {
    return this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.Role
    );
  }

  /**
   * Mock for the getMentionable method.
   * Gets a mentionable option.
   *
   * @param {string} name The name of the option to get.
   * @returns {OptionParameters | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getMentionable(name: string) {
    return this._data.find(
      (opt) =>
        opt.name === name &&
        opt.type === ApplicationCommandOptionType.Mentionable
    );
  }

  /**
   * Mock for the getNumber method.
   * Gets a number option.
   *
   * @param {string} name The name of the option to get.
   * @returns {OptionParameters | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getNumber(name: string) {
    return this._data.find(
      (opt) =>
        opt.name === name && opt.type === ApplicationCommandOptionType.Number
    );
  }

  /**
   * Mock for the getAttachment method.
   * Gets an attachment option.
   *
   * @param {string} name The name of the option to get.
   * @returns {OptionParameters | undefined} The option if found, undefined otherwise.
   * @public
   */
  public getAttachment(name: string) {
    return this._data.find(
      (opt) =>
        opt.name === name &&
        opt.type === ApplicationCommandOptionType.Attachment
    );
  }
}
