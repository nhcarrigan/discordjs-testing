import { WebhookClient } from "discord.js";

import { ReplyParameters } from "../interfaces/ReplyParameters";
import { WebhookParameters } from "../interfaces/WebhookParameters";

import { MockChannel } from "./MockChannel";
import { MockMessage } from "./MockMessage";
import { MockMessageManager } from "./MockMessageManager";
import { MockUser } from "./MockUser";

/**
 * Mocks a discord.js WebhookClient.
 *
 * @class
 */
export class MockWebhook {
  private _user: MockUser;
  private _channel: MockChannel;

  /**
   * @param {WebhookParameters} options The webhook's options.
   * @public
   */
  constructor(options: WebhookParameters) {
    this._user = options.user;
    this._channel = options.channel;
  }

  /**
   * @type {MockMessageManager}
   * @public
   * @readonly
   */
  public get messages(): MockMessageManager {
    return this._channel.messages;
  }

  /**
   * Mocks the send method.
   * Send a message.
   *
   * @param {ReplyParameters} options The message options.
   * @returns {Promise<MockMessage>} The sent message.
   * @async
   * @public
   */
  public send(options: ReplyParameters): Promise<MockMessage> {
    const message = this._channel.send(options, this._user);
    return message;
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
