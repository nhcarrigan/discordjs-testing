import { MessageParameters } from "../interfaces/MessageParameters";
import { ReplyParameters } from "../interfaces/ReplyParameters";
import { UserParameters } from "../interfaces/UserParameters";
import { Snowflake } from "../utils/Snowflake";

import { MockMessage } from "./MockMessage";

/**
 * Mocks a discord.js User.
 *
 * @class
 */
export class MockUser {
  private _id: string;
  private _username: string;
  private _tag: string;
  private _discriminator: number;
  private _avatar: string;
  private _bot: boolean;
  private _system: boolean;
  private _dms: MessageParameters[];

  /**
   * @param {UserParameters} options The user's options.
   * @public
   */
  constructor(options: UserParameters) {
    this._id = new Snowflake().id;
    this._username = options.username;
    this._discriminator = options.discriminator;
    this._tag = `${options.username}#${options.discriminator}`;
    this._avatar = options.avatar;
    this._bot = options.bot;
    this._system = options.system;
    this._dms = [];
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
  public get username(): string {
    return this._username;
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get tag(): string {
    return this._tag;
  }

  /**
   * @type {number}
   * @public
   * @readonly
   */
  public get discriminator(): number {
    return this._discriminator;
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get avatar(): string {
    return this._avatar;
  }

  /**
   * @type {boolean}
   * @public
   * @readonly
   */
  public get bot(): boolean {
    return this._bot;
  }

  /**
   * @type {boolean}
   * @public
   * @readonly
   */
  public get system(): boolean {
    return this._system;
  }

  /**
   * @type {ReplyParameters[]}
   * @public
   * @readonly
   */
  public get dms(): ReplyParameters[] {
    return this._dms;
  }

  /**
   * Mock for the fetch() method.
   *
   * @returns {MockUser} This user.
   * @async
   * @public
   */
  public async fetch(): Promise<MockUser> {
    return this;
  }

  /**
   * Mock for the displayAvatarURL() method.
   *
   * @returns {string} The user's avatar URL.
   * @public
   */
  public displayAvatarURL(): string {
    return this.avatar;
  }

  /**
   * Mock for the send() method. Pushes the message object
   * to an internal array.
   *
   * @param {MessageParameters} options The message to send.
   * @returns {Promise<MockMessage>} The sent message.
   * @async
   * @public
   */
  public async send(options: MessageParameters): Promise<MockMessage> {
    this._dms.push(options);
    return new MockMessage(options);
  }
}
