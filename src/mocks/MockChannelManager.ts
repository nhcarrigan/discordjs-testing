import { Collection } from "discord.js";

import { ChannelParameters } from "../interfaces/ChannelParameters";

import { MockChannel } from "./MockChannel";
import { MockGuild } from "./MockGuild";

/**
 * Mocks the channels collection in a guild.
 *
 * @class
 */
export class MockChannelManager {
  private _guild: MockGuild;
  private _cache: Collection<string, MockChannel>;

  /**
   * @param {MockGuild} guild The guild the channel manager belongs to.
   */
  constructor(guild: MockGuild) {
    this._guild = guild;
    this._cache = new Collection();
  }

  /**
   * @type {Collection<string, MockChannel>}
   * @public
   * @readonly
   */
  public get cache(): Collection<string, MockChannel> {
    return this._cache;
  }

  /**
   * Fetches the list of channels from the guild.
   *
   * @returns {Promise<Collection<string, MockChannel>>} The channels collection.
   * @public
   * @async
   */
  public async fetch(): Promise<Collection<string, MockChannel>>;
  /**
   * Fetches a single channel from the guild.
   *
   * @param {string} id The id of the channel to fetch.
   * @returns {Promise<MockChannel | null>} The channel, or null if it doesn't exist.
   * @public
   * @async
   */
  public async fetch(id: string): Promise<MockChannel | null>;
  /**
   * Fetches the channels from the guild. Optionally fetches a single channel, if an id is provided.
   *
   * @param {string?} id The id of the channel to fetch.
   * @returns {Promise<Collection<string, MockChannel>> | Promise<MockChannel | null>} The channels collection, or a single channel.
   * @public
   * @async
   */
  public async fetch(
    id?: string
  ): Promise<Collection<string, MockChannel> | MockChannel | null> {
    if (id) {
      return this._cache.get(id) || null;
    }
    return this._cache;
  }

  /**
   * Adds a channel to the guild.
   *
   * @param { Omit<ChannelParameters, "guild"> } options The options for the channel.
   * @param {string?} options.reason The reason for the channel.
   * @returns {Promise<MockChannel>} The created channel.
   * @public
   * @async
   */
  public async create(
    options: Omit<ChannelParameters, "guild">
  ): Promise<MockChannel> {
    const channel = new MockChannel({ ...options, guild: this._guild });
    this._cache.set(channel.id, channel);
    return channel;
  }

  /**
   * Removes a channel from the guild.
   *
   * @param {string} id The id of the channel to delete.
   * @returns {Promise<void>} An empty promise.
   * @public
   * @async
   */
  public async delete(id: string): Promise<void> {
    this._cache.delete(id);
    return;
  }
}
