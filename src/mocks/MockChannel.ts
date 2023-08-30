import { ChannelType } from "discord.js";

import { ChannelParameters } from "../interfaces/ChannelParameters";
import { ReplyParameters } from "../interfaces/ReplyParameters";
import { Snowflake } from "../utils/Snowflake";

import { MockGuild } from "./MockGuild";
import { MockMessage } from "./MockMessage";
import { MockMessageManager } from "./MockMessageManager";
import { MockUser } from "./MockUser";
import { MockWebhook } from "./MockWebhook";

/**
 * Mocks a discord.js GuildChannel.
 *
 * @class
 */
export class MockChannel {
  private _id: string;
  private _name: string;
  private _type: ChannelType;
  private _guild: MockGuild | undefined;
  private _messages: MockMessageManager;
  private _webhooks: MockWebhook[] = [];

  /**
   * @param {ChannelParameters} options The channel options.
   * @public
   */
  constructor(options: ChannelParameters) {
    this._id = new Snowflake().id;
    this._name = options.name;
    this._type = options.type;
    this._guild = options.guild;
    this._messages = new MockMessageManager(this);
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
   * @type {ChannelType}
   * @public
   * @readonly
   */
  public get type(): ChannelType {
    return this._type;
  }

  /**
   * @type {MockGuild}
   * @public
   * @readonly
   */
  public get guild(): MockGuild | undefined {
    return this._guild;
  }

  /**
   * @type {MockMessageManager}
   * @public
   * @readonly
   */
  public get messages(): MockMessageManager {
    return this._messages;
  }

  /**
   * Mock for the send message.
   *
   * @param {ReplyParameters | string} message The message to send.
   * @param {MockUser} author The author of the message.
   * @returns {Promise<MockMessage>} The message.
   * @public
   * @async
   */
  public async send(
    message: ReplyParameters | string,
    author: MockUser
  ): Promise<MockMessage> {
    const msg = await this._messages.send(message, author);
    return msg;
  }

  /**
   * Asserts that the channel is a DM channel.
   *
   * @returns {boolean} If the channel is a DM channel.
   */
  public isDMBased(): boolean {
    return (
      this._type === ChannelType.DM ||
      this._type === ChannelType.GroupDM ||
      !this._guild
    );
  }

  /**
   * Asserts that the channel is a text channel.
   *
   * @returns {boolean} If the channel is a text channel.
   */
  public isTextBased(): boolean {
    return [
      ChannelType.DM,
      ChannelType.GroupDM,
      ChannelType.GuildAnnouncement,
      ChannelType.GuildText,
      ChannelType.PublicThread,
      ChannelType.PrivateThread,
      ChannelType.GuildVoice,
      ChannelType.GuildStageVoice,
      ChannelType.AnnouncementThread,
      ChannelType.GuildForum,
    ].includes(this._type);
  }

  /**
   * Asserts that the channel is a thread.
   *
   * @returns {boolean} If the channel is a thread.
   */
  public isThread(): boolean {
    return [
      ChannelType.PublicThread,
      ChannelType.PrivateThread,
      ChannelType.AnnouncementThread,
    ].includes(this._type);
  }

  /**
   * Fetches the webhooks from the channel.
   *
   * @returns {Promise<MockWebhook[]>} The webhooks.
   */
  public async fetchWebhooks(): Promise<MockWebhook[]> {
    return this._webhooks;
  }

  /**
   * Creates a webhook.
   *
   * @param {object} options The options for the webhook.
   * @param {string} options.name The name of the webhook.
   * @returns {Promise<MockWebhook>} The new webhook.
   */
  public async createWebhook({ name }: { name: string }): Promise<MockWebhook> {
    const user = new MockUser({
      username: name,
      discriminator: 1,
      avatar: "",
      bot: true,
      system: false,
    });
    const webhook = new MockWebhook({
      channel: this,
      user,
    });
    this._webhooks.push(webhook);
    return webhook;
  }
}
