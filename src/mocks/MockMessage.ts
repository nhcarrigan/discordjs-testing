import {
  APIAttachment,
  APIEmbed,
  AttachmentBuilder,
  EmbedBuilder,
} from "discord.js";

import { MessageParameters } from "../interfaces/MessageParameters";
import { ReplyParameters } from "../interfaces/ReplyParameters";
import { Snowflake } from "../utils/Snowflake";

import { MockChannel } from "./MockChannel";
import { MockGuild } from "./MockGuild";
import { MockUser } from "./MockUser";

/**
 * Mocks a discord.js Message.
 *
 * @class
 */
export class MockMessage {
  private _id: string;
  private _author: MockUser;
  private _channelId: string;
  private _channel: MockChannel;
  private _guildId: string | undefined;
  private _guild: MockGuild | undefined;
  private _content: string | undefined;
  private _embeds: (EmbedBuilder | APIEmbed)[] | undefined;
  private _attachments: (AttachmentBuilder | APIAttachment)[] | undefined;

  /**
   * @param {MessageParameters} options The message options.
   * @public
   */
  constructor(options: MessageParameters) {
    this._id = new Snowflake().id;
    this._author = options.author;
    this._channelId = options.channel.id;
    this._channel = options.channel;
    this._guildId = options.guild?.id;
    this._guild = options.guild;
    this._content = options.content;
    this._embeds = options.embeds;
    this._attachments = options.attachments || options.files;
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
   * @type {MockUser}
   * @public
   * @readonly
   */
  public get author(): MockUser {
    return this._author;
  }

  /**
   * @type {string}
   * @public
   *  @readonly
   */
  public get channelId(): string {
    return this._channelId;
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
   * @type {string?}
   * @public
   * @readonly
   */
  public get guildId(): string | undefined {
    return this._guildId;
  }

  /**
   * @type {MockGuild?}
   * @public
   * @readonly
   */
  public get guild(): MockGuild | undefined {
    return this._guild;
  }

  /**
   * @type {string?}
   * @public
   * @readonly
   */
  public get content(): string | undefined {
    return this._content;
  }

  /**
   * @type {(EmbedBuilder | APIEmbed)[]?}
   * @public
   * @readonly
   */
  public get embeds(): (EmbedBuilder | APIEmbed)[] | undefined {
    return this._embeds;
  }

  /**
   * @type {(AttachmentBuilder | APIAttachment)[]?}
   * @public
   * @readonly
   */
  public get attachments(): (AttachmentBuilder | APIAttachment)[] | undefined {
    return this._attachments;
  }

  /**
   * Edit a message.
   *
   * @param {string | ReplyParameters} options The message content or options.
   * @returns {Promise<MockMessage>} The edited message.
   * @public
   * @async
   */
  public async edit(options: string | ReplyParameters): Promise<MockMessage> {
    if (typeof options === "string") {
      this._content = options;
    } else {
      this._content = options.content || this._content;
      this._embeds = options.embeds || this._embeds;
      this._attachments =
        options.attachments || options.files || this._attachments;
    }
    return this;
  }
}
