import { MemberParameters } from "../interfaces/MemberParameters";

import { MockGuild } from "./MockGuild";
import { MockUser } from "./MockUser";

/**
 * Mocks a discord.js GuildMember.
 *
 * @class
 */
export class MockMember {
  private _id: string;
  private _user: MockUser;
  private _guild: MockGuild;
  /**
   * @param {MemberParameters} options The member options.
   * @public
   */
  constructor(options: MemberParameters) {
    this._id = options.id;
    this._user = options.user;
    this._guild = options.guild;
  }

  /**
   * Gets the member ID.
   *
   * @returns {string} The ID.
   * @public
   * @readonly
   */
  public get id() {
    return this._id;
  }
}
