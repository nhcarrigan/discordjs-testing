import { RoleParameters } from "../interfaces/RoleParameters";
import { Snowflake } from "../utils/Snowflake";

import { MockGuild } from "./MockGuild";

/**
 * Mocks a discord.js GuildRole.
 *
 * @class
 */
export class MockRole {
  private _id: string;
  private _name: string;
  private _guild: MockGuild;

  /**
   * @param {RoleParameters} options The role options.
   * @public
   */
  constructor(options: RoleParameters) {
    this._id = new Snowflake().id;
    this._name = options.name;
    this._guild = options.guild;
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get id(): string {
    return this._id;
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get name(): string {
    return this._name;
  }

  /**
   * @type {MockGuild}
   * @public
   * @readonly
   */
  public get guild(): MockGuild {
    return this._guild;
  }
}
