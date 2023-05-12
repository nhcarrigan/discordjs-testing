import { Collection } from "discord.js";

import { MockGuild } from "./MockGuild";
import { MockMember } from "./MockMember";
import { MockUser } from "./MockUser";

/**
 * Mocks the members collection in a guild.
 *
 * @class
 */
export class MockMemberManager {
  private _guild: MockGuild;
  private _cache: Collection<string, MockMember>;

  /**
   * @param {MockGuild} guild The guild the member manager belongs to.
   */
  constructor(guild: MockGuild) {
    this._guild = guild;
    this._cache = new Collection();
  }

  /**
   * @type {Collection<string, MockMember>}
   * @public
   * @readonly
   */
  public get cache(): Collection<string, MockMember> {
    return this._cache;
  }

  /**
   * Fetches the list of members from the guild.
   *
   * @returns {Promise<Collection<string, MockMember>>} The members collection.
   * @public
   * @async
   */
  public fetch(): Promise<Collection<string, MockMember>>;
  /**
   * Fetches a single member from the guild.
   *
   * @param {string} id The id of the member to fetch.
   * @returns {Promise<MockMember | null>} The member, or null if it doesn't exist.
   * @public
   * @async
   */
  public fetch(id: string): Promise<MockMember | null>;
  /**
   * Fetches the members from the guild. Optionally fetches a single member, if an id is provided.
   *
   * @param {string?} id The id of the member to fetch.
   * @returns {Promise<Collection<string, MockMember>> | Promise<MockMember | null>} The members collection, or a single member.
   * @public
   * @async
   */
  public fetch(
    id?: string
  ): Promise<Collection<string, MockMember> | MockMember | null> {
    if (id) {
      return new Promise(() => this._cache.get(id) || null);
    }
    return new Promise(() => this._cache);
  }

  /**
   * Adds a member to the guild.
   *
   * @param {MockUser} user The user to member.
   * @returns {Promise<MockMember>} The member.
   * @public
   */
  public add(user: MockUser): Promise<MockMember> {
    const member = new MockMember({
      user,
      guild: this._guild,
    });
    this._cache.set(member.user.id, member);
    return new Promise(() => member);
  }

  /**
   * Removes a member from the guild.
   *
   * @param {string} id The id of the user to remove.
   * @package
   */
  public remove(id: string) {
    this._cache.delete(id);
  }
}
