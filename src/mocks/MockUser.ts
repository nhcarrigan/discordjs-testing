import { ReplyParameters } from "../interfaces/ReplyParameters";
import { UserParameters } from "../interfaces/UserParameters";

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
  private _dms: ReplyParameters[];
  /**
   * @param {UserParameters} options The user's options.
   * @public
   */
  constructor(options: UserParameters) {
    this._id = options.id;
    this._username = options.username;
    this._discriminator = options.discriminator;
    this._tag = `${options.username}#${options.discriminator}`;
    this._avatar = options.avatar;
    this._bot = options.bot;
    this._system = options.system;
    this._dms = [];
  }

  /**
   * Gets the user's ID.
   *
   * @returns {string} The ID.
   * @public
   * @readonly
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Gets the user's username.
   *
   * @returns {string} The username.
   * @public
   * @readonly
   */
  public get username(): string {
    return this._username;
  }

  /**
   * Gets the user's tag.
   *
   * @returns {string} The tag.
   * @public
   * @readonly
   */
  public get tag(): string {
    return this._tag;
  }

  /**
   * Gets the user's discriminator.
   *
   * @returns {number} The discriminator.
   * @public
   * @readonly
   */
  public get discriminator(): number {
    return this._discriminator;
  }

  /**
   * Gets the user's avatar.
   *
   * @returns {string} The avatar.
   * @public
   * @readonly
   */
  public get avatar(): string {
    return this._avatar;
  }

  /**
   * Gets whether the user is a bot.
   *
   * @returns {boolean} Whether the user is a bot.
   * @public
   * @readonly
   */
  public get bot(): boolean {
    return this._bot;
  }

  /**
   * Gets whether the user is a system user.
   *
   * @returns {boolean} Whether the user is a system user.
   * @public
   * @readonly
   */
  public get system(): boolean {
    return this._system;
  }

  /**
   * Gets the sent messages for testing.
   *
   * @returns {ReplyParameters[]} The sent messages.
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
   * @public
   */
  public fetch(): MockUser {
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
   * @param {ReplyParameters} options The message to send.
   * @public
   */
  public send(options: ReplyParameters) {
    this._dms.push(options);
  }
}
