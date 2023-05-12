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
    this._user = options.member.user;
    this._reason = options.reason;
  }

  /**
   * @type {MockGuild}
   * @public
   * @readonly
   */
  public get guild(): MockGuild {
    return this._guild;
  }

  /**
   * @type {MockUser}
   * @public
   * @readonly
   */
  public get user(): MockUser {
    return this._user;
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get reason(): string {
    return this._reason;
  }
}
