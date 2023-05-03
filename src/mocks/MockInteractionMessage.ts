import { InteractionMessageParameters } from "../interfaces/InteractionMessageParameters";

import { MockMessage } from "./MockMessage";

/**
 * Mocks a discord.js Message.
 * Includes the ephemeral property.
 *
 * @class
 */
export class MockInteractionMessage extends MockMessage {
  private _ephemeral: boolean;
  /**
   * @param {InteractionMessageParameters} options The message options.
   * @public
   */
  constructor(options: InteractionMessageParameters) {
    super(options);
    this._ephemeral = options.ephemeral || false;
  }

  /**
   * Gets whether the message is ephemeral.
   *
   * @returns {boolean} Whether the message is ephemeral.
   * @public
   * @readonly
   */
  public get ephemeral(): boolean {
    return this._ephemeral;
  }
}
