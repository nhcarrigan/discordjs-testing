import { AttachmentParameters } from "../interfaces/AttachmentParameters";

/**
 * Mocks the discord.js Attachment.
 *
 * @class
 */
export class MockAttachment {
  private _name: string;
  private _description: string;

  /**
   * @param {AttachmentParameters} options The options to instantiate with.
   * @public
   */
  constructor(options: AttachmentParameters) {
    this._name = options.name;
    this._description = options.description;
  }

  /**
   * @returns {string} The name of the guild.
   * @public
   * @readonly
   */
  public get name(): string {
    return this._name;
  }

  /**
   * @returns {string} The description of the guild.
   * @public
   * @readonly
   */
  public get description(): string {
    return this._description;
  }
}
