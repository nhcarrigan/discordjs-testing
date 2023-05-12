import { BanParameters } from "../interfaces/BanParameters";
import { GuildParameters } from "../interfaces/GuildParameters";
import { Snowflake } from "../utils/Snowflake";

import { MockBan } from "./MockBan";
import { MockBanManager } from "./MockBanManager";
import { MockChannelManager } from "./MockChannelManager";
import { MockMemberManager } from "./MockMemberManager";
import { MockRoleManager } from "./MockRoleManager";

/**
 * Mocks a discord.js Guild.
 *
 * @class
 */
export class MockGuild {
  private _id: string;
  private _name: string;
  private _bans: MockBanManager;
  private _members: MockMemberManager;
  private _channels: MockChannelManager;
  private _roles: MockRoleManager;

  /**
   * @param {GuildParameters} options The guild options.
   * @public
   */
  constructor(options: GuildParameters) {
    this._id = new Snowflake().id;
    this._name = options.name;
    this._bans = new MockBanManager(this);
    this._members = new MockMemberManager(this);
    this._channels = new MockChannelManager(this);
    this._roles = new MockRoleManager(this);
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
   * @type {MockMemberManager}
   * @public
   * @readonly
   */
  public get members() {
    return this._members;
  }

  /**
   * @type {MockChannelManager}
   * @public
   * @readonly
   */
  public get channels() {
    return this._channels;
  }

  /**
   * @type {MockRoleManager}
   * @public
   * @readonly
   */
  public get roles() {
    return this._roles;
  }

  /**
   * Mock for the fetch method.
   *
   * @returns {Promise<MockGuild>} This guild.
   * @public
   * @async
   */
  public async fetch(): Promise<MockGuild> {
    return this;
  }

  /**
   * Method for adding a ban to the guild.
   *
   * @param {BanParameters} options The ban options.
   * @returns {Promise<MockBan>} The created ban.
   * @package
   * @async
   */
  public async ban(options: BanParameters): Promise<MockBan> {
    const ban = new MockBan(options);
    this._bans.create(options.member, ban);
    return ban;
  }
}
