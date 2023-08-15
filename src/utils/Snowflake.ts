import { Snowflake as DiscordSnowflake } from "discord.js";

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
    // @ts-expect-error Broken need to resolve
    this._id = DiscordSnowflake.generate().toString(10);
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
