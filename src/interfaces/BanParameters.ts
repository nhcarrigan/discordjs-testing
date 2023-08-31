import { MockGuild } from "../mocks/MockGuild";
import { MockMember } from "../mocks/MockMember";

/**
 * Parameters for the MockBan constructor.
 *
 * @interface BanParameters
 * @property {MockGuild} guild - The guild the ban is taking place in.
 * @property {MockMember} member - The member being banned.
 * @property {string} reason - The reason for the ban.
 */
export interface BanParameters {
  guild: MockGuild;
  member: MockMember;
  reason: string;
}
