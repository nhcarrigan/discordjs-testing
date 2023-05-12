import { Snowflake as Generator } from "@sapphire/snowflake";

/**
 * Simple utility class to wrap the snowflake generator.
 *
 * @class
 */
export class Snowflake {
  private _id: string;
  /**
   * @public
   */
  constructor() {
    this._id = new Generator(Date.now()).generate().toString(10);
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get id(): string {
    return this._id;
  }
}
