import { PermissionsBitField } from "discord.js";

import { MemberParameters } from "../interfaces/MemberParameters";

import { MockGuild } from "./MockGuild";
import { MockRoleManager } from "./MockRoleManager";
import { MockUser } from "./MockUser";

/**
 * Mocks a discord.js GuildMember.
 *
 * @class
 */
export class MockMember {
  private _id: string;
  private _user: MockUser;
  private _guild: MockGuild;
  private _roles: MockRoleManager;
  private _timeoutDuration: number;
  private _bannable: boolean;
  private _kickable: boolean;
  private _permissions: PermissionsBitField;

  /**
   * @param {MemberParameters} options The member options.
   * @public
   */
  constructor(options: MemberParameters) {
    this._id = options.user.id;
    this._user = options.user;
    this._guild = options.guild;
    this._roles = new MockRoleManager(this._guild);
    this._timeoutDuration = 0;
    this._bannable = options.bannable || false;
    this._kickable = options.kickable || false;
    this._permissions = new PermissionsBitField();
    this._guild.members.cache.set(this._id, this);
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get id() {
    return this._id;
  }

  /**
   * @type {MockUser}
   * @public
   * @readonly
   */
  public get user() {
    return this._user;
  }

  /**
   * @type {MockGuild}
   * @public
   * @readonly
   */
  public get guild() {
    return this._guild;
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
   * @type {boolean}
   * @public
   */
  public get bannable() {
    return this._bannable;
  }

  /**
   * @type {boolean}
   * @public
   */
  public set bannable(value: boolean) {
    this._bannable = value;
  }

  /**
   * @type {boolean}
   * @public
   */
  public get kickable() {
    return this._kickable;
  }

  /**
   * @type {boolean}
   * @public
   */
  public set kickable(value: boolean) {
    this._kickable = value;
  }

  /**
   * @type {number}
   * @public
   * @readonly
   */
  public get timeoutDuration() {
    return this._timeoutDuration;
  }

  /**
   * @type {PermissionsBitField}
   * @public
   * @readonly
   */
  public get permissions() {
    return this._permissions;
  }

  /**
   * Bans the member.
   *
   * @param {string} reason The reason for the ban.
   * @returns {Promise<MockMember>} The member.
   * @public
   * @async
   */
  public async ban(reason: string): Promise<MockMember> {
    this._guild.ban({
      reason,
      member: this,
      guild: this._guild,
    });
    this._guild.members.remove(this._id);
    return this;
  }

  /**
   * Kicks the member.
   *
   * @returns {Promise<MockMember>} The member.
   * @public
   * @async
   */
  public async kick(): Promise<MockMember> {
    this._guild.members.remove(this._id);
    return this;
  }

  /**
   * Sets a timeout on the member.
   *
   * @param {number} timeout The timeout in milliseconds.
   * @returns {Promise<MockMember>} The member.
   * @public
   * @async
   */
  public async timeout(timeout: number): Promise<MockMember> {
    this._timeoutDuration = timeout;
    return this;
  }
}
