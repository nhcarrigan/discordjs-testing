import { Collection } from "discord.js";

import { MockBan } from "./MockBan";
import { MockGuild } from "./MockGuild";
import { MockMember } from "./MockMember";
import { MockUser } from "./MockUser";

/**
 * Mocks the bans collection in a guild.
 *
 * @class
 */
export class MockBanManager {
  private _guild: MockGuild;
  private _cache: Collection<string, MockBan>;

  /**
   * @param {MockGuild} guild The guild the ban manager belongs to.
   */
  constructor(guild: MockGuild) {
    this._guild = guild;
    this._cache = new Collection();
  }

  /**
   * @type {Collection<string, MockBan>}
   * @public
   * @readonly
   */
  public get cache(): Collection<string, MockBan> {
    return this._cache;
  }

  /**
   * Fetches the list of bans from the guild.
   *
   * @returns {Promise<Collection<string, MockBan>>} The bans collection.
   * @public
   * @async
   */
  public fetch(): Promise<Collection<string, MockBan>>;
  /**
   * Fetches a single ban from the guild.
   *
   * @param {string} id The id of the ban to fetch.
   * @returns {Promise<MockBan | null>} The ban, or null if it doesn't exist.
   * @public
   * @async
   */
  public fetch(id: string): Promise<MockBan | null>;
  /**
   * Fetches the bans from the guild. Optionally fetches a single ban, if an id is provided.
   *
   * @param {string?} id The id of the ban to fetch.
   * @returns {Promise<Collection<string, MockBan>> | Promise<MockBan | null>} The bans collection, or a single ban.
   * @public
   * @async
   */
  public fetch(
    id?: string
  ): Promise<Collection<string, MockBan> | MockBan | null> {
    if (id) {
      return new Promise(() => this._cache.get(id) || null);
    }
    return new Promise(() => this._cache);
  }

  /**
   * Adds a ban to the guild.
   *
   * @param {MockUser | MockMember} user The user to ban.
   * @param { { reason?: string } } options The options for the ban.
   * @param {string?} options.reason The reason for the ban.
   * @public
   */
  public create(
    user: MockUser | MockMember,
    options?: { reason?: string }
  ): void {
    const ban = new MockBan({
      user: user instanceof MockMember ? user.user : user,
      reason: options?.reason || "No reason provided.",
      guild: this._guild,
    });
    this._cache.set(ban.user.id, ban);
  }

  /**
   * Removes a ban from the guild.
   *
   * @param {MockUser | MockMember} user The user to unban.
   * @param { { reason?: string } } options The options for the ban.
   * @param {string?} options.reason The reason for the ban.
   */
  public remove(user: MockUser | MockMember, options?: { reason?: string }) {
    this._cache.delete(user.id);
  }
}
