import { BanParameters } from "../interfaces/BanParameters";

import { MockGuild } from "./MockGuild";
import { MockUser } from "./MockUser";

/**
 * Mocks a discord.js GuildBan.
 *
 * @class
 */
export class MockBan {
  private _guild: MockGuild;
  private _user: MockUser;
  private _reason: string;
  /**
   * @param {BanParameters} options The ban options.
   * @public
   */
  constructor(options: BanParameters) {
    this._guild = options.guild;
    this._user = options.user;
    this._reason = options.reason;
  }

  /**
   * Gets the guild the ban occurred in.
   *
   * @returns {MockGuild} The guild.
   * @public
   * @readonly
   */
  public get guild(): MockGuild {
    return this._guild;
  }

  /**
   * Gets the user that was banned.
   *
   * @returns {MockUser} The user.
   * @public
   * @readonly
   */
  public get user(): MockUser {
    return this._user;
  }

  /**
   * Gets the reason for the ban.
   *
   * @returns {string} The reason.
   * @public
   * @readonly
   */
  public get reason(): string {
    return this._reason;
  }
}
