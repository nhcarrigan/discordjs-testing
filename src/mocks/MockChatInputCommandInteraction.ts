import { ChatInputCommandInteraction } from "discord.js";

import { ChatInputCommandInteractionParameters } from "../interfaces/ChatInputCommandInteractionParameters";
import {
  InteractionReplyParameters,
  ReplyParameters,
} from "../interfaces/ReplyParameters";

import { MockGuild } from "./MockGuild";
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
  private _replies: InteractionReplyParameters[];

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
   * Mock for the deferReply method.
   * Defers a reply. Sets the interaction to deferred, and optionally ephemeral.
   *
   * @param { { ephemeral?: boolean } } options The options for the reply.
   * @public
   */
  public deferReply({ ephemeral }: { ephemeral?: boolean }): void {
    this._deferred = true;
    this._ephemeral = ephemeral || false;
  }

  /**
   * Mock for the reply method.
   * Sends a reply. Adds the reply payload to the replies array.
   *
   * @param {string | InteractionReplyParameters} payload The reply payload.
   * @public
   */
  public reply(payload: string | InteractionReplyParameters): void {
    if (typeof payload === "string") {
      this._replies.push({ content: payload });
      return;
    }
    const { content, embeds, attachments, ephemeral } = payload;
    this._replies.push({
      content,
      embeds,
      attachments,
      ephemeral,
    });
  }

  /**
   * Mock for the editReply method.
   * In Discord.js this would edit a reply.
   * Here it just adds the payload to the replies array.
   *
   * @param {string | ReplyParameters} payload The reply payload.
   * @public
   */
  public editReply(payload: string | ReplyParameters): void {
    if (!this._deferred && !this._replies.length) {
      throw new Error("Interaction has not been deferred or replied.");
    }
    if (typeof payload === "string") {
      this._replies.push({ content: payload });
      return;
    }
    const { content, embeds, attachments } = payload;
    this._replies.push({
      content,
      embeds,
      attachments,
    });
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
