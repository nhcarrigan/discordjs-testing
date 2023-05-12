import { Collection } from "discord.js";

import { UserParameters } from "../interfaces/UserParameters";

import { MockGuild } from "./MockGuild";
import { MockUser } from "./MockUser";

/**
 * Mocks the users collection in a guild.
 *
 * @class
 */
export class MockUserManager {
  private _guild: MockGuild;
  private _cache: Collection<string, MockUser>;

  /**
   * @param {MockGuild} guild The guild the user manager belongs to.
   */
  constructor(guild: MockGuild) {
    this._guild = guild;
    this._cache = new Collection();
  }

  /**
   * @type {Collection<string, MockUser>}
   * @public
   * @readonly
   */
  public get cache(): Collection<string, MockUser> {
    return this._cache;
  }

  /**
   * Fetches the list of users from the guild.
   *
   * @returns {Promise<Collection<string, MockUser>>} The users collection.
   * @public
   * @async
   */
  public fetch(): Promise<Collection<string, MockUser>>;
  /**
   * Fetches a single user from the guild.
   *
   * @param {string} id The id of the user to fetch.
   * @returns {Promise<MockUser | null>} The user, or null if it doesn't exist.
   * @public
   * @async
   */
  public fetch(id: string): Promise<MockUser | null>;
  /**
   * Fetches the users from the guild. Optionally fetches a single user, if an id is provided.
   *
   * @param {string?} id The id of the user to fetch.
   * @returns {Promise<Collection<string, MockUser>> | Promise<MockUser | null>} The users collection, or a single user.
   * @public
   * @async
   */
  public fetch(
    id?: string
  ): Promise<Collection<string, MockUser> | MockUser | null> {
    if (id) {
      return new Promise(() => this._cache.get(id) || null);
    }
    return new Promise(() => this._cache);
  }

  /**
   * Adds a user to the guild.
   *
   * @param {UserParameters} options The options for the user.
   * @returns {Promise<MockUser>} The user.
   * @package
   * @async
   */
  public add(options: UserParameters): Promise<MockUser> {
    const user = new MockUser(options);
    this._cache.set(user.id, user);
    return new Promise(() => user);
  }

  /**
   * Removes a user from the guild.
   *
   * @param {string} id The id of the user to remove.
   * @package
   */
  public remove(id: string) {
    this._cache.delete(id);
  }
}
