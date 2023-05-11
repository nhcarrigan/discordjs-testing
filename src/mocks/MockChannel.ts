import { ChannelType } from "discord.js";

import { ChannelParameters } from "../interfaces/ChannelParameters";

/**
 * Mocks a discord.js GuildChannel.
 *
 * @class
 */
export class MockChannel {
  private _id: string;
  private _name: string;
  private _type: ChannelType;

  /**
   * @param {ChannelParameters} options The channel options.
   * @public
   */
  constructor(options: ChannelParameters) {
    this._id = options.id;
    this._name = options.name;
    this._type = options.type;
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get id(): string {
    return this._id;
  }
}
