import { Collection } from "discord.js";

import { ReplyParameters } from "../interfaces/ReplyParameters";

import { MockChannel } from "./MockChannel";
import { MockMessage } from "./MockMessage";
import { MockUser } from "./MockUser";

/**
 * Mock for guild/channel message manager.
 *
 * @class
 */
export class MockMessageManager {
  private _cache: Collection<string, MockMessage>;
  private _channel: MockChannel;

  /**
   * @param {MockChannel} channel The channel the message manager belongs to.
   */
  constructor(channel: MockChannel) {
    this._cache = new Collection();
    this._channel = channel;
  }

  /**
   * @type {MockChannel}
   * @public
   * @readonly
   */
  public get channel(): MockChannel {
    return this._channel;
  }

  /**
   * @type {Collection<string, MockMessage>}
   * @public
   * @readonly
   */
  public get cache(): Collection<string, MockMessage> {
    return this._cache;
  }

  /**
   * Fetches the list of messages from the guild.
   *
   * @returns {Promise<Collection<string, MockMessage>>} The messages collection.
   * @public
   * @async
   */
  public fetch(): Promise<Collection<string, MockMessage>>;
  /**
   * Fetches a single message from the guild.
   *
   * @param {string} id The id of the message to fetch.
   * @returns {Promise<MockMessage | null>} The message, or null if it doesn't exist.
   * @public
   * @async
   */
  public fetch(id: string): Promise<MockMessage | null>;
  /**
   * Fetches the messages from the guild. Optionally fetches a single message, if an id is provided.
   *
   * @param {string?} id The id of the message to fetch.
   * @returns {Promise<Collection<string, MockMessage>> | Promise<MockMessage | null>} The messages collection, or a single message.
   * @public
   * @async
   */
  public fetch(
    id?: string
  ): Promise<Collection<string, MockMessage> | MockMessage | null> {
    if (id) {
      return new Promise(() => this._cache.get(id) || null);
    }
    return new Promise(() => this._cache);
  }

  /**
   * Sends a message to the channel.
   *
   * @param {ReplyParameters | string} message The message to send.
   * @param {MockUser} author The author of the message.
   * @returns {Promise<MockMessage>} The message that was sent.
   * @package
   * @async
   */
  public send(
    message: ReplyParameters | string,
    author: MockUser
  ): Promise<MockMessage> {
    const opts = typeof message === "string" ? { content: message } : message;
    const mockMessage = new MockMessage({
      ...opts,
      channel: this._channel,
      guild: this._channel.guild,
      author,
    });
    this._cache.set(mockMessage.id, mockMessage);
    return new Promise(() => mockMessage);
  }
}
