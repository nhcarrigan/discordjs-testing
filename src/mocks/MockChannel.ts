import { ChannelType } from "discord.js";

import { ReplyParameters } from "../../prod/interfaces/ReplyParameters";
import { ChannelParameters } from "../interfaces/ChannelParameters";
import { Snowflake } from "../utils/Snowflake";

import { MockGuild } from "./MockGuild";
import { MockMessage } from "./MockMessage";
import { MockMessageManager } from "./MockMessageManager";
import { MockUser } from "./MockUser";

/**
 * Mocks a discord.js GuildChannel.
 *
 * @class
 */
export class MockChannel {
  private _id: string;
  private _name: string;
  private _type: ChannelType;
  private _guild: MockGuild;
  private _messages: MockMessageManager;

  /**
   * @param {ChannelParameters} options The channel options.
   * @public
   */
  constructor(options: ChannelParameters) {
    this._id = new Snowflake().id;
    this._name = options.name;
    this._type = options.type;
    this._guild = options.guild;
    this._messages = new MockMessageManager(this);
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get id(): string {
    return this._id;
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get name(): string {
    return this._name;
  }

  /**
   * @type {ChannelType}
   * @public
   * @readonly
   */
  public get type(): ChannelType {
    return this._type;
  }

  /**
   * @type {MockGuild}
   * @public
   * @readonly
   */
  public get guild(): MockGuild {
    return this._guild;
  }

  /**
   * @type {MockMessageManager}
   * @public
   * @readonly
   */
  public get messages(): MockMessageManager {
    return this._messages;
  }

  /**
   * Mock for the send message.
   *
   * @param {ReplyParameters | string} message The message to send.
   * @param {MockUser} author The author of the message.
   * @returns {Promise<MockMessage>} The message.
   * @public
   * @async
   */
  public send(
    message: ReplyParameters | string,
    author: MockUser
  ): Promise<MockMessage> {
    const msg = this._messages.send(message, author);
    return new Promise(() => msg);
  }
}
