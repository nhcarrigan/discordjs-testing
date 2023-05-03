import { Snowflake } from "@sapphire/snowflake";
import { WebhookClient } from "discord.js";

import { ReplyParameters } from "../interfaces/ReplyParameters";
import { WebhookParameters } from "../interfaces/WebhookParameters";

import { MockChannel } from "./MockChannel";
import { MockMessage } from "./MockMessage";
import { MockUser } from "./MockUser";

/**
 * Mocks a discord.js WebhookClient.
 *
 * @class
 */
export class MockWebhook {
  private _messages: MockMessage[];
  private _user: MockUser;
  private _channel: MockChannel;

  /**
   * @param {WebhookParameters} options The webhook's options.
   * @public
   */
  constructor(options: WebhookParameters) {
    this._messages = [];
    this._user = options.user;
    this._channel = options.channel;
  }

  /**
   * List the sent messages.
   *
   * @returns {MockMessage[]} Array of messages.
   * @public
   * @readonly
   */
  public get messages(): MockMessage[] {
    return this._messages;
  }

  /**
   * Mocks the send method.
   * Send a message.
   *
   * @param {ReplyParameters} options The message options.
   * @public
   */
  public send(options: ReplyParameters): Promise<MockMessage> {
    const message = new MockMessage({
      content: options.content,
      author: this._user,
      channel: this._channel,
      id: new Snowflake(Date.now()).generate().toString(10),
    });
    this._messages.push(message);
    return new Promise(() => message);
  }

  /**
   * Typecasts to WebhookClient for testing.
   *
   * @returns {WebhookClient} This.
   * @public
   */
  public typeCast(): WebhookClient {
    return this as unknown as WebhookClient;
  }
}
