import { WebhookClient } from "discord.js";

import { ReplyParameters } from "../interfaces/ReplyParameters";

/**
 * Mocks a discord.js WebhookClient.
 *
 * @class
 */
export class MockWebhook {
  private _messages: ReplyParameters[];

  /**
   * @public
   */
  constructor() {
    this._messages = [];
  }

  /**
   * List the sent messages.
   *
   * @returns {ReplyParameters[]} Array of messages.
   * @public
   * @readonly
   */
  public get messages(): ReplyParameters[] {
    return this._messages;
  }

  /**
   * Send a message.
   *
   * @param {ReplyParameters} options The message options.
   * @public
   */
  public send(options: ReplyParameters): void {
    this._messages.push(options);
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
