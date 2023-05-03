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
   * Gets the ID.
   *
   * @returns {string} The ID.
   * @public
   * @readonly
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Mock for the fetch method.
   *
   * @returns {Promise<MockGuild>} This guild.
   * @public
   */
  public fetch(): Promise<MockGuild> {
    return new Promise(() => this);
  }

  /**
   * Method for adding a ban to the guild.
   *
   * @param {BanParameters} options The ban options.
   */
  public ban(options: BanParameters) {
    this._bans.push(new MockBan(options));
  }
}
