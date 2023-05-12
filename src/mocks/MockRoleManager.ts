import { Collection } from "discord.js";

import { RoleParameters } from "../interfaces/RoleParameters";

import { MockGuild } from "./MockGuild";
import { MockRole } from "./MockRole";

/**
 * Mocks the roles collection in a guild.
 *
 * @class
 */
export class MockRoleManager {
  private _guild: MockGuild;
  private _cache: Collection<string, MockRole>;

  /**
   * @param {MockGuild} guild The guild the role manager belongs to.
   */
  constructor(guild: MockGuild) {
    this._guild = guild;
    this._cache = new Collection();
  }

  /**
   * @type {Collection<string, MockRole>}
   * @public
   * @readonly
   */
  public get cache(): Collection<string, MockRole> {
    return this._cache;
  }

  /**
   * Fetches the list of roles from the guild.
   *
   * @returns {Promise<Collection<string, MockRole>>} The roles collection.
   * @public
   * @async
   */
  public fetch(): Promise<Collection<string, MockRole>>;
  /**
   * Fetches a single role from the guild.
   *
   * @param {string} id The id of the role to fetch.
   * @returns {Promise<MockRole | null>} The role, or null if it doesn't exist.
   * @public
   * @async
   */
  public fetch(id: string): Promise<MockRole | null>;
  /**
   * Fetches the roles from the guild. Optionally fetches a single role, if an id is provided.
   *
   * @param {string?} id The id of the role to fetch.
   * @returns {Promise<Collection<string, MockRole>> | Promise<MockRole | null>} The roles collection, or a single role.
   * @public
   * @async
   */
  public fetch(
    id?: string
  ): Promise<Collection<string, MockRole> | MockRole | null> {
    if (id) {
      return new Promise(() => this._cache.get(id) || null);
    }
    return new Promise(() => this._cache);
  }

  /**
   * Adds a role to the guild.
   *
   * @param { Omit<RoleParameters, "guild"> } options The options for the role.
   * @param {string?} options.reason The reason for the role.
   * @public
   */
  public create(options: Omit<RoleParameters, "guild">): void {
    const role = new MockRole({ ...options, guild: this._guild });
    this._cache.set(role.id, role);
  }

  /**
   * Removes a role from the guild.
   *
   * @param {string} id The id of the role to delete.
   */
  public delete(id: string) {
    this._cache.delete(id);
  }
}
