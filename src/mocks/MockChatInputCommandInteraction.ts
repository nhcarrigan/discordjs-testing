import { Snowflake } from "@sapphire/snowflake";
import { ChatInputCommandInteraction } from "discord.js";

import { ChatInputCommandInteractionParameters } from "../interfaces/ChatInputCommandInteractionParameters";
import {
  InteractionReplyParameters,
  ReplyParameters,
} from "../interfaces/ReplyParameters";

import { MockChannel } from "./MockChannel";
import { MockGuild } from "./MockGuild";
import { MockInteractionMessage } from "./MockInteractionMessage";
import { MockMember } from "./MockMember";
import { MockUser } from "./MockUser";

/**
 * Mocks a discord.js ChatInputCommandInteraction.
 *
 * @class
 */
export class MockChatInputCommandInteraction {
  private _commandName: string;
  private _subcommandGroupName: string | null;
  private _subcommandName: string | null;
  private _options: {
    name: string;
    value: unknown;
    type: string;
    required?: boolean;
  }[];
  private _guild: MockGuild;
  private _member: MockMember;
  private _user: MockUser;
  private _deferred: boolean;
  private _ephemeral: boolean;
  private _replies: MockInteractionMessage[];
  private _channel: MockChannel;
  private _bot: MockUser;

  /**
   * @param {ChatInputCommandInteractionParameters} options The options for the interaction.
   * @public
   */
  constructor(options: ChatInputCommandInteractionParameters) {
    this._commandName = options.commandName;
    this._subcommandGroupName = options.subcommandGroupName || null;
    this._subcommandName = options.subcommandName || null;
    this._options = options.options || [];
    this._guild = options.guild;
    this._member = options.member;
    this._user = options.user;
    this._ephemeral = false;
    this._deferred = false;
    this._replies = [];
    this._channel = options.channel;
    this._bot = options.bot;
  }

  /**
   * Gets the command name.
   *
   * @type {string}
   * @readonly
   */
  public get commandName(): string {
    return this._commandName;
  }
  /**
   * Gets the subcommand group name.
   *
   * @type {string | null}
   * @readonly
   */
  public get subcommandGroupName(): string | null {
    return this._subcommandGroupName;
  }
  /**
   * Gets the subcommand name.
   *
   * @type {string | null}
   * @readonly
   */
  public get subcommandName(): string | null {
    return this._subcommandName;
  }
  /**
   * Gets the guild.
   *
   * @type {MockGuild}
   * @readonly
   */
  public get guild(): MockGuild {
    return this._guild;
  }
  /**
   * Gets the member.
   *
   * @type {MockMember}
   * @readonly
   */
  public get member(): MockMember {
    return this._member;
  }
  /**
   * Gets the user.
   *
   * @type {MockUser}
   * @readonly
   */
  public get user(): MockUser {
    return this._user;
  }
  /**
   * Gets the ephemeral state of the interaction.
   *
   * @type {boolean}
   * @readonly
   */
  public get ephemeral(): boolean {
    return this._ephemeral;
  }
  /**
   * Gets the deferred state of the interaction.
   *
   * @type {boolean}
   * @readonly
   */
  public get deferred(): boolean {
    return this._deferred;
  }
  /**
   * @type {MockInteractionMessage[]}
   * @readonly
   */
  public get replies(): MockInteractionMessage[] {
    return this._replies;
  }

  /**
   * Mock for the deferReply method.
   * Defers a reply. Sets the interaction to deferred, and optionally ephemeral.
   *
   * @param {object} options The options for the reply.
   * @param {boolean} options.ephemeral Whether the reply should be ephemeral.
   * @public
   */
  public deferReply(options?: { ephemeral?: boolean }): Promise<boolean> {
    if (this._deferred) {
      throw new Error("Interaction already deferred.");
    }
    this._deferred = true;
    this._ephemeral = options?.ephemeral || false;
    return new Promise(() => true);
  }

  /**
   * Mock for the reply method.
   * Sends a reply. Adds the reply payload to the replies array.
   *
   * @param {string | InteractionReplyParameters} payload The reply payload.
   * @returns {Promise<MockInteractionMessage>} The message.
   * @async
   * @public
   */
  public reply(
    payload: string | InteractionReplyParameters
  ): Promise<MockInteractionMessage> {
    if (this._deferred || this._replies.length) {
      throw new Error("Interaction already deferred or replied.");
    }
    if (typeof payload === "string") {
      const message = new MockInteractionMessage({
        content: payload,
        author: this._bot,
        channel: this._channel,
        id: new Snowflake(Date.now()).generate().toString(10),
        ephemeral: this._ephemeral,
      });
      this._replies.push(message);
      return new Promise(() => message);
    }
    const { content, embeds, attachments, ephemeral } = payload;
    const message = new MockInteractionMessage({
      content,
      embeds,
      attachments,
      ephemeral,
      author: this._bot,
      channel: this._channel,
      id: new Snowflake(Date.now()).generate().toString(10),
    });
    this._replies.push(message);
    return new Promise(() => message);
  }

  /**
   * Mock for the editReply method.
   * In Discord.js this would edit a reply.
   * Here it just adds the payload to the replies array.
   *
   * @param {string | ReplyParameters} payload The reply payload.
   * @returns {Promise<MockInteractionMessage>} The message.
   * @async
   * @public
   */
  public editReply(
    payload: string | ReplyParameters
  ): Promise<MockInteractionMessage> {
    if (!this._deferred && this._replies.length !== 1) {
      throw new Error("Interaction has not been deferred or replied.");
    }
    this._replies.pop();
    const message = this.reply(payload);
    return message;
  }

  /**
   * Casts the type to a ChatInputCommandInteraction
   * for use in tests.
   *
   * @returns {ChatInputCommandInteraction} The mock with a coerced type.
   * @public
   */
  public typeCast(): ChatInputCommandInteraction {
    return this as unknown as ChatInputCommandInteraction;
  }
}
