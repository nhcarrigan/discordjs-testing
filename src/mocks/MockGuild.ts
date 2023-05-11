import { BanParameters } from "../interfaces/BanParameters";
import { GuildParameters } from "../interfaces/GuildParameters";

import { MockBan } from "./MockBan";
import { MockMember } from "./MockMember";

/**
 * Mocks a discord.js Guild.
 *
 * @class
 */
export class MockGuild {
  private _id: string;
  private _name: string;
  private _bans: MockBan[];
  private _members: MockMember[];

  /**
   * @param {GuildParameters} options The guild options.
   * @public
   */
  constructor(options: GuildParameters) {
    this._id = options.id;
    this._name = options.name;
    this._bans = [];
    this._members = [];
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
   * @type {object}
   * @public
   * @readonly
   */
  public get members() {
    return {
      cache: this._members,
      fetch: this.fetchMembers.bind(this),
    };
  }

  /**
   * Mock for the fetch method.
   *
   * @returns {Promise<MockGuild>} This guild.
   * @public
   * @async
   */
  public fetch(): Promise<MockGuild> {
    return new Promise(() => this);
  }

  /**
   * Method for adding a ban to the guild.
   *
   * @param {BanParameters} options The ban options.
   * @returns {Promise<MockBan>} The created ban.
   * @public
   * @async
   */
  public ban(options: BanParameters): Promise<MockBan> {
    const ban = new MockBan(options);
    this._bans.push(ban);
    return new Promise(() => ban);
  }

  /**
   * Fetches a single member.
   *
   * @param {string} id The member to fetch.
   * @returns {Promise<MockMember>} The fetched member.
   * @private
   * @async
   */
  private fetchMembers(id: string): Promise<MockMember>;
  /**
   * Fetches the full member list.
   *
   * @returns {Promise<MockMember[]>} The fetched members.
   * @private
   * @async
   */
  private fetchMembers(): Promise<MockMember[]>;
  /**
   * Mock for the members.fetch method.
   *
   * @param {string?} id The ID of the member to fetch.
   * @returns {Promise<MockMember | MockMember[]>} The fetched member(s).
   * @public
   * @async
   */
  private fetchMembers(id?: string): Promise<MockMember | MockMember[]> {
    if (id) {
      const target = this._members.find((member) => member.id === id);
      return new Promise(() => target || null);
    }
    return new Promise(() => this._members);
  }
}
