import { InteractionType } from "discord.js";

/**
 * Wrapper class for all of the interaction types.
 *
 * @class
 * @internal
 */
export class MockInteraction {
  private _type: InteractionType;

  /**
   *
   * @param {InteractionType} type The interaction type.
   */
  constructor(type: InteractionType) {
    this._type = type;
  }

  /**
   * Checks if this is a slash command.
   *
   * @returns {boolean} This is a slash command.
   */
  public isChatInputCommand() {
    return this._type === InteractionType.ApplicationCommand;
  }

  /**
   * Checks if this is a button.
   *
   * @returns {boolean} This is a chat input command.
   */
  public isButton() {
    return this._type === InteractionType.MessageComponent;
  }

  /**
   * Checks if this is a modal submit.
   *
   * @returns {boolean} This is a modal submit.
   */
  public isModalSubmit() {
    return this._type === InteractionType.ModalSubmit;
  }

  /**
   * Checks if this is a context menu command.
   *
   * @returns {boolean} This is a context menu command.
   */
  public isContextMenu() {
    return this._type === InteractionType.ApplicationCommand;
  }
}
