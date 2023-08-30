import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  ModalBuilder,
} from "discord.js";

import { ChatInputCommandInteractionParameters } from "../interfaces/ChatInputCommandInteractionParameters";
import {
  InteractionReplyParameters,
  ReplyParameters,
} from "../interfaces/ReplyParameters";

import { MockChannel } from "./MockChannel";
import { MockCommandOptions } from "./MockCommandOptions";
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
  private _options: MockCommandOptions;
  private _guild: MockGuild;
  private _member: MockMember;
  private _user: MockUser;
  private _deferred: boolean;
  private _ephemeral: boolean;
  private _replies: MockInteractionMessage[];
  private _channel: MockChannel;
  private _bot: MockUser;
  private _modal: ModalBuilder | null = null;

  /**
   * @param {ChatInputCommandInteractionParameters} options The options for the interaction.
   * @public
   */
  constructor(options: ChatInputCommandInteractionParameters) {
    this._commandName = options.commandName;
    this._subcommandGroupName = options.subcommandGroupName || null;
    this._subcommandName = options.subcommandName || null;
    this._options = new MockCommandOptions();
    this._guild = options.guild;
    this._member = options.member;
    this._user = options.user;
    this._ephemeral = false;
    this._deferred = false;
    this._replies = [];
    this._channel = options.channel;
    this._bot = options.bot;
    for (const option of options.options || []) {
      this._options.addOption(option);
    }
    if (this._subcommandName) {
      this._options.addOption({
        name: "subcommand",
        value: this._subcommandName,
        type: ApplicationCommandOptionType.Subcommand,
      });
    }
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get commandName(): string {
    return this._commandName;
  }
  /**
   * @type {string | null}
   * @public
   * @readonly
   */
  public get subcommandGroupName(): string | null {
    return this._subcommandGroupName;
  }
  /**
   * @type {string | null}
   * @public
   * @readonly
   */
  public get subcommandName(): string | null {
    return this._subcommandName;
  }
  /**
   * @type {MockGuild}
   * @public
   * @readonly
   */
  public get guild(): MockGuild {
    return this._guild;
  }
  /**
   * @type {MockMember}
   * @public
   * @readonly
   */
  public get member(): MockMember {
    return this._member;
  }
  /**
   * @type {MockUser}
   * @public
   * @readonly
   */
  public get user(): MockUser {
    return this._user;
  }
  /**
   * @type {boolean}
   * @public
   * @readonly
   */
  public get ephemeral(): boolean {
    return this._ephemeral;
  }
  /**
   * @type {boolean}
   * @public
   * @readonly
   */
  public get deferred(): boolean {
    return this._deferred;
  }
  /**
   * @type {MockInteractionMessage[]}
   * @public
   * @readonly
   */
  public get replies(): MockInteractionMessage[] {
    return this._replies;
  }
  /**
   * @type {MockCommandOptions}
   * @public
   * @readonly
   */
  public get options(): MockCommandOptions {
    return this._options;
  }

  /**
   * Mock for the deferReply method.
   * Defers a reply. Sets the interaction to deferred, and optionally ephemeral.
   *
   * @param {object} options The options for the reply.
   * @param {boolean} options.ephemeral Whether the reply should be ephemeral.
   * @returns {Promise<boolean>} A promise that resolves to true.
   * @async
   * @public
   */
  public async deferReply(options?: { ephemeral?: boolean }): Promise<boolean> {
    if (this._deferred) {
      throw new Error("Interaction already deferred.");
    }
    this._deferred = true;
    this._ephemeral = options?.ephemeral || false;
    return true;
  }

  /**
   * Mock for the reply method.
   * Sends a reply. Adds the reply payload to the replies array.
   *
   * @param {string | InteractionReplyParameters} payload The reply payload.
   * @param {boolean} edited Whether the reply should be edited.
   * @returns {Promise<MockInteractionMessage>} The message.
   * @async
   * @public
   */
  public async reply(
    payload: string | InteractionReplyParameters,
    edited = false
  ): Promise<MockInteractionMessage> {
    if ((this._deferred || this._replies.length) && !edited) {
      throw new Error("Interaction already deferred or replied.");
    }
    if (typeof payload === "string") {
      const message = new MockInteractionMessage({
        content: payload,
        author: this._bot,
        channel: this._channel,
        ephemeral: this._ephemeral,
      });
      this._replies.push(message);
      return message;
    }
    const { content, embeds, attachments, ephemeral } = payload;
    const message = new MockInteractionMessage({
      content,
      embeds,
      attachments,
      ephemeral,
      author: this._bot,
      channel: this._channel,
    });
    this._replies.push(message);
    return message;
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
  public async editReply(
    payload: string | ReplyParameters
  ): Promise<MockInteractionMessage> {
    if (!this._deferred && this._replies.length !== 1) {
      throw new Error("Interaction has not been deferred or replied.");
    }
    this._replies.pop();
    const message = this.reply(payload, true);
    return message;
  }

  /**
   * Mock for the showMoadl method.
   * In Discord.js this would display a modal to the user.
   * Here it just adds the modal to the interaction for testing.
   *
   * @param {ModalBuilder} modal The modal to display.
   * @returns {Promise<ModalBuilder>} The modal displayed.
   * @async
   * @public
   */
  public async showModal(modal: ModalBuilder): Promise<ModalBuilder> {
    if (this._deferred || this._replies.length || this._modal) {
      throw new Error("Interaction already deferred or replied.");
    }
    this._modal = modal;
    return modal;
  }

  /**
   * Casts the type to a ChatInputCommandInteraction
   * for use in tests.
   *
   * @template T The type to cast to.
   * @returns {ChatInputCommandInteraction} The mock with a coerced type.
   * @public
   */
  public typeCast<T extends "cached">(): ChatInputCommandInteraction<T> {
    return this as unknown as ChatInputCommandInteraction<T>;
  }
}
