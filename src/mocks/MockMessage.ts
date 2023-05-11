import {
  APIAttachment,
  APIEmbed,
  AttachmentBuilder,
  EmbedBuilder,
} from "discord.js";

import { MessageParameters } from "../interfaces/MessageParameters";

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
  private _guildId: string | undefined;
  private _content: string | undefined;
  private _embeds: (EmbedBuilder | APIEmbed)[] | undefined;
  private _attachments: (AttachmentBuilder | APIAttachment)[] | undefined;

  /**
   * @param {MessageParameters} options The message options.
   * @public
   */
  constructor(options: MessageParameters) {
    this._id = options.id;
    this._author = options.author;
    this._channelId = options.channel.id;
    this._guildId = options.guild?.id;
    this._content = options.content;
    this._embeds = options.embeds;
    this._attachments = options.attachments;
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
}
